import { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";

import Cookie from "universal-cookie";

import { fetchStore } from "@/lib/stores";
import { StoreData } from "@/types/store";

import { DAY_OF_WEEK } from "@/constants";
import { HOURS } from "@/constants";
import { CROWDEDNESS_LEVEL } from "@/constants";
import { CurrentUserContext } from "@/context/CurrentUserContext";

import { createCrowdedness } from "@/lib/crowdedness";

import { Crowdedness } from "./Crowdedness";

const cookie = new Cookie();

export const Store: React.FC = () => {
  const router = useRouter();
  const storeId = parseInt(router.query.id as string);
  const currentUserContext = useContext(CurrentUserContext);
  const { currentUser } = currentUserContext;
  const token: string = cookie.get("access_token");

  const [store, setStore] = useState<StoreData>();
  const [dayOfWeek, setDayOfWeek] = useState<string>("");
  const [time, setTime] = useState<string>("");
  const [crowdednessLevel, setCrowdednessLevel] = useState<string>("");
  const [memo, setMemo] = useState<string>("");

  useEffect(() => {
    if (!isNaN(storeId)) {
      fetchStore(storeId)
        .then((data) => {
          const storeData = data.store;
          return storeData;
        })
        .then((data) => {
          setStore(data);
        })
        .catch((err) => {
          console.error(err);
        });
    }
    // eslint-disable-next-line
  }, [router.query.id]);

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
      case "crowdednessLevel":
        setCrowdednessLevel(event.target.value);
        break;
      case "memo":
        setMemo(event.target.value);
    }
  };

  const hundleClick = (event: React.MouseEvent) => {
    event.preventDefault();
    const createCrowdednessArg = {
      token: token,
      userId: currentUser?.id,
      storeId: store?.id,
      dayOfWeek: dayOfWeek,
      time: time,
      level: crowdednessLevel,
      memo: memo,
    };

    createCrowdedness(createCrowdednessArg)
      .then(() => {
        setDayOfWeek("");
        setTime("");
        setCrowdednessLevel("");
        setMemo("");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div className="w-full px-40">
      <div className="flex flex-col bg-white rounded-lg p-20">
        <div>
          <h2 className="font-bold text-4xl mb-3">{store?.name}</h2>
          <p className="text-gray-400 ">{store?.address}</p>
        </div>
        <div className="mt-10 px-10">
          <h2 className="font-bold text-3xl">混雑度を投稿する</h2>
          <form className="mt-5 px-10">
            <div className="flex flex-col mb-10">
              <label className="font-bold mb-2" htmlFor="dayOfWeek">
                訪問した曜日
              </label>
              <select
                id="dayOfWeek"
                name="dayOfWeek"
                className="w-1/2 border border-gray-900 rounded ml-4"
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
                訪問した曜日
              </label>
              <select
                id="hours"
                name="hours"
                className="w-1/2 border border-gray-900 rounded ml-4"
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
                訪問した曜日
              </label>
              <select
                id="crowdednessLevel"
                name="crowdednessLevel"
                className="w-1/2 border border-gray-900 rounded ml-4"
                value={crowdednessLevel}
                onChange={hundleChange}
              >
                <option value="">選択してください</option>
                {CROWDEDNESS_LEVEL.map((level, index) => (
                  <option key={index} value={level}>
                    {level}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col justify-center mt-1 mb-10">
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
                空きなし：座席に空きがなく、座れない。
              </p>
            </div>
            <div className="flex flex-col">
              <label htmlFor="memo" className="font-bold mb-2">
                メモ
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
                className="mt-10 py-2 px-10 rounded transition mr-4 bg-emerald-700 text-amber-50 hover:bg-emerald-950"
                onClick={(event) => hundleClick(event)}
              >
                投稿する
              </button>
            </div>
          </form>
        </div>
      </div>
      <Crowdedness />
    </div>
  );
};
