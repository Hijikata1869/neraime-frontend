import { memo, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { format } from "date-fns";

import { StoreCrowdednessReviews } from "@/types/crowdedness";
import { StoreData } from "@/types/store";

import { fetchCrowdednessReviews } from "@/lib/crowdedness";

import { CrowdednessReviewCard } from "@/components/CrowdednessReviewCard";
import { Layout } from "@/components/Layout";
import { fetchStore } from "@/lib/stores";

const StoreReviewPage: React.FC = memo(() => {
  const router = useRouter();
  const storeId = parseInt(router.query.id as string);

  const [crowdednessReviews, setCrowdednessReview] = useState<
    StoreCrowdednessReviews | undefined
  >();
  const [store, setStore] = useState<StoreData | undefined>();

  useEffect(() => {
    if (!isNaN(storeId)) {
      fetchCrowdednessReviews(storeId)
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
        });
    }
  }, [storeId]);

  useEffect(() => {
    if (!isNaN(storeId)) {
      fetchStore(storeId)
        .then(async (res) => {
          const data = await res.store;
          setStore(data);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [storeId]);

  return (
    <Layout title="メモ一覧">
      <div className="w-full px-40 mt-10">
        <h1 className="text-2xl font-bold text-gray-900 mb-10">{`${store?.name}のメモ一覧`}</h1>
        {crowdednessReviews ? (
          <CrowdednessReviewCard reviews={crowdednessReviews} />
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
