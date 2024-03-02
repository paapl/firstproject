import { Actions, createEffect, ofType } from "@ngrx/effects";
import { inject } from "@angular/core";
import { UserApiServiceService } from "../../../services/user-api-service.service";
import { catchError, exhaustMap, map, of, switchMap, tap, withLatestFrom } from "rxjs";
import * as UserAction from './users.action';
import { UserlocalstorageService } from "../../../services/userlocalstorage.service";
import { IUser } from "../../../interface/user.inteface";
import { UsersService } from "../../../services/users.service";
import { Store, select } from "@ngrx/store";
import { selectUsers } from "./users.selectors";

export const loadUsers = createEffect(
    () => {
        const actions$ = inject(Actions);
        const usersService = inject(UsersService);

        return actions$.pipe(
            ofType(UserAction.loadUsers),
            switchMap(() => 
                usersService.initialUsers().pipe(
                    map((dataUsers:IUser[]) => UserAction.loadUsersSucces({users: dataUsers})),        
                )
            )
        )
    },
    { functional: true }
);

export const createUsers = createEffect(
    () => {
        const actions$ = inject(Actions);
        return actions$.pipe(
            ofType(UserAction.createUsers),
            map((user) => UserAction.createUsersSucces(user)),
        )
    },
    { functional: true }
);

export const deleteUser = createEffect(
    () => {
        const actions$ = inject(Actions);
        return actions$.pipe(
            ofType(UserAction.deleteUsers),
            map((id) => UserAction.deleteUsersSucces(id)),
        )
    },
    { functional: true }
);

export const editUser = createEffect(
    () => {
        const actions$ = inject(Actions);
        return actions$.pipe(
            ofType(UserAction.editUsers),
            map((data) => UserAction.editUsersSucces(data)),
        )
    },
    { functional: true }
);
