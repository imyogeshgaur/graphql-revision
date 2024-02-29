import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { UserInterface } from "../interface/RegisterInterface";

const userSlice = createSlice({
    initialState: {
        nameOfUser: "",
        emailOfUser: "",
        phoneNumber: "",
        password: "",
    },
    name: "User",
    reducers: {
        addUserData: (state: UserInterface, action:
            PayloadAction<
                {
                    nameOfUser: string;
                    emailOfUser: string;
                    phoneNumber: string;
                    password: string
                }>) => {
            state.nameOfUser = action.payload.nameOfUser
            state.emailOfUser = action.payload.emailOfUser
            state.phoneNumber = action.payload.phoneNumber
            state.password = action.payload.password
        }
    }
})


export const {addUserData} = userSlice.actions;
export default userSlice.reducer;