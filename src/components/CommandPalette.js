export class CommandPalette {
    constructor(commands) {
        this.commands = commands || [];
        this.isOpen = false;
        this.selectedIndex = 0;
        this.createElement();
        this.attachEvents();
    }

    createElement() {
        // Create Styles
        const style = document.createElement('style');
        style.textContent = `
            .cmd-overlay {
                position: fixed; top: 0; left: 0; width: 100%; height: 100%;
                background: rgba(0,0,0,0.5); z-index: 9999;
                display: none; align-items: flex-start; justify-content: center;
                backdrop-filter: blur(2px); padding-top: 100px;
            }
            .cmd-modal {
                background: white; width: 600px; max-width: 90%;
                border-radius: 12px; box-shadow: 0 20px 50px rgba(0,0,0,0.2);
                overflow: hidden; display: flex; flex-direction: column;
            }
            .cmd-input {
                width: 100%; padding: 20px; font-size: 1.2rem; border: none;
                border-bottom: 1px solid #eee; outline: none;
            }
            .cmd-list {
                max-height: 400px; overflow-y: auto; padding: 10px;
                margin: 0; list-style: none;
            }
            .cmd-item {
                padding: 12px 15px; border-radius: 8px; cursor: pointer;
                display: flex; align-items: center; gap: 15px;
                color: #333; transition: all 0.1s;
            }
            .cmd-item.selected { background: #f3f4f6; color: var(--school-red, #8B0000); }
            .cmd-item i { width: 25px; text-align: center; color: #999; }
            .cmd-item.selected i { color: var(--school-red, #8B0000); }
            .cmd-shortcut { margin-left: auto; font-size: 0.8rem; color: #999; background: #eee; padding: 2px 6px; border-radius: 4px; }
            .cmd-footer {
                background: #f9fafb; padding: 10px 20px; font-size: 0.8rem; color: #666;
                border-top: 1px solid #eee; display: flex; justify-content: space-between;
            }
        `;
        document.head.appendChild(style);

        // Create HTML
        this.overlay = document.createElement('div');
        this.overlay.className = 'cmd-overlay';
        this.overlay.innerHTML = `
            <div class="cmd-modal">
                <input type="text" class="cmd-input" placeholder="Type a command or search...">
                <ul class="cmd-list"></ul>
                <div class="cmd-footer">
                    <span><kbd>↑</kbd> <kbd>↓</kbd> to navigate</span>
                    <span><kbd>Enter</kbd> to select</span>
                    <span><kbd>Esc</kbd> to close</span>
                </div>
            </div>
        `;
        document.body.appendChild(this.overlay);

        this.input = this.overlay.querySelector('.cmd-input');
        this.list = this.overlay.querySelector('.cmd-list');
    }

    attachEvents() {
        // Toggle (Ctrl+K or Cmd+K)
        document.addEventListener('keydown', (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                this.toggle();
            }
            if (e.key === 'Escape' && this.isOpen) this.close();

            if (!this.isOpen) return;

            // Navigation
            if (e.key === 'ArrowDown') {
                e.preventDefault();
                this.selectedIndex = (this.selectedIndex + 1) % this.visibleCommands.length;
                this.renderList();
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                this.selectedIndex = (this.selectedIndex - 1 + this.visibleCommands.length) % this.visibleCommands.length;
                this.renderList();
            } else if (e.key === 'Enter') {
                e.preventDefault();
                this.execute(this.visibleCommands[this.selectedIndex]);
            }
        });

        // Search
        this.input.addEventListener('input', () => {
            this.selectedIndex = 0;
            this.renderList();
        });

        // Click Overlay to Close
        this.overlay.addEventListener('click', (e) => {
            if (e.target === this.overlay) this.close();
        });
    }

    toggle() {
        this.isOpen ? this.close() : this.open();
    }

    open() {
        this.isOpen = true;
        this.overlay.style.display = 'flex';
        this.input.value = '';
        this.input.focus();
        this.renderList();
    }

    close() {
        this.isOpen = false;
        this.overlay.style.display = 'none';
    }

    get visibleCommands() {
        const query = this.input.value.toLowerCase();
        return this.commands.filter(cmd =>
            cmd.title.toLowerCase().includes(query) ||
            (cmd.keywords && cmd.keywords.toLowerCase().includes(query))
        );
    }

    renderList() {
        this.list.innerHTML = '';
        const cmds = this.visibleCommands;

        if (cmds.length === 0) {
            this.list.innerHTML = '<div style="padding: 20px; text-align: center; color: #999;">No commands found</div>';
            return;
        }

        cmds.forEach((cmd, index) => {
            const li = document.createElement('li');
            li.className = `cmd-item ${index === this.selectedIndex ? 'selected' : ''}`;
            li.innerHTML = `
                <i class="${cmd.icon}"></i>
                <span>${cmd.title}</span>
                ${cmd.shortcut ? `<span class="cmd-shortcut">${cmd.shortcut}</span>` : ''}
            `;
            li.onclick = () => this.execute(cmd);
            li.onmouseover = () => {
                this.selectedIndex = index;
                this.renderList(); // Re-render to update selection style (inefficient but simple)
                // Actually, querySelector is better for performace
                // But keeping it simple for now
            };
            this.list.appendChild(li);
        });

        // Scroll into view
        const selected = this.list.children[this.selectedIndex];
        if (selected) {
            selected.scrollIntoView({ block: 'nearest' });
        }
    }

    execute(cmd) {
        if (!cmd) return;
        this.close();
        if (cmd.action) cmd.action();
        if (cmd.href) window.location.href = cmd.href;
    }
}

// Default Admin Commands
export const adminCommands = [
    // Navigation
    { title: 'Go to Dashboard', icon: 'fas fa-home', href: '/admin/dashboard.html', keywords: 'home main' },
    { title: 'Manage Students', icon: 'fas fa-user-graduate', href: '/admin/students.html', keywords: 'add list pupils' },
    { title: 'Manage Finance', icon: 'fas fa-coins', href: '/admin/finance.html', keywords: 'fees payments money' },
    { title: 'View Analytics', icon: 'fas fa-chart-line', href: '/admin/analytics.html', keywords: 'stats graphs reports' },
    { title: 'Communication Center', icon: 'fas fa-comments', href: '/admin/communication.html', keywords: 'sms whatsapp broadcast' },
    { title: 'Manage Staff', icon: 'fas fa-chalkboard-teacher', href: '/admin/staff.html', keywords: 'teachers employees' },

    // Actions
    { title: 'Add New Student', icon: 'fas fa-plus', action: () => { window.location.href = '/admin/students.html'; setTimeout(() => window.openModal(), 500); }, keywords: 'create register' },
    { title: 'Record Payment', icon: 'fas fa-receipt', action: () => { window.location.href = '/admin/finance.html'; }, keywords: 'pay fee' },
    { title: 'Send Broadcast', icon: 'fas fa-paper-plane', action: () => { window.location.href = '/admin/communication.html'; }, keywords: 'message sms' },

    // System
    { title: 'Logout', icon: 'fas fa-sign-out-alt', href: '/admin/logout.html', keywords: 'exit signout' }
];
