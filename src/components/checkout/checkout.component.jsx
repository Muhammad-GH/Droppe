import React, { useEffect, useState } from "react";

import useApi from "../../hooks/useApi";
import cartsApi from "../../api/carts";
import AppList from "../list/list.component";
import CustomButton from "../custom-button/CustomButton.component";
import "./checkout.styles.scss";

const Checkout = () => {
  const getListingsApi = useApi(cartsApi.getListings);
  const [data, setData] = useState([]);

  const deleteCartItems = (cartItems, products) => {
    const existingCartItem = products.find(
      (cartItem) => cartItem.productId === cartItems.productId
    );

    let returned = data.map((cartItem, idx) =>
      cartItem.products[idx]?.productId !== existingCartItem.productId
        ? {
            ...cartItem,
            products: products.filter(
              (product) => product !== existingCartItem
            ),
          }
        : cartItem
    );
    setData(returned);
  };

  let valueArr = data.map(function (item) {
    return item.products.map(function (pr) {
      return pr.productId;
    });
  });
  let isDuplicate = valueArr.some(function (item, idx) {
    return valueArr.indexOf(item) != idx;
  });

  const handleSubmit = async (data) => {
    const { id } = await cartsApi.postListings(data);
  };

  useEffect(() => {
    getListingsApi.request();
    setData(getListingsApi.data);
  }, []);

  return (
    <div className="container-checkout">
      {data.map((items, index) => (
        <AppList key={index} {...items} deleteCartItems={deleteCartItems} />
      ))}
      <div className="button-div-container">
        <h2>Discount {isDuplicate ? `0%` : `30%`}</h2>
        <CustomButton
          data-toggle="modal"
          data-target="#exampleModal"
          onClick={() => handleSubmit(data)}
        >
          Approve All
        </CustomButton>
      </div>
      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Saved
              </h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div className="checkout-item">
                <span className="name">product</span>
                <span className="quantity">
                  <span className="value">price</span>
                </span>
              </div>
              {data.map((items, i) => {
                return items.products.map((it, ii) => (
                  <div className="checkout-item">
                    <span className="name">{it.productId}</span>
                    <span className="quantity">
                      <span className="value">{it.quantity}</span>
                    </span>
                  </div>
                ));
              })}
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
