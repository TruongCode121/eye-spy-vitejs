import React from "react";

const FieldLeftProductPage = ({ children }) => {
  return (
    <div className="min-w-[300px] max-w-1/5 ">
      <div className="border-2 dark:border-slate-800  dark:bg-slate-700 rounded p-3 sticky top-[103px] scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-transparent overflow-y-auto overflow-x-hidden h-[87vh]">
        {children}
      </div>
    </div>
  );
};

export default FieldLeftProductPage;
