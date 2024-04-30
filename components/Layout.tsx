import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { ReactNode, useState, useEffect } from "react";
import Cookie from "universal-cookie";

interface LayoutProps {
  title: string;
  children?: ReactNode;
}

const cookie = new Cookie();

export const Layout: React.FC<LayoutProps> = (props) => {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const token = cookie.get("access_token");
    if (token) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, []);

  const logout = () => {
    setIsLogin(false);
    cookie.remove("access_token", { path: "/" });
    router.push("/");
  };

  return (
    <>
      <header className="p-8 bg-amber-50">
        <nav>
          <div className="flex">
            <Link
              href="/"
              className="text-gray-800 font-bold text-3xl cursor-pointer mr-auto"
            >
              NERAIME
            </Link>
            {isLogin ? (
              <div>
                <button
                  className="py-2 px-4 border border-gray-300 rounded text-sm hover:bg-neutral-200 transition mr-4"
                  onClick={logout}
                >
                  ログアウト
                </button>
                <Link href="#">
                  <button className="py-2 px-4 rounded text-sm transition mr-4 bg-emerald-950 text-amber-50 hover:bg-emerald-700">
                    マイページ
                  </button>
                </Link>
              </div>
            ) : (
              <div>
                <Link href="sign-up">
                  <button className="py-2 px-4 border border-gray-300 rounded text-sm hover:bg-neutral-200 transition mr-4">
                    新規登録
                  </button>
                </Link>
                <Link href="sign-in">
                  <button className="py-2 px-4 rounded text-sm transition mr-4 bg-emerald-950 text-amber-50 hover:bg-emerald-700">
                    ログイン
                  </button>
                </Link>
              </div>
            )}
          </div>
        </nav>
      </header>
      <div className="flex items-center flex-col min-h-screen bg-amber-50">
        <Head>
          <title>{props.title}</title>
        </Head>
        <main className="flex flex-col justify-center items-center h-full w-full">
          {props.children}
        </main>
      </div>
    </>
  );
};
