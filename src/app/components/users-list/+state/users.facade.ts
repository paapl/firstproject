import { Injectable, inject } from "@angular/core";
import { Store } from "@ngrx/store";
import * as UsersAction from "./users.action"
import { User } from "../../../interface/user.inteface";
import * as selectUsers  from "./users.selectors";

@Injectable({
    providedIn: 'root'
})
export class UsersListFacade {
    private readonly store = inject(Store)
    public readonly users$ = this.store.select(selectUsers.FilteredSelector);
    
    loadUsers(){
        this.store.dispatch(UsersAction.loadUsers());
    }
    deleteUser(id:number){
        this.store.dispatch(UsersAction.deleteUsers({id: id}))
    }
    createUser(newUser: User){
        this.store.dispatch(UsersAction.createUsers({newUser}))
    }
    editUser(editUser: User, id: number){
        this.store.dispatch(UsersAction.editUsers({editUser, id}))
    }
    filteredNameUsers(name: string){
        this.store.dispatch(UsersAction.filterUsers({name: name}))
    }
}