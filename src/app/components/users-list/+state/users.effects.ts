import { Actions, createEffect, ofType } from "@ngrx/effects";
import { inject } from "@angular/core";
import { catchError, map, of, switchMap } from "rxjs";
import * as UserAction from './users.action';
import { User } from "../../../interface/user.inteface";
import { ApiService } from "../../../services/api.service";
import { UsersService } from "../../../services/users.service";


export const loadUsers = createEffect(
    () => {
        const action = inject(Actions);
        const usersServise = inject(UsersService);
        
        return action.pipe(
            ofType(UserAction.loadUsers),
            switchMap(
                () => usersServise.initialUsers().pipe(
                    map((users) => UserAction.loadUsersSuccess({users})),
                    catchError((error) => {
                        console.log('Error ' + error);
                        return of(UserAction.loadUsersFailed({error}))
                    })
                )
            )
        )
    },
    { functional: true }
)

export const deleteUser = createEffect(
    () => {
        const action = inject(Actions);
        const apiService = inject(ApiService);
        
        return action.pipe(
            ofType(UserAction.deleteUsers),
            switchMap(
                ({ id }) => apiService.delete<void>(`/users/${id}`).pipe(
                    map(() => UserAction.deleteUserSuccess({ id })),
                    catchError((error) => {
                        console.log('Error ' + error);
                        return of(UserAction.deleteUsersFailed({ error }))
                    })
                )
            )
        )
    },
    { functional: true }
)

export const createUser = createEffect(
    () => {
        const action = inject(Actions);
        const apiService = inject(ApiService);

        return action.pipe(
            ofType(UserAction.createUsers),
            switchMap(
                ({ newUser }) => apiService.post<User>(`/users/`, newUser).pipe(
                    map((user) => UserAction.createUsersSuccess({newUser: user})),
                    catchError((error) => {
                        console.log('Error ' + error);
                        return of(UserAction.deleteUsersFailed({ error }));
                    })
                )
            )
        )
    },
    { functional: true }
)

export const editUser = createEffect(
    () => {
      const action = inject(Actions);
      const apiService = inject(ApiService);

      return action.pipe(
        ofType(UserAction.editUsers),
        switchMap(
            ({editUser, id}) => apiService.put<User>(`/users/${id}`, editUser).pipe(
                map((user) => UserAction.editUsersSuccess({editUser: user})),
                catchError((error) => {
                    console.log('Error ' + error);
                    return of(UserAction.deleteUsersFailed({ error }));
                })
            )
        )
      )
    },
    { functional: true }
)
