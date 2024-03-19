import { createAction, props } from "@ngrx/store";
import { User } from "../../../interface/user.inteface";

export const loadUsers = createAction('[USERS] Load Users');
export const loadUsersSuccess = createAction('[USERS/API] Load Users Success', props<{ users: User[] }>());
export const loadUsersFailed = createAction('[USERS/API] Load Users Failed', props<{ error: any }>());


export const deleteUsers = createAction('[USERS] Delete User Success', props<{ id:number }>());
export const deleteUserSuccess = createAction('[USERS/API] Delete User Success', props<{ id:number }>());
export const deleteUsersFailed = createAction('[USERS/API] Delete User Failed', props<{ error: any }>());


export const createUsers = createAction('[USERS] Create Users', props<{ newUser: User }>());
export const createUsersSuccess = createAction('[USERS/API] Create Users Success', props<{ newUser: User }>());
export const createUsersFailder = createAction('[USERS/API] Create Users Failed', props<{ error: any }>());


export const editUsers = createAction('[USERS] Edit User', props<{ editUser: User, id: number }>());
export const editUsersSuccess = createAction('[USERS/API] Edit User Success', props<{ editUser: User }>());
export const editUsersFailed = createAction('[USERS/API] Edit User Failed', props<{ error: any }>());

export const filterUsers = createAction('[USERS] Filter Users', props<{ name:string }>());