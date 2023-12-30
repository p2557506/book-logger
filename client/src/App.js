import {BrowserRouter,Routes,Route} from "react-router-dom"
import Home from "./pages/home/Home"
import Browse from "./pages/browse/Browse";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/browse" element={<Browse/>}/>
        </Routes>
      
      </BrowserRouter>
    </div>
  );
}

export default App;
