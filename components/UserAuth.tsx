import { useState, memo, useContext } from "react";
import { useRouter } from "next/router";
import Cookie from "universal-cookie";

import NotificationContext from "@/context/notificationContext";

// apis
import { createUser, login, guestUserLogin } from "@/lib/users";

const cookie = new Cookie();

export const UserAuth: React.FC = memo(() => {
  const router = useRouter();
  const [isSignUp, setIsSignUp] = useState(router.pathname === "/sign-up");
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const notificationCtx = useContext(NotificationContext);

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

  const validateForm = () => {
    if (isSignUp) {
      return nickname && email && password && password === passwordConfirmation;
    } else {
      return email && password;
    }
  };

  const onClickSignUp = (event: React.MouseEvent) => {
    event.preventDefault();
    if (!validateForm()) {
      notificationCtx.error("フォームに不備があります");
      return;
    }
    setIsLoading(true);
    createUser({ nickname, email, password, passwordConfirmation })
      .then((data) => {
        const options = {
          path: "/",
          expires: new Date(Date.now() + 24 * 3600 * 1000),
        };
        cookie.set("access_token", data.token, options);
      })
      .then(() => {
        router.push("/");
        notificationCtx.success("登録しました");
      })
      .catch(() => {
        setNickname("");
        setEmail("");
        setPassword("");
        setPasswordConfirmation("");
        notificationCtx.error("登録できませんでした");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const onClickSignIn = (event: React.MouseEvent) => {
    event.preventDefault();
    if (!validateForm()) {
      notificationCtx.error("フォームに不備があります");
      return;
    }
    setIsLoading(true);
    login({ email, password })
      .then((data) => {
        const options = {
          path: "/",
          expires: new Date(Date.now() + 24 * 3600 * 1000),
        };
        cookie.set("access_token", data.token, options);
        const redirectUrl = localStorage.getItem("redirectAfterLogin");
        if (redirectUrl && redirectUrl.startsWith("/")) {
          router.push(redirectUrl);
          localStorage.removeItem("redirectAfterLogin");
        } else {
          router.push("/");
        }
        notificationCtx.success("ログインしました");
      })
      .catch(() => {
        setEmail("");
        setPassword("");
        notificationCtx.error("ログインできませんでした");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const hundleGuestLogin = (event: React.MouseEvent) => {
    event.preventDefault();
    guestUserLogin()
      .then((data) => {
        const options = {
          path: "/",
          expires: new Date(Date.now() + 24 * 3600 * 1000),
        };
        cookie.set("access_token", data.token, options);
        const redirectUrl = localStorage.getItem("redirectAfterLogin");
        if (redirectUrl && redirectUrl.startsWith("/")) {
          router.push(redirectUrl);
          localStorage.removeItem("redirectAfterLogin");
        } else {
          router.push("/");
        }
        notificationCtx.success("ゲストログインしました");
      })
      .catch(() => {
        notificationCtx.error("ゲストログインできませんでした");
      });
  };

  return (
    <div className="w-full md:h-screen flex flex-col items-center md:mt-20">
      <div className="md:bg-slate-50 bg-gray-100 py-4 md:px-8 px-2">
        <div className="flex justify-center mx-4 mt-4">
          {isSignUp ? (
            <>
              <button
                onClick={onClickToggle}
                className="border rounded md:px-16 px-8 py-2 bg-emerald-950 text-gray-100 font-semibold"
              >
                新規登録
              </button>
              <button
                onClick={onClickToggle}
                className="border rounded md:px-16 px-8 py-2 font-semibold text-gray-400"
              >
                ログイン
              </button>
            </>
          ) : (
            <>
              <button
                onClick={onClickToggle}
                className="border rounded md:px-16 px-8 py-2 font-semibold text-gray-400"
              >
                新規登録
              </button>
              <button
                onClick={onClickToggle}
                className="border rounded md:px-16 px-8 py-2 bg-emerald-950 text-gray-100 font-semibold"
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
                <div className="flex flex-col mb-8">
                  <label
                    className="text-xs mb-2"
                    htmlFor="passwordConfirmation"
                  >
                    パスワード（確認用）
                  </label>
                  <input
                    className="border py-2 outline-none pl-2"
                    id="passwordConfirmation"
                    type="password"
                    name="passwordConfirmation"
                    value={passwordConfirmation}
                    onChange={(event) => onChangeInputValue(event)}
                  />
                  {passwordConfirmation !== "" &&
                    passwordConfirmation !== password && (
                      <p className="mt-1 text-xs text-red-500">
                        パスワードが一致しません
                      </p>
                    )}
                </div>
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
        <div className="mt-6 mb-6 mx-4 flex flex-col justify-center">
          <button
            className="text-sm border w-full py-3 bg-cyan-600 text-gray-100 rounded hover:bg-cyan-700 transition"
            onClick={isSignUp ? onClickSignUp : onClickSignIn}
            disabled={isLoading}
          >
            {isSignUp ? "新規登録" : "ログイン"}
          </button>
          <button
            className="text-sm w-full bg-gray-400 text-gray-100 font-bold py-3 px-6 mt-10 rounded border border-gray-400 transition mr-4 hover:bg-white hover:text-gray-800 hover:border-gray-400 md:mb-0 mb-10"
            onClick={hundleGuestLogin}
          >
            ゲストログインして使ってみる
          </button>
        </div>
      </div>
    </div>
  );
});

UserAuth.displayName = "UserAuth";
