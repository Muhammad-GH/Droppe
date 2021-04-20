import React from "react";

import "./checkout-item.styles.scss";

const CheckoutItem = ({ cartItems, products, handleDelete }) => {
  return (
    <div className="checkout-item">
      {/* <div className="image-container">
        <img src={imageUrl} alt="item" />
      </div> */}
      <span className="name">{cartItems.productId}</span>
      <span className="quantity">
        <span className="value">{cartItems.quantity}</span>
      </span>
      {/* <span className="price">{price}</span> */}
      <div
        onClick={() => handleDelete(cartItems, products)}
        className="remove-button"
      >
        &#10005;
      </div>
    </div>
  );
};

export default CheckoutItem;
