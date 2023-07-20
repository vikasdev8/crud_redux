import {configureStore, } from '@reduxjs/toolkit';
import {fetchBaseQuery, createApi} from '@reduxjs/toolkit/query/react';

const APIS = createApi({
    reducerPath:"api",
    baseQuery: fetchBaseQuery({baseUrl:"http://localhost:3005/"}),
    tagTypes:["getimage"],
    endpoints:(builder)=>({
        Register: builder.mutation({
            query:(data)=>({
                method:"POST",
                url:"register",
                body:data
            })
        }),
        Login: builder.mutation({
            query:(data)=>({
                method:"POST",
                url:"login",
                body:data,
                credentials:"include",
            })
        }),
        uploadImage: builder.mutation({
            query:(data)=>({
                method:"POST",
                url:"uploadImage",
                body:data,
                credentials:"include",
            }),
            invalidatesTags:["getimage"]
        }),
        getImages: builder.query({
            query:(data)=>({
                method:"POST",
                url:"getImages",
                body:data,
                credentials:"include",
            }),
            providesTags:["getimage"]
        }),
        Delete: builder.mutation({
            query:(id)=>({
                method:"DELETE",
                url:`delete/${id}`,
                credentials:"include",
            }),
            invalidatesTags:["getimage"]
        }),
    })
})

const store = configureStore({
    reducer:{
        [APIS.reducerPath]: APIS.reducer
    },
    middleware:(getDefaultMiddleware)=> {
       return getDefaultMiddleware().concat(APIS.middleware)
    }
})

export const {useRegisterMutation, useLoginMutation, useUploadImageMutation, useGetImagesQuery, useDeleteMutation} = APIS;

export default store

