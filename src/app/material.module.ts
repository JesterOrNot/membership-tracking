import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  MatDialog,
  MatDialogModule,
  MatCardModule,
  MatDialogRef,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatCheckboxModule,
  MatButtonModule,
  MatTooltipModule,
  MatSidenavModule,
  MatToolbarModule
} from "@angular/material";

// import { DialogService } from './core/services/dialog.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatDialogModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatButtonModule,
    MatTooltipModule,
    MatSidenavModule,
    MatToolbarModule
  ],
  exports: [
    CommonModule,
    MatDialogModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatButtonModule,
    MatTooltipModule,
    MatSidenavModule,
    MatToolbarModule
  ],
  providers: [
    MatDialog,
    {
      provide: MatDialogRef,
      useValue: {}
    },
  ],
  entryComponents: []
})
export class MaterialModule { }
