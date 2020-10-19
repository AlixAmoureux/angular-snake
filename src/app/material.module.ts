import { NgModule } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
    imports: [
        MatButtonModule,
        MatIconModule,
        MatCardModule,
        MatRadioModule,
        MatDialogModule,
    ],
    exports: [
        MatButtonModule,
        MatIconModule,
        MatCardModule,
        MatRadioModule,
        MatDialogModule
    ]
})
export class MaterialModule { }
