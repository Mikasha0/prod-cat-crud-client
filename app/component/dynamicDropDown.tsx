
interface DynamicDropDownProps {
  labelName: string;
  name: string;
  data: Array<any>;
  dataKey: string; 
  dataValueKey: string; 
}

export default function DynamicDropDown({ labelName, name, data, dataKey, dataValueKey }: DynamicDropDownProps) {
  return (
    <div className="mb-6">
      <label htmlFor={name} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        {labelName}
      </label>
      <select
        id={name}
        name={name}
        className="shadow-sm bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
      >
        {data.map((item) => (
          <option key={item[dataKey]} value={item[dataKey]}>
            {item[dataValueKey]}
          </option>
        ))}
      </select>
    </div>
  );
}
