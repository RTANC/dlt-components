import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isLogin: false,
    userData: {
        UserID: null,
        RoleID: null,
        LoginName: null,
        token: null
    }
}

export const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        login: (state, payload) => {
            state.isLogin = true
            state.userData.UserID = payload.payload.UserID
            state.userData.RoleID = payload.payload.RoleID
            state.userData.LoginName = payload.payload.LoginName
            state.userData.token = payload.payload.token
        },
        logout: (state) => {
            state.isLogin = false
            state.userData = {
                UserID: null,
                RoleID: null,
                LoginName: null,
                token: null
            }
        }
    }
})

export const {login, logout} = loginSlice.actions
export default loginSlice.reducer