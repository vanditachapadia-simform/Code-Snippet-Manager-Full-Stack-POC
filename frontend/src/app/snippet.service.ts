import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../environments/environment';
import { ToastService } from './toast.service';

export interface Snippet {
  id: string;
  title: string;
  code?: string;
  filePath?: string;
  language?: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

@Injectable({ providedIn: 'root' })
export class SnippetService {
  private apiUrl = environment.apiUrl + '/snippets';

  constructor(private http: HttpClient, private toast: ToastService) {}

  getSnippets(params?: any): Observable<Snippet[]> {
    return this.http.get<Snippet[]>(this.apiUrl, { params })
      .pipe(catchError(error => this.handleError(error, 'Failed to load snippets.')));
  }

  getSnippet(id: string): Observable<Snippet> {
    return this.http.get<Snippet>(`${this.apiUrl}/${id}`)
      .pipe(catchError(error => this.handleError(error, 'Failed to load snippet.')));
  }

  createSnippet(snippet: Partial<Snippet>): Observable<Snippet> {
    return this.http.post<Snippet>(this.apiUrl, snippet)
      .pipe(catchError(error => this.handleError(error, 'Failed to create snippet.')));
  }

  updateSnippet(id: string, snippet: Partial<Snippet>): Observable<Snippet> {
    return this.http.patch<Snippet>(`${this.apiUrl}/${id}`, snippet)
      .pipe(catchError(error => this.handleError(error, 'Failed to update snippet.')));
  }

  deleteSnippet(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`)
      .pipe(catchError(error => this.handleError(error, 'Failed to delete snippet.')));
  }

  private handleError(error: any, userMsg?: string) {
    console.error('API error:', error);
    if (userMsg) {
      this.toast.show(userMsg, 'error');
    }
    return throwError(() => error);
  }
}
