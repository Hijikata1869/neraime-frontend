import { memo, useEffect, useState } from "react";
import { useRouter } from "next/router";

import { format } from "date-fns";

import { StoreCrowdednessReviewCard } from "./StoreCrowdednessReviewCard";

import {
  LatestCrowdednessReviewsProps,
  StoreCrowdednessReviews,
} from "@/types/crowdedness";

import { fetchLatestCrowdednessReviews } from "@/lib/crowdedness";

export const LatestCrowdednessReviews: React.FC<LatestCrowdednessReviewsProps> =
  memo((props) => {
    const { storeId } = props;
    const router = useRouter();

    const [latestReviews, setLatestReviews] = useState<
      StoreCrowdednessReviews | undefined
    >();

    useEffect(() => {
      if (!isNaN(storeId)) {
        fetchLatestCrowdednessReviews(storeId)
          .then(async (res) => {
            const data: StoreCrowdednessReviews =
              await res.latest_store_reviews;
            data.forEach((review) => {
              review.created_at = format(
                new Date(review.created_at),
                "yyyy年MM月dd日"
              );
            });
            setLatestReviews(data);
          })
          .catch((err) => {
            console.error(err);
          });
      }
    }, [storeId]);

    return (
      <div className="mt-10 w-full lg:px-0 md:px-20 px-10">
        <h3 className="font-bold text-2xl text-gray-800 mb-5">
          最新の口コミ・メモ
        </h3>
        <StoreCrowdednessReviewCard reviews={latestReviews} />
        <div className="flex justify-center items-center mt-20">
          {latestReviews !== undefined ? (
            <button
              className="py-2 px-4 bg-cyan-600 rounded-lg text-gray-50 font-bold hover:bg-cyan-800 transition text-sm md:text-base"
              onClick={() => router.push(`/stores/${storeId}/reviews`)}
            >
              この店舗の口コミ・メモをもっと見る
            </button>
          ) : (
            <p className="font-bold text-gray-900">
              この店舗のメモはまだありません
            </p>
          )}
        </div>
      </div>
    );
  });

LatestCrowdednessReviews.displayName = "LatestCrowdednessReviews";
