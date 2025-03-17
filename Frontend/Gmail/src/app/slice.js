import { createSlice } from "@reduxjs/toolkit";
const initialState={
    value:0,
    value2:false,
    user:null,
    emails:[],
    searchText:''
}

const slice = createSlice({
    initialState,
    reducers:{
        increment:(state)=>{
            state.value+=1

        },
        decrement:(state)=>{
                state.value-=1
        },
        incrementbyvalue:(state,action)=>{
               state.value+=action.payload
        },
        reset:(state)=>{
            state.value=0
            
        },
        remove:(state)=>{
            state.value2 =true
        },
        closemail:(state)=>{
         state.value2=false
        },
        setAuthuser:(state,action)=>{
         state.user=action.payload
        },
        setemails:(state,action)=>{
            state.emails=action.payload
        },
        setsearchText:(state,action)=>{
          state.searchText=action.payload
        }
        
    
        

    },
    name:'z'
})
export default slice.reducer;
export const {increment,decrement,incrementbyvalue,reset,remove,closemail,setAuthuser,setemails,setsearchText}= slice.actions

