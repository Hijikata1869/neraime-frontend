import { useEffect, useState, memo } from "react";
import {
  fetchStoreCrowdedness,
  fetchDaylyStoreCrowdedness,
} from "@/lib/crowdedness";

import {
  CrowdednessProps,
  CrowdednessList,
  DaylyCrowdednessList,
} from "@/types/crowdedness";

import { DAY_OF_WEEK } from "@/constants";

export const Crowdedness: React.FC<CrowdednessProps> = memo((props) => {
  const { storeId } = props;
  const [crowdednessList, setCrowdednessList] = useState<
    CrowdednessList | undefined
  >();
  const [selectedDayOfWeek, setSelectedDayOfWeek] = useState<string>("月曜日");
  const [daylyCrowdednessList, setDaylyCrowdednessList] = useState<
    DaylyCrowdednessList | undefined
  >();

  useEffect(() => {
    if (!isNaN(storeId)) {
      fetchStoreCrowdedness(storeId)
        .then(async (data) => {
          const crowdednessList: CrowdednessList =
            await data.store_crowdedness_list;
          setCrowdednessList(crowdednessList);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [storeId, selectedDayOfWeek]);

  useEffect(() => {
    if (!isNaN(storeId)) {
      fetchDaylyStoreCrowdedness(storeId, selectedDayOfWeek)
        .then(async (res) => {
          const daylyCrowdednessList = await res.dayly_store_crowdedness_list;
          setDaylyCrowdednessList(daylyCrowdednessList);
          console.log(daylyCrowdednessList);
        })
        .catch((err) => {
          setDaylyCrowdednessList(undefined);
          console.error(err);
        });
    }
  }, [storeId, selectedDayOfWeek]);

  const hundleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDayOfWeek(event.target.value);
  };

  const hundleDayOfWeekClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setSelectedDayOfWeek(event.currentTarget.value);
  };

  return (
    <div className="mb-20">
      <div className="mt-20 w-full flex justify-between px-6 bg-gray-50 pt-5">
        {DAY_OF_WEEK.map((dayOfWeek, index) => (
          <button
            className={`pb-1 mb-5 font-bold ${
              selectedDayOfWeek === dayOfWeek
                ? `border-b-2 border-lime-950 text-gray-700`
                : `text-gray-300`
            }`}
            key={index}
            value={dayOfWeek}
            onClick={hundleDayOfWeekClick}
          >
            {dayOfWeek}
          </button>
        ))}
      </div>

      <div
        className={`relative overflow-x-auto rounded-md  ${
          daylyCrowdednessList ? `border border-t-0 border-l-0 border-r-0` : ``
        }`}
      >
        {daylyCrowdednessList ? (
          <table className="w-full text-sm text-left">
            <thead className="text-lg text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3">
                  訪問時間
                </th>
                <th scope="col" className="px-6 py-3">
                  空いてる
                </th>
                <th scope="col" className="px-6 py-3">
                  普通
                </th>
                <th scope="col" className="px-6 py-3">
                  混雑
                </th>
                <th scope="col" className="px-6 py-3">
                  空き無し
                </th>
              </tr>
            </thead>
            <tbody>
              {daylyCrowdednessList?.map((crowdedness) => (
                <tr key={crowdedness.time} className="bg-white border-b">
                  <th
                    scope="row"
                    className="px-6 py-4 font-normal text-lg text-gray-900 whitespace-nowrap border-r-2"
                  >
                    {crowdedness.time}
                  </th>
                  {crowdedness.空いてる === 0 ? (
                    <td className="px-6 py-4 text-gray-400 border-r-2">
                      <span className="text-xl font-bold mr-1">{`${crowdedness.空いてる}`}</span>
                      件
                    </td>
                  ) : (
                    <td className="px-6 py-4 border-r-2">
                      <span className="text-xl font-bold mr-1">{`${crowdedness.空いてる}`}</span>
                      件
                    </td>
                  )}
                  {crowdedness.普通 === 0 ? (
                    <td className="px-6 py-4 text-gray-400 border-r-2">
                      <span className="text-xl font-bold mr-1">{`${crowdedness.普通}`}</span>
                      件
                    </td>
                  ) : (
                    <td className="px-6 py-4 border-r-2">
                      <span className="text-xl font-bold mr-1">{`${crowdedness.普通}`}</span>
                      件
                    </td>
                  )}
                  {crowdedness.混雑 === 0 ? (
                    <td className="px-6 py-4 text-gray-400 border-r-2">
                      <span className="text-xl font-bold mr-1">{`${crowdedness.混雑}`}</span>
                      件
                    </td>
                  ) : (
                    <td className="px-6 py-4 border-r-2">
                      <span className="text-xl font-bold mr-1">{`${crowdedness.混雑}`}</span>
                      件
                    </td>
                  )}
                  {crowdedness.空き無し === 0 ? (
                    <td className="px-6 py-4 text-gray-400">
                      <span className="text-xl font-bold mr-1">{`${crowdedness.空き無し}`}</span>
                      件
                    </td>
                  ) : (
                    <td className="px-6 py-4">
                      <span className="text-xl font-bold mr-1">{`${crowdedness.空き無し}`}</span>
                      件
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="flex items-center justify-center">
            <p className="font-bold text-gray-700 mt-10">
              まだ混雑度情報がありません
            </p>
          </div>
        )}
      </div>
    </div>
  );
});

Crowdedness.displayName = "Crowdedness";
