export function initWhatsApp() {
    const phoneNumber = "256708419371";

    // Create Widget Container
    const whatsappWidget = document.createElement('div');
    whatsappWidget.id = 'whatsapp-widget';
    Object.assign(whatsappWidget.style, {
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        zIndex: '9999',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        gap: '10px',
        pointerEvents: 'none'
    });

    whatsappWidget.innerHTML = `
        <!-- Main Button -->
        <a href="https://wa.me/${phoneNumber}" target="_blank" rel="noopener noreferrer" 
           style="pointer-events: auto; position: relative; background: #25D366; color: white; width: 50px; height: 50px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.8rem; box-shadow: 0 4px 10px rgba(37, 211, 102, 0.4); transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275); text-decoration: none;"
           onmouseover="this.style.transform='scale(1.1) translateY(-3px)'; this.style.boxShadow='0 8px 20px rgba(37, 211, 102, 0.6)';"
           onmouseout="this.style.transform='scale(1) translateY(0)'; this.style.boxShadow='0 4px 10px rgba(37, 211, 102, 0.4)';"
           title="Chat with Admission Office">
            <i class="fab fa-whatsapp"></i>
            
            <!-- Notification Badge -->
            <span style="position: absolute; top: 0; right: 0; display: flex; h-3 w-3;">
                <span style="position: absolute; display: inline-flex; height: 100%; width: 100%; border-radius: 50%; background-color: #ef4444; opacity: 0.75; animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;"></span>
                <span style="position: relative; display: inline-flex; height: 10px; width: 10px; border-radius: 50%; background-color: #ef4444; border: 1.5px solid white;"></span>
            </span>
        </a>
    `;

    // Add ping animation style
    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes ping {
            75%, 100% { transform: scale(2); opacity: 0; }
        }
    `;
    document.head.appendChild(style);

    document.body.appendChild(whatsappWidget);
}
