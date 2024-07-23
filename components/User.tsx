import { useEffect, useState, useContext, memo } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import Cookie from "universal-cookie";
import { format } from "date-fns";

import { CurrentUserContext } from "@/context/CurrentUserContext";

// apis
import { fetchCurrentUser, fetchUser } from "@/lib/users";
import { fetchUserCrowdedness } from "@/lib/crowdedness";
import { fetchUserFavoriteStores } from "@/lib/favorites";

// types
import { UserObj } from "@/types/user";
import { UserCrowdedness } from "@/types/crowdedness";
import { StoreDatas } from "@/types/store";

import { UserCrowdednessReviewCard } from "./UserCrowdednessReviewCard";
import { FavoriteStoreCards } from "./FavoriteStoreCards";

const cookie = new Cookie();

export const User: React.FC = memo(() => {
  const router = useRouter();
  const userId = parseInt(router.query.id as string);
  const accessToken = cookie.get("access_token") as string;
  const currentUserContext = useContext(CurrentUserContext);
  const { currentUser, setCurrentUser } = currentUserContext;
  const [user, setUser] = useState<UserObj | undefined>(undefined);
  const [userCrowdedness, setUserCrowdedness] = useState<
    UserCrowdedness | undefined
  >(undefined);
  const [favoriteStores, setFavoriteStores] = useState<StoreDatas | undefined>(
    undefined
  );

  useEffect(() => {
    if (!isNaN(userId)) {
      fetchUser(userId)
        .then(async (data) => {
          const userData = await data.user;
          setUser(userData);
        })
        .catch((err) => {
          console.error(err);
        });
    }
    // eslint-disable-next-line
  }, [router.query.id]);

  useEffect(() => {
    if (accessToken) {
      fetchCurrentUser(accessToken)
        .then(async (data) => {
          const currentUser = await data.current_user;
          return currentUser;
        })
        .then((currentUser) => {
          setCurrentUser(currentUser);
        })
        .catch((err) => {
          console.error(err);
        });
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (!isNaN(userId)) {
      fetchUserCrowdedness(userId)
        .then(async (res) => {
          const data: UserCrowdedness = await res.user_crowdedness;
          data.forEach((review) => {
            review.created_at = format(
              new Date(review.created_at),
              "yyyy年MM月dd日"
            );
          });
          setUserCrowdedness(data);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [userId]);

  useEffect(() => {
    if (!isNaN(userId)) {
      fetchUserFavoriteStores(userId)
        .then(async (res) => {
          const data = await res.favorite_stores;
          setFavoriteStores(data);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [userId]);

  return (
    <>
      <div className="w-full px-40 mt-20">
        <div className="flex">
          <div className="w-3/5 bg-white rounded-lg p-8 shadow">
            <div className="flex flex-col">
              <div className="flex items-center">
                <div className="relative w-20 h-20">
                  <Image
                    src={user?.url || "/default.svg"}
                    fill
                    style={{ objectFit: "cover" }}
                    alt="default user image"
                    className="rounded-full"
                    sizes="(max-width: 600px) 100vw, 24px"
                  />
                </div>
                <h2 className="font-bold text-3xl text-gray-700 ml-5">
                  {user?.nickname}
                </h2>
              </div>
              <p className="mt-4 ml-4">
                {user?.self_introduction
                  ? `${user.self_introduction}`
                  : "まだ自己紹介はありません"}
              </p>
            </div>
            {currentUser?.id === userId && (
              <div className="flex justify-center">
                <Link
                  href={`/users/${userId}/edit`}
                  className="py-2 px-4 rounded text-sm transition mr-4 bg-cyan-600 text-amber-50 hover:bg-cyan-700 mt-20"
                >
                  登録情報を編集する
                </Link>
              </div>
            )}
          </div>
          <div className="p-8 w-2/5 ml-5 flex flex-col">
            <h2 className="font-bold text-gray-900 mb-5">{`${user?.nickname}さんのお気に入り店舗`}</h2>
            <FavoriteStoreCards favoriteStores={favoriteStores} />
          </div>
        </div>
      </div>
      <div className="w-full px-40 mt-20 flex flex-col mb-20">
        <h2 className="text-2xl font-bold text-gray-900 mb-5">
          {user?.nickname}さんの投稿一覧
        </h2>
        {userCrowdedness?.length !== 0 ? (
          <UserCrowdednessReviewCard
            reviews={userCrowdedness}
            currentUser={currentUser}
            accessToken={accessToken}
          />
        ) : (
          <div className="flex px-20">
            <p className="font-bold text-gray-900">まだ投稿がありません</p>
          </div>
        )}
      </div>
    </>
  );
});

User.displayName = "User";
