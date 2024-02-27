import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { IUser } from '../../../interface/iuser';
import { MatDialog } from '@angular/material/dialog';
import { UsersServiceService } from '../../../services/users-service.service';
import { map, takeUntil } from 'rxjs';
import { CreateedituserComponent } from '../../dialogedit/dialogedit.component';

@Component({
  selector: 'app-user-card',
  standalone: true,

  imports: [
    MatButtonModule,
    MatCardModule,
    CreateedituserComponent
  ],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss'
})
export class UserCardComponent{
  constructor(
    public dialod: MatDialog,
    public userService: UsersServiceService,
    ){}

  @Input() user?: IUser;
  @Output() id = new EventEmitter<number>();

  getIdCardDel(id:number | undefined): void{
    this.id.emit(id);
  }

  // Изменение значений формы
  public isEdit: boolean = true;
  openDialog(id:number | undefined): void{
    const dialogEdit = this.dialod.open(CreateedituserComponent, {data: {isEdit: this.isEdit, dataUser: this.user}});
    dialogEdit.afterClosed().pipe(
      map((edit: IUser) => {
        if(edit != undefined){
          this.userService.saveEditDataUser(edit);
        }
      takeUntil(dialogEdit.afterClosed())
      }),
    ).subscribe();
  }  
}
