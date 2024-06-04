import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgIconsModule, provideNgIconsConfig } from '@ng-icons/core';
import {
    bootstrapFacebook,
    bootstrapInstagram,
    bootstrapX,
    bootstrapYoutube,
    bootstrapLinkedin,
    bootstrapTwitterX,
    bootstrapChatRightQuote,
    bootstrapPhone,
    bootstrapPersonCircle,
    bootstrapBoxArrowInRight,
    bootstrapPersonPlus,
} from '@ng-icons/bootstrap-icons';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        NgIconsModule.withIcons({
            bootstrapFacebook,
            bootstrapInstagram,
            bootstrapX,
            bootstrapTwitterX,
            bootstrapYoutube,
            bootstrapLinkedin,
            bootstrapChatRightQuote,
            bootstrapPhone,
            bootstrapPersonCircle,
            bootstrapBoxArrowInRight,
            bootstrapPersonPlus,
        }),
    ],
    providers: [
        provideNgIconsConfig({
            size: '1.4em',
        }),
    ],
    exports: [
        NgIconsModule,
    ]
})

export class IconsModule { }
