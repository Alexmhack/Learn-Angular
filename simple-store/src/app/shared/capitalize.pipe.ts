import { Pipe, PipeTransform } from '@angular/core';

// name of the pipe to use in template -> 'capitalize'
@Pipe({ name: 'capitalize' })

export class CapitalizePipe implements PipeTransform {
	transform(value: any) {
		if (value) {
			// capitalize the first letter of value and return
			return value.charAt(0).toUpperCase() + value.slice(1);
		}

		// if undefined or null then just return that
		return value;
	} 
}
