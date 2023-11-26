import './scss/app.scss'
import {Home} from "./pages/Home";
import {Route, Routes} from "react-router-dom";
import React from "react";
import {MainLayout} from "./layoouts/MainLayout";

const Cart = React.lazy(() => import(/*webpackChunkName: "Cart" */ "./pages/Cart")
    .then(module => ({default: module.Cart})));
const NotFound = React.lazy(() => import(/*webpackChunkName: "NotFound" */ "./pages/NotFound")
    .then(module => ({default: module.NotFound})));
const FullPizza = React.lazy(() => import(/*webpackChunkName: "FullPizza" */ "./pages/FullPizza")
    .then(module => ({default: module.FullPizza})));

function App() {
    return (
        <Routes>
            <Route path={'/'} element={<MainLayout/>}>
                <Route path={''} element={<Home/>}/>
                <Route path={'cart'} element={
                    <React.Suspense fallback={<>Loading...</>}>
                        <Cart/>
                    </React.Suspense>
                }/>
                <Route path={'pizza/:id'} element={
                    <React.Suspense fallback={<>Loading...</>}>
                        <FullPizza/>
                    </React.Suspense>
                }/>
                <Route path={'*'} element={
                    <React.Suspense fallback={<>Loading...</>}>
                        <NotFound/>
                    </React.Suspense>
                }/>
            </Route>
        </Routes>
    );
}

export default App;
