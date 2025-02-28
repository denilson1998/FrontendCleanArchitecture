import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AtomModule, MoleculesModule } from '@sitec/sarao';
import { TableHeadEntity } from 'src/app/shared/domain/entities/table-head.entity';
import { AddButtonComponent } from 'src/app/shared/presentation/components/buttons/add-button/add-button.component';
import { JichiTableComponent } from 'src/app/shared/presentation/components/table/table.component';
import { SectionTitleComponent } from 'src/app/shared/presentation/components/texts/section-title/section-title.component';
import { BankConnectionService } from '../../../bank-connection/infraestructure/service/bank-connection.service';

@Component({
  selector: 'app-link-bank-account-page',
  templateUrl: './link-bank-account-page.component.html',
  styleUrls: ['./link-bank-account-page.component.scss'],
  standalone: true,
  imports: [CommonModule, AtomModule, MoleculesModule, JichiTableComponent, SectionTitleComponent]
})
export class LinkBankAccountPageComponent {

  isLinked :boolean = false;
  showModal: boolean = false;
  head: TableHeadEntity[] = [
    {name: 'Nombre del titular', prop: 'name', type: 'text'},
    {name: 'Tipo de cuenta', prop: 'accountType', type: 'text'},
    {name: 'N.° de cuenta', prop: 'accountNumber', type: 'text'},
    {name: 'Acciones', prop: 'actions', type: 'actions'}
]
accounts :[{}]= [
  {
    name: 'Martha López',
    accountType: 'Cuenta Corriente',
    accountNumber : 'N.° 5678456988'
  }
]

constructor(private linkinBank: BankConnectionService, ){

}

  linkAccount(){
    this.linkinBank.configureSSO().then( () => {
    
    })
  }


  goToFabulosa(){
   window.open('https://digital.fassil.com.bo/', '_blank')
  }

  openModal(){
    this.showModal = true
  }

  closeModal(){
    this.showModal = false;
  }
}
