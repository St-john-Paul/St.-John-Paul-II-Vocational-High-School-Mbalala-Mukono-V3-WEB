/**
 * Reusable DataTable Component
 * Features: Pagination, Sorting, Search, Empty States
 */
export class DataTable {
    /**
     * @param {string} selector - CSS selector for the container
     * @param {Array} data - Array of objects
     * @param {Array} columns - Column definitions [{ header: 'Name', key: 'name', render: (row) => ... }]
     * @param {Object} options - { pageSize: 10 }
     */
    constructor(selector, data, columns, options = {}) {
        this.container = document.querySelector(selector);
        this.originalData = data;
        this.data = [...data];
        this.columns = columns;
        this.options = Object.assign({ pageSize: 10 }, options);

        this.state = {
            currentPage: 1,
            sortKey: null,
            sortDirection: 'asc',
            searchQuery: ''
        };

        this.init();
    }

    init() {
        this.renderLayout();
        this.renderTable();
        this.renderPagination();
    }

    updateData(newData) {
        this.originalData = newData;
        this.filterData();
    }

    renderLayout() {
        this.container.innerHTML = `
            <div class="dt-header" style="display: flex; justify-content: space-between; margin-bottom: 15px;">
                <div class="dt-search">
                    <input type="text" placeholder="Search records..." class="dt-search-input" 
                           style="padding: 10px; border: 1px solid #ddd; border-radius: 6px; width: 300px;">
                </div>
                <div class="dt-info" style="color: #666; align-self: center;"></div>
            </div>
            <div class="dt-table-wrapper" style="overflow-x: auto; background: white; border-radius: 8px; border: 1px solid #eee;">
                <table class="table" style="width: 100%; border-collapse: collapse;">
                    <thead style="background: #f8f9fa; border-bottom: 2px solid #eee;"></thead>
                    <tbody></tbody>
                </table>
            </div>
            <div class="dt-footer" style="display: flex; justify-content: space-between; margin-top: 15px; align-items: center;">
                <div class="dt-pagination-info" style="color: #666; font-size: 0.9rem;"></div>
                <div class="dt-pagination-controls" style="display: flex; gap: 5px;"></div>
            </div>
        `;

        // Search Event
        this.container.querySelector('.dt-search-input').addEventListener('input', (e) => {
            this.state.searchQuery = e.target.value;
            this.state.currentPage = 1;
            this.filterData();
        });
    }

    filterData() {
        let filtered = this.originalData;

        // Search
        if (this.state.searchQuery) {
            const q = this.state.searchQuery.toLowerCase();
            filtered = filtered.filter(row =>
                Object.values(row).some(val => String(val).toLowerCase().includes(q))
            );
        }

        // Sort
        if (this.state.sortKey) {
            filtered.sort((a, b) => {
                const valA = a[this.state.sortKey];
                const valB = b[this.state.sortKey];
                if (valA < valB) return this.state.sortDirection === 'asc' ? -1 : 1;
                if (valA > valB) return this.state.sortDirection === 'asc' ? 1 : -1;
                return 0;
            });
        }

        this.data = filtered;
        this.renderTable();
        this.renderPagination();
    }

    renderTable() {
        const table = this.container.querySelector('table');
        const thead = table.querySelector('thead');
        const tbody = table.querySelector('tbody');

        // Headers
        thead.innerHTML = `
            <tr>
                ${this.columns.map(col => `
                    <th style="padding: 12px 15px; text-align: left; cursor: pointer; font-weight: 600; color: #444;"
                        data-key="${col.key || ''}">
                        ${col.header}
                        ${this.state.sortKey === col.key ? (this.state.sortDirection === 'asc' ? '↑' : '↓') : ''}
                    </th>
                `).join('')}
            </tr>
        `;

        // Sort Events
        thead.querySelectorAll('th').forEach(th => {
            th.addEventListener('click', () => {
                const key = th.dataset.key;
                if (!key) return;

                if (this.state.sortKey === key) {
                    this.state.sortDirection = this.state.sortDirection === 'asc' ? 'desc' : 'asc';
                } else {
                    this.state.sortKey = key;
                    this.state.sortDirection = 'asc';
                }
                this.filterData();
            });
        });

        // Rows
        const start = (this.state.currentPage - 1) * this.options.pageSize;
        const pagedData = this.data.slice(start, start + this.options.pageSize);

        if (pagedData.length === 0) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="${this.columns.length}" style="text-align: center; padding: 40px; color: #999;">
                        <i class="fas fa-search" style="font-size: 2rem; margin-bottom: 10px; display: block; opacity: 0.3;"></i>
                        No records found
                    </td>
                </tr>`;
            return;
        }

        tbody.innerHTML = pagedData.map((row, index) => `
            <tr style="border-bottom: 1px solid #f0f0f0;">
                ${this.columns.map(col => `
                    <td style="padding: 12px 15px;">
                        ${col.render ? col.render(row, start + index) : (row[col.key] || '-')}
                    </td>
                `).join('')}
            </tr>
        `).join('');
    }

    renderPagination() {
        const totalPages = Math.ceil(this.data.length / this.options.pageSize);
        const controls = this.container.querySelector('.dt-pagination-controls');
        const info = this.container.querySelector('.dt-pagination-info');

        const start = (this.state.currentPage - 1) * this.options.pageSize + 1;
        const end = Math.min(start + this.options.pageSize - 1, this.data.length);

        info.textContent = this.data.length ?
            `Showing ${start} to ${end} of ${this.data.length} entries` :
            'No entries';

        if (totalPages <= 1) {
            controls.innerHTML = '';
            return;
        }

        let html = '';

        // Prev
        html += `<button class="btn-page" ${this.state.currentPage === 1 ? 'disabled' : ''} data-page="${this.state.currentPage - 1}">Previous</button>`;

        // Pages
        for (let i = 1; i <= totalPages; i++) {
            if (i === 1 || i === totalPages || (i >= this.state.currentPage - 1 && i <= this.state.currentPage + 1)) {
                html += `<button class="btn-page ${i === this.state.currentPage ? 'active' : ''}" data-page="${i}">${i}</button>`;
            } else if (i === this.state.currentPage - 2 || i === this.state.currentPage + 2) {
                html += `<span style="padding: 0 5px;">...</span>`;
            }
        }

        // Next
        html += `<button class="btn-page" ${this.state.currentPage === totalPages ? 'disabled' : ''} data-page="${this.state.currentPage + 1}">Next</button>`;

        controls.innerHTML = html;

        // Styles for buttons
        controls.querySelectorAll('.btn-page').forEach(btn => {
            btn.style.cssText = `
                padding: 6px 12px;
                border: 1px solid #ddd;
                background: ${btn.classList.contains('active') ? '#8B0000' : 'white'};
                color: ${btn.classList.contains('active') ? 'white' : '#333'};
                border-radius: 4px;
                cursor: pointer;
            `;
            if (btn.disabled) {
                btn.style.opacity = '0.5';
                btn.style.cursor = 'not-allowed';
            }
            btn.addEventListener('click', () => {
                if (btn.disabled) return;
                this.state.currentPage = parseInt(btn.dataset.page);
                this.renderTable();
                this.renderPagination();
            });
        });
    }
}
