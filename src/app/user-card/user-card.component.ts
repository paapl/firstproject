import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { IUser } from '../interface/iuser';

@Component({
  selector: 'app-user-card',
  standalone: true,

  imports: [
    MatButtonModule,
    MatCardModule,
  ],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss'
})
export class UserCardComponent {

  @Input() user?: IUser;
  @Output() id = new EventEmitter<number>();

  getIdCard(id:number | undefined): void{
    this.id.emit(id);
    console.log(id);
  }
  
}
