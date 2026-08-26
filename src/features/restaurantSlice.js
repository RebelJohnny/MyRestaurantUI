import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const restaurantSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://localhost:7277/api',
        prepareHeaders: (headers) => {
            return headers;
        },
    }),
    endpoints: () => ({}),
    tagTypes: ['MealPeriod', 'Meal', 'Personnel', 'Menu', 'Reserve']
})