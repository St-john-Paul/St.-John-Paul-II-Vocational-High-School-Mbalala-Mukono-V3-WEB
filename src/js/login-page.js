import { login } from '../utils/auth.js';

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const errorMsg = document.getElementById('errorMsg');
    const submitBtn = document.getElementById('submitBtn');
    const tabs = document.querySelectorAll('.login-tab');

    // Tab Switching Logic
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            const role = tab.textContent.trim();
            if (role === 'Student') {
                usernameInput.placeholder = 'Student ID';
                // Optional: You could also stash the selected role if needed for the backend,
                // but the current auth implementation seems to rely on the backend finding the user.
            } else {
                usernameInput.placeholder = 'Username';
            }
        });
    });

    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            // UI Loading State
            const originalBtnText = submitBtn.textContent;
            submitBtn.textContent = 'Logging in...';
            submitBtn.disabled = true;
            if (errorMsg) errorMsg.style.display = 'none';

            const username = usernameInput.value.trim();
            const password = passwordInput.value.trim();

            if (!username || !password) {
                showError('Please enter both username and password.');
                resetBtn();
                return;
            }

            try {
                const data = await login(username, password);

                // Redirect based on role
                if (data.user.role === 'admin') {
                    window.location.href = '/admin/dashboard.html';
                } else if (data.user.role === 'staff') {
                    window.location.href = '/staff/dashboard.html';
                } else if (data.user.role === 'student') {
                    window.location.href = '/student/dashboard.html';
                } else {
                    // Fallback
                    window.location.href = '/';
                }
            } catch (error) {
                showError(error.message || 'Login failed. Please check your credentials.');
                resetBtn();
            }

            function resetBtn() {
                submitBtn.textContent = originalBtnText;
                submitBtn.disabled = false;
            }

            function showError(msg) {
                if (errorMsg) {
                    errorMsg.textContent = msg;
                    errorMsg.style.display = 'block';
                } else {
                    alert(msg);
                }
            }
        });
    }
});
