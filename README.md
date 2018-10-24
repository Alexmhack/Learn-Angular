# Learn-Angular
Learning Angular by creating a simple web app

**Start Angular simple-store using Angular CLI**

```
ng new simple-store
cd simple-store
ng serve --open
```

Replacing ```templateUrl``` with just inline template using

**app.component.ts**
```
@Component({
  selector: 'app-root',
  // templateUrl: './app.component.html',
  template: `
  	<h1>Simple Store Made In Angular</h1>
  `,
  styleUrls: ['./app.component.css']
})
```

```templateUrl``` contains the path of the html template that will be rendered for this 
component, which we will use later.

If we define a variable name ```title``` and export it from the ```AppComponent``` class
then we can use that variable using interpolation binding in the template like this

```
@Component({
  selector: 'app-root',
  // templateUrl: './app.component.html',
  template: `
  	<h1>{{ title }}</h1>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'simple-store angular app';
}
```

We can also use a little more different approach that we would do when we fetch data from 
a remote server then

```
import { Component, OnInit } from '@angular/core';
...
export class AppComponent implements OnInit {
  // title = 'simple-store angular app';
  title: string;

  constructor() { }

  ngOnInit() {
   	// we call a service that gives us the title
   	this.title = "simple-store angular app using";
  }
}
```

Keeping the rest of the code the same and make a few changes we achieve the same results.

We can also add custom loading content inside of the app component selector in the main
```index.html``` template

**src/index.html**
```
<body>
  <app-root>
  	Loading...
  </app-root>
</body>
```

Now switch to the browser and refresh it again, you will see ```Loading...``` before the 
page gets rendered.

Since our first module and the root module is the ```AppModule``` but its a nice practise 
to create a module for each separate part of our application.

Command to generate a component using Angular CLI is

```
// generates a new component customers which basically is a folder that contains four files inside src/app/customers 
ng generate component customers

// alternatively you can run the shortform of the above command
ng g c customers	// <- g = generate, c = component

// If you want to look at all the changes that the CLI would do on running these commands you can run
ng g c customers -d 	// -d stands for dry run which won't affect anything
```

Try out the above commands for a better understanding of Angular CLI. We need to 
register our component in ```app.module.ts``` file which by default is done by Angular 
CLI.

Once CLI generates the component and you have the customers folder inside **src/app/** 
you will find that the folder contains the four files among which the most important are 
the ```customers.component.ts``` and the component template 
```customers.component.html```

CLI has put some code in these files for us and also registered the component in the app 
component.

Open ```customers.component.ts``` in your editor and you will find that the code in there is very similar to what we have in ```app.component.ts``` file.

There is the **metadata** in ```@Component``` decorator and also the file exports the 
```CustomersComponent``` class.

Since the ```index.html``` file contains the ```<app-root></app-root>``` element selector
you might be wondering that we also need to add the selector for customers component 
which is ```selector: 'app-customers'``` but we don't need to add the selector in the 
main template, we just need to add the selector in the app component template like this

```
@Component({
  selector: 'app-root',
  // templateUrl: './app.component.html',
  template: `
  	<h1>{{ title }}</h1>
  	<app-customers></app-customers>		// <- customers component selector
  `,
  styleUrls: ['./app.component.css']
})
```

This will be all for rendering the customer component ```customers.component.html``` file
on the webpage. Run the server again using ```ng serve``` and refresh the browser.

So now that we have the component being rendered we can add some data and display onto 
the template just like we did with ```title```

```
export class CustomersComponent implements OnInit {

  title: string;
  people: any[];

  constructor() { }

  ngOnInit() {
  	this.title = "Customers";

  	// customers data
  	this.people = [
  	  { id: 1, name: 'john Doe', city: 'Phoenix', orderTotal: 9.99, customerSince: new Date(2014, 7, 10) },
  	  { id: 2, name: 'Alex Hopper', city: 'Chandler', orderTotal: 19.99, customerSince: new Date(2017, 2, 22) },
  	  { id: 3, name: 'Michelle Thomas', city: 'Seattle', orderTotal: 99.49, customerSince: new Date(2016, 12, 31) },
  	]
  }

}
```

```title: string``` is declaration of ```title``` variable to **string** type and ```people: any[]``` is an **array** of any type.

We make up some data for people using key value pairs.

## Customer Module
In this section we will create customers component a module. We are making customers a 
separate module in its. This is done by adding a new file named ```customers.module.ts```
in customers folder and adding piece of code in it

```
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CustomersComponent } from './customers/customers.component';

@NgModule({
  declarations: [
    CustomersComponent
  ],
  imports: [
    CommonModule
  ],
})
export class CustomersModule { }
```

Above piece of code is just copying and editing a little from ```src/app/app.module.ts```
We import ```CommonModule``` instead of ```BrowserModule``` because this module is imported 
just once only in the app component, the same is the case with ```  bootstrap: [AppComponent]``` which is the entry point for the component for angular app, which needs to be only one 
that is the main app

You can generate this file using Angular CLI command

```
// customers is the module name
// --flat puts the files in src/app folder instead of its own folder.
--module=app tell CLI to register the module in imports array of AppModule
ng generate module customers --flat --module=app
```

Running the above CLI command will generate two files namely ```src/app/customers.module.ts```
and ```src/app/customers.module.spec.ts``` which contains similar code of what we wrote in ```src/app/customers/customers.module.ts```. But we won't use this command for now.

Now back to **CustomersModule**. We need to tell **AppModule** about our newly made module so
we do that by importing the module and adding it to imports array

**src/app/app.module.ts**
```
import { CustomersModule } from './customers/customers.module';

@NgModule({
  declarations: [
    AppComponent,
    // CustomersComponent
  ],
  imports: [
    BrowserModule,
    CustomersModule
  ],
  ...
```

Now add ```<app-customers></app-customers>``` in ```app.component.html``` file after at bottom.
This is the selector that would render the customers template in the app template

Run the server if not running and refresh the page and open the console to check the errors.
The errors basically say is that it does not recognize the element selector. This happens
because previously we used to import ```CustomersComponent``` and declare it

```
import { CustomersComponent } from './customers/customers.component';

@NgModule({
  declarations: [
    AppComponent,
    CustomersComponent
  ],
  imports: [
    BrowserModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

But now we use ```CustomerModule``` so a fix for this is to export the ```CustomerComponent``` 
from the customers module.

```
import { CustomersComponent } from './customers.component';

@NgModule({
  declarations: [
    CustomersComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
  	CustomersComponent
  ]
})
export class CustomersModule { }
```

This means whenever we import ```CustomersModule``` we automatically get ```CustomersComponent```
**NOTE:** check the ```src/app/customers/customers.component.html``` file for more info.
Now the error is fixed and we get the title from customers being displayed.

## Data Binding
We have already used the data binding feature provided by Angular in templates when we 
did ```<h1>{{ title }}</h1>``` that displayed the ```title``` variable value from the 
component file.

Another alternative to achieve the same results is using

```
<h2 [innerHTML]="title"></h2>
```

But this is not preferred as this is long piece of code as compared to using 
interpolation using curly braces => ```{{ title }}```

We can also use event binding which can be done by

**customers.component.ts**
```
...
export class CustomersComponent implements OnInit {

  isVisisble: true;
  ...
```

We define a boolean value of ```true``` and can use it in template

**customers.component.html**
```
<h2 [hidden]="!isVisible">{{ title }}</h2>
```

We bind the ```hidden``` CSS property with a condition that is opposite value of ```isVisible``` which means opposite of **true** i.e. **false**, we can use this with a 
button which on pressing will hide show the ```title```

**customers.component.html**
```
<button (click)="changeVisibility()">Show / Hide</button>
```

```(event)="callFunction()"``` is the syntax for event binding. Since we used a 
function here we need it define it in components

```
  ...
  isVisible: true;

  changeVisibility() {
    this.isVisible = !this.isVisible;
  }
  ...
```

```changeVisibility``` function simply changes the value of ```isVisible``` to the 
opposite of its current value. So if it is **true** the button click event makes its 
value **false**

## Sorting Customers
So for sorting customers using the filtered-customers input field we can create a sort
function that for now doesn't do anything and also we want to make the headers of the 
table clickable,

**customers-list.component.ts**
```
...
  // calculates the order total of filtered customers
  calculateOrders() {
    this.customersOrderTotal = 0;
    this.filteredCustomers.forEach((cust: ICustomer) => {
      this.customersOrderTotal += cust.orderTotal;
    })
  }

  sort(prop: string) {
    // a sorting service will handle customer sorting
  }

}
```

We will pass in the property name as the parameter so that we can perform the 
operation on the particular property in the table.

And then we can use this function in event binding for click event using

**customers-list.component.html**
```
<table mdbTable>
  <thead class="blue white-text">
    <tr>
        <th (click)="sort('name')" scope="col">Name</th>  <!-- now clickable -->
        <th (click)="sort('city')" scope="col">City</th>
        <th (click)="sort('orderTotal')" scope="col">Order Total</th>
    </tr>
  </thead>
  ...
```

## Input Get & Set
We have hardcoded the values of customers for now by just copy pasting the values of 
the array in **customers-list** but that is not how we actually do it when we have a 
parent component that contains all the data.

We will be using Parent Child relationship using ```Input``` decorator

```
import { Component, OnInit, Input } from '@angular/core';

...

export class CustomersListComponent implements OnInit {
  private _customers: ICustomer[] = [];

  @Input() get customers(): ICustomer[] {
    return this._customers;
  }

  set customers(value: ICustomer[]) {
    if (value) {
      this._customers = this.filteredCustomers = value;
      this.calculateOrders();
    }
  }
  ...
```

We use the ```@Input``` firstly with the ```get``` method that means it will get the 
values of type ```ICustomers[]``` array, so we need to return values so we return the 
private variable that will hold the total customers data.

So when we want to display all the customers details we use ```get``` method and when
filtering customers we use ```set``` method, ```@Input``` decorator can go with only 
one method. In ```set``` method we take in the array of customers and if it exists 
we set that array into both the total customers field => *_customers* and 
*filteredCustomers* and also call the ```calculateOrders``` to calculate the orders of 
the filtered customers.

## Routing
We can use Angular CLI to generate the routing module by running the below command

```
ng generate module app-routing --flat --module=app
```

```--flat``` will keep the routing module file in the root folder or inside **src/app**
and ```--module=app``` will add the routing module in imports array of ```app.module.ts``` or we can say register the routing module in root of application.

We have defined to routes initially,

```
const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/customers' },
  { path: '**', pathMatch: 'full', redirectTo: '/customers' }
]
```

The first route will check if someone visits our website for example at ```example.com``` which means that the url after the domain ```.com``` is empty then he will be 
redirected to ```example.com/customers``` and this will only happen if the url is 
matched completely.

The second route handles the urls that doesn't exist in our application so if anything 
after the domain doesn't match then it will automatically redirect to ```/customers```

Routing just needs ```<router-outlet></router-outlet>``` in ```app.components.html```
file to show the templates for the particular routes.

Now that we have our base routes defined we can create child routes for the particular 
modules. We will generate routing module for customers module.

To generate the ```customers-routing.module.ts``` file run the following command

```
ng generate module customers/customers-routing  --module=customers --flat

CREATE src/app/customers/customers-routing.module.spec.ts (356 bytes)
CREATE src/app/customers/customers-routing.module.ts (200 bytes)
UPDATE src/app/customers/customers.module.ts (806 bytes)
```

What the above command does is generate the **customers-routing** module inside the 
customers folder and also registers the module in the ```customers.module.ts```

**Remeber** that we can use ```RouterModule.forRoot(routes)``` only once and that too 
in the ```app.module.ts``` file so what about our new routing module for customers.

We have to use ```forChild``` with the new routes in the child modules.

When using ```redirectTo``` in routes we use the ```'/customers'``` by putting a slash
at the front of the path and when creating a path for the component we specify the
path without any slashes ```{ path: 'customers', component: CustomersComponent }```

## Orders
So now we need a completely separate folder for **orders** component, module and 
routing so for that we will use Angular CLI

```
ng generate component orders
ng generate module orders/orders --flat --module=app
ng generate module orders/orders-routing --flat --module=orders
```
