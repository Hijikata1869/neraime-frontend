import { useEffect, useState, useContext, useCallback, memo } from "react";
import { useRouter } from "next/router";
import Cookie from "universal-cookie";

import { CurrentUserContext } from "@/context/CurrentUserContext";
import NotificationContext from "@/context/notificationContext";

// components
import { Layout } from "@/components/Layout";
import { ConfirmationDialog } from "@/components/ConfirmationDialog";
import ProfileImageUpload from "@/components/ProfileImageUpload";
import { Spinner } from "@/components/Spinner";

// apis
import {
  fetchUser,
  updateUser,
  deleteUser,
  fetchCurrentUser,
} from "@/lib/users";

const cookie = new Cookie();

const UserEditPage: React.FC = memo(() => {
  const router = useRouter();
  const userId = parseInt(router.query.id as string);
  const token = cookie.get("access_token");

  const currentUserContext = useContext(CurrentUserContext);
  const { currentUser, setCurrentUser } = currentUserContext;
  const notificationCtx = useContext(NotificationContext);

  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [selfIntroduction, setSelfIntroduction] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!isNaN(userId)) {
      fetchUser(userId)
        .then(async (data) => {
          const userData = await data.user;
          return userData;
        })
        .then((data) => {
          setNickname(data.nickname);
          setEmail(data.email);
          data.self_introduction && setSelfIntroduction(data.self_introduction);
        })
        .catch((err) => {
          console.error(err);
          router.replace("/404");
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
    // eslint-disable-next-line
  }, [router.query.id]);

  useEffect(() => {
    if (token) {
      fetchCurrentUser(token)
        .then(async (data) => {
          const currentUser = data.current_user;
          return currentUser;
        })
        .then((data) => {
          setCurrentUser(data);
        })
        .catch((err) => {
          console.error(err);
        });
    }
    // eslint-disable-next-line
  }, []);

  const onChangeNickname = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(event.target.value);
  };

  const onChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const onChangeSelfIntroduction = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setSelfIntroduction(event.target.value);
  };

  const onClickUpdate = (event: React.MouseEvent) => {
    const updateUserInput = {
      event: event,
      id: userId,
      nickname: nickname,
      email: email,
      selfIntroduction: selfIntroduction,
      token: token,
    };
    updateUser(updateUserInput)
      .then(() => {
        notificationCtx.success("登録情報を編集しました");
        router.push(`/users/${userId}`);
      })
      .catch((errorMessage) => {
        if (errorMessage === "ゲストユーザーのユーザー情報は更新できません") {
          notificationCtx.error(`${errorMessage}`);
        } else {
          notificationCtx.error("登録情報を変更できませんでした");
        }
      });
  };

  const onClickDelete = useCallback((event: React.MouseEvent) => {
    const userDeleteArg = {
      event: event,
      userId: userId,
      token: token,
    };
    deleteUser(userDeleteArg)
      .then(() => {
        cookie.remove("access_token", { path: "/" });
        notificationCtx.success("アカウントを削除しました");
        router.push("/");
      })
      .catch((errorMessage) => {
        if (errorMessage === "ゲストユーザーのユーザー情報は更新できません") {
          notificationCtx.error("ゲストユーザーは削除できません");
        } else {
          notificationCtx.error("アカウントを削除できませんでした");
        }
      });
    // eslint-disable-next-line
  }, []);

  if (isLoading) {
    return <Spinner />;
  }

  if (!nickname) {
    return null;
  }

  return (
    <>
      <ConfirmationDialog
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        dialogTitle="アカウントを削除しますか？"
        dialogDescription="アカウントを削除するとこれまでの投稿も削除されます。"
        executeOnDialogAction={onClickDelete}
      />
      <Layout title="登録情報の変更">
        <div className="bg-white md:w-1/2 p-8 mb-20 mt-20">
          <div className="flex flex-col items-center justify-center">
            <h2 className="font-semibold text-3xl text-gray-900 mb-10">
              プロフィール
            </h2>
            <ProfileImageUpload />
          </div>
          <form className="flex flex-col">
            <label htmlFor="nickname" className="text-xs">
              ニックネーム
            </label>
            <input
              type="text"
              className="border-2 border-gray-300 mb-8 py-2 outline-none pl-2 rounded"
              name="nickname"
              value={nickname}
              onChange={(event) => onChangeNickname(event)}
            />
            <label htmlFor="email" className="text-xs">
              Eメール
            </label>
            <input
              type="text"
              className="border-2 border-gray-300 mb-8 py-2 outline-none pl-2 rounded"
              value={email}
              onChange={(event) => onChangeEmail(event)}
            />
            <label htmlFor="selfIntroduction" className="text-xs">
              自己紹介
            </label>
            <textarea
              className="border-2 border-gray-300 mb-8 py-6 outline-none pl-2 rounded"
              name="selfIntroduction"
              value={selfIntroduction}
              onChange={(event) => onChangeSelfIntroduction(event)}
            />
          </form>
          {currentUser?.id === userId && (
            <div className="flex justify-center mt-10">
              <button
                className="py-2 px-4 rounded text-sm transition mr-4 bg-cyan-600 text-amber-50 hover:bg-cyan-700"
                onClick={(event) => onClickUpdate(event)}
              >
                更新する
              </button>
              <button
                className="py-2 px-4 border border-gray-300 rounded text-sm hover:bg-neutral-200 transition "
                onClick={() => router.push(`/users/${userId}`)}
              >
                マイページに戻る
              </button>
            </div>
          )}
        </div>
        {currentUser?.id === userId && (
          <div className="flex justify-center mb-20">
            <button
              onClick={() => setIsOpen(true)}
              className="text-sm border-red-500 px-2 py-2 rounded border text-red-500 hover:bg-red-400 hover:text-neutral-200 hover:border-red-400 transition"
            >
              アカウントを削除する
            </button>
          </div>
        )}
      </Layout>
    </>
  );
});

UserEditPage.displayName = "UserEditPage";

export default UserEditPage;
