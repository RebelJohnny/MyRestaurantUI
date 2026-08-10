import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const restaurantSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://192.168.10.182:7199/api',
        prepareHeaders: (headers) => {
            return headers;
        },
    }),
    endpoints: () => ({}),
    tagTypes: ['MealPeriod', 'Meal', 'Personnel', 'Menu', 'Reserve']
})