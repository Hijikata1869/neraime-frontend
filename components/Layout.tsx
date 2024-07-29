import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useContext, memo, useState } from "react";
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
import { HumbergerMenu } from "./HumbergerMenu";

const cookie = new Cookie();

export const Layout: React.FC<LayoutProps> = memo((props) => {
  const currentUserContext = useContext(CurrentUserContext);
  const { currentUser, setCurrentUser, isLogin, setIsLogin } =
    currentUserContext;
  const router = useRouter();
  const notificationCtx = useContext(NotificationContext);
  const [isOpen, setIsOpen] = useState<boolean>(false);

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

  const hundleClick = (event: React.MouseEvent) => {
    event.preventDefault();
    setIsOpen(!isOpen);
  };

  return (
    <>
      <header className="p-5 bg-sky-800 z-30 relative">
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
                <div className="hidden md:block">
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
                <div>
                  <button
                    className="outline outline-cyan-600 rounded p-1 bg-sky-800 hover:bg-sky-700 md:hidden focus:outline-none"
                    onClick={hundleClick}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-8 text-amber-50"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <div className="hidden md:block">
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
                <div>
                  <button
                    className="outline outline-cyan-600 rounded p-1 bg-sky-800 hover:bg-sky-700 md:hidden focus:outline-none"
                    onClick={hundleClick}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-8 text-amber-50"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                      />
                    </svg>
                  </button>
                </div>
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
        <HumbergerMenu
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          isLogin={isLogin}
          currentUser={currentUser}
          logout={logout}
        />
        <main className="flex flex-col justify-center items-center h-full w-full">
          {props.children}
        </main>
      </div>
    </>
  );
});

Layout.displayName = "Layout";
