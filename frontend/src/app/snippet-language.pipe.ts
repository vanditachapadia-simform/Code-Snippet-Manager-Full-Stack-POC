import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'snippetLanguage', standalone: true })
export class SnippetLanguagePipe implements PipeTransform {
  transform(snippets: any[], language: string): any[] {
    if (!language) return snippets;
    const lang = language.toLowerCase();
    return snippets.filter(snippet =>
      (snippet.language || '').toLowerCase().includes(lang)
    );
  }
}
