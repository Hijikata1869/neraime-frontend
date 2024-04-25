import Head from "next/head";
import Link from "next/link";
import { ReactNode } from "react";

interface LayoutProps {
  title: string;
  children?: ReactNode;
}

export const Layout: React.FC<LayoutProps> = (props) => {
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
