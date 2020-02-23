import { Pipe, PipeTransform } from '@angular/core';
import * as MarkdownIt from 'markdown-it';
import * as emoji from 'markdown-it-emoji';
import * as mark from 'markdown-it-mark';
import * as sup from 'markdown-it-sup';
import * as sub from 'markdown-it-sub';
import * as taskLists from 'markdown-it-task-lists';
import * as ins from 'markdown-it-ins';
import * as video from '@centerforopenscience/markdown-it-video';
import * as hljs from 'highlight.js';

@Pipe({
  name: 'markdownIt'
})
export class MarkdownItPipe implements PipeTransform {
  private md = new MarkdownIt({
    linkify: true,
    highlight: (str, lang) => {
      if (lang && hljs.getLanguage(lang)) {
        try {
          return `<pre class="hljs"><code>${hljs.highlight(lang, str, true).value}</code></pre>`;
        } catch (__) {}
      }

      return `<pre class="hljs"><code>${this.md.utils.escapeHtml(str)}</code></pre>`;
    }
  }).use(emoji).use(mark).use(sup).use(sub).use(taskLists).use(ins).use(video);

  transform(value: string): string {
    return this.md.render(value);
  }

}
