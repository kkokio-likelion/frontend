import FrontPage from 'pages/front.page';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MenuPage from 'pages/menu.page';
import NotfoundPage from 'pages/notfound.page';
import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<FrontPage />}></Route>
          <Route path="/menu" element={<MenuPage />}></Route>
          <Route path="*" element={<NotfoundPage />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
