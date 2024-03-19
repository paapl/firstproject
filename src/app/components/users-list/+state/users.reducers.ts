import { createFeature, createReducer, on } from "@ngrx/store";
import * as UsersActions from './users.action';
import { User } from "../../../interface/user.inteface";

export const USERS_FEATURE_KEY = 'users';

export interface UsersState{
    users: User[],
    filterUsers: { name:string },
}

export const initialState: UsersState = {
    users: [],
    filterUsers: {name: ''},
}

export const usersFeature = createFeature({
    name: 'users',
    reducer: createReducer(
    initialState,
    on(UsersActions.loadUsersSuccess, (state, { users }) => ({
        ...state, 
        users: users,
    })),
    on(UsersActions.filterUsers, (state, name) => ({
        ...state,
        filterUsers: name 
    })),
    on(UsersActions.createUsers, (state, { newUser }) => ({
        ...state, 
        users: [...state.users, newUser]
    })),
    on(UsersActions.deleteUserSuccess, (state, { id }) => ({
        ...state, 
        users: state.users.filter(user => user.id !== id),
    })),
    on(UsersActions.editUsers, (state, { editUser }) => ({
        ...state, 
        users: state.users.map( user => user.id === editUser.id ? editUser : user )
    })),
    )
})
