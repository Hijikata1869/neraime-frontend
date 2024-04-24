import Link from "next/link";

export const IndexPage: React.FC = () => {
  return (
    <div className="flex flex-col justify-center items-center w-4/5 pt-28">
      <h1 className="text-gray-800 font-bold text-9xl pb-8">NERAIME</h1>
      <p className="text-gray-800 w-3/5 pb-14">
        NERAIMEはカフェやサウナなどの混み具合の傾向を投稿、確認できるサービスです。「混んでいて席に座れなかった」「サウナに入りたがったが待たなければならなかった」を避け、”狙い目”の時間を見つけましょう！
      </p>
      <Link href="search">
        <button className="py-4 px-6 rounded transition mr-4 bg-emerald-950 text-amber-50 hover:bg-emerald-700">
          混み具合を検索する →
        </button>
      </Link>
    </div>
  );
};
