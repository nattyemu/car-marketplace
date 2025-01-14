import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
const DropDownField = ({ item, handleInputChange, carInfo }) => {
  return (
    <div>
      <Select
        required={item?.required}
        onValueChange={(value) => handleInputChange(item?.name, value)}
        value={carInfo?.[item?.name]}
      >
        <SelectTrigger className=" w-full ">
          <SelectValue placeholder={item?.label} />
        </SelectTrigger>
        <SelectContent>
          {item?.options?.map((option, index) => (
            <SelectItem key={index} value={option}>
              {option}
            </SelectItem>
          ))}
          <SelectItem value="Certified Pre-Owned">
            Certified Pre-Owned
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default DropDownField;
