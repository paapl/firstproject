import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { UserInteface } from '../../../interface/user.inteface';
import { MatDialog } from '@angular/material/dialog';
import { Observable, map, takeUntil } from 'rxjs';
import { UsersChangeWindow } from '../users-change-window/users-change-window.component';
import { Store } from '@ngrx/store';
import { selectUsers } from '../+state/users.selectors';
import { usersListFacade } from '../+state/users.facade';

@Component({
  selector: 'app-user-card',
  standalone: true,

  imports: [
    MatButtonModule,
    MatCardModule,
    UsersChangeWindow
  ],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss'
})
export class UserCardComponent{
  users$!: Observable<UserInteface[]>;

  constructor(
    private dialog: MatDialog, private readonly store: Store, private readonly usersFacade: usersListFacade)
    {this.users$ = this.store.select(selectUsers);}

  @Input() user!: UserInteface;
  @Output() id = new EventEmitter<number>();

  getIdCardDel(id:number){
    this.id.emit(id);
  }

  openDialog(){
    const dialogEdit = this.dialog.open(UsersChangeWindow, {data: {isEdit: true, dataUser: this.user}});
    dialogEdit.afterClosed().pipe(
      map((edit: UserInteface) => {
        if(edit !== undefined){
          this.usersFacade.editUser(edit);
        }
      takeUntil(dialogEdit.afterClosed())
      }),
    ).subscribe();
  }  
}
