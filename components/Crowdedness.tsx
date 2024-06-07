import { useEffect, useState } from "react";
import { fetchStoreCrowdedness } from "@/lib/crowdedness";

import { CrowdednessProps, CrowdednessList } from "@/types/crowdedness";

export const Crowdedness: React.FC<CrowdednessProps> = (props) => {
  const { storeId } = props;
  const [crowdednessList, setCrowdednessList] = useState<
    CrowdednessList | undefined
  >();

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

  return (
    <>
      {crowdednessList?.map((crowdedness) => (
        <div key={crowdedness.id}>
          <p>{crowdedness.day_of_week}</p>
          <p>{crowdedness.time}</p>
          <p>{crowdedness.level}</p>
          <p>{crowdedness.memo}</p>
          <p>----------------------------------------</p>
        </div>
      ))}
    </>
  );
};
