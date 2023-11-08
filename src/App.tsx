import {Header} from "./components/Header";
import './scss/app.scss'
import {Home} from "./pages/Home";
import {Route, Routes} from "react-router-dom";
import React, {useState} from "react";
import {NotFound} from "./pages/NotFound";
import {Cart} from "./pages/Cart";


export type SearchContextType = {
    searchValue: string;
    setSearchValue: (value: string) => void;
}
// export const SearchContext = React.createContext();

function App() {
    return (
        <div className="wrapper">

               <Header/>
               <div className="content">
                   <Routes>
                       <Route path={'/'} element={<Home />}/>
                       <Route path={'/cart'} element={<Cart/>}/>
                       <Route path={'*'} element={<NotFound/>}/>
                   </Routes>
               </div>

        </div>
    );
}

export default App;
