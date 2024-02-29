import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  isLoading:true,
  userInfo:null
}

export const userSlice = createSlice({
  name:"user",
  initialState,
  reducers:{
    setUserLoading: (state,action) => {
      state.isLoading = action.payload
    },
    setUser: (state,action) => {
      state.userInfo = action.payload
    },
    
    

  }
})

export const {setUserLoading,setUser} = userSlice.actions;

export default userSlice.reducer