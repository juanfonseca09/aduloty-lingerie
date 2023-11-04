import { configureStore } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";


const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    quantity: 0,
    total: 0,
    orderId: null,
  },
  reducers: {
    addProduct: (state, action) => {
      const { code, ...product } = action.payload;
      state.quantity += 1;
      state.products.push({ ...product, code });
      state.total += product.price * product.quantity;
    },
    removeProduct: (state, action) => {
      const index = action.payload;
      const productToRemove = state.products[index];
      if (productToRemove) {
        state.total -= productToRemove.price * productToRemove.quantity;
        state.products.splice(index, 1);
        state.quantity = state.products.length;
      }
    },
    setOrderId: (state, action) => {
      state.orderId = action.payload;
    },
    resetCart: (state) => {
      state.products = [];
      state.quantity = 0;
      state.total = 0;
    },
  },
});

const persistConfig = {
  key: "root", 
  storage, 
};

const persistedReducer = persistReducer(persistConfig, cartSlice.reducer);

const store = configureStore({
  reducer: {
    cart: persistedReducer,
  },
});

export const { addProduct, removeProduct, setOrderId, resetCart } = cartSlice.actions;

const persistor = persistStore(store); 

export { store, persistor };
