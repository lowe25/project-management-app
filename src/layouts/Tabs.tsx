"use client";

import { useState, ReactNode } from "react";

interface Tab {
  label: string;
  content: ReactNode;
}

interface TabsProps {
  tabs: Tab[];
}

export default function Tabs({ tabs }: TabsProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="w-full">
      {/* tab headers */}
      <div className="flex border-b">
        {tabs.map((tab, idx) => {
          const isActive = idx === activeIndex;
          return (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`cursor-pointer py-2 px-4 -mb-px border-b-2 transition-colors duration-150 focus:outline-none 
                ${
                  isActive
                    ? "border-blue-500 text-blue-600 font-medium"
                    : "border-transparent text-white"
                }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
      {/* tab content */}
      <div className="p-4">
        {tabs[activeIndex] && tabs[activeIndex].content}
      </div>
    </div>
  );
}
