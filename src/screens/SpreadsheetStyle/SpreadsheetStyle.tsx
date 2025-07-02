import React from "react";
import { DataRowSection } from "./sections/DataRowSection";
import { DataTableSection } from "./sections/DataTableSection/DataTableSection";
import { HeaderSection } from "./sections/HeaderSection";
import { NavigationBarSection } from "./sections/NavigationBarSection";
import { Toaster } from "../../components/ui/toaster";

export const SpreadsheetStyle = (): JSX.Element => {
  return (
    <div className="flex w-full min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
      <div className="flex flex-col w-full items-start bg-white shadow-xl rounded-none lg:rounded-lg lg:m-4 overflow-hidden">
        <NavigationBarSection />
        <DataRowSection />
        <DataTableSection />
        <HeaderSection />
      </div>
      <Toaster />
    </div>
  );
};