import {BrowserRouter,Routes,Route} from "react-router-dom"
import RequireAuth from "./components/RequireAuth";
import Layout from "./components/Layout";
import Home from "./pages/home/Home"
import Browse from "./pages/browse/Browse";
import Book from "./pages/book/Book";
import SignUp from "./pages/signUp/SignUp";
import SignIn from "./pages/signIn/SignIn"
import Backlog from "./pages/backlog/Backlog";
import Profile from "./pages/profile/Profile";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout/>}>
            {/*Public routes*/}
            <Route path="/signup" element={<SignUp/>}/>
            <Route path="/signin" element={<SignIn/>}/>
            <Route path="/" element={<Home/>}/>
              <Route path="/browse" element={<Browse/>}/>
              <Route path="/books/:id" element ={<Book/>}/>

            {/*Protected routes*/}
            <Route element ={<RequireAuth/>}>
              <Route path = "/profile/:id" element={<Profile/>}/>
              
            </Route>
            

          </Route>
        </Routes>
      
      </BrowserRouter>
    </div>
  );
}

export default App;
