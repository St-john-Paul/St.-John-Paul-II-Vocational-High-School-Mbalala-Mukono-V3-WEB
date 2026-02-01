import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const adminDir = path.join(__dirname, '..', 'admin');

// Files to update (all admin pages except logout and allocations itself)
const filesToUpdate = [
    'academics.html', 'calendar.html', 'cms.html', 'documents.html',
    'faqs.html', 'finance.html', 'gallery.html', 'inquiries.html',
    'leadership.html', 'results.html', 'sections.html', 'settings.html',
    'staff.html', 'students.html', 'subscribers.html', 'testimonials.html',
    'timetable.html'
];

const searchPattern = '<a href="/admin/academics.html"><i class="fas fa-book"></i> Academics</a>\n            <a href="/admin/finance.html">';

const replacement = '<a href="/admin/academics.html"><i class="fas fa-book"></i> Academics</a>\n            <a href="/admin/allocations.html"><i class="fas fa-th"></i> Allocations</a>\n            <a href="/admin/finance.html">';

let updatedCount = 0;
let errorCount = 0;

filesToUpdate.forEach(filename => {
    const filePath = path.join(adminDir, filename);

    try {
        let content = fs.readFileSync(filePath, 'utf8');

        if (content.includes('allocations.html')) {
            console.log(`✓ ${filename} already has allocations link`);
            return;
        }

        if (content.includes(searchPattern)) {
            content = content.replace(searchPattern, replacement);
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`✓ Updated ${filename}`);
            updatedCount++;
        } else {
            console.log(`⚠ ${filename} - pattern not found`);
        }
    } catch (error) {
        console.error(`✗ Error updating ${filename}:`, error.message);
        errorCount++;
    }
});

console.log(`\n✅ Updated ${updatedCount} files`);
if (errorCount > 0) console.log(`❌ ${errorCount} errors`);
