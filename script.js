document.addEventListener('DOMContentLoaded', () => {
    // Maintain Login session details correctly on navbar
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
        const navName = document.getElementById('navUserName');
        const userDisplayName = document.getElementById('userDisplayName');
        if (navName) navName.innerText = currentUser.name.split(' ')[0]; // Show first name
        if (userDisplayName) userDisplayName.innerText = currentUser.name;
    }
});

function switchAuthTab(tab) {
    const loginForm = document.getElementById('loginForm');
    const regForm = document.getElementById('registerForm');
    const tabLoginBtn = document.getElementById('tabLoginBtn');
    const tabRegBtn = document.getElementById('tabRegBtn');

    if (tab === 'login') {
        loginForm.style.display = 'block';
        regForm.style.display = 'none';
        tabLoginBtn.classList.add('active');
        tabRegBtn.classList.remove('active');
    } else {
        loginForm.style.display = 'none';
        regForm.style.display = 'block';
        tabRegBtn.classList.add('active');
        tabLoginBtn.classList.remove('active');
    }
}

function togglePassword(inputId, icon) {
    const input = document.getElementById(inputId);
    if (input.type === "password") {
        input.type = "text";
        icon.classList.replace("fa-eye", "fa-eye-slash");
    } else {
        input.type = "password";
        icon.classList.replace("fa-eye-slash", "fa-eye");
    }
}

function handleRegister(event) {
    event.preventDefault();
    
    const name = document.getElementById('regName').value.trim();
    const email = document.getElementById('regEmail').value.trim();
    const password = document.getElementById('regPassword').value;
    const phone = document.getElementById('regPhone').value.trim();
    const address = document.getElementById('regAddress').value.trim();
    const error = document.getElementById('regError');

    if (password.length < 6) {
        error.innerText = "Password must be at least 6 characters!";
        return false;
    }

    const userData = { name, email, password, phone, address, role: 'customer' };
    localStorage.setItem(email, JSON.stringify(userData));

    error.innerText = "";
    alert("Registration Successful! Please login.");
    switchAuthTab('login');
    return true;
}

    function handleLogin(event) {
        event.preventDefault();

        const email = document.getElementById('loginEmail').value.trim();
        const password = document.getElementById('loginPassword').value;
        const error = document.getElementById('loginError');

        const storedUser = localStorage.getItem(email);

        if (!storedUser) {
            error.innerText = "Account not found! Please register first.";
            return false;
        }

        const userData = JSON.parse(storedUser);

        if (userData.password === password) {
            error.innerText = "";
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('currentUser', JSON.stringify(userData));

            alert(`Welcome to Zyntech, ${userData.name}!`);
            window.location.href = "index.html";
            return true;
        } else {
            error.innerText = "Incorrect password! Try again.";
            return false;
        }
    }


function logout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('currentUser');
 
    window.alert("You have been logged out successfully.");
    window.location.href = "login.html";

}
function loginCheck() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');  
    window.location.href = isLoggedIn ? "index.html" : "login.html";
}

function toggleCart() {
    const overlay = document.getElementById('cartOverlay');
    const drawer = document.getElementById('cartDrawer');
    if (overlay && drawer) {
        overlay.classList.toggle('active');
        drawer.classList.toggle('active');
    }
}

function toggleTrackModal() {
    const overlay = document.getElementById('trackModalOverlay');
    const modal = document.getElementById('trackModal');
    if(overlay && modal) {
        overlay.classList.toggle('active');
        modal.classList.toggle('active');
    }
}

function checkOrderStatus() {
    const val = document.getElementById('trackInput').value.trim();
    const res = document.getElementById('trackResult');
    if (!val) return alert("Enter Order Ref!");
    res.style.display = "block";
    res.style.marginTop = "10px";
    res.style.padding = "10px";
    res.style.background = "#f1f6fa";
    res.style.borderRadius = "8px";
    res.style.fontSize = "12px";
    res.innerHTML = `<strong>Status:</strong> Processing Compatibility & Delivery! 📦<br><small>Ref ID: ${val}</small>`;

}

