import React from "react";

const TextArea = ({ item, handleInputChange, carInfo }) => {
  return (
    <div>
      <textarea
        required={item?.required}
        name={item?.name}
        placeholder={item?.label}
        className="w-full border outline-none "
        onChange={(e) => handleInputChange(item?.name, e.target.value)}
        defaultValue={carInfo?.[item?.name]}
      />
    </div>
  );
};

export default TextArea;
