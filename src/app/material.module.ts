import { NgModule } from "@angular/core";

import { FlexLayoutModule } from '@angular/flex-layout' 
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSliderModule } from '@angular/material/slider';
import { MatRadioModule} from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatTabsModule } from '@angular/material/tabs';
import { MatMenuModule } from '@angular/material/menu';
import {MatGridListModule} from '@angular/material/grid-list';

const MODULES = [
    FlexLayoutModule,
    MatToolbarModule, MatInputModule, MatFormFieldModule, MatGridListModule,
    MatButtonModule, MatCardModule, MatTabsModule, MatMenuModule,
    MatIconModule, MatSliderModule, MatRadioModule, MatDatepickerModule
];

@NgModule({
    imports: MODULES,
    exports: MODULES
})

export class MaterialModule { }