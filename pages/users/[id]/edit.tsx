import { useEffect, useState, useContext, useCallback, memo } from "react";
import { useRouter } from "next/router";
import Cookie from "universal-cookie";

import { CurrentUserContext } from "@/context/CurrentUserContext";

// components
import { Layout } from "@/components/Layout";
import { ConfirmationDialog } from "@/components/ConfirmationDialog";

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

  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [selfIntroduction, setSelfIntroduction] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isNaN(userId)) {
      fetchUser(userId)
        .then((data) => {
          const userData = data.user;
          return userData;
        })
        .then((data) => {
          setNickname(data.nickname);
          setEmail(data.email);
          data.self_introduction && setSelfIntroduction(data.self_introduction);
        })
        .catch((err) => {
          console.error(err);
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
        router.push(`/users/${userId}`);
      })
      .catch((err) => {
        console.error(err);
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
      })
      .then(() => {
        router.push("/");
      })
      .catch((err) => {
        console.error(err);
      });
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <ConfirmationDialog
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        executeOnDialogAction={onClickDelete}
      />
      <Layout title="登録情報の変更">
        <div className="bg-white w-1/2 p-8">
          <div className="flex justify-center">
            <h2 className="font-semibold text-3xl text-gray-900">
              プロフィール
            </h2>
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
                className="py-2 px-4 rounded text-sm transition mr-4 bg-emerald-700 text-amber-50 hover:bg-emerald-950 "
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
          <div className="mt-10 flex justify-center">
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
