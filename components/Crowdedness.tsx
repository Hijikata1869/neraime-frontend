import { useEffect, useState, memo } from "react";
import { fetchStoreCrowdedness } from "@/lib/crowdedness";

import { CrowdednessProps, CrowdednessList } from "@/types/crowdedness";

import { DAY_OF_WEEK } from "@/constants";

export const Crowdedness: React.FC<CrowdednessProps> = memo((props) => {
  console.log("Crowdednessレンダリング");
  const { storeId } = props;
  const [crowdednessList, setCrowdednessList] = useState<
    CrowdednessList | undefined
  >();
  const [selectedDayOfWeek, setSelectedDayOfWeek] = useState<string>("月曜日");

  useEffect(() => {
    if (!isNaN(storeId)) {
      fetchStoreCrowdedness(storeId)
        .then((data) => {
          const crowdednessList = data.store_crowdedness_list;
          return crowdednessList;
        })
        .then((data) => {
          setCrowdednessList(data);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [storeId]);

  const hundleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDayOfWeek(event.target.value);
  };

  const filteredCrowdednessList = (dayOfWeek: string) => {
    const result = crowdednessList?.filter(
      (item) => item.day_of_week === dayOfWeek
    );
    return result;
  };

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
      <div className="mt-10">
        {filteredCrowdednessList(selectedDayOfWeek)?.map((crowdedness) => (
          <div key={crowdedness.id}>
            <p>{crowdedness.day_of_week}</p>
            <p>{crowdedness.time}</p>
            <p>{crowdedness.level}</p>
            <p>{crowdedness.memo}</p>
            <p>----------------------------------------</p>
          </div>
        ))}
      </div>
    </div>
  );
});

Crowdedness.displayName = "Crowdedness";
