import React, { useContext, useEffect, useState } from "react"
import Data from "../components/Data"
import { ToDoListContext } from "../context/TodoListApp"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
  })

  const notify = () => toast("Todo is Created");
  toast.success("Error Notification !", {
    position: toast.POSITION.TOP_LEFT
  });

  return (
    <>
      <div className="flex justify-between p-2 items-center" >
        <div className='text-xl '>
          Todo Apps
        </div>
        <div className="border border-black rounded-xl px-3 py-2">
          {!currentAccount ?
            (<button onClick={() => connectWallet()}  >
              Connect Wallet
            </button >)
            : (<button > Welcome👋 {currentAccount.slice(0, 5)}... </button>)
          }
        </div>
      </div>

      <div className="flex justify-around  p-6 h-screen">

        <div className=" h-fit px-4 py-2 ">
          <div className="border border-black p-4 rounded-lg">
            created Todo by <div className="text-blue-900">
              {currentAccount.slice(0, 5)}
            </div>
          </div>
          {

            myList.map((eL, i) => (
              <>
                <p>
                  {eL.slice(0, 30)}..
                </p>
              </>
            ))}
        </div>

        <div className="">
          <div className="p-4 space-y-4 space-x-4">

            <h2>Create Blockchain TodoList</h2>
            <input className="px-3 py-1 rounded-lg focus:outline-none" type="text" placeholder="Ether your todo" onChange={(e) => setMessage(e.target.value)} />

            {
              currentAccount ?
                (
                  <>
                    <button onClick={() => toDoList(message)}>
                      Create
                      TodoList
                    </button>
                  </>
                ) : (
                  <button onClick={() => connectWallet()}>
                    connectWallet
                  </button>
                )
            }
          </div>

          <Data allToDoList={allToDoList}
            allAddress={allAddress}
            myList={myList}
            change={change}
          />
        </div>
      </div>
    </>
  )
}
