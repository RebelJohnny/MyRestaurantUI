import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const restaurantSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://localhost:7199/api',
        prepareHeaders: (headers) => {
            return headers;
        },
    }),
    endpoints: () => ({}),
    tagTypes: ['MealPeriod', 'MenuItem', 'Personnel', 'Menu', 'ReservedOrder']
})