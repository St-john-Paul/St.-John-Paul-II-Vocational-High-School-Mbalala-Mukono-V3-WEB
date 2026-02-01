import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const adminDir = path.join(__dirname, '../admin');

const sidebarTemplate = (activePage) => `
    <nav class="sidebar">
        <div class="sidebar-header">
            <img src="/logo.png" alt="Logo">
            <h3>St. John Paul II<br>Admin Portal</h3>
        </div>
        <div class="sidebar-menu">
            <div class="sidebar-label">Main</div>
            <a href="/admin/dashboard.html" class="${activePage === 'dashboard.html' ? 'active' : ''}"><i class="fas fa-home"></i> Dashboard</a>
            <a href="/admin/analytics.html" class="${activePage === 'analytics.html' ? 'active' : ''}"><i class="fas fa-chart-line"></i> Analytics</a>
            <a href="/admin/communication.html" class="${activePage === 'communication.html' ? 'active' : ''}"><i class="fas fa-comments"></i> Communication</a>
            <a href="/admin/students.html" class="${activePage === 'students.html' ? 'active' : ''}"><i class="fas fa-user-graduate"></i> Students</a>
            <a href="/admin/staff.html" class="${activePage === 'staff.html' ? 'active' : ''}"><i class="fas fa-chalkboard-teacher"></i> Staff</a>
            <a href="/admin/academics.html" class="${activePage === 'academics.html' ? 'active' : ''}"><i class="fas fa-book"></i> Academics</a>
            <a href="/admin/allocations.html" class="${activePage === 'allocations.html' ? 'active' : ''}"><i class="fas fa-th"></i> Allocations</a>
            <a href="/admin/finance.html" class="${activePage === 'finance.html' ? 'active' : ''}"><i class="fas fa-coins"></i> Finance</a>
            <a href="/admin/results.html" class="${activePage === 'results.html' ? 'active' : ''}"><i class="fas fa-chart-line"></i> Results</a>

            <div class="sidebar-label">Content</div>
            <a href="/admin/sections.html" class="${activePage === 'sections.html' ? 'active' : ''}"><i class="fas fa-layer-group"></i> Page Sections</a>
            <a href="/admin/cms.html" class="${activePage === 'cms.html' ? 'active' : ''}"><i class="fas fa-newspaper"></i> News & Events</a>
            <a href="/admin/gallery.html" class="${activePage === 'gallery.html' ? 'active' : ''}"><i class="fas fa-images"></i> Gallery</a>
            <a href="/admin/leadership.html" class="${activePage === 'leadership.html' ? 'active' : ''}"><i class="fas fa-users"></i> Leadership</a>
            <a href="/admin/testimonials.html" class="${activePage === 'testimonials.html' ? 'active' : ''}"><i class="fas fa-quote-left"></i> Testimonials</a>
            <a href="/admin/subscribers.html" class="${activePage === 'subscribers.html' ? 'active' : ''}"><i class="fas fa-envelope"></i> Newsletter</a>
            <a href="/admin/inquiries.html" class="${activePage === 'inquiries.html' ? 'active' : ''}"><i class="fas fa-question-circle"></i> Inquiries</a>
            <a href="/admin/calendar.html" class="${activePage === 'calendar.html' ? 'active' : ''}"><i class="fas fa-calendar-alt"></i> Calendar</a>
            <a href="/admin/timetable.html" class="${activePage === 'timetable.html' ? 'active' : ''}"><i class="fas fa-clock"></i> Timetable</a>
            <a href="/admin/documents.html" class="${activePage === 'documents.html' ? 'active' : ''}"><i class="fas fa-file-pdf"></i> Documents</a>
            <a href="/admin/faqs.html" class="${activePage === 'faqs.html' ? 'active' : ''}"><i class="fas fa-question"></i> FAQs</a>
        </div>
        <div class="sidebar-footer">
            <a href="/admin/settings.html" class="${activePage === 'settings.html' ? 'active' : ''}"><i class="fas fa-cog"></i> Settings</a>
            <a href="/admin/logout.html"><i class="fas fa-sign-out-alt"></i> Logout</a>
        </div>
    </nav>
`;

fs.readdir(adminDir, (err, files) => {
    if (err) {
        console.error('Error reading dir:', err);
        return;
    }

    files.forEach(file => {
        if (path.extname(file) === '.html') {
            const filePath = path.join(adminDir, file);
            let content = fs.readFileSync(filePath, 'utf8');

            // Regex to match existing sidebar
            // Matches <nav class="sidebar"> ... </nav> across multiple lines
            const regex = /<nav class="sidebar">[\s\S]*?<\/nav>/;

            if (regex.test(content)) {
                // Ensure Mobile Toggle Button Exists
                if (!content.includes('id="mobileToggleBtn"')) {
                    content = content.replace('<body class="admin-page">', '<body class="admin-page">\n    <button id="mobileToggleBtn"><i class="fas fa-bars"></i></button>\n    <div class="sidebar-overlay"></div>');
                }

                // Replace Sidebar
                const newSidebar = sidebarTemplate(file);
                const newContent = content.replace(regex, newSidebar);

                fs.writeFileSync(filePath, newContent);
                console.log(`Updated sidebar in ${file}`);
            } else {
                console.warn(`No sidebar found in ${file}`);
            }
        }
    });
});
