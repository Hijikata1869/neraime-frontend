import { memo } from "react";
import Image from "next/image";

export const SuccessAlert: React.FC = memo(() => {
  return (
    <div className="flex justify-between bg-emerald-200 p-4 min-w-96 rounded-lg">
      <div className="flex">
        <Image
          src="/info.svg"
          width={20}
          height={20}
          alt="info icon for alert"
          className="mr-2"
        />
        <p className="text-emerald-900 text-sm">ログインしました</p>
      </div>
      <div>
        <Image
          src="/x-mark.svg"
          width={20}
          height={20}
          alt="x-mark icon for alret"
          className="cursor-pointer"
          onClick={() => alert("Clicked!")}
        />
      </div>
    </div>
  );
});

SuccessAlert.displayName = "SuccessAlert";
