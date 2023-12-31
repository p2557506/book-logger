import {BrowserRouter,Routes,Route} from "react-router-dom"
import Home from "./pages/home/Home"
import Browse from "./pages/browse/Browse";
import Book from "./pages/book/Book";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/browse" element={<Browse/>}/>
          <Route path="/books/:id" element ={<Book/>}/>
        </Routes>
      
      </BrowserRouter>
    </div>
  );
}

export default App;
