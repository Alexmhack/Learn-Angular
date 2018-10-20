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
