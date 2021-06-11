import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";

import { DashboardRoutingModule } from "./dashboard-routing.module";
import { ChartistModule } from 'ng-chartist';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { Dashboard1Component } from "./dashboard1/dashboard1.component";


@NgModule({
    imports: [
        CommonModule,
        DashboardRoutingModule,
        ChartistModule,
        NgbModule,
    ],
    exports: [],
    declarations: [
        Dashboard1Component,
    ],
    providers: [],
})
export class DashboardModule { }
