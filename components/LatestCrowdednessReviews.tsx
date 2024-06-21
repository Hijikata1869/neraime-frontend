import { memo, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";

import {
  LatestCrowdednessReviewsProps,
  LatestStoreReviews,
} from "@/types/crowdedness";

import { fetchLatestCrowdednessReviews } from "@/lib/crowdedness";

export const LatestCrowdednessReviews: React.FC<LatestCrowdednessReviewsProps> =
  memo((props) => {
    const { storeId } = props;

    const [latestReviews, setLatestReviews] = useState<
      LatestStoreReviews | undefined
    >();

    useEffect(() => {
      if (!isNaN(storeId)) {
        fetchLatestCrowdednessReviews(storeId)
          .then(async (res) => {
            const data: LatestStoreReviews = await res.latest_store_reviews;
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

    const changeBackgroundColor = (crowdedLevel: string) => {
      if (crowdedLevel === "空いてる") {
        return "bg-sky-600";
      } else if (crowdedLevel === "普通") {
        return "bg-emerald-600";
      } else if (crowdedLevel === "混雑") {
        return "bg-orange-500";
      } else {
        return "bg-red-600";
      }
    };

    return (
      <div className="mt-10 w-full">
        <h3 className="font-bold text-2xl text-gray-800 mb-5">最新のメモ</h3>
        <div className="px-20">
          {latestReviews?.map((review) => (
            <div
              key={review.id}
              className="bg-white px-8 py-4 mb-10 rounded-lg shadow-md flex flex-col"
            >
              <div className="flex justify-between items-center mb-2">
                <div>
                  <p className="text-gray-500 text-xs">{`${review.created_at} ${review.day_of_week}`}</p>
                </div>
                <div
                  className={`px-2 py-1 rounded ${changeBackgroundColor(
                    review.level
                  )}`}
                >
                  <p className={`text-sm text-white font-bold`}>
                    {review.level}
                  </p>
                </div>
              </div>
              <div className="mb-4">
                <p className="text-gray-900">{review.memo}</p>
              </div>
              <div className="flex items-center justify-end">
                <div className="flex items-center">
                  <Image
                    src="/default.svg"
                    width={40}
                    height={40}
                    alt="default user image"
                  />
                  <Link href={`/users/${review.user_id}`}>
                    <p className="font-bold text-gray-700 pl-2">
                      {review.nickname}
                    </p>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  });

LatestCrowdednessReviews.displayName = "LatestCrowdednessReviews";
