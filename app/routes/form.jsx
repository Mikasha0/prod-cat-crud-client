import { useState } from "react";
import CustomInput from "../component/customInput";
export default function Form() {
  const nestedArray = [
    "aniket",
    [["abinash", "bikal"]],
    [[["ahmed"]]],
    ["ankit"],
  ];
  console.log(nestedArray);
  const flattendArray = [];

  function isValid(s) {
    const array = [];
    const obj = {
      ")": "(",
      "}": "{",
      "]": "[",
    };

    for (let i = 0; i < s.length; i++) {
      const char = s.charAt(i);
      if (obj[char]) {
        if (!array.length || array[array.length - 1] !== obj[char]) {
          return false;
        }
        array.pop();
      } else {
        array.push(char);
      }
    }

    return array.length === 0;
  }

  isValid("()[]");
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
    <></>
  );
}
