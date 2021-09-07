import { useEffect, useState } from "react";
import "./Products.css";
import star from "./star.svg";
import vote from "./vote.svg";
import Header from "../Header/Header";
import Modal from "../Modal/Modal";
import ShopContext from "../../context/shop-context";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  useEffect(() => {
    fetch("http://localhost:4000/products")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        localStorage.setItem("products", JSON.stringify(data));
        setCategory(
          data
            .map((product) => product.category)
            .filter((item, i, ar) => ar.indexOf(item) === i)
        );
      });
  }, []);
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };
  const handleSearch = (e) => {
    const data = JSON.parse(localStorage.getItem("products"));
    const search = e.target.value;
    const filteredProducts = data.filter(
      (product) =>
        product.title.toLowerCase().includes(search.toLowerCase()) ||
        product.category.toLowerCase().includes(search.toLowerCase())
    );
    setProducts(filteredProducts);
  };

  const handleCategory = (e) => {
    const data = JSON.parse(localStorage.getItem("products"));
    const category = e.target.textContent;
    const filteredProducts = data.filter(
      (product) => product.category === category
    );
    setProducts(filteredProducts);
  };

  // if exists in localStorage set the cart to it
  // if not set it to empty array
  return (
    <ShopContext.Consumer>
      {(context) => (
        <div className="App">
          <Header
            count={context.cart.reduce((count, item) => {
              return count + item.quantity;
            }, 0)}
            handler={toggleVisibility}
            search={(e) => {
              handleSearch(e, products);
            }}
          />
          <div className="category-container">
            {category.map((category) => (
              <div onClick={handleCategory} className="category" key={category}>
                <span className="item">{category}</span>
              </div>
            ))}
          </div>
          {isVisible ? <Modal data={context.cart} /> : null}
          <div className="card-container">
            {products.map((product) => (
              <div key={product.id} className="card">
                <img
                  onMouseEnter={(e) => {
                    setTimeout(() => {
                      
                    if (e.target.naturalHeight > 500 || e.target.naturalWidth < 500) {
                      e.target.style.transition = "all 1s ease-in-out";
                      e.target.style.height = "380px";
                    }
                  }, 1);
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.height = "180px";
                  }}
                  src={product.image}
                  alt=""
                />
                <div className="card-body">
                  <div className="row">
                    <div className="card-title">
                      <h4>{product.title}</h4>
                      <h3>${product.price}</h3>
                      <span className="category">{product.category}</span>
                    </div>
                    <div className="view-btn">
                      <span>Details</span>
                    </div>
                  </div>
                  <div className="card-footer">
                    <div className="card-description">
                      {product.description}
                    </div>
                    <div className="card-footer-icons">
                      <div className="card-stars">
                        <img className="card-star" src={star} alt="star" />
                        <span>{product.rating.rate}</span>
                      </div>
                      <div className="card-votes">
                        <img className="card-vote" src={vote} alt="vote" />
                        <span>{product.rating.count}</span>
                      </div>
                    </div>
                    <div className="btn-group">
                      <div
                        onClick={context.addProductToCart.bind(this, product)}
                        className="btn"
                      >
                        <span>Add to Cart</span>
                      </div>
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
