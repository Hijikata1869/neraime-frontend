import { memo } from "react";
import Link from "next/link";
import Image from "next/image";

export const IndexPage: React.FC = memo(() => {
  return (
    <div className="w-full flex flex-col justify-center items-center lg:px-40 md:px-20 px-10 pt-20">
      <div className="flex md:justify-between">
        <div className="flex flex-col md:justify-center items-center md:items-start">
          <h2 className="text-gray-900 font-bold lg:text-3xl md:text-xl">
            行きたいお店の混み具合傾向を見て、
          </h2>
          <h2 className="text-gray-900 font-bold lg:text-3xl md:text-xl">
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
          className="hidden md:block"
        />
      </div>
      <div className="flex flex-col mt-20">
        <div className="flex flex-col justify-center items-center">
          <h2 className="text-gray-900 font-bold lg:text-3xl md:text-xl">
            NERAIMEとは？
          </h2>
          <p className="text-gray-900 font-semibold mt-5 lg:text-base md:text-sm hidden md:block">
            NERAIMEはカフェやサウナなどの混み具合の傾向を投稿、確認できるサービスです。
            <br />
            「混んでいて席に座れなかった」「サウナに入りたがったが待たなければならなかった」を避け、
            <br />
            ”狙い目”の時間を見つけましょう！
          </p>
          <p className="text-gray-900 font-semibold mt-5 text-xs md:hidden">
            NERAIMEはカフェやサウナなどの混み具合の傾向を投稿、確認できるサービスです。
            <br />
            「混んでいて席に座れなかった」「サウナに入りたがったが待たなければならなかった」を避け、
            ”狙い目”の時間を見つけましょう！
          </p>
        </div>
      </div>
      <div className="flex md:flex-row flex-col md:justify-between md:items-baseline md:space-x-10 mt-10">
        <div className="flex flex-col md:w-1/3 mb-10 md:mb-0">
          <Image
            src={"/search.svg"}
            alt="title image"
            width={300}
            height={300}
            priority
          />
          <h3 className="text-lg font-bold text-gray-900 mt-4">
            店舗検索・混雑度閲覧機能
          </h3>
          <p className="text-sm text-gray-900 font-semibold mt-2">
            行きたいお店を検索して、混み具合傾向を見ることができます。
          </p>
        </div>
        <div className="flex flex-col md:w-1/3 mb-10 md:mb-0">
          <Image
            src={"/post.svg"}
            alt="title image"
            width={300}
            height={300}
            priority
          />
          <h3 className="text-lg font-bold text-gray-900 mt-4">
            混雑度投稿機能
          </h3>
          <p className="text-sm text-gray-900 font-semibold mt-2">
            自分が行ったお店の混み具合を投稿して、共有しましょう。
          </p>
        </div>
        <div className="flex flex-col md:w-1/3">
          <Image
            src={"/bookmark.svg"}
            alt="title image"
            width={300}
            height={300}
            priority
          />
          <h3 className="text-lg font-bold text-gray-900 mt-4">
            店舗お気に入り機能
          </h3>
          <p className="text-sm text-gray-900 font-semibold mt-2">
            よく行くお店はお気に入り登録すると、マイページからすぐにアクセスできます。
          </p>
        </div>
      </div>
    </div>
  );
});

IndexPage.displayName = "IndexPage";
