import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { User } from '../../../interface/user.inteface';
import { MatDialog } from '@angular/material/dialog';
import { take, tap } from 'rxjs';
import { DialogUsersChange } from '../dialog-users-change/dialog-users-change.component';
import { UsersListFacade } from '../+state/users.facade';

@Component({
  selector: 'app-user-card',
  standalone: true,

  imports: [
    MatButtonModule,
    MatCardModule,
    DialogUsersChange
  ],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss'
})
export class UserCardComponent{
  private readonly UsersFacade = inject(UsersListFacade)
  public readonly users$  = this.UsersFacade.users$;
  
  constructor(private matDialog: MatDialog){}

  @Input({required: true}) user!: User;
  @Output() id = new EventEmitter<number>();

  getUserId(id:number){
    this.id.emit(id);
  }

  openDialog(){
    const dialogEdit = this.matDialog.open(DialogUsersChange, {data: {isEdit: true, dataUser: this.user}});
    dialogEdit.afterClosed().pipe(
      tap((editUser: User) => {
        if(editUser){
          this.UsersFacade.editUser(editUser, editUser.id);
        }
      }),
      take(1),
    ).subscribe();
  }  
}
