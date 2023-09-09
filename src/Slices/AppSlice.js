import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data:[]
}

export const AppSlice = createSlice({
  name: 'AppSlice',
  initialState,
  reducers: {
    starsData: (state, action) => {
      state.data = action.payload
    }
  }
})

export const { starsData } = AppSlice.actions
  
export default AppSlice.reducer