import FrontPage from 'pages/front.page';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MenuPage from 'pages/menu.page';
import NotfoundPage from 'pages/notfound.page';
import './App.css';
import OrderPage from 'components/menu/order-page/main-order-page';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<FrontPage />}></Route>
          <Route path="/menu" element={<MenuPage />}></Route>
          <Route path="*" element={<NotfoundPage />}></Route>
          <Route path="/menu/order" element={<OrderPage/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
