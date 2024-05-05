import { useEffect, useState } from "react";
import { useRouter } from "next/router";

// components
import { Layout } from "@/components/Layout";

// apis
import { fetchUser, updateUser } from "@/lib/users";

const UserEditPage: React.FC = () => {
  const router = useRouter();
  const userId = parseInt(router.query.id as string);

  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [selfIntroduction, setSelfIntroduction] = useState("");

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
          setSelfIntroduction(data.self_introduction);
        })
        .catch((err) => {
          console.error(err);
        });
    }
    // eslint-disable-next-line
  }, [router.query.id]);

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
    };
    updateUser(updateUserInput)
      .then((res) => {
        console.log(res);
      })
      .then(() => {
        router.push(`/users/${userId}`);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <Layout title="登録情報の変更">
      <div className="bg-white w-1/2 p-8">
        <div className="flex justify-center">
          <h2 className="font-semibold text-3xl text-gray-900">プロフィール</h2>
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
      </div>
    </Layout>
  );
};

export default UserEditPage;
