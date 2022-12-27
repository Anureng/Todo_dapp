import React from 'react'
import { RiSendPlaneFill, RiCloseFill } from "react-icons/ri";
function Data({ allToDoList, allAddress, myList, change }) {

    return (
        <div>

            {
                allToDoList.length === 0 ? (
                    <div >No Data</div>
                ) : (
                    <div>
                        {allToDoList.map((el, i) => (
                            <div key={i + 1} >
                                <div >

                                    <p>{el[2]}</p>
                                </div>
                                {el[3] === false ? (
                                    <RiCloseFill
                                        onClick={() => change(el[0])}

                                    />
                                ) : (
                                    <p >Down</p>
                                )}
                            </div>
                        ))}
                    </div>
                )
            }
        </div>
    )
}
export default Data