import { Actions, createEffect, ofType } from "@ngrx/effects";
import { inject } from "@angular/core";
import { UserApiServiceService } from "../../../services/user-api-service.service";
import { catchError, map, of, switchMap, tap } from "rxjs";
import * as UserAction from './users.action';
import { UserlocalstorageService } from "../../../services/userlocalstorage.service";
import { IUser } from "../../../interface/user.inteface";

export const loadUsers = createEffect(
    () => {
        const actions$ = inject(Actions);
        const apiUsers = inject(UserApiServiceService);
        const localStorage = inject(UserlocalstorageService);

        return actions$.pipe(
            ofType(UserAction.loadUsers),
            switchMap(() => {
                const users = localStorage.getItem()
                if(users !== null){
                    return of(UserAction.loadUsersSucces({users: users}))
                } else {
                    return apiUsers.getUsers().pipe(
                        tap((data:IUser[]) => localStorage.setItem(data)),
                        map((data:IUser[]) => UserAction.loadUsersSucces({users: data})),
                        catchError(
                            (error: {message: string}) => of(UserAction.loadUsersError({errorMsg: error.message}))
                        )
                    )
                }
            })
        )
    },
    { functional: true }
);

export const createUsers = createEffect(
    () => {
        const actions$ = inject(Actions);
        const localStorage = inject(UserlocalstorageService);

        return actions$.pipe(
            ofType(UserAction.createUsers),
            switchMap( 
                ({newUser}) => localStorage.addUser(newUser).pipe(
                    map(() => UserAction.createUsersSucces({newUser: newUser})),
                    catchError(
                        (error: {message: string}) => of(UserAction.createUsersError({errorMsg: error.message}))
                    )
                )
            )
        )
    },
    { functional: true }
);

export const deleteUser = createEffect(
    () => {
        const actions$ = inject(Actions);
        const localStorage = inject(UserlocalstorageService);

        return actions$.pipe(
            ofType(UserAction.deleteUsers),
            switchMap(
                    ({id}) => localStorage.deletUser(id).pipe(
                        map(() => UserAction.deleteUsersSucces({id: id})),
                        catchError(
                            (error: {message: string}) => of(UserAction.createUsersError({errorMsg: error.message}))
                        )
                    )
                )
            )
    },
    { functional: true }
);

export const editUser = createEffect(
    () => {
        const actions$ = inject(Actions);
        const localStorage = inject(UserlocalstorageService);

        return actions$.pipe(
            ofType(UserAction.editUsers),
            switchMap(
                    ({editData}) => localStorage.editUser(editData).pipe(
                        map(() => UserAction.editUsersSucces({editData})),
                        catchError(
                            (error: {message: string}) => of(UserAction.editUserError({errorMsg: error.message}))
                        )
                    )
                )
            )
    },
    { functional: true }
);
