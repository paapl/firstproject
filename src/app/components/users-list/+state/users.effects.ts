import { Actions, createEffect, ofType } from "@ngrx/effects";
import { inject } from "@angular/core";
import { map, switchMap} from "rxjs";
import * as UserAction from './users.action';
import { UserInteface } from "../../../interface/user.inteface";
import { UsersService } from "../../../services/users.service";

export const loadUsers = createEffect(
    () => {
        const actions$ = inject(Actions);
        const usersService = inject(UsersService);

        return actions$.pipe(
            ofType(UserAction.loadUsers),
            switchMap(() => 
                usersService.initialUsers().pipe(
                    map((dataUsers:UserInteface[]) => UserAction.loadUsersSuccess({users: dataUsers})),        
                )
            )
        )
    },
    { functional: true }
);
