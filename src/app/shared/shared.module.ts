import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProgressBarModule } from 'primeng/progressbar';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { CheckboxModule } from 'primeng/checkbox';
import { TranslationModule } from '../modules/i18n/translation.module';
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
