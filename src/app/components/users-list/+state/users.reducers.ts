import { createFeature, createReducer, on } from "@ngrx/store";
import * as UsersActions from './users.action';
import { IUser } from "../../../interface/user.inteface";

export const USERS_FEATURE_KEY = 'users';

export interface UsersState{
    users: IUser[],
}

export const initialState: UsersState = {
    users: [],
}

export const usersFeature = createFeature({
    name: 'users',
    reducer: createReducer(
    initialState,
    // Load User
    on(UsersActions.loadUsers, (state) => ({
        ...state,
    })),
    on(UsersActions.loadUsersSucces, (state, {users}) => ({
        ...state, 
        users: users
    })),

    // Add User
    on(UsersActions.createUsersSucces, (state, {newUser}) => ({
        ...state, 
        users: [...state.users, newUser]
    })),

    // Delete User
    on(UsersActions.deleteUsersSucces, (state, {id}) => ({
        ...state, 
        users: [...state.users.filter(user => user.id !== id)],
    })),
    
    // Edit User
    on(UsersActions.editUsersSucces, (state, {editData}) => ({
        ...state, 
        users: state.users.map( user => user.id === editData.id ? editData : user )
    })),
    )
})
