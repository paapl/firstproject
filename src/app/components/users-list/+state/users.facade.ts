import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import * as UsersAction from "./users.action"
import { UserInteface } from "../../../interface/user.inteface";
import * as selectUsers  from "./users.selectors";

@Injectable({
    providedIn: 'root'
})
export class usersListFacade {

    constructor(private readonly store: Store){}

    users$ = this.store.select(selectUsers.FilteredSelector);

    loadUsers(){
        this.store.dispatch(UsersAction.loadUsers());
    }
    deleteUser(id:number){
        this.store.dispatch(UsersAction.deleteUsers({id: id}))
    }
    createUser(myForm: UserInteface){
        this.store.dispatch(UsersAction.createUsers({newUser: myForm}))
    }
    editUser(edit: UserInteface){
        this.store.dispatch(UsersAction.editUsers({editData: edit}))
    }
    filteretNameUsers(name: string){
        this.store.dispatch(UsersAction.filterUsers({name: name}))
    }
}