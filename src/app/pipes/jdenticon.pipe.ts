import { Pipe, PipeTransform } from '@angular/core';
import { toSvg } from 'jdenticon';

@Pipe({
  name: 'jdenticon'
})
export class JdenticonPipe implements PipeTransform {

  transform(value: string, size: number): string {
    return toSvg(value, size);
  }

}
