import { useEffect, useState } from "react";
import "./Products.css";
import star from "./star.svg";

const Products = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((response) => response.json())
      .then((data) => {
        console.log(data[0]);
        setProducts(data);
      });
  }, []);

  return (
    <div className="card-container">
      {products.map((product) => (
        <div key={product.id} className="card">
          <img src={product.image} alt="" />
          <div className="card-body">
            <div className="row">
              <div className="card-title">
                <h4>{product.title}</h4>
                <h3>${product.price}</h3>
              </div>
              <div className="view-btn">
                <a href="">Details</a>
              </div>
            </div>
            <div className="card-footer">
              <div className="card-description">{product.description}</div>
              <div className="card-stars">
                <img className="card-star" src={star} alt="star" />
                <span>{product.rating.rate}</span>
              </div>
              <div className="btn-group">
                <div className="btn">
                  <a href="">Add to Cart</a>
                </div>
                <a href=""> Cancel</a>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Products;
