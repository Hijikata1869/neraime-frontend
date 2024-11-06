import { useContext, useState, memo } from "react";
import { useRouter } from "next/router";
import { CurrentUserContext } from "@/context/CurrentUserContext";
import { createCrowdedness } from "@/lib/crowdedness";
import { guestUserLogin } from "@/lib/users";
import NotificationContext from "@/context/notificationContext";

import Cookie from "universal-cookie";

import { CrowdednessFormProps } from "@/types/crowdedness";

import { DAY_OF_WEEK, HOURS, CROWDEDNESS_LEVEL } from "@/constants";

const cookie = new Cookie();

export const CrowdednessForm: React.FC<CrowdednessFormProps> = memo((props) => {
  const { storeId } = props;

  const token: string = cookie.get("access_token");
  const currentUserContext = useContext(CurrentUserContext);
  const notificationCtx = useContext(NotificationContext);
  const { currentUser, isLogin } = currentUserContext;

  const router = useRouter();

  const [dayOfWeek, setDayOfWeek] = useState<string>("");
  const [time, setTime] = useState<string>("");
  const [crowdednessLevel, setCrowdednessLevel] = useState<string>("空いてる");
  const [memo, setMemo] = useState<string>("");

  const handleChange = (
    event: React.ChangeEvent<HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    switch (event.target.name) {
      case "dayOfWeek":
        setDayOfWeek(event.target.value);
        break;
      case "hours":
        setTime(event.target.value);
        break;
      case "memo":
        setMemo(event.target.value);
    }
  };

  const handleCrowdednessClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    setCrowdednessLevel(event.currentTarget.value);
  };

  const hundleClick = (event: React.MouseEvent) => {
    event.preventDefault();
    const createCrowdednessArg = {
      token: token,
      userId: currentUser?.id,
      storeId: storeId,
      dayOfWeek: dayOfWeek,
      time: time,
      level: crowdednessLevel,
      memo: memo,
    };
    createCrowdedness(createCrowdednessArg)
      .then(() => {
        setDayOfWeek("");
        setTime("");
        setCrowdednessLevel("空いてる");
        setMemo("");
        notificationCtx.success("投稿しました");
      })
      .catch(() => {
        notificationCtx.error("混雑度が投稿できませんでした");
      });
  };

  const hundleLoginButton = (event: React.MouseEvent) => {
    event.preventDefault();
    localStorage.setItem("redirectAfterLogin", router.asPath);
    router.push("/sign-in");
  };

  const hundleGuestLogin = (event: React.MouseEvent) => {
    event.preventDefault();
    guestUserLogin()
      .then((data) => {
        const options = {
          path: "/",
          expires: new Date(Date.now() + 24 * 3600 * 1000),
        };
        cookie.set("access_token", data.token, options);
        router.push("/");
        notificationCtx.success("ゲストログインしました");
      })
      .catch(() => {
        notificationCtx.error("ゲストログインできませんでした");
      });
  };

  return (
    <div className="mt-5 md:px-10">
      {isLogin ? (
        <form className="mt-5 px-10">
          <div className="flex flex-col mb-10">
            <label className="font-bold mb-2" htmlFor="dayOfWeek">
              訪問した曜日
            </label>
            <select
              id="dayOfWeek"
              name="dayOfWeek"
              className="max-w-xs border border-gray-900 rounded ml-4"
              value={dayOfWeek}
              onChange={handleChange}
            >
              <option value="">選択してください</option>
              {DAY_OF_WEEK.map((dayOfWeek, index) => (
                <option key={index} value={dayOfWeek}>
                  {dayOfWeek}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col mb-10">
            <label className="font-bold mb-2" htmlFor="hours">
              訪問した時間
            </label>
            <select
              id="hours"
              name="hours"
              className="max-w-xs border border-gray-900 rounded ml-4"
              value={time}
              onChange={handleChange}
            >
              <option value="">選択してください</option>
              {HOURS.map((hour, index) => (
                <option key={index} value={hour}>
                  {hour}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col">
            <label className="font-bold mb-2" htmlFor="crowdednessLevel">
              混雑度
            </label>
            <div className="inline-flex rounded mb-2 ml-4">
              <button
                type="button"
                className={`shadow-sm md:px-4 px-2 py-2 text-sm font-medium  border border-gray-200 rounded-l ${
                  crowdednessLevel === CROWDEDNESS_LEVEL[0]
                    ? `z-10 bg-cyan-600 text-white hover:text-white`
                    : `text-gray-500 bg-white hover:text-gray-500 hover:bg-cyan-100`
                }`}
                onClick={handleCrowdednessClick}
                value={CROWDEDNESS_LEVEL[0]}
              >
                {`${CROWDEDNESS_LEVEL[0]}`}
              </button>
              <button
                type="button"
                className={`shadow-sm md:px-4 px-2 py-2 text-sm font-medium border-t border-b border-r border-gray-200 ${
                  crowdednessLevel === CROWDEDNESS_LEVEL[1]
                    ? `z-10 bg-cyan-600 text-white hover:text-white`
                    : `text-gray-500 bg-white hover:text-gray-500 hover:bg-cyan-100 `
                }`}
                onClick={handleCrowdednessClick}
                value={CROWDEDNESS_LEVEL[1]}
              >
                {`${CROWDEDNESS_LEVEL[1]}`}
              </button>
              <button
                type="button"
                className={`shadow-sm md:px-4 py-2 px-2 text-sm font-medium border-t border-b border-gray-200  ${
                  crowdednessLevel === CROWDEDNESS_LEVEL[2]
                    ? `z-10 bg-cyan-600 text-white hover:text-white`
                    : `text-gray-500 bg-white hover:text-gray-500 hover:bg-cyan-100`
                }`}
                onClick={handleCrowdednessClick}
                value={CROWDEDNESS_LEVEL[2]}
              >
                {`${CROWDEDNESS_LEVEL[2]}`}
              </button>
              <button
                type="button"
                className={`shadow-sm md:px-4 py-2 px-2 text-sm font-medium border border-gray-200 rounded-e ${
                  crowdednessLevel === CROWDEDNESS_LEVEL[3]
                    ? `z-10 bg-cyan-600 text-white`
                    : ` text-gray-500 bg-white hover:text-gray-500 hover:bg-cyan-100`
                }`}
                onClick={handleCrowdednessClick}
                value={CROWDEDNESS_LEVEL[3]}
              >
                {`${CROWDEDNESS_LEVEL[3]}`}
              </button>
            </div>
          </div>
          <div className="flex flex-col justify-center mt-1 mb-10 ml-4">
            <p className="text-xs text-gray-500">
              空いてる：ほとんどの座席が空いてる状況。
            </p>
            <p className="text-xs text-gray-500">
              普通：選ばなければ座席に座れるくらい。
            </p>
            <p className="text-xs text-gray-500">
              混雑：座れる座席が残りわずか。
            </p>
            <p className="text-xs text-gray-500">
              空き無し：座席に空きがなく、座れない。
            </p>
          </div>
          <div className="flex flex-col">
            <label htmlFor="memo" className="font-bold mb-2">
              メモ・口コミ<span className="font-medium text-xs"> - 任意</span>
            </label>
            <textarea
              id="memo"
              className="border-2 border-gray-300 mb-8 py-6 outline-none px-2 rounded ml-4"
              name="memo"
              value={memo}
              onChange={handleChange}
              placeholder="訪問時の状況に関するメモや、口コミを書いて他のユーザーに教えてあげましょう！"
            />
          </div>
          <div className="flex justify-center mb-10 md:mb-0 ">
            <button
              className="mt-10 py-4 px-10 rounded transition md:mr-4 bg-cyan-700 text-white hover:bg-cyan-900"
              onClick={(event) => hundleClick(event)}
            >
              混雑度を投稿する
            </button>
          </div>
        </form>
      ) : (
        <div className="flex flex-col justify-center items-center">
          <p className="font-bold text-gray-700 mt-5">
            混雑度はログインすると投稿できます
          </p>
          <button
            className="py-4 px-6 mt-10 rounded transition mr-4 bg-cyan-600 text-white hover:bg-cyan-700 md:mb-0 mb-10"
            onClick={hundleLoginButton}
          >
            ログイン・新規登録はこちら
          </button>
          <button
            className="text-sm bg-gray-400 text-gray-100 font-bold py-4 px-6 mt-10 rounded border border-gray-400 transition mr-4 hover:bg-white hover:text-gray-800 hover:border-gray-400 md:mb-0 mb-10"
            onClick={hundleGuestLogin}
          >
            ゲストログインして使ってみる
          </button>
        </div>
      )}
    </div>
  );
});

CrowdednessForm.displayName = "CrowdednessForm";
