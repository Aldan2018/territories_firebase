import { Component, OnDestroy } from '@angular/core';
import { messageService } from 'src/app/services/message.service';
import { Subscription } from 'rxjs';
import { fireDatabaseService } from 'src/app/services/fire-database.service';
import { IUser } from '../../services/auth.service';

@Component({
  selector: 'app-users-admin',
  templateUrl: './users-admin.component.html',
  styleUrls: ['./users-admin.component.scss']
})
export class UsersAdminComponent implements OnDestroy {
  subscribtions$: Subscription[] = [];
  user: IUser[] = [];
  followArray: IUser[] = [];

  constructor(private message: messageService,
              private fireDatabase: fireDatabaseService) {
                this.subscribtions$[0] = this.fireDatabase.getUser().subscribe(res => {
                  let users = res.val();
                  let userArray = [];
                  for(var key in users) {
                    userArray.push(users[key]);
                  }
                  this.user = userArray;
                })
              }

  getFollowArray(id) {
    this.followArray.push(this.user[id]);
  }

  checkElder() {
    this.fireDatabase.updateUser(this.followArray);
  }

  ngOnDestroy() {
    this.subscribtions$.forEach(subscription => subscription.unsubscribe());
  }
}
