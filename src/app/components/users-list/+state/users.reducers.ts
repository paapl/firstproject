import { createFeature, createReducer, on } from "@ngrx/store";
import * as UsersActions from './users.action';
import { IUser } from "../../../interface/user.inteface";

export const USERS_FEATURE_KEY = 'users';

export interface UsersState{
    users: IUser[],
    error: any | null,
}

export const initialState: UsersState = {
    users: [],
    error: null,
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
    on(UsersActions.loadUsersError, (state, {errorMsg}) => ({
        ...state,
        error: errorMsg
    })),

    // Add User
    on(UsersActions.createUsersSucces, (state, {newUser}) => ({
        ...state, 
        users: [...state.users, newUser]
    })),
    on(UsersActions.createUsersError, (state, {errorMsg}) => ({
        ...state, 
        error: errorMsg
    })),

    // Delete User
    on(UsersActions.deleteUsersSucces, (state, {id}) => ({
        ...state, 
        users: state.users.filter(users => users.id !== id)
    })),
    on(UsersActions.deleteUsersError, (state, {errorMsg}) => ({
        ...state,
        error: errorMsg
    })),
    
    // Edit User
    on(UsersActions.editUsersSucces, (state, {editData}) => ({
        ...state, 
        users: state.users.map( user => user.id === editData.id ? editData : user )
    })),
    on(UsersActions.editUserError, (state, {errorMsg}) => ({
        ...state, 
        error: errorMsg
    }))
    )
})
