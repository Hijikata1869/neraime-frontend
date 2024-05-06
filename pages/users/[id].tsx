import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import Cookie from "universal-cookie";

// components
import { Layout } from "@/components/Layout";

// apis
import { fetchCurrentUser, fetchUser } from "@/lib/users";

// types
import { UserObj, CurrentUserObj } from "@/types/user";

const cookie = new Cookie();

const UserPage: React.FC = () => {
  const router = useRouter();
  const userId = parseInt(router.query.id as string);
  const [user, setUser] = useState<UserObj>();
  const [currentUser, setCurrentUser] = useState<CurrentUserObj>();

  useEffect(() => {
    if (!isNaN(userId)) {
      fetchUser(userId)
        .then((data) => {
          const userData = data.user;
          return userData;
        })
        .then((data) => {
          setUser(data);
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
  }, []);

  return (
    <Layout title={user?.nickname ? user.nickname : "マイページ"}>
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
    </Layout>
  );
};

export default UserPage;
