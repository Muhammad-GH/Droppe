import React, { useEffect } from "react";
import "./list.styles.scss";
import CheckoutItem from "../checkout-item/CheckoutItem.component";

const AppList = ({ userId, products, deleteCartItems }) => {
  return (
    <div className="checkout-page">
      <h1>User: {userId}</h1>
      <div className="checkout-header">
        <div className="header-block">
          <span>Product</span>
        </div>
        <div className="header-block">
          <span>Quantity</span>
        </div>
        <div className="header-block">
          <span>Actions</span>
        </div>
      </div>
      {products.map((items) => (
        <CheckoutItem
          key={items.id}
          products={products}
          cartItems={items}
          handleDelete={deleteCartItems}
        />
      ))}
      {/* <div className="total">
        <span>TOTAL: ${}</span>
      </div> */}
    </div>
  );
};

export default AppList;
