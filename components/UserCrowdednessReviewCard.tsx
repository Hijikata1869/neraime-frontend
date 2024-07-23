import { memo, useState, useContext } from "react";
import Link from "next/link";

import { UserCrowdednessCardProps } from "@/types/crowdedness";

import { ConfirmationDialog } from "./ConfirmationDialog";

import { deletePost } from "@/lib/crowdedness";

import NotificationContext from "@/context/notificationContext";

export const UserCrowdednessReviewCard: React.FC<UserCrowdednessCardProps> =
  memo((props) => {
    const { reviews, currentUser, accessToken } = props;
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [selectedPostId, setSelectedPostId] = useState<number | null>(null);
    const notificationContext = useContext(NotificationContext);

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

    const hundleDialogOpen = (event: React.MouseEvent, postId: number) => {
      event.preventDefault();
      setSelectedPostId(postId);
      setIsOpen(true);
    };

    const hundleDeleteButtonClick = (event: React.MouseEvent) => {
      event.preventDefault();
      if (selectedPostId !== null) {
        deletePost(selectedPostId, accessToken)
          .then(() => {
            notificationContext.success("投稿を削除しました");
          })
          .catch(() => {
            notificationContext.error("投稿を削除できませんでした");
          })
          .finally(() => {
            setIsOpen(false);
          });
      }
    };

    return (
      <>
        <ConfirmationDialog
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          dialogTitle="この投稿を削除しますか？"
          dialogDescription="削除した投稿は復元できません"
          executeOnDialogAction={hundleDeleteButtonClick}
        />
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
                  <p className={`text-sm text-white font-bold`}>
                    {review.level}
                  </p>
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
              {review.user_id === currentUser?.id && (
                <div className="flex justify-end items-center">
                  <button
                    className="text-xs rounded border border-red-500 px-2 py-2 text-red-500 hover:bg-red-500 hover:text-white transition"
                    onClick={(event) => hundleDialogOpen(event, review.id)}
                  >
                    この投稿を削除する
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </>
    );
  });

UserCrowdednessReviewCard.displayName = "UserCrowdednessReviewCard";
