import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface UserState {
  "userId": String,
  "username": String, //用户名
  "nickname": String, //昵称
  "userType": String, //用户类型[0:超级管理员,1:普通管理员,2:普通用户,3:附属用户]
  "image": String, //头像
  "email": String, //邮箱
  "sex": Number, //性别【0:女,1:男】
  "age": Number, //年龄
  "realName": String, //真实姓名
  "token": String
}

const initialState: UserState = {
  "userId": '',
  "username": '', //用户名
  "nickname": '', //昵称
  "userType": '', //用户类型[0:超级管理员,1:普通管理员,2:普通用户,3:附属用户]
  "image": '', //头像
  "email": '', //邮箱
  "sex": '', //性别【0:女,1:男】
  "age": '', //年龄
  "realName": '', //真实姓名
  token: '',
}

export const usersSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    increment: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
    },
    decrement: (state) => {
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
    },
    setUsers: (state, users) => {
      const { userInfo, token } = users.payload
      return {
        ...state,
        "userId": userInfo.userId,
        "username": userInfo.username, //用户名
        "nickname": userInfo.nickname, //昵称
        "userType": userInfo.userType, //用户类型[0:超级管理员,1:普通管理员,2:普通用户,3:附属用户]
        "image": userInfo.image, //头像
        "email": userInfo.email, //邮箱
        "sex": userInfo.sex, //性别【0:女,1:男】
        "age": userInfo.age, //年龄
        "realName": userInfo.realName, //真实姓名
        "token": token
      }
    }
  },
})

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount, setUsers } = usersSlice.actions

export default usersSlice.reducer