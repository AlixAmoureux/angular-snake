import { NgModule } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';

@NgModule({
    imports: [
        MatButtonModule,
        MatIconModule,
        MatCardModule,
        MatRadioModule,
    ],
    exports: [
        MatButtonModule,
        MatIconModule,
        MatCardModule,
        MatRadioModule
    ]
})
export class MaterialModule { }