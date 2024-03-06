import { createFeatureSelector, createSelector } from "@ngrx/store";
import { USERS_FEATURE_KEY, UsersState } from "./users.reducers";

export const selectUsersState = createFeatureSelector<UsersState>(USERS_FEATURE_KEY);

export const selectUsers = createSelector(
    selectUsersState,
    (state) => state.users
)

export const selectfilterUsers = createSelector(
    selectUsersState,
    (state) => state.filterUsers.name
)

export const FilteredSelector = createSelector(
    selectUsers,
    selectfilterUsers,
    (users, name) => {
        if(name == ""){
            return users
        } else {
            return users.filter((user) => user.name.toLocaleLowerCase() === name.toLocaleLowerCase())
        }
    }
)