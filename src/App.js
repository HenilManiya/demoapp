import React from "react";
import "./App.css";
const AddProduct = React.lazy(() => import('./component/AddProduct'));

function App() {
  return (
    <div className="container">
      <AddProduct />
    </div>
  );
}

export default App;
