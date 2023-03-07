import { useState } from 'react'
import './App.css'
import { useGetContactsByIdQuery, useGetContactsQuery } from './services/api'

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

export default App
