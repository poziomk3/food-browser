import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'extractYoutubeId',
  standalone: true,
})
export class ExtractYoutubeIdPipe implements PipeTransform {
  transform(value: string): string {
    return value.split('v=')[1]
  }
}
