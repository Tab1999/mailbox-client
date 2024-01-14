import { createSlice } from "@reduxjs/toolkit";

const mailSlice = createSlice({
    name:'mail',
    initialState:{
        mails: [],
    },
    reducers:{
        sendMail(state, action){
            state.mails.push(action.payload);
        }
    }
})

export const  mailAction = mailSlice.actions;
// export const selectMails = (state) => state.mail.mails; // Select the mails from the state
export default mailSlice.reducer