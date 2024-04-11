import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./components/layout/Header";
import { setupServer, urls } from "./fakeApis";
import { useDispatch } from "react-redux";
import {
  fetchAccount,
  fetchDepartment,
  fetchPositon,
} from "./redux/accountSlice";
import {
  BlogPage,
  DashBoardPage,
  HomePage,
  IntroducePage,
  LoginPage,
  ProductPage,
} from "./components/pages";
import DashboardLayout from "./components/module/dashboard/DashboardLayout";
import AccountsManage from "./components/module/accounts/AccountsManage";
import ProductsManage from "./components/module/products/ProductsManage";
import { fetchBrand, fetchMaterial, fetchProducts } from "./redux/productSlice";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCq4WxukwMCHYbefe4A7m_fN0RtBcL_WgA",
  authDomain: "eye-spy-vitejs-ff812.firebaseapp.com",
  projectId: "eye-spy-vitejs-ff812",
  storageBucket: "eye-spy-vitejs-ff812.appspot.com",
  messagingSenderId: "575878148008",
  appId: "1:575878148008:web:e7527c245ba045f96ff79d",
  measurementId: "G-GSD0Z526F8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAccount());
    dispatch(fetchDepartment());
    dispatch(fetchPositon());
    dispatch(fetchProducts());
    dispatch(fetchBrand());
    dispatch(fetchMaterial());
  }, []);
  return (
    <div>
      {/* <Header></Header> */}

      <Routes>
        <Route path="/" element={<HomePage></HomePage>}></Route>
        <Route
          path="/products-page"
          element={<ProductPage></ProductPage>}
        ></Route>
        <Route
          path="/introduce-page"
          element={<IntroducePage></IntroducePage>}
        ></Route>
        <Route path="/blog-page" element={<BlogPage></BlogPage>}></Route>
        <Route path="/login-page" element={<LoginPage></LoginPage>}></Route>
        {/* <Route path="/dashboard-page" element={<AdminPage></AdminPage>}></Route> */}
        <Route element={<DashboardLayout></DashboardLayout>}>
          <Route
            path="/dashboard-page"
            element={<DashBoardPage></DashBoardPage>}
          ></Route>
          <Route
            path="/manage/accounts"
            element={<AccountsManage></AccountsManage>}
          ></Route>
          <Route
            path="/manage/products"
            element={<ProductsManage></ProductsManage>}
          ></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
