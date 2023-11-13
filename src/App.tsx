import './scss/app.scss'
import {Home} from "./pages/Home";
import {Route, Routes} from "react-router-dom";
import React from "react";
import {NotFound} from "./pages/NotFound";
//import {Cart} from "./pages/Cart";
import {FullPizza} from "./pages/FullPizza";
import {MainLayout} from "./layoouts/MainLayout";

const Cart = React.lazy(() => import("./pages/Cart")
    .then(module => ({ default: module.Cart } as { default: React.ComponentType<any> })));

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
                <Route path={'pizza/:id'} element={<FullPizza/>}/>
                <Route path={'*'} element={<NotFound/>}/>
            </Route>

        </Routes>

    );
}

export default App;
