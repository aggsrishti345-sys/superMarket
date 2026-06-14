import { Route, Routes } from "react-router-dom";
import Login from "./Login";
import Home from "./Home";
import Signup from "./Signup";
import Thanks from "./Thanks";
import SearchUser from "./SearchUser";
import ListofUsers from "./ListofUsers";
import ManageCategory from "./ManageCategory";
import ManageProduct from "./ManageProduct";
import AdminHome from "./AdminHome";
import Categories from "./Categories";
import Products from "./Products";
import ProdDetails from "./ProdDetails";
import ChangePassword from "./ChangePassword";
import ShowCart from "./ShowCart";
import Checkout from "./Checkout";
import OrderSummary from "./OrderSummary";
import OrderItems from "./OrderItems";
import ViewOrders from "./ViewOrders";
import UpdateStatus from "./UpdateStatus";
import SearchResults from "./SearchResults";
import OrderHistory from "./OrderHistory";

function SiteRoutes()
{
    return(
        <>
            <Routes>
                <Route path="/" element={<Home/>}></Route>
                <Route path="/login" element={<Login/>}></Route>
                <Route path="/homepage" element={<Home/>}></Route>
                <Route path="/signup" element={<Signup/>}></Route>
                <Route path="/thanks" element={<Thanks/>}></Route>
                <Route path="/searchuser" element={<SearchUser/>}></Route>
                <Route path="/listofusers" element={<ListofUsers/>}></Route>
                <Route path="/managecategory" element={<ManageCategory/>}></Route>
                <Route path="/manageproduct" element={<ManageProduct/>}></Route>
                <Route path="/adminhome" element={<AdminHome/>}></Route>
                <Route path="/categories" element={<Categories/>}></Route>
                <Route path="/products" element={<Products/>}></Route>
                <Route path="/details" element={<ProdDetails/>}></Route>
                <Route path="/changepassword" element={<ChangePassword/>}></Route>
                <Route path="/showcart" element={<ShowCart/>}></Route>
                <Route path="/checkout" element={<Checkout/>}></Route>
                <Route path="/ordersummary" element={<OrderSummary/>}></Route>
                <Route path="/orderitems" element={<OrderItems/>}></Route>
                <Route path="/vieworders" element={<ViewOrders/>}></Route>
                <Route path="/updatestatus" element={<UpdateStatus/>}/>
                <Route path="/search" element={<SearchResults/>}/>
                <Route path="/orderhistory" element={<OrderHistory/>}/>
            </Routes>
        </>
    )
}
export default SiteRoutes;