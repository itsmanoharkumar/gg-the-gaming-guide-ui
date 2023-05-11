import React, { FunctionComponent } from "react";

export interface OwnProps {
  tabList: { label: string; id: number }[];
  selectedTab: number;
  onClick: (id: number) => void;
}

type Props = OwnProps;

const SoftTab: FunctionComponent<Props> = ({
  tabList,
  selectedTab,
  onClick,
}) => {
  return (
    <div
      className={
        "flex overflow-y-auto rounded bg-gray-100 shadow p-2 items-center h-[64px]"
      }
    >
      {tabList?.map((item) => {
        return (
          <div
            key={item.id}
            className={
              "mx-3 cursor-pointer whitespace-nowrap text-sm sm:text-xl transition-all duration-100 ease-in-out" +
              (selectedTab === item.id ? " font-bold text-3xl" : "")
            }
            onClick={() => onClick(item.id)}
          >
            {item.label}
          </div>
        );
      })}
    </div>
  );
};

export default SoftTab;
