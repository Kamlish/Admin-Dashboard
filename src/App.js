import Home from "./container/home/Home";
import Login from "./container/login/Login";
import List from "./container/list/List";
import Single from "./container/single/Single";
import New from "./container/new/New";
import "./style/dark.scss";

import {BrowserRouter,Routes,Route, Navigate} from "react-router-dom";
import { userInputs, productInputs } from "./formSource";

import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";

import { AuthContext } from "./context/AuthContext";


function App() {

  const { darkMode } = useContext(DarkModeContext);

  const {currentUser} = useContext(AuthContext)

  const RequireAuth = ({children}) => {
    return currentUser ? children : <Navigate to="/login"/>
  }

  return (
    <div className= {darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route  path="login" element={<Login/>}/>
            <Route index element={<RequireAuth><Home/></RequireAuth>}/>
            <Route path="users">
              <Route index element={<RequireAuth><List/></RequireAuth>}/>
              <Route path=":userId" element={<RequireAuth><Single/></RequireAuth>}/>
              <Route path="new" element={<RequireAuth><New inputs = {userInputs} title="Add New User"/></RequireAuth>}/>
            </Route>
            <Route path="products">
              <Route index element={<RequireAuth><List/></RequireAuth>}/>
              <Route path=":productsId" element={<Single/>}/>
              <Route path="new" element={<RequireAuth><New inputs = {productInputs} title="Add New Products"/></RequireAuth>}/>
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
