import { useEffect, useState, useContext, memo } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import Cookie from "universal-cookie";

import { CurrentUserContext } from "@/context/CurrentUserContext";

// apis
import { fetchCurrentUser, fetchUser } from "@/lib/users";
import { fetchUserCrowdedness } from "@/lib/crowdedness";

// types
import { UserObj } from "@/types/user";
import { UserCrowdedness } from "@/types/crowdedness";

const cookie = new Cookie();

export const User: React.FC = memo(() => {
  const router = useRouter();
  const userId = parseInt(router.query.id as string);
  const currentUserContext = useContext(CurrentUserContext);
  const { currentUser, setCurrentUser } = currentUserContext;
  const [user, setUser] = useState<UserObj>();
  const [userCrowdedness, setUserCrowdedness] = useState<
    UserCrowdedness | undefined
  >(undefined);

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
    const accessToken = cookie.get("access_token");
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
          const data = await res.user_crowdedness;
          setUserCrowdedness(data);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [userId]);

  return (
    <>
      <div className="w-2/4 bg-white rounded p-8">
        <div className="flex flex-col">
          <div className="flex items-center">
            <Image
              src="/default.svg"
              width={100}
              height={100}
              alt="default user image"
            />
            <h1 className="font-bold text-3xl text-gray-700">
              {user?.nickname}
            </h1>
          </div>
          <p className="mt-4 ml-4">
            {user?.self_introduction
              ? `${user.self_introduction}`
              : "まだ自己紹介はありません"}
          </p>
        </div>
        {currentUser?.id === userId && (
          <div className="flex justify-center">
            <Link href={`/users/${userId}/edit`}>
              <button className="py-2 px-4 rounded text-sm transition mr-4 bg-emerald-700 text-amber-50 hover:bg-emerald-950 mt-20">
                登録情報を編集する
              </button>
            </Link>
          </div>
        )}
      </div>
      <div className="w-full px-40 mt-20 flex flex-col mb-20">
        <h2 className="text-2xl font-bold text-gray-900">
          {user?.nickname}さんの投稿一覧
        </h2>
        {userCrowdedness?.length !== 0 && (
          <>
            {userCrowdedness?.map((crowdedness) => (
              <div key={crowdedness.id} className="p-10 mt-10 bg-white">
                <p>{crowdedness.store_name}</p>
                <p>{crowdedness.day_of_week}</p>
                <p>{crowdedness.time}</p>
                <p>{crowdedness.level}</p>
                <p>{crowdedness.memo}</p>
              </div>
            ))}
          </>
        )}
      </div>
    </>
  );
});

User.displayName = "User";
