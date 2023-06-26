import {
    Directive,
    ElementRef,
    Input,
    OnChanges,
    SimpleChanges,
} from '@angular/core';

@Directive({
    selector: '[appLevelColor]',
})
export class AppLevelColorDirective implements OnChanges {
    @Input() level!: number;
    constructor(private el: ElementRef) {}
    ngOnChanges(changes: SimpleChanges): void {
        switch (this.level) {
            case 1:
                this.el.nativeElement.style.color = 'gray';
                break;
            case 2:
                this.el.nativeElement.style.color = '#50cd89';
                break;
            case 3:
                this.el.nativeElement.style.color = '#009ef7';
                break;
            case 4:
                this.el.nativeElement.style.color = '#ffc700';
                break;
            case 5:
                this.el.nativeElement.style.color = 'red';
                break;

            default:
                break;
        }
    }
}
