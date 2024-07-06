import { memo } from "react";
import Link from "next/link";

import { UserCrowdednessCardProps } from "@/types/crowdedness";

export const UserCrowdednessReviewCard: React.FC<UserCrowdednessCardProps> =
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
      <div className="px-20">
        {reviews?.map((review) => (
          <div
            key={review.id}
            className="bg-white px-8 py-4 mb-10 rounded-lg shadow-md flex flex-col max-w-4xl"
          >
            <div className="flex justify-between items-center mb-2">
              <div>
                <p className="text-gray-500 text-sm">{`${review.created_at} ${review.day_of_week} ${review.time}時の訪問`}</p>
              </div>
              <div
                className={`px-2 py-1 rounded ${changeBackgroundColor(
                  review.level
                )}`}
              >
                <p className={`text-sm text-white font-bold`}>{review.level}</p>
              </div>
            </div>
            <div className="flex mb-2">
              <Link
                href={`/stores/${review.store_id}`}
                className="font-bold text-lg text-cyan-600"
              >
                {review.store_name}
              </Link>
            </div>
            {review.memo?.length !== 0 && (
              <div className="mb-4">
                <p className="text-gray-900">{review.memo}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  });

UserCrowdednessReviewCard.displayName = "UserCrowdednessReviewCard";
