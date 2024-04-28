import { useState } from "react";
import { useRouter } from "next/router";

// apis
import { createUser } from "@/lib/users";

export const UserAuth: React.FC = () => {
  const router = useRouter();
  const [isSignUp, setIsSignUp] = useState(router.pathname === "/sign-up");
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const onClickToggle = () => {
    setIsSignUp(!isSignUp);
  };

  const onChangeInputValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    switch (event.target.name) {
      case "nickname":
        setNickname(event.target.value);
        break;
      case "email":
        setEmail(event.target.value);
        break;
      case "password":
        setPassword(event.target.value);
        break;
      case "passwordConfirmation":
        setPasswordConfirmation(event.target.value);
        break;
    }
  };

  const onClickSignUp = (event: React.MouseEvent) => {
    const userInput = {
      event: event,
      nickname: nickname,
      email: email,
      password: password,
      passwordConfirmation: passwordConfirmation,
    };
    createUser(userInput);
  };

  return (
    <div className="w-screen h-screen flex flex-col items-center">
      <div className="bg-slate-50 py-4 px-8">
        <div className="flex justify-center mx-4 mt-4">
          {isSignUp ? (
            <>
              <button
                onClick={onClickToggle}
                className="border rounded px-16 py-2 bg-emerald-950 text-gray-100 font-semibold"
              >
                新規登録
              </button>
              <button
                onClick={onClickToggle}
                className="border rounded px-16 py-2 font-semibold text-gray-400"
              >
                ログイン
              </button>
            </>
          ) : (
            <>
              <button
                onClick={onClickToggle}
                className="border rounded px-16 py-2 font-semibold text-gray-400"
              >
                新規登録
              </button>
              <button
                onClick={onClickToggle}
                className="border rounded px-16 py-2 bg-emerald-950 text-gray-100 font-semibold"
              >
                ログイン
              </button>
            </>
          )}
        </div>
        <div className="mt-12 mx-4">
          {isSignUp ? (
            <>
              <form className="flex flex-col">
                <label className="text-xs mb-2" htmlFor="nickname">
                  ニックネーム
                </label>
                <input
                  className="border mb-8 py-2 outline-none pl-2"
                  id="nickname"
                  type="text"
                  name="nickname"
                  value={nickname}
                  onChange={(event) => onChangeInputValue(event)}
                />
                <label className="text-xs mb-2" htmlFor="email">
                  Eメール
                </label>
                <input
                  className="border mb-8 py-2 outline-none pl-2"
                  id="email"
                  type="text"
                  name="email"
                  value={email}
                  onChange={(event) => onChangeInputValue(event)}
                />
                <label className="text-xs mb-2" htmlFor="password">
                  パスワード
                </label>
                <input
                  className="border mb-8 py-2 outline-none pl-2"
                  id="password"
                  type="password"
                  name="password"
                  value={password}
                  onChange={(event) => onChangeInputValue(event)}
                />
                <label className="text-xs mb-2" htmlFor="passwordConfirmation">
                  パスワード（確認用）
                </label>
                <input
                  className="border mb-8 py-2 outline-none pl-2"
                  id="passwordConfirmation"
                  type="password"
                  name="passwordConfirmation"
                  value={passwordConfirmation}
                  onChange={(event) => onChangeInputValue(event)}
                />
              </form>
            </>
          ) : (
            <>
              <form className="flex flex-col">
                <label className="text-xs mb-2" htmlFor="email">
                  Eメール
                </label>
                <input
                  className="border mb-8 py-2 outline-none pl-2"
                  id="email"
                  type="text"
                  name="email"
                  value={email}
                  onChange={(event) => onChangeInputValue(event)}
                />
                <label className="text-xs mb-2" htmlFor="password">
                  パスワード
                </label>
                <input
                  className="border mb-8 py-2 outline-none pl-2"
                  id="password"
                  type="password"
                  name="password"
                  value={password}
                  onChange={(event) => onChangeInputValue(event)}
                />
              </form>
            </>
          )}
        </div>
        <div className="mt-6 mb-6 mx-4 flex justify-center">
          {isSignUp ? (
            <>
              <button
                className="text-sm border w-full py-3 bg-emerald-700 text-gray-100 rounded hover:bg-emerald-900 transition"
                onClick={(event) => onClickSignUp(event)}
              >
                新規登録
              </button>
            </>
          ) : (
            <>
              <button className="text-sm border w-full py-3 bg-emerald-700 text-gray-100 rounded hover:bg-emerald-900 transition">
                ログイン
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
