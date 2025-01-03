import { Header } from "@/shared/components";
import { type ReactNode } from "react";

type T_CustomLayout = {
  isHeader: boolean;
  children: ReactNode;
};

function CustomLayout({ isHeader, children }: T_CustomLayout) {
  return (
    <div className="relative w-screen bg-gradient-to-r from-[#D3CCE3] to-[#E9E4F0] overflow-x-hidden">
      {isHeader && <Header />}
      <div
        className={` w-full min-h-screen ${
          !isHeader ? "flex justify-center items-center pt-0" : "pt-28"
        }`}
      >
        <div className="px-32 py-4">{children}</div>
      </div>
    </div>
  );
}

export { CustomLayout };
