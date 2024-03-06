import { createAction, props } from "@ngrx/store";
import { UserInteface } from "../../../interface/user.inteface";

export const loadUsers = createAction('[USERS] loadUsers');
export const loadUsersSuccess = createAction('[USERS] loadUsersSuccess', props<{ users: UserInteface[] }>());
export const createUsers = createAction('[USERS] createUsers', props<{ newUser: UserInteface }>());
export const deleteUsers = createAction('[USER] deleteUser', props<{ id:number }>());
export const editUsers = createAction('[USERS] editUser', props<{ editData: UserInteface }>());
export const filterUsers = createAction('[USERS] filterUsers', props<{ name:string }>());