import React from "react";
// import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { store } from "./store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { BrowserRouter as Router } from "react-router-dom";
import "swiper/css/bundle";

import ReactDOM from "react-dom";
import "./index.css";
// import registerServiceWorker from "./registerServiceWorker";

// const root = ReactDOM.createRoot(document.getElementById("root"));
let persistor = persistStore(store);

ReactDOM.render(
  <div>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <App />
        </Router>
      </PersistGate>
    </Provider>
  </div>,
  document.getElementById("root")
);
// registerServiceWorker();
// root.render(
//   <Provider store={store}>
//     <PersistGate loading={null} persistor={persistor}>
//       <Router>
//         <App />
//       </Router>
//     </PersistGate>
//   </Provider>
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();