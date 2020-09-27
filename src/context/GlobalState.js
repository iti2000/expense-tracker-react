import React ,{createContext,useEffect,useReducer} from 'react';
import AppReducer from './AppReducer';

//Initial state
const initialState = {
    transactions: []
}

//Create context 
export const GlobalContext = createContext(initialState);

//provider component
export const GlobalProvider = ({children})=>{
    const [state,dispatch] = useReducer(AppReducer,initialState);

    useEffect(()=>{
        let list = JSON.parse(localStorage.getItem('trans'))
        if( list.length > 0){
            // eslint-disable-next-line
            list.map((tran)=>{
                dispatch({
                    type : 'ADD_TRANSACTION',
                    payload : tran
                })
            })
        }
    },[])
    
    useEffect(() => {
        localStorage.setItem("trans",JSON.stringify(state.transactions))
    }, [state])
    
    //Actions
    function deleteTransaction(id){
        dispatch({
            type : 'DELETE_TRANSACTION',
            payload : id

        })
    }
    function addTransaction(transaction){
        dispatch({
            type : 'ADD_TRANSACTION',
            payload : transaction

        })
    }

    return(<GlobalContext.Provider value={{
        transactions : state.transactions,
        deleteTransaction,
        addTransaction
    }}>
        {children}
    </GlobalContext.Provider>)
}