/**
 * Toast Notification System
 * Small, non-blocking notifications for admin feedback.
 */

const toastStyles = `
.toast-container {
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 9999;
}
.toast {
    background: #333;
    color: white;
    padding: 12px 24px;
    border-radius: 8px;
    margin-bottom: 10px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    display: flex;
    align-items: center;
    gap: 10px;
    animation: slideIn 0.3s ease-out forwards;
    cursor: pointer;
    border-left: 4px solid #8B0000;
}
.toast-success { border-left-color: #10b981; }
.toast-error { border-left-color: #ef4444; }
.toast-info { border-left-color: #3b82f6; }

@keyframes slideIn {
    from { transform: translateX(100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
}
.toast.fade-out {
    animation: fadeOut 0.5s ease-in forwards;
}
@keyframes fadeOut {
    to { transform: translateX(100%); opacity: 0; }
}
`;

class Toast {
    constructor() {
        this.container = document.createElement('div');
        this.container.className = 'toast-container';
        document.body.appendChild(this.container);

        const style = document.createElement('style');
        style.textContent = toastStyles;
        document.head.appendChild(style);
    }

    show(message, type = 'info', duration = 3000) {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;

        let icon = '<i class="fas fa-info-circle"></i>';
        if (type === 'success') icon = '<i class="fas fa-check-circle"></i>';
        if (type === 'error') icon = '<i class="fas fa-exclamation-circle"></i>';

        toast.innerHTML = `${icon} <span>${message}</span>`;

        toast.onclick = () => this.hide(toast);
        this.container.appendChild(toast);

        setTimeout(() => this.hide(toast), duration);
    }

    hide(toast) {
        toast.classList.add('fade-out');
        setTimeout(() => toast.remove(), 500);
    }
}

export default new Toast();
