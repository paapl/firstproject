import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { IUser } from '../../../interface/user.inteface';
import { MatDialog } from '@angular/material/dialog';
import { Observable, map, takeUntil } from 'rxjs';
import { DialogEdit } from '../dialogedit/dialogedit.component';
import { Store } from '@ngrx/store';
import { selectUsers } from '../+state/users.selectors';
import * as userAcrion from '../+state/users.action';

@Component({
  selector: 'app-user-card',
  standalone: true,

  imports: [
    MatButtonModule,
    MatCardModule,
    DialogEdit
  ],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss'
})
export class UserCardComponent{
  users$!: Observable<IUser[]>;

  constructor(
    private dialog: MatDialog, private readonly store: Store,)
    {this.users$ = this.store.select(selectUsers);}

  @Input() user!: IUser;
  @Output() id = new EventEmitter<number>();

  getIdCardDel(id:number){
    this.id.emit(id);
  }

  openDialog(){
    const dialogEdit = this.dialog.open(DialogEdit, {data: {isEdit: true, dataUser: this.user}});
    dialogEdit.afterClosed().pipe(
      map((edit: IUser) => {
        if(edit !== undefined){
          this.store.dispatch(userAcrion.editUsers({editData: edit}))
        }
      takeUntil(dialogEdit.afterClosed())
      }),
    ).subscribe();
  }  
}
