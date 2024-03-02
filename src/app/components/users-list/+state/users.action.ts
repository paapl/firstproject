import { createAction, props } from "@ngrx/store";
import { IUser } from "../../../interface/user.inteface";

export const loadUsers = createAction('[USERS LOAD] loadUsers');
export const loadUsersSucces = createAction('[USERS LOAD SUCCES] loadUsersSucces', props<{users: IUser[]}>());

export const createUsers = createAction('[USERS CREATE] createUsers', props<{newUser: IUser}>());
export const createUsersSucces = createAction('[USERS CREATE SUCCES] createUsersSucces', props<{newUser:IUser}>());

export const deleteUsers = createAction('[USER DELETE] deleteUser', props<{id:number}>());
export const deleteUsersSucces = createAction('[USER DELETE SUCCES] deleteUsersSucces', props<{id:number}>());

export const editUsers = createAction('[USERS EDIT] editUser', props<{editData: IUser}>());
export const editUsersSucces = createAction('[USERS EDIT SUCCES] editUsersSucces', props<{editData:IUser}>());