import { Component, OnInit }                        from '@angular/core';
import { DataManagementService }                    from '../data-management.service';


@Component({
  selector: 'app-modal-add-terr',
  templateUrl: './modal-add-terr.page.html',
  styleUrls: ['./modal-add-terr.page.scss'],
})

export class ModalAddTerrPage implements OnInit {

  constructor(private data:DataManagementService) { }

  ngOnInit() {
  }

  addAdress(nameInTmpl):void {
        this.data.createNewTerr(nameInTmpl);
      }

}
