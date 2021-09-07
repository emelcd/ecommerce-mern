import { useEffect, useState } from "react";
import "./Products.css";
import star from "./star.svg";
import Header from "../Header/Header";
import Modal from "../Modal/Modal";
import ShopContext from "../../context/shop-context";


const Products = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch("http://localhost:4000/products")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
      });
  }, []);
  const [ isVisible, setIsVisible ] = useState(false);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  }

  
  // if exists in localStorage set the cart to it
  // if not set it to empty array
  return (
    <ShopContext.Consumer>
      {(context) => (
              <div className="App">
              <Header count={context.cart.reduce((count, item)=>{
                return count + item.quantity;
              }, 0)} handler={toggleVisibility} />
              {isVisible ? <Modal data={context.cart}  />  : null}
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
                          <div onClick={context.addProductToCart.bind(this, product)} className="btn">
                            <a>Add to Cart</a>
                          </div>
                          <a> Cancel</a>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
      )}
    </ShopContext.Consumer>
  );
};

export default Products;
