import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CacheService } from '../infrastructure/services/cache.service';
import { RootComponents } from './helpers/rootComponents';
import localBo from '@angular/common/locales/es-BO';

import { registerLocaleData } from '@angular/common';
import { FileUploadComponent } from './components/modals/file-upload/file-upload.component';

registerLocaleData(localBo);

@NgModule({
  declarations: [RootComponents ],
  exports: [RootComponents],
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  providers: [CacheService],
})
export class SharedPresentation {}
