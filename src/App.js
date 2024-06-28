import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./Components/CommonComponents/Footer";
import Header from "./Components/CommonComponents/Header";
import Sidebar from "./Components/CommonComponents/Sidebar";
import Routers from "./Routes";
import { useLocation } from "react-router-dom";

function App() {
  const location = useLocation();
  const isLoginPage =
    location.pathname === "/" || location.pathname === "/login";

  return (
    <div className="wrapper">
      {!isLoginPage && (
        <>
          <Header />
          <Sidebar />
        </>
      )}
      <ToastContainer autoClose={false} />
      <Routers />
      <Footer />
    </div>
  );
}

export default App;
