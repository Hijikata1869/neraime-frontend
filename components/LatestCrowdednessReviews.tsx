import { memo, useEffect, useState } from "react";

import { format } from "date-fns";

import { CrowdednessReviewCard } from "./CrowdednessReviewCard";

import {
  LatestCrowdednessReviewsProps,
  StoreCrowdednessReviews,
} from "@/types/crowdedness";

import { fetchLatestCrowdednessReviews } from "@/lib/crowdedness";

export const LatestCrowdednessReviews: React.FC<LatestCrowdednessReviewsProps> =
  memo((props) => {
    const { storeId } = props;

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
      <div className="mt-10 w-full">
        <h3 className="font-bold text-2xl text-gray-800 mb-5">最新のメモ</h3>
        <CrowdednessReviewCard reviews={latestReviews} />
      </div>
    );
  });

LatestCrowdednessReviews.displayName = "LatestCrowdednessReviews";
