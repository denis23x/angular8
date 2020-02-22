import { Pipe, PipeTransform } from '@angular/core';
import * as MarkdownIt from 'markdown-it';

@Pipe({
  name: 'markdownIt'
})
export class MarkdownItPipe implements PipeTransform {
  private md = new MarkdownIt();

  transform(value: string, ...args: any[]): string {
    return this.md.render(value);
  }

}
