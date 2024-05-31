import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { fetchStore } from "@/lib/stores";
import { StoreData } from "@/types/store";

import { DAY_OF_WEEK } from "@/constants";
import { HOURS } from "@/constants";
import { NUMBER_OF_PEOPLE } from "@/constants";
import { CROWDEDNESS_LEVEL } from "@/constants";

export const Store: React.FC = () => {
  const router = useRouter();
  const storeId = parseInt(router.query.id as string);
  const [store, setStore] = useState<StoreData>();
  const [dayOfWeek, setDayOfWeek] = useState<string>("");
  const [time, setTime] = useState<string>("");
  const [numberOfpeople, setNumberOfPeople] = useState<string>("");
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

  const hundleDayOfWeekChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setDayOfWeek(event.target.value);
  };

  const hundleTimeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setTime(event.target.value);
  };

  const hundleNumberChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setNumberOfPeople(event.target.value);
  };

  const hundleLevelChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCrowdednessLevel(event.target.value);
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
            <p className="text-xs text-red-800">必須</p>
            <div className="flex mb-5">
              <p className="font-bold">訪問した曜日</p>
              <select
                className="border border-gray-900 rounded ml-4"
                value={dayOfWeek}
                onChange={hundleDayOfWeekChange}
              >
                <option value="">選択してください</option>
                {DAY_OF_WEEK.map((dayOfWeek, index) => (
                  <option key={index} value={dayOfWeek}>
                    {dayOfWeek}
                  </option>
                ))}
              </select>
            </div>
            <p className="text-xs text-red-800">必須</p>
            <div className="flex mb-5">
              <p className="font-bold">訪問した時間</p>
              <select
                className="border border-gray-900 rounded ml-4"
                value={time}
                onChange={hundleTimeChange}
              >
                <option value="">選択してください</option>
                {HOURS.map((hour, index) => (
                  <option key={index} value={hour}>
                    {hour}
                  </option>
                ))}
              </select>
            </div>
            <p className="text-xs text-red-800">必須</p>
            <div className="flex mb-5">
              <p className="font-bold">訪問した時の人数</p>
              <select
                className="border border-gray-900 rounded ml-4"
                value={numberOfpeople}
                onChange={hundleNumberChange}
              >
                <option value="">選択してください</option>
                {NUMBER_OF_PEOPLE.map((number, index) => (
                  <option key={index} value={number}>
                    {number}
                  </option>
                ))}
              </select>
            </div>
            <p className="text-xs text-red-800">必須</p>
            <div className="flex">
              <p className="font-bold">混雑度</p>
              <select
                className="border border-gray-900 rounded ml-4"
                value={crowdednessLevel}
                onChange={hundleLevelChange}
              >
                <option value="">選択してください</option>
                {CROWDEDNESS_LEVEL.map((level, index) => (
                  <option key={index} value={level}>
                    {level}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col justify-center">
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
          </form>
        </div>
      </div>
    </div>
  );
};
