import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
    name: 'separate',
    standalone: true,
})
export class SeparatePipe implements PipeTransform {
    transform(value: string, arg?: string): string[] {
        return value ? value.split(arg ?? ',') : []
    }
}
