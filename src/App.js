import React from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import {Home, Aboutus, Service, Blog, Editor, Article, Admin, EditorAdmin, Login, Register} from "./pages"
import {Footer, Navigation} from "./components"
import ProductDetail from "./pages/productDetail"
import { FirebaseProvider } from './FirebaseContext';
import PrivateRoute from './components/PrivateRoute';
import ArticleAdmin from './pages/articleAdmin';
import ArticleEditor from './pages/articleEditor';
import Product from './pages/product';
import ProductAdmin from './pages/productAdmin';
import ProductEditor from './pages/productEditor';
import TrademarkAdmin from './pages/trademarkAdmin';
import TrademarkEditor from './pages/trademarkEditor';
import Profile from './pages/profile';
import LayoutUser from './components/layoutUser';
import ProfileOrder from './pages/profileOrder';
import OrderEditor from './pages/orderEditor';

function App() {

  return (
    <FirebaseProvider className='App bg-slate-50 font-poppins'>
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/about" element={<Aboutus />}></Route>
        <Route path="/service" element={<Service />}></Route>
        <Route path="/product" element={<Product />}></Route>
        <Route path="/product/:id" element={<ProductDetail />}></Route>
        <Route path="/blog" element={<Blog />}></Route>
        <Route path="/article/:id" element={<Article />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route element={<PrivateRoute />} >
          <Route path="/profile" element={<LayoutUser><Profile /></LayoutUser>}></Route>
          <Route path="/profile/order" element={<LayoutUser><ProfileOrder /></LayoutUser>}></Route>
          <Route path="/profile/add-order" element={<LayoutUser><OrderEditor /></LayoutUser>}></Route>

          <Route path="/admin/product" element={<LayoutUser><ProductAdmin /></LayoutUser>}></Route>
          <Route path="/admin/add-product" element={<LayoutUser><ProductEditor /></LayoutUser>}></Route>
          <Route path="/admin/edit-product/:id" element={<LayoutUser><ProductEditor /></LayoutUser>}></Route>
          <Route path="/admin/add-article" element={<LayoutUser><ArticleEditor /></LayoutUser>}></Route>
          <Route path="/admin/edit-article/:id" element={<LayoutUser><ArticleEditor /></LayoutUser>}></Route>
          <Route path="/admin/article" element={<LayoutUser><ArticleAdmin /></LayoutUser>}></Route>
          <Route path="/admin/trademark" element={<LayoutUser><TrademarkAdmin /></LayoutUser>}></Route>
          <Route path="/admin/add-trademark" element={<LayoutUser><TrademarkEditor /></LayoutUser>}></Route>
          <Route path="/editor" element={<LayoutUser><Editor /></LayoutUser>}></Route>
          <Route path="/admin" element={<LayoutUser><Admin /></LayoutUser>}></Route>
          <Route path="/editor/:id" element={<LayoutUser><EditorAdmin/></LayoutUser>}></Route>
        </Route>
      </Routes>
      <Footer />
  </BrowserRouter>
  </FirebaseProvider>
  );
}

export default App;
