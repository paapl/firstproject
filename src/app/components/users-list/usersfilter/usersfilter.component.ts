import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { usersListFacade } from '../+state/users.facade';
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
  templateUrl: './usersfilter.component.html',
  styleUrl: './usersfilter.component.scss'
})
export class UsersfilterComponent {
  constructor(private readonly usersFacade: usersListFacade){}

  mySearch = new FormGroup({
    name: new FormControl('')
  })

  searchName(mySearch: FormGroup){
    this.usersFacade.filteretNameUsers(mySearch.value.name);
  }
}
