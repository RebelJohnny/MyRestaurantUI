import { buildQueryParams } from "../buildQueryParams";
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
        getAllMealPeriods: builder.query({
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
        }),
        getMealPeriodList: builder.query({
            query: ({ pagination, sorting, columnFilters, columnFilterFns }) => ({
                url: `MealPeriod/GetList`,
                body: buildQueryParams(pagination, sorting, columnFilters, columnFilterFns),
                method: 'POST'
            }),
            transformResponse: (response, meta) => {
                return {
                    data: response.data,
                    pagination: {
                        totalCount: meta.response.headers.get('X-Total-Count'),
                        pageIndex: meta.response.headers.get('X-Page-Index'),
                        pageSize: meta.response.headers.get('X-Page-Size'),
                        totalPages: meta.response.headers.get('X-Total-Pages'),
                    }
                }
            },
            transformErrorResponse: (response) => response.data.problem,
            providesTags: (result) => providesListTag(result.data, 'MealPeriod')
        }),
    })
})

export const {
    useCreateMealPeriodMutation,
    useGetAllMealPeriodsQuery,
    useUpdateMealPeriodMutation,
    useDeleteMealPeriodMutation,
    useGetMealPeriodByIdQuery,
    useActivateMealPeriodMutation,
    useDeactivateMealPeriodMutation,
    useGetMealPeriodListQuery
} = mealPeriodApis;