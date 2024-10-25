import React from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import {Home, Aboutus, Service, Blog, Editor, Article, Admin, EditorAdmin, Login} from "./pages"
import {Footer, Navigation} from "./components"
import ProductDetail from "./pages/productDetail"
import { FirebaseProvider } from './FirebaseContext';
import PrivateRoute from './components/PrivateRoute';
import LayoutAdmin from './components/layoutAdmin';
import ArticleAdmin from './pages/articleAdmin';
import ArticleEditor from './pages/articleEditor';
import Product from './pages/product';
import ProductAdmin from './pages/productAdmin';
import ProductEditor from './pages/productEditor';
import TrademarkAdmin from './pages/trademarkAdmin';
import TrademarkEditor from './pages/trademarkEditor';

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
        <Route element={<PrivateRoute />} >
          <Route path="/admin/product" element={<LayoutAdmin><ProductAdmin /></LayoutAdmin>}></Route>
          <Route path="/admin/add-product" element={<LayoutAdmin><ProductEditor /></LayoutAdmin>}></Route>
          <Route path="/admin/edit-product/:id" element={<LayoutAdmin><ProductEditor /></LayoutAdmin>}></Route>
          <Route path="/admin/add-article" element={<LayoutAdmin><ArticleEditor /></LayoutAdmin>}></Route>
          <Route path="/admin/edit-article/:id" element={<LayoutAdmin><ArticleEditor /></LayoutAdmin>}></Route>
          <Route path="/admin/article" element={<LayoutAdmin><ArticleAdmin /></LayoutAdmin>}></Route>
          <Route path="/admin/trademark" element={<LayoutAdmin><TrademarkAdmin /></LayoutAdmin>}></Route>
          <Route path="/admin/add-trademark" element={<LayoutAdmin><TrademarkEditor /></LayoutAdmin>}></Route>
          <Route path="/editor" element={<LayoutAdmin><Editor /></LayoutAdmin>}></Route>
          <Route path="/admin" element={<LayoutAdmin><Admin /></LayoutAdmin>}></Route>
          <Route path="/editor/:id" element={<LayoutAdmin><EditorAdmin/></LayoutAdmin>}></Route>
        </Route>
      </Routes>
      <Footer />
  </BrowserRouter>
  </FirebaseProvider>
  );
}

export default App;
