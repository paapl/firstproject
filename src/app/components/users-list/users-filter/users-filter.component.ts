import { Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { UsersListFacade } from '../+state/users.facade';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-usersfilter',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
  ],
  templateUrl: './users-filter.component.html',
  styleUrl: './users-filter.component.scss'
})
export class UsersFilterComponent {
  private readonly UsersFacade = inject(UsersListFacade);

  public usersName = new FormControl('');

  searchName(){
    if(this.usersName.value !== null){
      this.UsersFacade.filteredNameUsers(this.usersName.value);
    }
  }
}
