import { restaurantSlice } from "@/features/restaurantSlice";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
    reducer: {
        [restaurantSlice.reducerPath] : restaurantSlice.reducer
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(restaurantSlice.middleware);
    }
});