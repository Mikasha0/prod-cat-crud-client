import FormInput from "~/utils/inputUtils";

export default function ProductInputField() {
  return (
    <>
      <FormInput label="Product Name" name="name" id="name" />
      <FormInput label="Description" name="description" id="description" />
      <FormInput label="Highlight" name="highlight" id="highlight" />
    </>
  );
}
