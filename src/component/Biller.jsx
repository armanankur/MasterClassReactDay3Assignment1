import React, { useState } from "react";

const Biller = () => {
  const [customerName, setCustomerName] = useState("");
  const [items, setItems] = useState([
    { product: { name: "", price: 0 }, quantity: "" }
  ]);
  const [bill, setBill] = useState(null);
  const [date, setDate] = useState(null);
  const products = [
    { name: "Milk", price: 60 },
    { name: "Coffee", price: 120 },
    { name: "Chips", price: 40 },
    { name: "SoftDrinks", price: 50 },
    { name: "Mango Juice", price: 100 },
    { name: "Tea", price: 100 }
  ];

  const handleQuantityChange = (e, idx) => {
    const updatedItems = [...items];
    updatedItems[idx].quantity = Number(e.target.value);
    setItems(updatedItems);
  };
  const handleProductChange = (idx, e) => {
    const updatedItems = [...items];
    const selectedProduct = products.find(
      (product) => product.name === e.target.value
    );
    updatedItems[idx].product = selectedProduct;
    setItems(updatedItems);
  };

  const handleAddItem = () => {
    const newItems = [
      ...items,
      { product: { name: "", price: 0 }, quantity: "" }
    ];
    setItems(newItems);
  };

  const handleGenerateBill = () => {
    const billItems = items.map((item) => {
      return { ...item.product, quantity: item.quantity };
    });
    const total = billItems.reduce(
      (sum, item) => sum + item.quantity * item.price,
      0
    );
    const bill = { customerName, items: billItems, total };
    setBill(bill);
    setDate(new Date().toLocaleString());
  };
  return (
    <div>
      <h1>BILL RECEIPT </h1>
      <label htmlFor="customer name"> Customer Name : </label>
      <input
        type="text"
        value={customerName}
        onChange={(e) => setCustomerName(e.target.value)}
      />
      <hr />

      {items.map((item, idx) => (
        <div key={idx}>
          <div>
            <strong> PRODUCTS : </strong>
            <select
              value={item.product.name}
              onChange={(e) => handleProductChange(idx, e)}
            >
              <option value="">Select Product</option>
              {products.map((product) => (
                <option key={product.name} value={product.name}>
                  {product.name} @ {product.price} /-
                </option>
              ))}
            </select>
          </div>
          <br />
          <div>
            <strong>QUANTITY : </strong>
            <input
              type="number"
              value={item.quantity}
              onChange={(e) => handleQuantityChange(e, idx)}
            />
          </div>
          <br />
        </div>
      ))}
      <br />
      <div>
        <button onClick={handleAddItem}>ADD ITEMS</button>
      </div>
      <hr />

      <button onClick={handleGenerateBill}>Generate Bill</button>

      {bill && (
        <div>
          <h3> Customer Name :- {bill.customerName}</h3>
          <h4>Date/Time : {date}</h4>
          <table cellSpacing="10px" cellPadding="5px" border="2px" width="50%">
            <thead>
              <tr>
                <th>Product</th>
                <th>Quantity</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {bill.items.map((item, index) => (
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>{item.quantity}</td>
                  <td>{item.price}</td>
                </tr>
              ))}
              <tr>
                <td colSpan="2">Total</td>
                <td>Rs {bill.total} /-</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
export default Biller;
