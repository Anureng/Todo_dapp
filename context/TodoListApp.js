import { ethers, logger } from 'ethers'
import React, { useState } from 'react'
import Web3Modal from 'web3modal'

//INTERNAL IMPORT
import { toDoListAdress, toDoListABI } from './constant'

const fetchContracts = (signerOrProvider) =>
    new ethers.Contract(toDoListAdress, toDoListABI, signerOrProvider)

export const ToDoListContext = React.createContext();



export const ToDoListProvider = ({ children }) => {
    const [currentAccount, setCurrentAccount] = useState('')
    const [error, setError] = useState('')
    const [allToDoList, setAllToDoList] = useState([])
    const [myList, setMyList] = useState([])
    const [allAddress, setAllAddress] = useState([]);

    // COONECTING METAMASK
    const checkWalletConnect = async () => {

        if (!window.ethereum) return setError("Please install metamask");

        const account = await window.ethereum.request({ method: "eth_accounts" })
        console.log(account[0]);
    }

    // CONNECT WALLET
    const connectWallet = async () => {
        if (!window.ethereum) return setError("Please install metamask");

        const account = await window.ethereum.request({ method: "eth_requestAccounts" })
        setCurrentAccount(account[0])
    }

    //INTERACTING WITH SMART CONTRACT
    const toDoList = async (message) => {
        try {
            //CONNECTING WITH SMART CONTRACT
            const web3modal = new Web3Modal()
            const connection = await web3modal.connect()
            const provider = new ethers.providers.Web3Provider(connection);
            const signer = provider.getSigner();
            const contract = await fetchContracts(signer);
            console.log(contract);

            const createlist = await contract.createList(message);
            createlist.wait()
            console.log(createlist);
        } catch (error) {
            setError(error)
        }
    }

    const getTodolist = async () => {
        try {
            //CONNECTING WITH SMART CONTRACT
            const web3modal = new Web3Modal()
            const connection = await web3modal.connect()
            const provider = new ethers.providers.Web3Provider(connection);
            const signer = provider.getSigner();
            const contract = await fetchContracts(signer);


            //GET DATA
            const getAllAddress = await contract.getAddress();
            setAllAddress(getAllAddress)
            console.log(getAllAddress);

            getAllAddress.map(async (eL) => {
                const getSingleData = await contract.getCreatorData(eL);
                allToDoList.push(getSingleData);

            })

            const allMessage = await contract.getMessage();
            setMyList(allMessage)
        } catch (error) {
            setError("something wrong with getData", error);
        }
    }

    //CHANGE THE TODO LIST OF STATE TRUE OR FALSE
    const change = async (address) => {
        try {
            const web3modal = new Web3Modal()
            const connection = await web3modal.connect()
            const provider = new ethers.providers.Web3Provider(connection);
            const signer = provider.getSigner();
            const contract = await fetchContracts(signer);

            const state = await contract.toggle(address)
            state.wait();
            console.log(state);
        } catch (error) {
            setError("something wrong with state", error);
        }

    }

    return (
        <ToDoListContext.Provider value={{
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

        }}>
            {children}
        </ToDoListContext.Provider>
    )
}
