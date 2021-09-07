import "./Header.css";
import card from "./shop.svg";
import logo from "./logo.png";

const Header = ({count=5, handler, search}) => {
  // make a header for a eCommerce with a logo and a search bar
  return (
    <header>
      <div className="logo">
        <img
          className="logo-img"
          src={logo}
          alt="coffee logo design creative idea logo elements"
        />
      </div>
      <div onChange={search} className="search">
        <input  type="text" placeholder="Search" />
        <button>Search 🔎</button>
      </div>
      <div className="cart">
        <span className="cart-badge">{count}</span>
        <img
         onClick={handler}
          className="cart-img"
          src={card}
          alt="shopping cart"
        />
      </div>
    </header>
  );
};

export default Header;
