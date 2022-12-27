import React, { useContext, useEffect, useState } from "react"
import Data from "../components/Data"
import { ToDoListContext } from "../context/TodoListApp"


export default function Home() {
  const [message, setMessage] = useState('')
  const {
    checkWalletConnect,
    connectWallet,
    toDoList,
    getTodolist,
    change,
    currentAccount,
    error,
    allToDoList,
    myList,
    allAddress
  } = useContext(ToDoListContext)
  useEffect(() => {
    checkWalletConnect()
    getTodolist()
  }, [])

  return (
    <>
      <div className=''>
        hell
      </div>
      {!currentAccount ?
        (<button onClick={() => connectWallet()}>
          Connect Wallet
        </button>)
        : (<button>{currentAccount.slice(0, 5)}... </button>)
      }

      <div>
        {
          myList.map((eL, i) => (
            <p>
              {eL.slice(0, 30)}..
            </p>
          ))}
      </div>

      <div>
        <h2>Craete Blockchain TodoList</h2>
        <input type="text" placeholder="Ether your todo" onChange={(e) => setMessage(e.target.value)} />
        {
          currentAccount ?
            (
              <button onClick={() => toDoList(message)}>
                currentAccountButton TodoList
              </button>
            ) : (
              <button onClick={() => connectWallet()}>
                currentAccountButton connectWallet
              </button>
            )
        }

        <Data allToDoList={allToDoList}
          allAddress={allAddress}
          myList={myList}
          change={change}
        />
      </div>
    </>
  )
}
