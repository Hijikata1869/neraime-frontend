import { memo } from "react";
import Link from "next/link";
import Image from "next/image";

export const IndexPage: React.FC = memo(() => {
  return (
    <div className="w-full flex flex-col justify-center items-center px-20 pt-20">
      <div className="flex justify-between">
        <div className="flex flex-col justify-center">
          <h2 className="text-gray-900 font-bold text-3xl">
            行きたいお店の混み具合傾向を見て、
          </h2>
          <h2 className="text-gray-900 font-bold text-3xl">
            狙い目の時間を見つけよう
          </h2>
          <div>
            <Link href="search">
              <button className="py-4 px-6 rounded-lg transition mr-4 bg-cyan-600 text-amber-50 hover:bg-cyan-500 mt-10">
                {`混み具合を検索する →`}
              </button>
            </Link>
          </div>
        </div>
        <Image
          src={"/titleImage.svg"}
          alt="title image"
          width={350}
          height={350}
          priority
        />
      </div>
      <div className="flex flex-col mt-20">
        <div className="flex flex-col justify-center items-center">
          <h2 className="text-gray-900 font-bold text-3xl">NERAIMEとは？</h2>
          <p className="text-gray-900 font-semibold mt-5">
            NERAIMEはカフェやサウナなどの混み具合の傾向を投稿、確認できるサービスです。
            <br />
            「混んでいて席に座れなかった」「サウナに入りたがったが待たなければならなかった」を避け、
            <br />
            ”狙い目”の時間を見つけましょう！
          </p>
        </div>
      </div>
    </div>
  );
});

IndexPage.displayName = "IndexPage";
