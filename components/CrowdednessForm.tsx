import { useContext, useState, memo } from "react";
import { CurrentUserContext } from "@/context/CurrentUserContext";
import { createCrowdedness } from "@/lib/crowdedness";

import Cookie from "universal-cookie";

import { CrowdednessFromProps } from "@/types/crowdedness";

import { DAY_OF_WEEK, HOURS, CROWDEDNESS_LEVEL } from "@/constants";

const cookie = new Cookie();

export const CrowdednessForm: React.FC<CrowdednessFromProps> = memo((props) => {
  const { storeId } = props;

  const token: string = cookie.get("access_token");
  const currentUserContext = useContext(CurrentUserContext);
  const { currentUser } = currentUserContext;

  const [dayOfWeek, setDayOfWeek] = useState<string>("");
  const [time, setTime] = useState<string>("");
  const [crowdednessLevel, setCrowdednessLevel] = useState<string>("空いてる");
  const [memo, setMemo] = useState<string>("");

  const hundleChange = (
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

  const hundleCrowdednessClick = (
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
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div className="mt-5 px-10">
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
            onChange={hundleChange}
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
            onChange={hundleChange}
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
              className={`shadow-sm px-4 py-2 text-sm font-medium  border border-gray-200 rounded-l hover:bg-emerald-100 ${
                crowdednessLevel === CROWDEDNESS_LEVEL[0]
                  ? `z-10 bg-emerald-600 text-white hover:bg-emerald-600 hover:text-white`
                  : `text-gray-500 bg-white`
              }`}
              onClick={hundleCrowdednessClick}
              value={CROWDEDNESS_LEVEL[0]}
            >
              {`${CROWDEDNESS_LEVEL[0]}`}
            </button>
            <button
              type="button"
              className={`shadow-sm px-4 py-2 text-sm font-medium border-t border-b border-r border-gray-200 hover:bg-emerald-100 ${
                crowdednessLevel === CROWDEDNESS_LEVEL[1]
                  ? `z-10 bg-emerald-600 text-white hover:bg-emerald-600 hover:text-white`
                  : `text-gray-500 bg-white `
              }`}
              onClick={hundleCrowdednessClick}
              value={CROWDEDNESS_LEVEL[1]}
            >
              {`${CROWDEDNESS_LEVEL[1]}`}
            </button>
            <button
              type="button"
              className={`shadow-sm px-4 py-2 text-sm font-medium border-t border-b border-gray-200 hover:bg-emerald-100 ${
                crowdednessLevel === CROWDEDNESS_LEVEL[2]
                  ? `z-10 bg-emerald-600 text-white hover:bg-emerald-600 hover:text-white`
                  : `text-gray-500 bg-white`
              }`}
              onClick={hundleCrowdednessClick}
              value={CROWDEDNESS_LEVEL[2]}
            >
              {`${CROWDEDNESS_LEVEL[2]}`}
            </button>
            <button
              type="button"
              className={`shadow-sm px-4 py-2 text-sm font-medium border border-gray-200 rounded-e hover:bg-emerald-100 ${
                crowdednessLevel === CROWDEDNESS_LEVEL[3]
                  ? `z-10 bg-emerald-600 text-white hover:bg-emerald-600 hover:text-white`
                  : ` text-gray-500 bg-white`
              }`}
              onClick={hundleCrowdednessClick}
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
            メモ<span className="font-medium text-xs"> - 任意</span>
          </label>
          <textarea
            id="memo"
            className="border-2 border-gray-300 mb-8 py-6 outline-none pl-2 rounded ml-4"
            name="memo"
            value={memo}
            onChange={hundleChange}
            placeholder="３名で訪問しましたが、座れませんでした。１人席なら空いているようでした。"
          />
        </div>
        <div className="flex justify-center">
          <button
            className="mt-10 py-4 px-10 rounded transition mr-4 bg-emerald-700 text-amber-50 hover:bg-emerald-950"
            onClick={(event) => hundleClick(event)}
          >
            混雑度を投稿する
          </button>
        </div>
      </form>
    </div>
  );
});

CrowdednessForm.displayName = "CrowdednessForm";
