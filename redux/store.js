import { configureStore } from '@reduxjs/toolkit'
import { displayPopUpAlertReducer } from './features/displaySlice'

export const store = configureStore({
  reducer: {
    displayPopUpAlert: displayPopUpAlertReducer,
  },
})