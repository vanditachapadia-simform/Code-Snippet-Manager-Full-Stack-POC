import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'snippetSearch', standalone: true })
export class SnippetSearchPipe implements PipeTransform {
  transform(snippets: any[], search: string): any[] {
    if (!search) return snippets;
    const term = search.toLowerCase();
    return snippets.filter(snippet =>
      Object.values(snippet).some(val =>
        String(val).toLowerCase().includes(term)
      )
    );
  }
}
