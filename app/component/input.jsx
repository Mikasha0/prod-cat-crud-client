import React from "react";

export default function Input({labelName,...inputProps}) {
  return (
    <div className="mb-4">
      <label htmlFor="inputField" className="block text-sm font-medium text-gray-700">
        {labelName}
      </label>
      <input
        className="block w-32 p-2 mt-1 text-gray-900 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-black dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        {...inputProps}
      />
    </div>
  );
}
