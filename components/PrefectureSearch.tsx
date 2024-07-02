import { memo } from "react";
import { useRouter } from "next/router";

export const PrefectureSearch: React.FC = memo(() => {
  const router = useRouter();

  const areaStyle = "font-bold text-lg text-gray-900";

  const prefectureButtonStyle = "underline text-gray-700 mr-5";

  const hundleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    router.push(`search-result?prefecture=${event.currentTarget.innerText}`);
  };

  return (
    <div className="w-full px-40 flex flex-col mt-10 mb-20">
      <h2 className="font-bold text-gray-900 text-2xl">都道府県検索</h2>
      <div className="flex flex-col mt-5">
        <div>
          <p className={areaStyle}>北海道・東北地方</p>
        </div>
        <div className="mt-2">
          <button className={prefectureButtonStyle} onClick={hundleClick}>
            北海道
          </button>
          <button className={prefectureButtonStyle} onClick={hundleClick}>
            青森県
          </button>
          <button className={prefectureButtonStyle} onClick={hundleClick}>
            秋田県
          </button>
          <button className={prefectureButtonStyle} onClick={hundleClick}>
            岩手県
          </button>
          <button className={prefectureButtonStyle} onClick={hundleClick}>
            宮城県
          </button>
          <button className={prefectureButtonStyle} onClick={hundleClick}>
            山形県
          </button>
          <button className={prefectureButtonStyle} onClick={hundleClick}>
            福島県
          </button>
        </div>
      </div>
      <div className="flex flex-col mt-5">
        <div>
          <p className={areaStyle}>関東地方</p>
        </div>
        <div className="mt-2">
          <button className={prefectureButtonStyle} onClick={hundleClick}>
            栃木県
          </button>
          <button className={prefectureButtonStyle} onClick={hundleClick}>
            茨城県
          </button>
          <button className={prefectureButtonStyle} onClick={hundleClick}>
            群馬県
          </button>
          <button className={prefectureButtonStyle} onClick={hundleClick}>
            埼玉県
          </button>
          <button className={prefectureButtonStyle} onClick={hundleClick}>
            東京都
          </button>
          <button className={prefectureButtonStyle} onClick={hundleClick}>
            千葉県
          </button>
          <button className={prefectureButtonStyle} onClick={hundleClick}>
            神奈川県
          </button>
        </div>
      </div>
      <div className="flex flex-col mt-5">
        <div>
          <p className={areaStyle}>中部地方</p>
        </div>
        <div className="mt-2">
          <button className={prefectureButtonStyle} onClick={hundleClick}>
            新潟県
          </button>
          <button className={prefectureButtonStyle} onClick={hundleClick}>
            富山県
          </button>
          <button className={prefectureButtonStyle} onClick={hundleClick}>
            石川県
          </button>
          <button className={prefectureButtonStyle} onClick={hundleClick}>
            福井県
          </button>
          <button className={prefectureButtonStyle} onClick={hundleClick}>
            山梨県
          </button>
          <button className={prefectureButtonStyle} onClick={hundleClick}>
            長野県
          </button>
          <button className={prefectureButtonStyle} onClick={hundleClick}>
            岐阜県
          </button>
          <button className={prefectureButtonStyle} onClick={hundleClick}>
            静岡県
          </button>
          <button className={prefectureButtonStyle} onClick={hundleClick}>
            愛知県
          </button>
        </div>
      </div>
      <div className="flex flex-col mt-5">
        <div>
          <p className={areaStyle}>関西地方</p>
        </div>
        <div className="mt-2">
          <button className={prefectureButtonStyle} onClick={hundleClick}>
            三重県
          </button>
          <button className={prefectureButtonStyle} onClick={hundleClick}>
            滋賀県
          </button>
          <button className={prefectureButtonStyle} onClick={hundleClick}>
            京都府
          </button>
          <button className={prefectureButtonStyle} onClick={hundleClick}>
            大阪府
          </button>
          <button className={prefectureButtonStyle} onClick={hundleClick}>
            兵庫県
          </button>
          <button className={prefectureButtonStyle} onClick={hundleClick}>
            奈良県
          </button>
          <button className={prefectureButtonStyle} onClick={hundleClick}>
            和歌山県
          </button>
        </div>
      </div>
      <div className="flex flex-col mt-5">
        <div>
          <p className={areaStyle}>中国地方</p>
        </div>
        <div className="mt-2">
          <button className={prefectureButtonStyle} onClick={hundleClick}>
            鳥取県
          </button>
          <button className={prefectureButtonStyle} onClick={hundleClick}>
            島根県
          </button>
          <button className={prefectureButtonStyle} onClick={hundleClick}>
            岡山県
          </button>
          <button className={prefectureButtonStyle} onClick={hundleClick}>
            広島県
          </button>
          <button className={prefectureButtonStyle} onClick={hundleClick}>
            山口県
          </button>
        </div>
      </div>
      <div className="flex flex-col mt-5">
        <div>
          <p className={areaStyle}>四国地方</p>
        </div>
        <div className="mt-2">
          <button className={prefectureButtonStyle} onClick={hundleClick}>
            徳島県
          </button>
          <button className={prefectureButtonStyle} onClick={hundleClick}>
            香川県
          </button>
          <button className={prefectureButtonStyle} onClick={hundleClick}>
            愛媛県
          </button>
          <button className={prefectureButtonStyle} onClick={hundleClick}>
            高知県
          </button>
        </div>
      </div>
      <div className="flex flex-col mt-5">
        <div>
          <p className={areaStyle}>九州・沖縄地方</p>
        </div>
        <div className="mt-2">
          <button className={prefectureButtonStyle} onClick={hundleClick}>
            福岡県
          </button>
          <button className={prefectureButtonStyle} onClick={hundleClick}>
            佐賀県
          </button>
          <button className={prefectureButtonStyle} onClick={hundleClick}>
            長崎県
          </button>
          <button className={prefectureButtonStyle} onClick={hundleClick}>
            熊本県
          </button>
          <button className={prefectureButtonStyle} onClick={hundleClick}>
            大分県
          </button>
          <button className={prefectureButtonStyle} onClick={hundleClick}>
            宮崎県
          </button>
          <button className={prefectureButtonStyle} onClick={hundleClick}>
            鹿児島県
          </button>
          <button className={prefectureButtonStyle} onClick={hundleClick}>
            沖縄県
          </button>
        </div>
      </div>
    </div>
  );
});

PrefectureSearch.displayName = "PrefectureSearch";
