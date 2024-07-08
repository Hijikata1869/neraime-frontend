import { memo } from "react";
import Link from "next/link";
import Image from "next/image";

import { CrowdednessReviewCardProps } from "@/types/crowdedness";

export const CrowdednessReviewCard: React.FC<CrowdednessReviewCardProps> = memo(
  (props) => {
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
            className="bg-white px-8 py-4 mb-10 rounded-lg shadow-md flex flex-col"
          >
            <div className="flex justify-between items-center mb-2">
              <div>
                <p className="text-gray-500 text-xs">{`${review.created_at} ${review.day_of_week} ${review.time}の訪問`}</p>
              </div>
              <div
                className={`px-2 py-1 rounded ${changeBackgroundColor(
                  review.level
                )}`}
              >
                <p className={`text-sm text-white font-bold`}>{review.level}</p>
              </div>
            </div>
            <div>
              <Link
                href={`/stores/${review.store_id}`}
                className="font-bold text-lg text-cyan-600"
              >
                {review.store_name}
              </Link>
            </div>
            {review.memo?.length !== 0 && (
              <div className="mt-2">
                <p className="text-gray-900">{review.memo}</p>
              </div>
            )}
            <div className="flex items-center justify-end mt-4">
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
    );
  }
);

CrowdednessReviewCard.displayName = "CrowdednessReviewCard";
