import "./Settings.scss";
import React, { useContext } from "react";
import { GlobalContext } from "../../Components/Context/GlobalState";

// Define the structure of a transaction
interface CategoryProps {
  category: string;
  index: number;
}

// update category needs to be remove category
// find out why new categories are added three times

export const CategoryComp: React.FC<CategoryProps> = (category: CategoryProps) => {
  const { deleteCategory } = useContext(GlobalContext);

  return (
    <div className="category">
      <p>
        {category.category}{" "}
        <button onClick={() => deleteCategory(category.index)} className="remove-transaction">
          x
        </button>
      </p>
    </div>
  );
};
