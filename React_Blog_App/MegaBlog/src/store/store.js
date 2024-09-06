import {configureStore} from '@reduxjs/toolkit';
import authSlice from "./authSlice"

const store = configureStore({
   reducer:{
      auth : authSlice,
    //   TOD): add more slices here 
   }
})

export default store;