import { Component, OnInit } from '@angular/core';
import { SnippetService, Snippet } from './snippet.service';
import { DynamicFormField, FormComponent } from './form.component';
import { TableColumn, TableComponent } from './table.component';
import { CommonModule } from '@angular/common';
import { SnippetSearchPipe } from './snippet-search.pipe';
import { SnippetLanguagePipe } from './snippet-language.pipe';
import { FormsModule } from '@angular/forms';
import { ToastService } from './toast.service';
import { ToastComponent } from './toast.component';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-snippet-manager',
  templateUrl: './snippet-manager.component.html',
  imports:[FormComponent,TableComponent,CommonModule,SnippetSearchPipe,SnippetLanguagePipe,FormsModule,ToastComponent],
  standalone: true
})
export class SnippetManagerComponent implements OnInit {
  snippets: Snippet[] = [];
  selectedSnippet: Snippet | null = null;
  showForm = false;
  search = '';
  languageFilter = '';
  pageSize = 10;

  toastMsg = '';
  toastType: 'success' | 'error' | 'info' | 'warning' = 'info';
  showToast = false;

  formFields: DynamicFormField[] = [
    { name: 'title', label: 'Title', type: 'text', validators: [Validators.required] },
    { name: 'code', label: 'Code', type: 'textarea', validators: [Validators.required], inputClass: 'w-100', rows: 6 },
    { name: 'language', label: 'Language', type: 'text', validators: [Validators.required] },
    { name: 'tags', label: 'Tags', type: 'text', validators: [Validators.required] }
  ];

  tableColumns: TableColumn[] = [
    { key: 'title', label: 'Title', sortable: true },
    { key: 'language', label: 'Language', sortable: true },
    { key: 'tags', label: 'Tags', sortable: false },
    { key: 'createdAt', label: 'Created', sortable: true },
    { key: 'updatedAt', label: 'Updated', sortable: true }
  ];

  constructor(private snippetService: SnippetService, private toast: ToastService) {
    this.toast.toastState$.subscribe(state => {
      this.toastMsg = state.message;
      this.toastType = state.type;
      this.showToast = state.show;
    });
  }

  ngOnInit() {
    this.loadSnippets();
  }

  loadSnippets() {
    this.snippetService.getSnippets().subscribe(snippets => this.snippets = snippets);
  }

  onSearch(term: string) {
    this.search = term;
  }

  onFilterLanguage(lang: string) {
    this.languageFilter = lang;
  }

  onCreate(snippet: any) {
    snippet.tags = snippet.tags ? snippet.tags.split(',').map((t: string) => t.trim()) : [];
    this.snippetService.createSnippet(snippet).subscribe({
      next: () => {
        this.showForm = false;
        this.selectedSnippet = null;
        this.loadSnippets();
        this.toast.show('Snippet created successfully!', 'success');
      },
      error: () => {
        this.toast.show('Failed to create snippet.', 'error');
      }
    });
  }

  onEdit(snippet: Snippet) {
    this.selectedSnippet = snippet;
    this.showForm = true;
  }

  copyCode(snippet: Snippet) {
    if (snippet && snippet.code) {
      navigator.clipboard.writeText(snippet.code)
        .then(() => {
          this.toast.show('Code copied to clipboard!', 'success');
        })
        .catch(() => {
          this.toast.show('Failed to copy code.', 'error');
        });
    }
  }

  onUpdate(snippet: any) {
    if (!this.selectedSnippet) return;
    // Only split tags if it's a string (from form input), otherwise keep as array
    if (typeof snippet.tags === 'string') {
      snippet.tags = snippet.tags ? snippet.tags.split(',').map((t: string) => t.trim()) : [];
    }
    this.snippetService.updateSnippet(this.selectedSnippet.id, snippet).subscribe({
      next: () => {
        this.showForm = false;
        this.selectedSnippet = null;
        this.loadSnippets();
        this.toast.show('Snippet updated successfully!', 'success');
      },
      error: () => {
        this.toast.show('Failed to update snippet.', 'error');
      }
    });
  }

  onDelete(snippet: Snippet) {
    this.snippetService.deleteSnippet(snippet.id).subscribe({
      next: () => {
        this.loadSnippets();
        this.toast.show('Snippet deleted successfully!', 'success');
      },
      error: () => {
        this.toast.show('Failed to delete snippet.', 'error');
      }
    });
  }

  onCancel() {
    this.showForm = false;
    this.selectedSnippet = null;
  }

  shareCode(snippet: Snippet) {
    if (snippet && snippet.code) {
      // Create a blob and URL for the code
      const blob = new Blob([snippet.code], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      // Open in a new tab for sharing (publicly accessible as long as the tab is open)
      window.open(url, '_blank');
      this.toast.show('Shareable link opened in new tab!', 'info');
    } else {
      this.toast.show('No code to share.', 'warning');
    }
  }
}
