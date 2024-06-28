import productsReducer from "./slices/productsReducer";
const { configureStore } = require("@reduxjs/toolkit");
import cartReducer from "./slices/cartReducer";
import modeReducer from "./slices/ModeReducer";
import orderReducer from "./slices/orderReducer";
const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
    order: orderReducer,
    mode: modeReducer,
  },
});

export default store;
