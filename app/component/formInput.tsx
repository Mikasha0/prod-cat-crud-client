// import { FormInputField } from "~/types/formInput.types";
// import { useField } from "remix-validated-form";
// const FormInput = ({ label, name }: FormInputField) => {
//   const { error, getInputProps } = useField(name);
//   return (
//     <div className="mb-6">
//       <label
//         htmlFor={name}
//         className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//       >
//         {label}
//       </label>
//       <input
//         className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
//         placeholder={`Enter ${name}`}
//         {...getInputProps({
//           type: "text",
//           onChange: (event) => console.log(event.target.value),
//         })}
//       />
//       {error && <span className="text-red-400">{error}</span>}
//     </div>
//   );
// };

// export default FormInput;
import { FormInputField } from "~/types/formInput.types";

const FormInput = ({ label, name,...inputProps  }:FormInputField) => {
  return (
    <div className="mb-6">
      <label
        htmlFor={name}
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {label}
      </label>
      <input
        type="text"
        name={name}
        id={name}
        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
        {...inputProps}
      />
    </div>
  );
};

export default FormInput;
