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
import { fetchProducts } from "./redux/productSlice";

// setupServer();
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAccount());
    dispatch(fetchDepartment());
    dispatch(fetchPositon());
    dispatch(fetchProducts());
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
