import Header from "./components/Header";
import InputOutput from "./components/InputOutput";
import Footer from "./components/Footer";
import Modal from "./components/Modal";
import { useEffect, useState } from "react";
import { ToastContainer } from 'react-toastify';
import "bootstrap/dist/css/bootstrap.min.css";
import 'react-toastify/dist/ReactToastify.css';
import "./App.css";

function App() {
  const [backendData, setBackendData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  // get items on load
  useEffect(() => {
    fetch("/items")
      .then((response) => response.json())
      .then((data) => {
        setBackendData(data);
      });
  }, []);

  // refresh the items
    const getItems = async () => {
        try {
          fetch("/items")
      .then((response) => response.json())
      .then((data) => {
        setBackendData(data);
      });
        } catch (err) {}
      };

  return (
    <div className="App">
      <ToastContainer autoClose={2000} pauseOnFocusLoss={false} pauseOnHover={false}/> 
      <Header />
      <div className="container">
        <div className="row">
        <div className="col-lg-4 col-md-4">
          <InputOutput getItems={getItems} />
        </div>

        <div className="col-lg-8 col-md-8">
          <div className="k-container">
            {typeof backendData === "undefined" ? (
              <p>Loading...</p>
            ) : (
              backendData.map((item) => (
                <div
                className="card shadow-sm"
                key={item._id}
                onClick={() => setSelectedItem(item)}
                >
                  <img src={item.img} className="card-img-top" alt="..."></img>
                  <div className="card-body">
                  <p className="fw-normal">{item.name}</p>
                  <p className="fw-normal">{item.qty} pieces</p>
                  <p className="fw-light">{item.description}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        </div>
      </div>

      {selectedItem && (
        <Modal selectedItem={selectedItem} setSelectedItem={setSelectedItem} getItems={getItems} />
      )}

      <Footer/>
    </div>
  );
}

export default App;
