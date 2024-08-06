import FrontPage from 'pages/front.page';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MenuPage from 'pages/menu.page';
import NotfoundPage from 'pages/notfound.page';
import './App.css';
import OrderPage from 'components/mobile-menu/order-page/main-order-page';
import Content from 'components/tablet-menu/content/content';
import LoginPage from 'pages/manage/login.page';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/:storeId" element={<FrontPage />}></Route>
          <Route path="/:storeId/menu" element={<MenuPage />}></Route>
          <Route path="/:storeId/menu/order" element={<OrderPage />}></Route>
          <Route path="/:storeId/menu/test" element={<Content />}></Route>
          <Route path="*" element={<NotfoundPage />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
