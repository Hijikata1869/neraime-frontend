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

import { DAY_OF_WEEK, RESPONSIVE_DAY_OF_WEEK } from "@/constants";

export const CrowdednessTable: React.FC<CrowdednessProps> = memo((props) => {
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
        })
        .catch((err) => {
          setDaylyCrowdednessList(undefined);
          console.error(err);
        });
    }
  }, [storeId, selectedDayOfWeek]);

  const hundleDayOfWeekClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setSelectedDayOfWeek(event.currentTarget.value);
  };

  return (
    <div>
      <div className="hidden mt-5 w-full md:flex justify-between px-10 bg-white pt-5">
        {DAY_OF_WEEK.map((dayOfWeek, index) => (
          <button
            className={`pb-3 font-bold ${
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
      <div className="md:hidden mt-5 w-full flex justify-between px-10 bg-white pt-5">
        {RESPONSIVE_DAY_OF_WEEK.map((dayOfWeek, index) => (
          <button
            className={`pb-3 font-bold ${
              selectedDayOfWeek === dayOfWeek + "曜日"
                ? `border-b-2 border-lime-950 text-gray-700`
                : `text-gray-300`
            }`}
            key={index}
            value={`${dayOfWeek}曜日`}
            onClick={hundleDayOfWeekClick}
          >
            {dayOfWeek}
          </button>
        ))}
      </div>

      <div
        className={`relative overflow-x-auto rounded-md ${
          daylyCrowdednessList ? `border` : ``
        }`}
      >
        {daylyCrowdednessList ? (
          <table className="w-full md:text-sm text-xs md:text-left text-center">
            <thead className="md:text-lg text-xs text-gray-700 uppercase bg-white">
              <tr className=" border-b">
                <th
                  scope="col"
                  className="md:px-6 px-1 md:py-3 py-4 border-r md:pt-10"
                >
                  訪問時間
                </th>
                <th scope="col" className="md:px-6 md:py-3 border-r md:pt-10">
                  空いてる
                </th>
                <th scope="col" className="md:px-6 md:py-3 border-r md:pt-10">
                  普通
                </th>
                <th scope="col" className="md:px-6 md:py-3 border-r md:pt-10">
                  混雑
                </th>
                <th scope="col" className="md:px-6 md:py-3 md:pt-10">
                  空き無し
                </th>
              </tr>
            </thead>
            <tbody>
              {daylyCrowdednessList?.map((crowdedness) => (
                <tr key={crowdedness.time} className="bg-white border-b">
                  <th
                    scope="row"
                    className="md:px-6 md:py-4 py-2 font-normal md:text-lg text-gray-900 whitespace-nowrap border-r-2"
                  >
                    {crowdedness.time}
                  </th>
                  {crowdedness.空いてる === 0 ? (
                    <td className="md:px-6 md:py-4 text-gray-400 border-r-2">
                      <span className="md:text-xl font-bold md:mr-1">{`${crowdedness.空いてる}`}</span>
                      件
                    </td>
                  ) : (
                    <td className="md:px-6 md:py-4 border-r-2">
                      <span className="md:text-xl font-bold md:mr-1">{`${crowdedness.空いてる}`}</span>
                      件
                    </td>
                  )}
                  {crowdedness.普通 === 0 ? (
                    <td className="md:px-6 md:py-4 text-gray-400 border-r-2">
                      <span className="md:text-xl font-bold md:mr-1">{`${crowdedness.普通}`}</span>
                      件
                    </td>
                  ) : (
                    <td className="md:px-6 md:py-4 border-r-2">
                      <span className="md:text-xl font-bold md:mr-1">{`${crowdedness.普通}`}</span>
                      件
                    </td>
                  )}
                  {crowdedness.混雑 === 0 ? (
                    <td className="md:px-6 md:py-4 text-gray-400 border-r-2">
                      <span className="md:text-xl font-bold md:mr-1">{`${crowdedness.混雑}`}</span>
                      件
                    </td>
                  ) : (
                    <td className="md:px-6 md:py-4 border-r-2">
                      <span className="md:text-xl font-bold md:mr-1">{`${crowdedness.混雑}`}</span>
                      件
                    </td>
                  )}
                  {crowdedness.空き無し === 0 ? (
                    <td className="md:px-6 md:py-4 text-gray-400">
                      <span className="md:text-xl font-bold md:mr-1">{`${crowdedness.空き無し}`}</span>
                      件
                    </td>
                  ) : (
                    <td className="md:px-6 md:py-4">
                      <span className="md:text-xl font-bold md:mr-1">{`${crowdedness.空き無し}`}</span>
                      件
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="flex items-center justify-center">
            <p className="font-bold text-gray-700 my-10">
              まだ混雑度情報がありません
            </p>
          </div>
        )}
      </div>
      <div className="flex flex-col mt-2 bg-gray-100 p-5 rounded">
        <p className="font-bold mb-2">混雑度の目安</p>
        <p className="text-sm text-gray-500">
          空いてる：ほとんどの座席が空いてる状況。
        </p>
        <p className="text-sm text-gray-500">
          普通：選ばなければ座席に座れるくらい。
        </p>
        <p className="text-sm text-gray-500">混雑：座れる座席が残りわずか。</p>
        <p className="text-sm text-gray-500">
          空き無し：座席に空きがなく、座れない。
        </p>
      </div>
    </div>
  );
});

CrowdednessTable.displayName = "CrowdednessTable";
