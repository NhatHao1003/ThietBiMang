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
        window.location.href = './dangnhap.html';
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
            window.location.href = './thongtintaikhoan.html';
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

    window.logout = function () {
        localStorage.removeItem('currentUser');
        alert('Đăng xuất thành công!');
        window.location.href = './dangnhap.html';
    }

    function displayUserInfo() {
        const currentUser = getCurrentUser();
        if (currentUser) {
            const userInfoElement = document.getElementById('user-info');
            if (userInfoElement) {
                userInfoElement.innerHTML = `
                    <h3 class = "d-flex justify-content-center mb-4" style ="font-size: 30px; font-weight: bold">THÔNG TIN TÀI KHOẢN</h3>
                    <p><strong>Số điện thoại:</strong> ${currentUser.phoneNumber}</p>
                    <p><strong>Họ tên:</strong> ${currentUser.firstName} ${currentUser.lastName}</p>
                    <p class="d-flex justify-content-center " style ="font-size: 25px;"><strong>SẢN PHẨM ĐÃ ĐẶT</strong></p>
                    <div class="table-responsive">
                    <table class="table table-bordered align-middle">
                        <thead class="table-primary">
                        <tr>
                            <th>Sản phẩm</th>
                            <th>Số lượng</th>
                            <th>Giá</th>
                            <th>Thành tiền</th>
                        </tr>
                        </thead>
                        <tbody id="order-summary">

                        </tbody>
                    </table>
                    </div>
                    <button onclick="logout()" class="btn btn-danger mt-3" style="margin-left: 460px">Đăng xuất</button>
                `;
            }
        } else {
            window.location.href = './dangnhap.html';
        }
    }

    // Kiểm tra trạng thái đăng nhập & hiển thị thông tin nếu cần
    const protectedPages = ['./index.html', 'thongtintaikhoan.html'];
    const currentPage = window.location.pathname.split('/').pop();

    if (protectedPages.includes(currentPage)) {
        const currentUser = getCurrentUser();
        if (!currentUser) {
            window.location.href = './dangnhap.html';
        }
    }

    if (currentPage === 'index.html' || currentPage === 'thongtintaikhoan.html') {
        displayUserInfo();
    }

    function updateNavbar() {
        const currentUser = getCurrentUser();
        const loginLink = document.getElementById('login-link');
        if (loginLink) {
            if (currentUser) {
                loginLink.innerHTML = `<i class="bi bi-person-circle"></i> ${currentUser.firstName} ${currentUser.lastName}`;
                loginLink.href = './thongtintaikhoan.html';
            } else {
                loginLink.innerHTML = `<i class="bi bi-person-circle"></i> Login`;
                loginLink.href = './dangnhap.html';
            }
        }
    }

    updateNavbar();
});

