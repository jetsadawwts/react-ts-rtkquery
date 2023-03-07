import { Contact } from '../model/contactModel';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const contactsApi = createApi({
    reducerPath: "contactsApi",
    baseQuery: fetchBaseQuery({baseUrl: "http://localhost:3006/"}),
    endpoints:(builder) => ({
        getContacts: builder.query<Contact[], void>({
           query: () => '/contacts'
        }),
        getContactsById: builder.query<Contact, string>({
           query: (id) => `contacts/${id}`
        })
    })
})

export const { useGetContactsQuery, useGetContactsByIdQuery } = contactsApi;