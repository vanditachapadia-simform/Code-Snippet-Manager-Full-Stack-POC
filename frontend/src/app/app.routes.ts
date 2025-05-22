import { Routes } from '@angular/router';
import { SnippetManagerComponent } from './snippet-manager.component';

export const appRoutes: Routes = [
  { path: 'snippets', component: SnippetManagerComponent },
  { path: '', redirectTo: 'snippets', pathMatch: 'full' },
  { path: '**', redirectTo: 'snippets' }
];
