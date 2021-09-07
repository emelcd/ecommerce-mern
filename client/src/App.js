import "./App.css";

import Products from "./components/Products/Products";

import GlobalState from "./context/GlobalState";


function App() {
  return (
    <GlobalState>
        <Products />
    </GlobalState>
  );
}

export default App;
