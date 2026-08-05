import { providesListTag } from "../providesListTag";
import { restaurantSlice } from "../restaurantSlice";

const mealPeriodApis = restaurantSlice.injectEndpoints({
    endpoints: (builder) => ({
        createMealPeriod: builder.mutation({
            query: ({ args }) => ({
                url: `MealPeriod`,
                method: 'POST',
                body: args
            }),
            transformResponse: (response) => response.data,
            transformErrorResponse: (response) => response.data.problem,
            invalidatesTags: [{ type: 'MealPeriod', id: 'LIST' }]
        }),
        getMealPeriods: builder.query({
            query: () => ({
                url: `MealPeriod`,
            }),
            transformResponse: (response) => response.data,
            transformErrorResponse: (response) => response.data.problem,
            providesTags: (result) => providesListTag(result, 'MealPeriod')
        }),
        updateMealPeriod: builder.mutation({
            query: ({ id, args }) => ({
                url: `MealPeriod/${id}`,
                method: 'PUT',
                body: args
            }),
            transformErrorResponse: (response) => response.data.problem,
            invalidatesTags: (_result, _error, arg) => [{ type: 'MealPeriod', id: arg.id }]
        }),
        deleteMealPeriod: builder.mutation({
            query: (id) => ({
                url: `MealPeriod/${id}`,
                method: 'DELETE'
            }),
            transformErrorResponse: (response) => response.data.problem,
            invalidatesTags: [{ type: 'MealPeriod', id: 'LIST' }]
        }),
        getMealPeriodById: builder.query({
            query: (id) => `MealPeriod/${id}`,
            transformResponse: (response) => response.data,
            transformErrorResponse: (response) => response.data.problem,
            keepUnusedDataFor: 0
        }),
        activateMealPeriod: builder.mutation({
            query: (id) => ({
                url: `MealPeriod/Activate/${id}`,
                method: 'PUT'
            }),
            transformResponse: (response) => response.data,
            transformErrorResponse: (response) => response.data.problem,
            async onQueryStarted(id , { dispatch, queryFulfilled }) {
                const patchResult = dispatch(
                    api.util.updateQueryData('getMealPeriods', id, (draft) => {
                        Object.assign(draft, { isActive: true })
                    }),
                )
                try {
                    await queryFulfilled
                } catch {
                    patchResult.undo()
                }
            },
        }),
        deactivateMealPeriod: builder.mutation({
            query: (id) => ({
                url: `MealPeriod/Deactivate/${id}`,
                method: 'PUT'
            }),
            transformResponse: (response) => response.data,
            transformErrorResponse: (response) => response.data.problem,
            async onQueryStarted(id, { dispatch, queryFulfilled }) {
                const patchResult = dispatch(
                    api.util.updateQueryData('getMealPeriods', id, (draft) => {
                        Object.assign(draft, { isActive: false })
                    }),
                )
                try {
                    await queryFulfilled
                } catch {
                    patchResult.undo()
                }
            },
        })
    })
})

export const {
    useCreateMealPeriodMutation,
    useGetMealPeriodsQuery,
    useUpdateMealPeriodMutation,
    useDeleteMealPeriodMutation,
    useGetMealPeriodByIdQuery,
    useActivateMealPeriodMutation,
    useDeactivateMealPeriodMutation
} = mealPeriodApis;