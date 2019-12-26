import React, { Component } from "react";
import axios from "axios";

// import * as Helper from "../Helper";

import "./Product.scss";

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.getProductData();
  }

  getProductData = () => {
    let productHandle = "charmed-simplicity-moon-charm-necklace";
    let storeURL = "https://www.moonglow.com";
    let apiEndPoint = `${storeURL}/products/${productHandle}.json`;

    axios
      .get(apiEndPoint)
      .then(response => response.data.product)
      .then(data => {
        // console.log(data);
        this.setState({
          product_data: data
        });
      });
  };

  handleize = str => {
    return str
      .toLowerCase()
      .replace(/[^\w\u00C0-\u024f]+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  createVariantSelect = variants => {
    return (
      <select className="form-control">
        {variants.map(variant => (
          <option>
            {variant.title} ${variant.price}
          </option>
        ))}
      </select>
    );
  };

  createOptionsSelect = options => {
    return options.map(option => (
      <div className="form-group">
        <lebel htmlFor={this.handleize(option.name)}>{option.name}</lebel>
        <select className="form-control" id={this.handleize(option.name)}>
          {option.values.map(value => (
            <option>{value}</option>
          ))}
        </select>
      </div>
    ));
  };

  setActiveVariant = variants => {
    let firstVar;
    variants.map(variant => {
      if (variant.inventory_quantity && variant.inventory_quantity > 0) {
        firstVar = variant;
      }
      return firstVar;
    });
  };

  render() {
    let product = this.state.product_data || "";
    let activeVariant = product && this.setActiveVariant(product.variants);
    return (
      <>
        {product && (
          <div className="container">
            <div className="row mb-3">
              <div className="col-md-5">
                <img src={product.image.src} alt={product.image.alt} />
              </div>
              <div className="col-md-6 offset-md-1">
                <h1 className="h2 font-weight-bold">{product.title}</h1>
                <div className="">
                  <span className="price">{activeVariant.price}</span>
                  <del>
                    <span className="price"></span>
                  </del>
                </div>
                <div className="mb-3">
                  {this.createOptionsSelect(product.options)}
                </div>
                <div className="mb-3">
                  {this.createVariantSelect(product.variants)}
                </div>
                <button className="btn btn-success">Add to cart</button>
              </div>
            </div>
            <div dangerouslySetInnerHTML={{ __html: product.body_html }} />
          </div>
        )}
      </>
    );
  }
}
export default Product;
