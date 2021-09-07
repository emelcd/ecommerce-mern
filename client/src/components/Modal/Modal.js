import "./Modal.css";
import minus from "./minus.svg";
import plus from "./plus.svg";
import card from "../Header/shop.svg";

import ShopContext from "../../context/shop-context";

const buyItems = (data) => {
  if(data.length === 0){
    return
  }
  fetch('http://localhost:4000/buy', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
  })
  .then(res => res.json())  
  .then(data => {
      if (data.status === 201) {
        alert(`Your Ticket:\nRef: ${data.ticket.id} \nDate: ${data.ticket.date}\nTotal Amount: ${data.ticket.products.map((i)=>i.price*i.quantity).reduce((a,b)=>a+b)} $`)
        window.location.href = '/';
      }

  })
  .catch(err => console.log(err));
};

const Modal = (data) => {
  return (
    <ShopContext.Consumer>
      {(context) => (
        <div className="item">
            {context.cart.length > 0 ? <h1>Cart <img  width="12px" src={card} alt="icon-card"></img></h1> : <h1>Cart <img  width="12px" src={card} alt="icon-card"></img><br /></h1>}
            
          {data.data.map((i) => {
            return (
              <div key={i.id} className="item-container">

                <div className="item-title">
                  {i.title}
                </div>
                  <div className="item-quantity">{i.quantity} x {i.price} $</div>
                <div className="item-qua">
                  <div
                    onClick={context.removeProductFromCart.bind(this, i.id)}
                    className="item-minus"
                  >
                    <img width="32px" src={minus} alt="minus" />
                  </div>

                  <div
                    onClick={context.addProductToCart.bind(this, i)}
                    className="item-minus"
                  >
                    <img width="32px" src={plus} alt="minus" />
                  </div>
                </div>
                <img width="32px" className="item-img" src={i.image} alt="img" />
                
              </div>
            );
          })}
        <div className="item-total">
            {context.cart.length > 0 ? <div className="item-total">Total:
            <span className="total-q">
             {context.cart.map((i)=>{
                return i.price * i.quantity
            }).reduce((a,b)=>a+b, 0).toPrecision(4)} $</span></div> : null}
        </div>
        <div className="item-action">
            <button onClick={()=>{
                buyItems(context.cart)
            }} className="item-buy">
                Buy It! 
            </button>
        </div>
        </div>
      )}
    </ShopContext.Consumer>
  );
};

export default Modal;
