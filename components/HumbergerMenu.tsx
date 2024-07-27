import { memo, useEffect, useState } from "react";
import Link from "next/link";

import { HumbergerMenuProps } from "@/types";

export const HumbergerMenu: React.FC<HumbergerMenuProps> = memo((props) => {
  const { isOpen, setIsOpen } = props;
  const [menuClass, setMenuClass] = useState<string>("translate-x-0");

  useEffect(() => {
    if (isOpen) {
      setMenuClass("translate-x-0");
    } else {
      setMenuClass("translate-x-full");
    }
  }, [isOpen]);

  return (
    <>
      <div
        className={`fixed inset-0 z-10 flex transition-opacity ease-linear duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Overlay for the entire screen */}
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-75"
          onClick={() => setIsOpen(false)}
        />
        {/* Sliding Menu */}
        <div
          className={`fixed top-0 right-0 w-1/2 bg-gray-50 p-10 h-screen transform transition-transform ease-linear duration-300 ${menuClass} z-20`}
        >
          {/* Links inside the sliding menu */}
          <Link href="/sign-in">
            <div className="mt-20 py-2 px-4 text-gray-700 hover:bg-gray-200 rounded cursor-pointer">
              ログイン
            </div>
          </Link>
          <Link href="/sign-up">
            <div className="py-2 px-4 text-gray-700 hover:bg-gray-200 rounded cursor-pointer">
              新規登録
            </div>
          </Link>
        </div>
      </div>
    </>
  );
});

HumbergerMenu.displayName = "HumbergerMenu";
