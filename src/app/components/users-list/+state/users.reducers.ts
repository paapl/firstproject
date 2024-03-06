import { createFeature, createReducer, on } from "@ngrx/store";
import * as UsersActions from './users.action';
import { UserInteface } from "../../../interface/user.inteface";

export const USERS_FEATURE_KEY = 'users';

export interface UsersState{
    users: UserInteface[],
    filterUsers: {name:string},
}

export const initialState: UsersState = {
    users: [],
    filterUsers: {name: ''},
}

export const usersFeature = createFeature({
    name: 'users',
    reducer: createReducer(
    initialState,
    // Load User
    on(UsersActions.loadUsersSuccess, (state, {users}) => ({
        ...state, 
        users: users,
    })),
    // Filter Users
    on(UsersActions.filterUsers, (state, name) => ({
        ...state,
        filterUsers: name 
    })),
    // Add User
    on(UsersActions.createUsers, (state, {newUser}) => ({
        ...state, 
        users: [...state.users, newUser]
    })),
    // Delete User
    on(UsersActions.deleteUsers, (state, {id}) => ({
        ...state, 
        users: [...state.users.filter(user => user.id !== id)],
    })),
    // Edit User
    on(UsersActions.editUsers, (state, {editData}) => ({
        ...state, 
        users: state.users.map( user => user.id === editData.id ? editData : user )
    })),
    )
})
