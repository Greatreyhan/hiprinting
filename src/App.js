import React from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import {Home, Aboutus, Service, Portofolio, Blog, Editor, Article, Admin, EditorAdmin, Login} from "./pages"
import {Footer, Navigation} from "./components"
import PortoDetail from './components/portoDetail';
import { FirebaseProvider } from './FirebaseContext';
import PrivateRoute from './components/PrivateRoute';
import LayoutAdmin from './components/layoutAdmin';
import PortofolioAdmin from './pages/portofolioAdmin';
import ArticleAdmin from './pages/articleAdmin';
import PortoEditor from './pages/portoEditor';
import ArticleEditor from './pages/articleEditor';

function App() {

  return (
    <FirebaseProvider className='App bg-slate-50 font-poppins'>
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/about" element={<Aboutus />}></Route>
        <Route path="/service" element={<Service />}></Route>
        <Route path="/portofolio" element={<Portofolio />}></Route>
        <Route path="/portofolio/:id" element={<PortoDetail />}></Route>
        <Route path="/blog" element={<Blog />}></Route>
        <Route path="/article/:id" element={<Article />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route element={<PrivateRoute />} >
          <Route path="/admin/portofolio" element={<LayoutAdmin><PortofolioAdmin /></LayoutAdmin>}></Route>
          <Route path="/admin/add-portofolio" element={<LayoutAdmin><PortoEditor /></LayoutAdmin>}></Route>
          <Route path="/admin/edit-portofolio/:id" element={<LayoutAdmin><PortoEditor /></LayoutAdmin>}></Route>
          <Route path="/admin/add-article" element={<LayoutAdmin><ArticleEditor /></LayoutAdmin>}></Route>
          <Route path="/admin/edit-article/:id" element={<LayoutAdmin><ArticleEditor /></LayoutAdmin>}></Route>
          <Route path="/admin/article" element={<LayoutAdmin><ArticleAdmin /></LayoutAdmin>}></Route>
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
