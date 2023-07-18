import {configureStore, } from '@reduxjs/toolkit';
import {fetchBaseQuery, createApi} from '@reduxjs/toolkit/query/react';

const APIS = createApi({
    reducerPath:"api",
    baseQuery: fetchBaseQuery({baseUrl:"http://localhost:3005/"}),
    endpoints:(builder)=>({
        Register: builder.mutation({
            query:(data)=>({
                url:"register",
                body:data
            })
        }),
        Login: builder.mutation({
            query:(data)=>({
                url:"login",
                body:data
            })
        }),
        uploadImage: builder.mutation({
            query:(data)=>({
                url:"uploadImage",
                body:data
            })
        }),
        getImages: builder.mutation({
            query:(data)=>({
                url:"getImages",
                body:data
            })
        }),
        Delete: builder.mutation({
            query:(id)=>({
                url:`delete/${id}`,
            })
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

export default store

