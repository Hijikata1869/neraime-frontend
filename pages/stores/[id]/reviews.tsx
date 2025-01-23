import { memo, useEffect, useState, useCallback } from "react";
import { useRouter } from "next/router";
import { format } from "date-fns";
import Cookie from "universal-cookie";

import { StoreCrowdednessReviews } from "@/types/crowdedness";
import { StoreData } from "@/types/store";

import { fetchCrowdednessReviews } from "@/lib/crowdedness";

import { StoreCrowdednessReviewCard } from "@/components/StoreCrowdednessReviewCard";
import { Layout } from "@/components/Layout";
import { fetchStore } from "@/lib/stores";
import { Spinner } from "@/components/Spinner";

const cookie = new Cookie();

const StoreReviewPage: React.FC = memo(() => {
  const router = useRouter();
  const storeId = parseInt(router.query.id as string);

  const [crowdednessReviews, setCrowdednessReview] = useState<
    StoreCrowdednessReviews | undefined
  >();
  const [store, setStore] = useState<StoreData | undefined>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchPosts = useCallback(() => {
    const token = cookie.get("access_token") as string;
    if (!isNaN(storeId)) {
      fetchCrowdednessReviews(storeId, token)
        .then(async (res) => {
          const data: StoreCrowdednessReviews = await res.store_reviews;
          data.forEach((review) => {
            review.created_at = format(
              new Date(review.created_at),
              "yyyy年MM月dd日"
            );
          });
          setCrowdednessReview(data);
        })
        .catch((err) => {
          console.error(err);
          router.push("/404");
        });
    }
  }, [storeId, router]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  useEffect(() => {
    if (!isNaN(storeId)) {
      fetchStore(storeId)
        .then(async (res) => {
          const data = await res.store;
          setStore(data);
        })
        .catch((err) => {
          console.error(err);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [storeId]);

  if (isLoading) {
    return <Spinner />;
  }

  if (!crowdednessReviews) {
    return null;
  }

  return (
    <Layout title="メモ一覧">
      <div className="w-full lg:px-40 md:px-20 px-10 mt-10">
        <h1 className="md:text-2xl font-bold text-gray-900 mb-10">{`${store?.name}の口コミ・メモ一覧`}</h1>
        {crowdednessReviews ? (
          <StoreCrowdednessReviewCard
            reviews={crowdednessReviews}
            reFetchPost={fetchPosts}
          />
        ) : (
          <div className="flex justify-center items-center">
            <p className="font-bold text-gray-900">
              この店舗にはまだメモがありません
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
});

StoreReviewPage.displayName = "StoreReviewPage";

export default StoreReviewPage;
