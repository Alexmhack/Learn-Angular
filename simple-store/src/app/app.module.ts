import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { MDBBootstrapModule } from 'angular-bootstrap-md';  // <- mdbootstrap

import { AppComponent } from './app.component';
// import { CustomersComponent } from './customers/customers.component';
import { CustomersModule } from './customers/customers.module';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    // CustomersComponent
  ],
  imports: [
    BrowserModule,
    CustomersModule,
    SharedModule,
    CoreModule,
    MDBBootstrapModule.forRoot(),  // <- mdbootstrap
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
