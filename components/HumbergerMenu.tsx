import { memo, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import { HumbergerMenuProps } from "@/types";

export const HumbergerMenu: React.FC<HumbergerMenuProps> = memo((props) => {
  const { isOpen, setIsOpen, isLogin, currentUser, logout } = props;
  const [menuClass, setMenuClass] = useState<string>("translate-x-0");

  useEffect(() => {
    if (isOpen) {
      setMenuClass("translate-x-0");
      document.body.style.overflow = "hidden";
    } else {
      setMenuClass("translate-x-full");
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      <div
        className={`fixed inset-0 z-10 flex transition-opacity ease-linear duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-75"
          onClick={() => setIsOpen(false)}
        />
        <div
          className={`fixed top-0 right-0 w-1/2 bg-gray-50 p-10 h-screen transform transition-transform ease-linear duration-300 ${menuClass} z-20 flex flex-col items-center`}
        >
          {isLogin ? (
            <>
              <Link href={`/users/${currentUser?.id}`}>
                <div className="mt-20 py-2 px-3 text-gray-50 bg-cyan-600 hover:bg-cyan-700 rounded cursor-pointer">
                  マイページ
                </div>
              </Link>
              <button
                className="mt-10 py-2 px-3 text-cyan-600 hover:bg-cyan-200 rounded cursor-pointer outline outline-cyan-600"
                onClick={logout}
              >
                ログアウト
              </button>
            </>
          ) : (
            <>
              <Link href="/sign-in">
                <div className="mt-20 py-2 px-4 text-cyan-600 hover:bg-cyan-200 rounded cursor-pointer outline outline-cyan-600">
                  ログイン
                </div>
              </Link>
              <Link href="/sign-up">
                <div className="mt-10 py-2 px-4 text-gray-50 bg-cyan-600 hover:bg-cyan-700 rounded cursor-pointer">
                  新規登録
                </div>
              </Link>
            </>
          )}

          <div className="relative h-40 w-40 mt-20">
            <Image
              src="/login.svg"
              alt="login image"
              fill
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>
      </div>
    </>
  );
});

HumbergerMenu.displayName = "HumbergerMenu";
