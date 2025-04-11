import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import { Elements } from "@stripe/react-stripe-js";
import reduxstore from "./redux/Store";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  "pk_test_51R5uPqHmVD6BfT4IyMZu1QZcwgnusHkQDVT5aUUoERk4PQf8h6MIldRMKytvTjKmqcIwLlWD7gFTQPXMaaTUm0O400vo4qf294"
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={reduxstore}>
      <Elements stripe={stripePromise}>
        <App />
      </Elements>
    </Provider>
    <ToastContainer />
  </StrictMode>
);
