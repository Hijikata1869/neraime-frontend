import { useEffect, useState, memo } from "react";
import { fetchStoreCrowdedness } from "@/lib/crowdedness";

import { CrowdednessProps, CrowdednessList } from "@/types/crowdedness";

import { DAY_OF_WEEK, HOURS } from "@/constants";

export const Crowdedness: React.FC<CrowdednessProps> = memo((props) => {
  const { storeId } = props;
  const [crowdednessList, setCrowdednessList] = useState<
    CrowdednessList | undefined
  >();
  const [selectedDayOfWeek, setSelectedDayOfWeek] = useState<string>("月曜日");
  const [daylyCrowdednessList, setDaylyCrowdednessList] = useState<
    CrowdednessList | undefined
  >();

  useEffect(() => {
    if (!isNaN(storeId)) {
      fetchStoreCrowdedness(storeId)
        .then(async (data) => {
          const crowdednessList: CrowdednessList =
            await data.store_crowdedness_list;
          setCrowdednessList(crowdednessList);
          return crowdednessList;
        })
        .then((data) => {
          const result = data?.filter(
            (item) => item.day_of_week === selectedDayOfWeek
          );
          return result;
        })
        .then((data) => {
          setDaylyCrowdednessList(data);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [storeId, selectedDayOfWeek]);

  const hundleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDayOfWeek(event.target.value);
  };

  const hourlyCrowdednessList = (hour: string) => {
    const result = daylyCrowdednessList?.filter((item) => item.time === hour);
    return result;
  };

  console.log(daylyCrowdednessList);

  return (
    <div className="mb-20">
      <select
        className="mt-10"
        name="dayOfWeek"
        id="dayOfWeek"
        value={selectedDayOfWeek}
        onChange={hundleChange}
      >
        {DAY_OF_WEEK.map((dayOfWeek, index) => (
          <option key={index} value={dayOfWeek}>
            {dayOfWeek}
          </option>
        ))}
      </select>

      <div className="mt-10 relative overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
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
                空きなし
              </th>
            </tr>
          </thead>
          <tbody>
            {HOURS.map((hour, index) => (
              <tr key={index} className="bg-white border-b">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                >
                  {hour}
                </th>
                <td className="px-6 py-4"></td>
                <td className="px-6 py-4"></td>
                <td className="px-6 py-4"></td>
                <td className="px-6 py-4"></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
});

Crowdedness.displayName = "Crowdedness";
