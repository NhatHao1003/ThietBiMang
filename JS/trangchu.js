
document.addEventListener('DOMContentLoaded', function () {
    // Kiểm tra form đăng ký
    const signupForm = document.getElementById('signupform');
    if (signupForm) {
        signupForm.addEventListener('submit', handleSignup);
    }

    // Kiểm tra form đăng nhập
    const loginForm = document.getElementById('loginform');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

    // Hàm xử lý đăng ký
    function handleSignup(event) {
        event.preventDefault();

        const phoneNumber = document.getElementById('dt').value;
        const firstName = document.getElementById('ho').value;
        const lastName = document.getElementById('ten').value;
        const password = document.getElementById('password').value;
        const rePassword = document.getElementById('re-password').value;

        if (password !== rePassword) {
            alert('Mật khẩu không khớp. Vui lòng nhập lại.');
            return;
        }

        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const existingUser = users.find(user => user.phoneNumber === phoneNumber);

        if (existingUser) {
            alert('Số điện thoại này đã được đăng ký!');
            return;
        }

        const newUser = {
            phoneNumber,
            firstName,
            lastName,
            password
        };

        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));

        alert('Đăng ký thành công!');
        window.location.href = './HTML/dangnhap.html';
    }

    // Hàm xử lý đăng nhập
    function handleLogin(event) {
        event.preventDefault();

        const phoneNumber = document.getElementById('sodt').value;
        const password = document.getElementById('password').value;

        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const user = users.find(user => user.phoneNumber === phoneNumber && user.password === password);

        if (user) {
            localStorage.setItem('currentUser', JSON.stringify(user));
            alert('Đăng nhập thành công!');
            window.location.href = './HTML/thongtintaikhoan.html';
        } else {
            alert('Số điện thoại hoặc mật khẩu không đúng!');
        }
    }

    function getRegisteredUsers() {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        return users;
    }

    function getCurrentUser() {
        const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
        return currentUser;
    }


    function updateNavbar() {
        const currentUser = getCurrentUser();
        const loginLink = document.getElementById('login-link');
        if (loginLink) {
            if (currentUser) {
                loginLink.innerHTML = `<i class="bi bi-person-circle"></i> ${currentUser.firstName} ${currentUser.lastName}`;
                loginLink.href = './HTML/thongtintaikhoan.html';
            } else {
                loginLink.innerHTML = `<i class="bi bi-person-circle"></i> Login`;
                loginLink.href = './HTML/dangnhap.html';
            }
        }
    }

    if (document.getElementById('login-link')) {
        updateNavbar();
    }
});
