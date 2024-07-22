import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useContext, memo } from "react";
import Cookie from "universal-cookie";
import { bebasNeue } from "@/utiles/font";

// context
import { CurrentUserContext } from "@/context/CurrentUserContext";
import NotificationContext from "@/context/notificationContext";

// apis
import { fetchCurrentUser } from "@/lib/users";

// types
import { LayoutProps } from "@/types";

import { SuccessAlert } from "./SuccessAlert";
import { ErrorAlert } from "./ErrorAlert";

const cookie = new Cookie();

export const Layout: React.FC<LayoutProps> = memo((props) => {
  const currentUserContext = useContext(CurrentUserContext);
  const { currentUser, setCurrentUser, isLogin, setIsLogin } =
    currentUserContext;
  const router = useRouter();
  const notificationCtx = useContext(NotificationContext);

  useEffect(() => {
    const accessToken = cookie.get("access_token");
    if (accessToken) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
    // eslint-disable-next-line
  }, []);

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

  const logout = () => {
    setIsLogin(false);
    cookie.remove("access_token", { path: "/" });
    router.push("/");
    notificationCtx.success("ログアウトしました");
  };

  return (
    <>
      <header className="p-5 bg-sky-800">
        <nav>
          <div className="flex items-center">
            <Link
              href="/"
              className={`${bebasNeue.className} text-amber-50 text-5xl cursor-pointer mr-auto`}
            >
              NERAIME
            </Link>
            {isLogin ? (
              <div>
                <button
                  className="py-2 px-4 rounded text-sm text-gray-100 hover:bg-sky-600 transition mr-4"
                  onClick={logout}
                >
                  ログアウト
                </button>
                <Link href={`/users/${currentUser?.id}`}>
                  <button className="py-2 px-4 rounded text-sm transition mr-4 bg-cyan-600 text-amber-50 hover:bg-cyan-700">
                    マイページ
                  </button>
                </Link>
              </div>
            ) : (
              <div>
                <Link href="/sign-up">
                  <button className="py-2 px-4 text-sm rounded hover:bg-sky-600 transition mr-4 text-gray-100">
                    新規登録
                  </button>
                </Link>
                <Link href="/sign-in">
                  <button className="py-2 px-4 rounded text-sm transition mr-4 bg-cyan-600 text-white hover:bg-cyan-700">
                    ログイン
                  </button>
                </Link>
              </div>
            )}
          </div>
        </nav>
      </header>
      <div className="flex items-center flex-col min-h-screen bg-gray-100">
        <Head>
          <title>{props.title}</title>
        </Head>
        <SuccessAlert />
        <ErrorAlert />
        <main className="flex flex-col justify-center items-center h-full w-full">
          {props.children}
        </main>
      </div>
    </>
  );
});

Layout.displayName = "Layout";
