import { memo } from "react";
import Link from "next/link";
import Image from "next/image";

import { StoreCrowdednessReviewProps } from "@/types/crowdedness";

export const StoreCrowdednessReviewCard: React.FC<StoreCrowdednessReviewProps> =
  memo((props) => {
    const { reviews } = props;

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
      <div className="md:px-20">
        {reviews?.map((review) => (
          <div
            key={review.id}
            className="bg-white px-8 py-4 mb-10 rounded-lg shadow-md flex flex-col"
          >
            <div className="flex md:flex-row flex-col md:justify-between md:items-center items-start mb-2">
              <div>
                <p className="text-gray-500 text-xs mb-2 md:mb-0">{`${review.created_at} ${review.day_of_week}`}</p>
              </div>
              <div
                className={`px-2 py-1 rounded ${changeBackgroundColor(
                  review.level
                )}`}
              >
                <p className={`text-sm text-white font-bold`}>
                  混み具合：{review.level}
                </p>
              </div>
            </div>
            {review.memo.length ? (
              <p className="text-gray-900 text-sm md:text-base">
                {review.memo}
              </p>
            ) : (
              <p className="text-gray-300 text-xs md:text-base">
                この投稿にはメモ・口コミはありません
              </p>
            )}
            <div className="flex items-center md:justify-end justify-start mt-4">
              <div className="flex items-center">
                <div className="relative w-10 h-10">
                  <Image
                    src={review.url || "/default.svg"}
                    fill
                    style={{ objectFit: "cover" }}
                    alt="default user image"
                    className="rounded-full"
                    sizes="(max-width: 600px) 100vw, 24px"
                  />
                </div>
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
    );
  });

StoreCrowdednessReviewCard.displayName = "StoreCrowdednessReviewCard";
