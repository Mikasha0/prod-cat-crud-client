export default function ProductButtons({toggleModal}:any) {
  return (
    <>
      <button
        type="submit"
        name="_action"
        value="CREATE_PRODUCT"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Post Product
      </button>
      <button
        type="button"
        onClick={toggleModal}
        className=" mx-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Add Category
      </button>
    </>
  );
}
