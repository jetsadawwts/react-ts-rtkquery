import { useState } from 'react'
import './App.css'
import { useAddContactsMutation, useDeleteContactsMutation, useGetContactsByIdQuery, useGetContactsQuery, useUpdateContactsMutation } from './services/api'

function App() {
  const { data, error, isLoading, isFetching, isSuccess } = useGetContactsQuery();

  return (
    <div className="App">
      <h1>React Redux Toolkit RTK Query Tutorial</h1>
      {isLoading && <h2>...Loading</h2>}
      {isFetching && <h2>...Fetching</h2>}
      {error && <h2>Something went wrong</h2>}
      {isSuccess && (
        <div>
          {data?.map(contact => {
            return <div className="data" key={contact.id}>
              <span>{contact.name}</span>
              <span><ContactDetail id={contact.id} /></span>
            </div>
          })}
        </div>
      )}
      <AddContact />
    </div>
  )
}


export const ContactDetail = ({ id }: { id: string }) => {
  const { data } = useGetContactsByIdQuery(id);
  return (
    <pre>
      {JSON.stringify(data, undefined, 2)}
    </pre>
  )
}

export const AddContact = () => {
  const [addContact] = useAddContactsMutation();
  const [updateContact] = useUpdateContactsMutation();
  const [deleteContact] = useDeleteContactsMutation();
  // Manual fetch api
  // const { refetch } = useGetContactsQuery();
  const contact = {
    "id": "6",
    "name": "Pon",
    "email": "Pon@gmail.com"
  }

  const contactUpdate = {
    "id": "6",
    "name": "Aof",
    "email": "Aof@gmail.com"
  }


  const addHandler = async () => {
    await addContact(contact);
    // refetch()
  }

  const updateHandler = async () => {
    await updateContact(contactUpdate);
    // refetch()
  }

  const deleteHandler = async () => {
    await deleteContact(contact.id);
    // refetch()
  }

  return (
    <>
      <button onClick={addHandler}>Add contact</button>
      <button onClick={updateHandler}>Update contact</button>
      <button onClick={deleteHandler}>Delete contact</button>
    </>
  )


}

export default App
