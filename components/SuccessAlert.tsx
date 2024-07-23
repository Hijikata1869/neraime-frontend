import { memo, useContext } from "react";
import Image from "next/image";

import NotificationContext from "@/context/notificationContext";

export const SuccessAlert: React.FC = memo(() => {
  const notificationCtx = useContext(NotificationContext);

  return (
    notificationCtx.notification === "success" && (
      <div className="flex justify-between bg-emerald-200 p-4 min-w-96 rounded-lg mb-10 mt-10">
        <div className="flex">
          <Image
            src="/info.svg"
            width={20}
            height={20}
            alt="info icon for alert"
            className="mr-2"
          />
          <p className="text-emerald-900 text-sm">
            {notificationCtx.notificationText}
          </p>
        </div>
        <div>
          <Image
            src="/x-mark.svg"
            width={20}
            height={20}
            alt="x-mark icon for alret"
            className="cursor-pointer"
            onClick={() => notificationCtx.clear()}
          />
        </div>
      </div>
    )
  );
});

SuccessAlert.displayName = "SuccessAlert";
