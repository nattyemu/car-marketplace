import React from "react";

const InputField = ({ item, handleInputChange, carInfo }) => {
  return (
    <div>
      <input
        name={item?.name}
        type={item?.fieldType}
        required={item?.required}
        className="border outline-none w-full p-1"
        onChange={(e) => handleInputChange(item?.name, e.target.value)}
        defaultValue={carInfo?.[item?.name]}
      />
    </div>
  );
};

export default InputField;
