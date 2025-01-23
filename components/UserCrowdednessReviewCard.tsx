import { memo, useState, useContext } from "react";
import Link from "next/link";
import Cookie from "universal-cookie";

import { UserCrowdednessCardProps } from "@/types/crowdedness";

import { ConfirmationDialog } from "./ConfirmationDialog";

import { deletePost } from "@/lib/crowdedness";

import NotificationContext from "@/context/notificationContext";
import { CurrentUserContext } from "@/context/CurrentUserContext";
import { createUseful, deleteUseful } from "@/lib/usefuls";
import Image from "next/image";

const cookie = new Cookie();

export const UserCrowdednessReviewCard: React.FC<UserCrowdednessCardProps> =
  memo((props) => {
    const { reviews, currentUser, accessToken, reFetchPost } = props;
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [selectedPostId, setSelectedPostId] = useState<number | null>(null);
    const notificationContext = useContext(NotificationContext);
    const currentUserContext = useContext(CurrentUserContext);

    const { isLogin } = currentUserContext;

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
      <>
        <ConfirmationDialog
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          dialogTitle="この投稿を削除しますか？"
          dialogDescription="削除した投稿は復元できません"
          executeOnDialogAction={hundleDeleteButtonClick}
        />
        <div className="md:px-20">
          {reviews?.map((review) => (
            <div
              key={review.id}
              className="bg-white md:px-8 md:py-4 p-4 mb-10 rounded-lg shadow-md flex flex-col max-w-4xl"
            >
              <div className="flex flex-col md:flex-row md:justify-between md:items-center items-start mb-2">
                <div>
                  <p className="text-gray-500 pb-2 text-sm">{`${review.created_at} ${review.day_of_week} ${review.time}時の訪問`}</p>
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
              <div className="flex justify-between items-center mt-4">
                {isLogin ? (
                  <div className="flex flex-col items-end">
                    <p className="bg-gray-400 px-2 py-1 rounded-full text-xs text-white font-bold">{`${review.number_of_usefuls}`}</p>
                    <div className="flex flex-col items-center">
                      {review.is_useful ? (
                        <button
                          onClick={(event) =>
                            onClickDeleteUseful(event, review.id)
                          }
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
                          onClick={(event) =>
                            onClickCreateUseful(event, review.id)
                          }
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
                ) : (
                  <p className="text-xs text-gray-400">{`${review.number_of_usefuls}人のユーザーが役に立ったと評価しています`}</p>
                )}
                {review.user_id === currentUser?.id && (
                  <div>
                    <button
                      className="text-xs rounded border border-red-500 px-2 py-2 text-red-500 hover:bg-red-500 hover:text-white transition"
                      onClick={(event) => hundleDialogOpen(event, review.id)}
                    >
                      この投稿を削除する
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </>
    );
  });

UserCrowdednessReviewCard.displayName = "UserCrowdednessReviewCard";
