import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
    selector: '[appPermission]',
})
export class PermissionDirective {
    constructor(private templateRef: TemplateRef<any>, private viewContainer: ViewContainerRef) {}
    @Input() set appPermission(condition: boolean | undefined) {
        if (!condition) {
            this.viewContainer.createEmbeddedView(this.templateRef);
        } else {
            this.viewContainer.clear();
        }
    }
}
