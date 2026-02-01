
import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api/auth/login';

const credentials = [
    { name: 'Admin', user: 'admin', pass: 'admin123' },
    { name: 'Staff', user: 'staff', pass: 'staff123' },
    { name: 'Demo Student', user: 'demo.student', pass: 'stud123' },
    { name: 'Simple Student', user: 'student', pass: 'stud123' }
];

async function verifyLogins() {
    console.log('--- Verifying Login Credentials ---');
    let allPass = true;

    for (const cred of credentials) {
        try {
            const res = await axios.post(BASE_URL, {
                username: cred.user,
                password: cred.pass
            });

            if (res.status === 200 && res.data.token) {
                console.log(`✅ [${cred.name}] Login Success (${cred.user})`);
            } else {
                console.error(`❌ [${cred.name}] Login Failed: Unexpected status ${res.status}`);
                allPass = false;
            }
        } catch (error) {
            let msg = error.message;
            if (error.response) {
                msg = `Status: ${error.response.status} - Data: ${JSON.stringify(error.response.data)}`;
            } else if (error.request) {
                msg = 'No response received from server (Is backend running on port 5000?)';
            }
            console.error(`❌ [${cred.name}] Login Failed: ${msg}`);
            allPass = false;
        }
    }

    if (allPass) {
        console.log('\nAll credentials verified successfully.');
        process.exit(0);
    } else {
        console.log('\nSome logins failed.');
        process.exit(1);
    }
}

verifyLogins();
