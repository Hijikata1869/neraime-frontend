import { memo } from "react";
import Link from "next/link";
import { bebasNeue } from "@/utiles/font";

export const Footer: React.FC = memo(() => {
  return (
    <footer>
      <div className="p-4 bg-sky-700 text-amber-50 flex justify-center items-center space-x-10 text-sm font-bold">
        <Link href="/privacy">プライバシーポリシー</Link>
        <Link href="/contact">お問い合わせ</Link>
        <Link href="/about">NERAIMEについて</Link>
      </div>
      <div
        className={`${bebasNeue.className} p-2 bg-sky-800 text-amber-50 flex justify-center items-center text-xl`}
      >
        © NERAIME
      </div>
    </footer>
  );
});

Footer.displayName = "Footer";
