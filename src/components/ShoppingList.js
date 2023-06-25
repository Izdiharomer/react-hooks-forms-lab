import React, { useState } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

function ShoppingList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [items, setItems] = useState([
    { id: 1, name: "Yogurt", category: "Dairy" },
    { id: 2, name: "Pomegranate", category: "Produce" },
    { id: 3, name: "Lettuce", category: "Produce" },
    { id: 4, name: "String Cheese", category: "Dairy" },
    { id: 5, name: "Swiss Cheese", category: "Dairy" },
    { id: 6, name: "Cookies", category: "Dessert" },
  ]);

  const handleItemFormSubmit = (newItem) => {
    setItems([...items, newItem]);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const itemsToDisplay = items.filter((item) => {
    if (selectedCategory === "All" && searchTerm === "") return true;

    if (selectedCategory !== "All" && searchTerm !== "") {
      return (
        item.category === selectedCategory &&
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== "All") {
      return item.category === selectedCategory;
    }

    return item.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="ShoppingList">
      <ItemForm onItemFormSubmit={handleItemFormSubmit} />
      <Filter
        search={searchTerm}
        onSearchChange={(event) => setSearchTerm(event.target.value)}
        onCategoryChange={handleCategoryChange}
      />
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item key={item.id} name={item.name} category={item.category} />
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
