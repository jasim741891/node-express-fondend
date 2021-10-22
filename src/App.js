
import { useEffect, useRef, useState } from 'react';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);
  const nameRef = useRef()
  const emailRef = useRef()
  useEffect(() => {
    fetch("http://localhost:5000/users")
      .then(res => res.json())
      .then(data => setUsers(data))
  }, [])

  const handle = e => {
    const name = nameRef.current.value
    const email = emailRef.current.value
    const newUser = { name: name, email: email }


    fetch("http://localhost:5000/users", {
      method: "post",
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(newUser)

    })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        const addedUser = data;
        const newUsers = [...users, addedUser]
        setUsers(newUsers)
      })
    nameRef.current.value = ""
    emailRef.current.value = ""

    e.preventDefault()
  }





  return (
    <div className="App">
      <h1>This is length : {users.length}</h1>

      <form onSubmit={handle}>
        <input type="text" ref={nameRef} placeholder="name" />
        <input ref={emailRef} type="email" name="email" id="" placeholder="email" />
        <input type="submit" value="submit" />
      </form>
      <ul>
        {
          users.map(user => <li key={user.id}>{user.name}</li>)
        }
      </ul>
    </div>
  );
}

export default App;
