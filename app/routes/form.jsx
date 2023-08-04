import Input from "~/component/input";
export default function Form() {
  // const inputProp = {
  //   name:'name',
  //   placeholder:'Enter your name',
  //   type:'password'
  // }
  // const labelProp = {
  //   name:'Name',
  //   htmlFor:'name'
  // }
  // const numbers = [1, 2, 3, 4, 5];
  // console.log(numbers[0])
  // let sum = 0;
  // for(let i=0; i < numbers.length; i++){
  //   console.log(sum += numbers[i]);
  //   return sum += numbers[i];
  // }

  const listA = ["aniket", [["abinash", "bikal"]], ["hi"]];
  const listC = ["abinash", "bikal"]
  console.log(listC.length);
  const listB = [["abinash", "bikal"]]
  console.log(listB[1]);
  console.log(listA[1])
  const flattenedArray = [];
  
  function flattenArray(arr) {
    for (let i = 0; i < arr.length; i++) {
      if (Array.isArray(arr[i])) {
        flattenArray(arr[i]);
      } else {
        flattenedArray.push(arr[i]);
      }
    }
  }
  
  flattenArray(listA);
  // console.log(flattenedArray);
  // Output: ["aniket", "abinash", "bikal", "hi"]


  // const oneDArray = listA.map((item) => item).map((data) => data);
  // console.log(oneDArray);

  // function myFunction(v=0, w=0, x=0, y=0, z=0) {
  //   return v + w + x + y + z
  // }
  // const args = [0, 1];
  // console.log(myFunction(-1, ...args, 2, ...[3]));
  // const num = {...numbers}
  // console.log(num);
  // const obj = {...inputProp, ...labelProp}
  // console.log(obj, "obj");

  return (
    // <form method="post" action="/projects">
    //   <label>
    //     <input name="name" type="text" />
    //   </label>
    //   <label>
    //     <textarea name="description"></textarea>
    //   </label>
    //   <button type="submit">Create</button>
    // </form>
    <Input
      labelName="Name"
      type="password"
      name="name"
      placeholder="Enter your name"
    />
  );
}
