import { ViewportScroller } from '@angular/common';
import { Component } from '@angular/core';

@Component({
    selector: 'app-body-landing',
    templateUrl: './body-landing.component.html',
    styleUrls: ['./body-landing.component.scss'],
})
export class BodyLandingComponent {
    constructor(private viewportScroller: ViewportScroller) {}

    onHead() {
        this.viewportScroller.scrollToPosition([0, 0]);
    }

    ngOnInit(): void {
        // Lấy tất cả các phần tử có class "elementor-counter-number"
        // tslint:disable-next-line:no-shadowed-variable
        const elements: NodeListOf<HTMLElement> = document.querySelectorAll(
            '.elementor-counter-number'
        );

        // tslint:disable-next-line:only-arrow-functions
        elements.forEach(function (element: HTMLElement) {
            const duration: number = parseInt(
                element.getAttribute('data-duration') || '0',
                10
            );
            const toValue: number = parseInt(
                element.getAttribute('data-to-value') || '0',
                10
            );
            const fromValue: number = parseInt(
                element.getAttribute('data-from-value') || '0',
                10
            );
            const delimiter: string | null =
                element.getAttribute('data-delimiter');

            let currentValue: number = fromValue;
            const increment: number = Math.ceil(
                (toValue - fromValue) / (duration / 10)
            ); //  value increment one step

            const interval = setInterval(function () {
                currentValue += increment;
                if (currentValue >= toValue) {
                    currentValue = toValue;
                    clearInterval(interval);
                }

                // Định dạng giá trị tăng dần và đặt vào phần tử HTML
                element.textContent = currentValue.toLocaleString();
            }, 10); //
        });

        // var carouselWidth = $('.carousel-inner')[0].scrollWidth;
        // var cardWidth = $('.carousel-item').width();

        // var scrollPosition = 0;
        
        // $('.carousel-control-next').on('click', function(){
        //   scrollPosition = scrollPosition+ cardWidth;
        //   $('.carousel-inner').animate({scrollLeft:scrollPosition},
        //    600);
        // })
    //     }
    
       
    }
}
