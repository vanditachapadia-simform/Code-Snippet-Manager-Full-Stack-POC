import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

export interface TableColumn {
  key: string;
  label: string;
  sortable?: boolean;
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
})
export class TableComponent {
  @Input() columns: TableColumn[] = [];
  @Input() data: any[] = [];
  @Input() pageSize = 10;
  @Input() searchKey = '';
  @Input() enableSearch = true;
  @Input() enablePagination = true;
  @Input() enableSort = true;
  @Output() rowClick = new EventEmitter<any>();
  @Output() delete = new EventEmitter<any>();
  @Output() copy = new EventEmitter<any>();
  @Output() share = new EventEmitter<any>();

  currentPage = 1;
  sortKey: string | null = null;
  sortAsc = true;
  searchTerm = '';

  get filteredData() {
    let filtered = this.data;
    if (this.enableSearch && this.searchTerm) {
      filtered = filtered.filter(row =>
        Object.values(row).some(val =>
          String(val).toLowerCase().includes(this.searchTerm.toLowerCase())
        )
      );
    }
    if (this.enableSort && this.sortKey) {
      filtered = filtered.slice().sort((a, b) => {
        if (a[this.sortKey!] < b[this.sortKey!]) return this.sortAsc ? -1 : 1;
        if (a[this.sortKey!] > b[this.sortKey!]) return this.sortAsc ? 1 : -1;
        return 0;
      });
    }
    return filtered;
  }

  get pagedData() {
    if (!this.enablePagination) return this.filteredData;
    const start = (this.currentPage - 1) * this.pageSize;
    return this.filteredData.slice(start, start + this.pageSize);
  }

  get totalPages() {
    return Math.ceil(this.filteredData.length / this.pageSize) || 1;
  }

  setSort(key: string) {
    if (this.sortKey === key) {
      this.sortAsc = !this.sortAsc;
    } else {
      this.sortKey = key;
      this.sortAsc = true;
    }
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  onRowClick(row: any) {
    this.rowClick.emit(row);
  }

  onDelete(row: any) {
    this.delete.emit(row);
  }

  onCopy(row: any) {
    this.copy.emit(row);
  }

  onShare(row: any) {
    this.share.emit(row);
  }
}
