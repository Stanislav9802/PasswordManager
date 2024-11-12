import React, { useState } from 'react';

interface TabPasswordProps {
  label: string;
  content: React.ReactNode;
}

const TabsPassword: React.FC<{ tabs: TabPasswordProps[] }> = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="flex flex-col w-full mt-3">
      <h2 className="te text-xl text-center ">Сохранение пароля</h2>
      <div className="flex mt-3 border border-gray-500 rounded-xl shadow-md overflow-hidden">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`py-2 px-4 font-medium flex items-center justify-center flex-1  ${
              index === activeTab ? 'bg-gray-500' : 'bg-gray-600'
            }`}
            onClick={() => setActiveTab(index)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className=" mt-3 h-52 rounded-md ">{tabs[activeTab].content}</div>
    </div>
  );
};

export default TabsPassword;
