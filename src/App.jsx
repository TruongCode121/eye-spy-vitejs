import React, { useEffect } from "react";
import { redirect, Route, Routes } from "react-router-dom";
import Header from "./components/layout/Header";
import { setupServer, urls } from "./fakeApis";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAccount,
  fetchDepartment,
  fetchPositon,
} from "./redux/accountSlice";
import {
  BlogPage,
  DashBoardPage,
  DetailPage,
  HomePage,
  InforUserPage,
  IntroducePage,
  LoginPage,
  NotFoundPage,
  OrderPage,
  ProductPage,
} from "./components/pages";
import DashboardLayout from "./components/module/dashboard/DashboardLayout";
import AccountsManage from "./components/module/accounts/AccountsManage";
import ProductsManage from "./components/module/products/ProductsManage";
import {
  fetchBrand,
  fetchCategorys,
  fetchMaterial,
  fetchOrderList,
  fetchProducts,
} from "./redux/productSlice";
import OrderManage from "./components/module/order/OrderManage";
import MaterialManage from "./components/module/optionProducts/MaterialManage";
import BrandManage from "./components/module/optionProducts/BrandManage";
import CategoryManage from "./components/module/optionProducts/CategoryManage";

function App() {
  const { auth } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAccount());
    dispatch(fetchDepartment());
    dispatch(fetchPositon());
    dispatch(fetchProducts());
    dispatch(fetchBrand());
    dispatch(fetchMaterial());
    dispatch(fetchCategorys());
    dispatch(fetchOrderList());
  }, []);
  console.log(auth);
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
        <Route
          path="/login-page"
          element={
            auth.length > 0 ? (
              <NotFoundPage></NotFoundPage>
            ) : (
              <LoginPage></LoginPage>
            )
          }
        ></Route>
        <Route path="/order-page" element={<OrderPage></OrderPage>}></Route>
        <Route
          path="/detail-product"
          element={<DetailPage></DetailPage>}
        ></Route>
        {/* <Route path="*" element={<NotFoundPage></NotFoundPage>}></Route> */}
        <Route
          path="/userInfor-page"
          element={<InforUserPage></InforUserPage>}
        ></Route>
        {/* {
          Authen.length > 0 ? <redirect to="/" > :  <NotFoundPage></NotFoundPage>
        } */}
        {auth.length > 0 &&
        auth[0]?.department != "No person" &&
        auth[0].position != "Client" ? (
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
            <Route
              path="/manage/categorys"
              element={<CategoryManage></CategoryManage>}
            ></Route>
            <Route
              path="/manage/brands"
              element={<BrandManage></BrandManage>}
            ></Route>
            <Route
              path="/manage/materials"
              element={<MaterialManage></MaterialManage>}
            ></Route>
            <Route
              path="/manage/orders"
              element={<OrderManage></OrderManage>}
            ></Route>
          </Route>
        ) : (
          <Route path="*" element={<NotFoundPage></NotFoundPage>}></Route>
        )}
      </Routes>
    </div>
  );
}

export default App;
