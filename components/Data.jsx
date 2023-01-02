import React from 'react'
import { RiSendPlaneFill, RiCloseFill } from "react-icons/ri";
function Data({ allToDoList, allAddress, myList, change }) {

    return (
        <div className='border border-black border-b-2 p-3 h-fit rounded-2xl'>

            {
                allToDoList.length === 0 ? (
                    <div >No Data</div>
                ) : (
                    <div className='flex flex-col space-y-4'>
                        {allToDoList.map((el, i) => (
                            <div key={i + 1} className="flex items-center space-x-3 " >
                                <div>
                                    <p>{el[2]}</p>
                                </div>
                                <div className='flex text-red-900'>
                                    {el[3] === false ? (
                                        <RiCloseFill className=' cursor-pointer rounded-xl text-xl bg-white'
                                            onClick={() => change(el[0])}
                                        />
                                    ) : (
                                        <p >Deleted</p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )
            }
        </div>
    )
}
export default Data