import Data from "@/Shared/Data";
import React from "react";
import { Link } from "react-router-dom";

const Category = () => {
  return (
    <div className="mt-40">
      <h2 className="text-3xl font-bold text-center mb-6">Browse by Type</h2>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-9 gap-6 px-20">
        {Data.Category.map((category, index) => (
          <Link key={index} to={"/search/" + category?.name}>
            <div
              key={index}
              className="flex flex-col border rounded-md p-3 items-center hover:shadow-md cursor-pointer "
            >
              <img src={category.icon} width={40} height={40} />
              <p className="mt-2">{category.name}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Category;
