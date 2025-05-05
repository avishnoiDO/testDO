import React, { useState } from "react";

const productsData = [
  { id: 1, name: "iPhone 16 Pro Max", price: 1199, inStock: true },
  { id: 2, name: "iPhone 15", price: 899, inStock: true },
  { id: 3, name: "iPhone 16 Mini", price: 699, inStock: false },
  { id: 4, name: "iPhone 14", price: 799, inStock: true },
  { id: 5, name: "iPhone 16 Standard", price: 999, inStock: true },
  { id: 6, name: "Samsung Galaxy S24", price: 1099, inStock: false },
  { id: 7, name: "iPhone 16 Pro", price: 1299, inStock: true },
  { id: 8, name: "OnePlus 12", price: 799, inStock: true },
  { id: 9, name: "iPhone 13 Mini", price: 699, inStock: true },
  { id: 10, name: "iPhone 16 Plus", price: 1099, inStock: false },
];

const ITEMS_PER_PAGE = 3;

export default function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState("");

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };

  let filteredProducts = productsData.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  // let filteredProducts = productsData;

  if (sortOrder === "lowToHigh") {
    filteredProducts = [...filteredProducts].sort((a, b) => a.price - b.price);
  } else if (sortOrder === "highToLow") {
    filteredProducts = [...filteredProducts].sort((a, b) => b.price - a.price);
  }

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const displayedProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleProductClick = (productName, productPrice) => {
    alert(`You clicked on: ${productName} (Price: $${productPrice})`);
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial" }}>
      <h1>Digital Ocean Product Search</h1>

      <input
        type="text"
        className="searchText"
        placeholder="Search for products..."
        value={searchTerm}
        onChange={handleSearchChange}
        style={{ padding: "0.5rem", width: "300px", marginRight: "1rem" }}
      />

      {/* <select
        value={sortOrder}
        className="sortSelect"
        onChange={handleSortChange}
        style={{ padding: "0.5rem" }}
      >
        <option value="">Sort by</option>
        <option value="lowToHigh">Price: Low to High</option>
        <option value="highToLow">Price: High to Low</option>
      </select> */}

      <div style={{ marginTop: "2rem" }}>
        {displayedProducts.map((product) => (
          <div
            key={product.id}
            className="product-card"
            style={{
              border: "1px solid #ccc",
              marginBottom: "1rem",
              padding: "1rem",
              borderRadius: "8px",
              backgroundColor:
                searchTerm &&
                product.name.toLocaleLowerCase().includes(searchTerm)
                  ? "#e0ffe0"
                  : "#fff",
            }}
          >
            <h2 className="product-name">
              {product.name}{" "}
              {product.name.includes("iPhone 16") && (
                <span style={{ color: "green", fontSize: "0.8rem" }}>
                  {" "}
                  (iPhone 16 Model)
                </span>
              )}
            </h2>
            <p className="product-price">${product.price}</p>
            <button
              style={{ padding: "0.5rem 1rem" }}
              onClick={() => handleProductClick(product.name, product.price)}
              disabled={!product.inStock}
            >
              {product.inStock ? "View Product" : "Out of Stock"}
            </button>
          </div>
        ))}
      </div>

      <div style={{ marginTop: "2rem" }} className="pagination">
        <button onClick={goToPreviousPage} className="prev" disabled={currentPage === 1}>
          Previous
        </button>

        <span style={{ margin: "0 1rem" }}>
          Page {currentPage} of {totalPages}
        </span>

        <button onClick={goToNextPage} className="next" disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
}
