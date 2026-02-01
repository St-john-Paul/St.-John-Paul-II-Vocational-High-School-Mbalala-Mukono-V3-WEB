
/**
 * Admin Panel UI Logic
 * Handles sidebar toggling on mobile devices.
 * Auto-injected into admin pages.
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Check if sidebar exists
    const sidebar = document.querySelector('.sidebar');
    if (!sidebar) return;

    // 2. Use Existing Mobile Toggle Button (Hardcoded in HTML)
    const toggleBtn = document.getElementById('mobileToggleBtn');

    // 3. Use Existing Overlay
    const overlay = document.querySelector('.sidebar-overlay');

    // 4. Toggle Logic
    const openSidebar = () => {
        if (sidebar) sidebar.classList.add('active');
        if (overlay) overlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    };

    const closeSidebar = () => {
        if (sidebar) sidebar.classList.remove('active');
        if (overlay) overlay.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
    };

    // 5. Event Listeners
    if (toggleBtn) {
        toggleBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (sidebar && sidebar.classList.contains('active')) closeSidebar();
            else openSidebar();
        });
    }

    if (overlay) {
        overlay.addEventListener('click', closeSidebar);
    }
});



/**
 * 6. Export Table to CSV
 * @param {string} tableId - ID of the HTML table
 * @param {string} filename - Desired filename (e.g., report.csv)
 */
/**
 * 6. Export Data to CSV (Generic)
 * @param {Array<string>} headers - Array of column headers
 * @param {Array<Array<any>>} rows - Array of row data arrays
 * @param {string} filename - Desired filename
 */
window.exportToCSV = (headers, rows, filename = 'report.csv') => {
    const csvContent = [
        headers.join(','), // Header row
        ...rows.map(row => row.map(cell => {
            // Escape quotes and wrap in quotes if necessary
            let val = String(cell || '').replace(/"/g, '""');
            if (val.search(/("|,|\n)/g) >= 0) val = `"${val}"`;
            return val;
        }).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    if (link.download !== undefined) {
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', filename);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
};

/**
 * Legacy Export (Keep for backward compatibility if needed, or remove)
 */
window.exportTableToCSV = (tableId, filename) => {
    console.warn('exportTableToCSV is deprecated. Use exportToCSV with data array instead.');
    // implementation fallback...
};

// Init Command Palette (Dynamic Import)
(async () => {
    try {
        const { CommandPalette, adminCommands } = await import('/src/components/CommandPalette.js');
        const init = () => new CommandPalette(adminCommands);

        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', init);
        } else {
            init();
        }
    } catch (e) {
        console.warn('Command Palette failed to load:', e);
    }
})();
