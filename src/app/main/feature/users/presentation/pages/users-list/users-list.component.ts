import { Component } from '@angular/core';
import { UserBaseEntity, UserFromListEntity } from 'src/app/main/feature/auth/domain/entities/user.entity';
import { DataOptions, SortOrder } from 'src/app/shared/domain/entities/data-options';
import { PagedResponse } from 'src/app/shared/domain/entities/paged-response';
import { TableHeadEntity } from 'src/app/shared/domain/entities/table-head.entity';
import { ListUsersUseCase } from '../../../domain/usecases/list-users.usecases';
import { UserDataRow } from '../../../domain/entities/data-row-entities/users.data-row';
import { CommonModule } from '@angular/common';
import { UserDataModule } from '../../../infrastructure/modules/user.data.module';
import { SectionTitleComponent } from 'src/app/shared/presentation/components/texts/section-title/section-title.component';
import { SectionSubtitleComponent } from 'src/app/shared/presentation/components/texts/subtitle-section/section-subtitle.component';
import { JichiTableComponent } from 'src/app/shared/presentation/components/table/table.component';
import { AddButtonComponent } from 'src/app/shared/presentation/components/buttons/add-button/add-button.component';
import { AtomModule, MoleculesModule, OrganismsModule } from '@sitec/sarao';
import { SpanComponent } from 'src/app/shared/presentation/components/texts/span/span.component';
import { EditUserModalComponent } from '../../components/edit-user-modal/edit-user-modal.component';
import { CreateUserModalComponent } from '../../components/create-user-modal/create-user-modal.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'users-list',
  standalone: true,
  imports: [
    CommonModule,
    UserDataModule,
    SectionTitleComponent,
    SectionSubtitleComponent,
    JichiTableComponent,
    AddButtonComponent,
    OrganismsModule,
    AtomModule,
    SpanComponent,
    MoleculesModule,
    EditUserModalComponent,
    CreateUserModalComponent,
    RouterModule,
  ],
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent {
  pagedUsers?: PagedResponse<UserFromListEntity>
  users: Array<UserFromListEntity> = [];
  dataOptions: DataOptions = {
    paginationOptions: {
      pageSize: 30,
      pageNumber: 1
    },
    sortOptions: [
      {
        field: 'Id',
        direction: SortOrder.Descending
      }
    ],
    FilterOptions: []
  }
  isLoading = false;

  usersDataRow : UserDataRow[] = []
  currentPage: number = 1;
  pageSize: number = 10;
  createUserModalIsShown = false;
  editUserModalIsShown = false;
  selectedUser?: UserBaseEntity;

  organizationHasNoProducts?: boolean;

  head: TableHeadEntity[] = [
    // {name: 'id', prop: 'id', type: 'number'},
    {name: 'Nombre completo', prop: 'fullName', type: 'text'},
    {name: 'Correo electrónico', prop: 'email', type: 'text'},
    {name: 'Rol en el negocio', prop: 'role', type: 'text'},
    {name: 'Acciones', prop: 'actions', type: 'actions'}
  ]
  constructor(
    private listUsersUseCase: ListUsersUseCase,
    // private addUserUseCase: AddUserUseCase,
  ) {
    this.loadUsers({reset: true});
  }

  showCreateUserModal() {
    this.selectedUser = undefined;
    this.editUserModalIsShown = false;
    this.createUserModalIsShown = true;
  }

  showEditUserModal(userId: number) {
    this.selectedUser = this.users.find(c => c.id == userId);
    this.createUserModalIsShown = false;
    this.editUserModalIsShown = true;
  }
  
  changePage(page: number): void{
    this.currentPage = page;
    this.dataOptions.paginationOptions.pageNumber = this.currentPage
    this.loadUsers()
  }

  loadUsers(options: {reset: boolean} = {reset: false}){
    if (!options.reset && this.pagedUsers != undefined && this.pagedUsers.totalRecords <= this.users.length) {
      return;
    }

    if (options.reset) {
      this.dataOptions = {
        paginationOptions: {
          pageSize: 30,
          pageNumber: 1
        },
        sortOptions: [
          {
            field: 'Id',
            direction: SortOrder.Descending
          }
        ],
        FilterOptions: []
      }
    }
    this.isLoading = true;
    this.listUsersUseCase
    .execute(this.dataOptions)
    .subscribe({
      next: (resp) =>{
        this.pagedUsers = resp;
        this.users = resp.result;
        this.usersDataRow = []
        
        this.pagedUsers.result.map((data)=>{
         this.usersDataRow.push(data.convertToDataRow())
        })
        if (this.pagedUsers.totalRecords === 0) {
          this.organizationHasNoProducts = true;
        }
        this.isLoading = false;
      },
      error: (e) =>{
        console.error(e)
      }
    })
  }

  handleUserCreatedOrEdited() {
    this.loadUsers({reset: true});
    this.selectedUser = undefined;
    this.createUserModalIsShown = false;
    this.editUserModalIsShown = false;
  }

}
