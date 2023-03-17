import { Contact } from '../model/contactModel';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const contactsApi = createApi({
    reducerPath: "contactsApi",
    baseQuery: fetchBaseQuery({baseUrl: "http://localhost:3006/"}),
    //Auto Fetch
    tagTypes: ['Contact'],
    endpoints:(builder) => ({
        getContacts: builder.query<Contact[], void>({
           query: () => '/contacts',
           //Auto Fetch
           providesTags: ['Contact']
        }),
        getContactsById: builder.query<Contact, string>({
           query: (id) => `contacts/${id}`,
           //Auto Fetch
           providesTags: ['Contact']
        }),
        addContacts: builder.mutation<void, Contact> ({
            query: contact => ({
                url: '/contacts',
                method: 'POST',
                body: contact
            }),
            //Auto Fetch
            invalidatesTags: ['Contact']
        }),
        updateContacts: builder.mutation<void, Contact> ({
            query: ({id, ...rest}) => ({
                url: `/contacts/${id}`,
                method: 'PUT',
                body: rest
            }),
            //Auto Fetch
            invalidatesTags: ['Contact']
        }),
        deleteContacts: builder.mutation<void, string> ({
            query: (id) => ({
                url: `/contacts/${id}`,
                method: 'DELETE',
            }),
            //Auto Fetch
            invalidatesTags: ['Contact']
        })
    })
})

export const { 
    useGetContactsQuery,
    useGetContactsByIdQuery,
    useAddContactsMutation,
    useUpdateContactsMutation,
    useDeleteContactsMutation
} = contactsApi;