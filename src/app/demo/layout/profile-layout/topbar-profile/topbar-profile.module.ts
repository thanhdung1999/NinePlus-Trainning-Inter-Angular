import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StyleClassModule } from 'primeng/styleclass';
import { DropdownModule } from 'primeng/dropdown';
import { TopbarProfileComponent } from './topbar-profile.component';
import { TranslationModule } from 'src/app/modules/i18n';

@NgModule({
    declarations: [TopbarProfileComponent],
    imports: [CommonModule, TranslationModule, StyleClassModule, DropdownModule],
    exports: [TopbarProfileComponent],
})
export class TopbarProfileModule {}
