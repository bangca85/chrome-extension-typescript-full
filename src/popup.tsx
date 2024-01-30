import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { CiSettings } from "react-icons/ci";
import { CiSearch } from "react-icons/ci";


type Product = {
    id: number;
    title: string;
    description: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    brand: string;
    category: string;
    thumbnail: string;
    images: string[];
  }
  

const PopupContent = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
 
 
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = async () => {
    if (!searchTerm.trim()) return;
    setIsLoading(true);
    try {  
       
        const apiUrl = `https://dummyjson.com/products/search?q=${searchTerm}`;
        const response = await fetch(apiUrl, {
          method: "GET",
          headers: {
            "Content-Type": "application/json", 
          }
        });
        const data = await response.json();
        if (!response.ok) { 
          console.error("Something went wrong"); 
        }

        setProducts(data.products);
       
    } catch (error) {
      console.error("Error fetching data: ", error); 
    } finally {
      setIsLoading(false); // Stop loading regardless of success or failure
    }
  };

  // Trigger search on Enter key
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const openSettings = () => {
    const url = chrome.runtime.getURL("options.html");
    window.open(url, "_blank");
  };

  return (
    <div className="App">
      <div className="header">
        <h1>Example extension</h1>
        <div className="icon" onClick={openSettings}>
          <CiSettings size={24} />
        </div>
      </div>
      <div className="contentApp">
        <div className="searchBar">
          <input
            type="text"
            placeholder="Enter search text..."
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            value={searchTerm}
          />
          <button className="icon" onClick={handleSearch}>
            <CiSearch />
          </button>
        </div>
      </div>
      {isLoading ? (
        <div className="loading">Loading...</div> // You can replace this with a spinner
      ) : (
        products.length > 0  && (
          <div className="results">
           <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td>{product.title}</td>
                  <td>${product.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        )
      )}
    </div>
  );
};

const root = createRoot(document.getElementById("root")!);

root.render(
  <React.StrictMode>
    <PopupContent />
  </React.StrictMode>
);
