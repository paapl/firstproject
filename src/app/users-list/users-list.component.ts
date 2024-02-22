import { Component, inject } from '@angular/core';
import { UsersServiceService } from '../services/users-service.service';
import { UserApiServiceService } from '../services/user-api-service.service';
import { UserCardComponent } from '../user-card/user-card.component';
import { AsyncPipe, NgForOf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { CreateedituserComponent } from '../createedituser/createedituser.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [
    UserCardComponent,
    CreateedituserComponent,

    NgForOf,
    AsyncPipe,
    MatButtonModule,
  ],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss',
  providers: [UsersServiceService, UserApiServiceService]
})

export class UsersListComponent{

  constructor(public dialog: MatDialog){}
  
  addUserDialog(): void {
    const dialogRef = this.dialog.open(CreateedituserComponent, {
      data: {id: new Date().getTime(), name: null, username: null, email: null, phone: null},
    });

    dialogRef.afterClosed().subscribe( (data) => {console.log(data)});
  }




  public UsersService = inject(UsersServiceService);

  deleteUser(id:number): void{
    console.log(id);
    this.UsersService.deleteUser(id);
  }
}
