import { NgModule } from '@angular/core';

import { CapitalizePipe } from './capitalize.pipe';

// you can delcare pipes, components, directives
// to make the pipe public export it
@NgModule({
	declarations: [ CapitalizePipe ],
	exports: [ CapitalizePipe ]
})

export class SharedModule { }
