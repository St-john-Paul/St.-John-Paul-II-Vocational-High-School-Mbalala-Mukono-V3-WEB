// using global fetch


const BASE_URL = 'http://localhost:5000';
let token = '';

async function login() {
    console.log('Logging in as admin...');
    const res = await fetch(`${BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: 'admin', password: 'admin123' })
    });

    if (!res.ok) throw new Error('Login failed: ' + res.statusText);
    const data = await res.json();
    token = data.token;
    console.log('Login successful. Token acquired.');
}

async function createEntry() {
    console.log('Creating test timetable entry...');
    const entryData = {
        type: 'routine',
        activity_name: 'TEST_DELETE_ME',
        start_time: '10:00',
        end_time: '11:00',
        applies_to: 'all',
        display_order: 999
    };

    const res = await fetch(`${BASE_URL}/api/content/timetable`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(entryData)
    });

    if (!res.ok) throw new Error('Create failed: ' + res.statusText);
    const data = await res.json();
    console.log('Entry created with ID:', data.id);
    return data.id;
}

async function deleteEntry(id) {
    console.log(`Deleting entry ${id}...`);
    const res = await fetch(`${BASE_URL}/api/content/timetable/${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    if (!res.ok) throw new Error('Delete failed: ' + res.statusText);
    console.log('Delete request successful.');
}

async function verifyDeletion(id) {
    console.log(`Verifying deletion of ${id}...`);
    const res = await fetch(`${BASE_URL}/api/content/timetable?type=routine`);
    const entries = await res.json();

    const exists = entries.some(e => e.id === id);
    if (exists) throw new Error('Entry still exists after deletion!');
    console.log('Verification successful: Entry is gone.');
}

(async () => {
    try {
        await login();
        const id = await createEntry();
        await deleteEntry(id);
        await verifyDeletion(id);
        console.log('✅ TEST PASSED: Delete functionality works.');
    } catch (error) {
        console.error('❌ TEST FAILED:', error.message);
        process.exit(1);
    }
})();
