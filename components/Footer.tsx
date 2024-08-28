import { memo } from "react";
import Link from "next/link";

export const Footer: React.FC = memo(() => {
  return (
    <footer>
      <div className="p-5 bg-sky-800 text-amber-50 flex justify-between text-sm">
        <Link href="/privacy">プライバシーポリシー</Link>
        <Link href="/contact">お問い合わせ</Link>
      </div>
    </footer>
  );
});

Footer.displayName = "Footer";
