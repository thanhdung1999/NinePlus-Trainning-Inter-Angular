import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppLevelColorDirective } from './directives/levelColor.directive';
import { PermissionDirective } from './directives/permission.directive';
import { PhonePipe } from './pipe';
import { CurrencyVND } from './pipe/currencyVND.pipe';
import { ProgressBarModule } from 'primeng/progressbar';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { TranslationModule } from '../modules/manage-system/components/i18n';
import { CheckboxModule } from 'primeng/checkbox';
@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        TableModule,
        ReactiveFormsModule,
        FormsModule,
        ProgressBarModule,
        ButtonModule,
        RippleModule,
        InputTextModule,
        DialogModule,
        ReactiveFormsModule,
        DropdownModule,
        ToastModule,
        TranslationModule,
        CheckboxModule,
    ],
    exports: [
        ProgressBarModule,
        TableModule,
        ButtonModule,
        RippleModule,
        InputTextModule,
        DialogModule,
        ReactiveFormsModule,
        DropdownModule,
        ToastModule,
        TranslationModule,
        CheckboxModule,
    ],
    providers: [],
})
export class SharedModule {}
