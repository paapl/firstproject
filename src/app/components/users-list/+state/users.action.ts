import { createAction, props } from "@ngrx/store";
import { IUser } from "../../../interface/user.inteface";

export const loadUsers = createAction('[Users load] loadUsers');
export const loadUsersSucces = createAction('[Users Load Succes] loadUsersSucces', props<{users: IUser[]}>());
export const loadUsersError = createAction('[Users Load Error] loadUsersError', props<{errorMsg: string}>());

export const createUsers = createAction('[Users create] createUsers', props<{newUser: IUser}>());
export const createUsersSucces = createAction('[Users Create Succes] createUsersSucces', props<{newUser:IUser}>());
export const createUsersError = createAction('[Users Create Error] createUsersError', props<{errorMsg: string}>());

export const deleteUsers = createAction('[User delete] deleteUser', props<{id:number}>());
export const deleteUsersSucces = createAction('[User Delete Succes] deleteUsersSucces', props<{id:number}>());
export const deleteUsersError = createAction('[User Delete Error] deleteUsersError', props<{errorMsg: string}>());

export const editUsers = createAction('[Users edit] editUser', props<{editData: IUser}>());
export const editUsersSucces = createAction('[Users Edit Succes] editUsersSucces', props<{editData:IUser}>());
export const editUserError = createAction('[Users Edit Error] editUsersError', props<{errorMsg: string}>());

