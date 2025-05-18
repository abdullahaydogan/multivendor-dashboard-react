import { useState } from "react";
import "./App.css";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProductDetail from "./pages/products/productList/ProductDetails/ProductDetails";
import ProductList from "./pages/products/productList/ProductList";
import UserList from "./pages/userList/UserList";
import CategoryDistribution from "./pages/CategoryDistribution/CategoryDistribution";
import Home from "./pages/homePage/Home";
import Navbar from "./components/navbar/NavBar";
import ChatAi from "./pages/ai/ChatAi";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <Navbar /> 
      <div style={{ display: 'flex' }}> 
       
        <div style={{ flexGrow: 1 }}>
          <Routes>
            {/* <Route path="/logIn" element={<LogIn />} /> */}
            <Route path="/" element={<Home />} />
            <Route path="/userList" element={<UserList />} />
            <Route path="/productList" exact element={<ProductList />} />
            <Route path="/product/:id" exact element={<ProductDetail />} />
            <Route path="/categoryDistribution" exact element={<CategoryDistribution />} />
            {/* <Route path="/favorites" exact element={<Favorites />} />
            <Route path="/productCreate" exact element={<ProductCreate />} /> */}
             <Route path="/ai" element = {<ChatAi/>} />

             {/* <Route path="*" element={<NotFoundPage />} />  */}
          </Routes>
          {/* <Footer /> */}
        </div>
      </div>
    </Router>
  );
}

export default App;
