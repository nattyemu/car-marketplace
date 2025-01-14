import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { CiSearch } from "react-icons/ci";
import Data from "../Shared/Data";
import { Link } from "react-router-dom";

const Search = () => {
  const [make, setMake] = useState();
  const [price, setPrice] = useState();
  const [cars, setCars] = useState();
  return (
    <div className="p-2 md:p-5 bg-white rounded-md md:rounded-full flex-col flex md:flex-row gap-10 px-5 items-center w-[70%]">
      <Select onValueChange={(v) => setCars(v)}>
        <SelectTrigger className="outline-none md:border-none w-full shadow-none text-lg">
          <SelectValue placeholder="Cars" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="New">New</SelectItem>
          <SelectItem value="Used">Used</SelectItem>
          <SelectItem value="Certified Pre-Owned">
            Certified Pre-Owned
          </SelectItem>
        </SelectContent>
      </Select>

      <Separator orientation="vertical" className="hidden md:block" />

      <Select onValueChange={(v) => setMake(v)}>
        <SelectTrigger className="outline-none md:border-none w-full shadow-none text-lg">
          <SelectValue placeholder="Car Makes" />
        </SelectTrigger>
        <SelectContent>
          {Data.CarMakes.map((maker, index) => (
            <SelectItem key={index} value={maker.name}>
              {maker.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Separator orientation="vertical" className="hidden md:block" />

      <Select onValueChange={(v) => setPrice(v)}>
        <SelectTrigger className="outline-none md:border-none w-full shadow-none text-lg">
          <SelectValue placeholder="Pricing" />
        </SelectTrigger>
        <SelectContent>
          {Data.Pricing.map((price, index) => (
            <SelectItem key={index} value={price.amount}>
              {price.amount}$
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Separator orientation="vertical" className="hidden md:block" />
      <div>
        <Link to={"/search?cars=" + cars + "&make=" + make + "&price=" + price}>
          <CiSearch className="text-5xl rounded-full p-2 bg-primary  text-white cursor-pointer hover:scale-105 transition-all" />
        </Link>
      </div>
    </div>
  );
};

export default Search;
