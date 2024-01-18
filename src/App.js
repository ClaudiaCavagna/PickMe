import Homepage from './screen/home-screen';
import Paginated from "./screen/paginated-screen";
import Checkout from "./screen/checkout-screen";
import Header from './components/Header';
import Footer from './components/Footer';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/photo/:page' element={<Paginated />} />
        <Route path='/checkout/' element={<Checkout />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
