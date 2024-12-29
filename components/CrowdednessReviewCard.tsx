import React, { memo } from "react";
import Link from "next/link";
import Image from "next/image";
import Cookie from "universal-cookie";

import { CrowdednessReviewCardProps } from "@/types/crowdedness";
import { createUseful, deleteUseful } from "@/lib/usefuls";

const cookie = new Cookie();

export const CrowdednessReviewCard: React.FC<CrowdednessReviewCardProps> = memo(
  (props) => {
    const { reviews, reFetchPost } = props;
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

    const onClickCreateUseful = (
      event: React.MouseEvent,
      crowdednessId: number
    ) => {
      event.preventDefault();
      const token = cookie.get("access_token") as string;
      const createUsefulArg = { crowdednessId: crowdednessId, token: token };
      createUseful(createUsefulArg)
        .then(() => {
          reFetchPost();
        })
        .catch((err) => {
          console.error(err);
        });
    };

    const onClickDeleteUseful = (
      event: React.MouseEvent,
      crowdednessId: number
    ) => {
      event.preventDefault();
      const token = cookie.get("access_token") as string;
      const deleteUsefulArg = { crowdednessId: crowdednessId, token: token };
      deleteUseful(deleteUsefulArg)
        .then(() => {
          reFetchPost();
        })
        .catch((err) => {
          console.error(err);
        });
    };

    return (
      <div className="lg:px-20 md:px-10 w-full">
        {reviews?.map((review) => (
          <div
            key={review.id}
            className="bg-white px-8 py-4 mb-10 rounded-lg shadow-md flex flex-col"
          >
            <div className="hidden md:block">
              <div className="flex justify-between items-center mb-2">
                <div>
                  <p className="text-gray-500 text-xs">{`${review.created_at} ${review.day_of_week} ${review.time}の訪問`}</p>
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
            </div>
            <div className="md:hidden mb-2">
              <div className="flex flex-col justify-start items-start">
                <div>
                  <p className="text-gray-500 text-xs mb-2">{`${review.created_at} ${review.day_of_week} ${review.time}の訪問`}</p>
                </div>
                <div
                  className={`px-2 py-1 rounded ${changeBackgroundColor(
                    review.level
                  )}`}
                >
                  <p className={`text-sm text-white font-bold`}>
                    混み具合：{`${review.level}`}
                  </p>
                </div>
              </div>
            </div>
            <div>
              <Link
                href={`/stores/${review.store_id}`}
                className="font-bold md:text-lg text-sm text-cyan-600"
              >
                {review.store_name}
              </Link>
            </div>
            {review?.memo ? (
              <p className="mt-2 text-gray-900 text-sm md:text-base">
                {review.memo}
              </p>
            ) : (
              <p className="mt-2 text-gray-300 text-xs md:text-base">
                この投稿にはメモ・口コミはありません
              </p>
            )}
            <div className="flex items-center md:justify-between justify-start mt-4">
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
              <div className="flex flex-col items-end">
                <p className="bg-gray-400 px-2 py-1 rounded-full text-xs text-white font-bold">{`${review.number_of_usefuls}`}</p>
                <div className="flex flex-col items-center">
                  {review.is_useful ? (
                    <button
                      onClick={(event) => onClickDeleteUseful(event, review.id)}
                    >
                      <Image
                        src={"/solidSmile.svg"}
                        alt="smile.svg"
                        width={20}
                        height={20}
                      />
                    </button>
                  ) : (
                    <button
                      onClick={(event) => onClickCreateUseful(event, review.id)}
                    >
                      <Image
                        src={"/smile.svg"}
                        alt="smile.svg"
                        width={20}
                        height={20}
                      />
                    </button>
                  )}

                  <p className="text-xs text-gray-400">参考になった</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
);

CrowdednessReviewCard.displayName = "CrowdednessReviewCard";
