const appInfo = {
    appName: "SecureAuth System",
    version: "2.1",
    developer: "AuthTech Inc.",
    securityLevel: "Enterprise"
};

console.log(`🚀 ${appInfo.appName} v${appInfo.version} initialized`);
console.log(`🔒 Security Level: ${appInfo.securityLevel}`);

// Enhanced User Constructor with more properties
function User(username, role) {
    this.id = Math.random().toString(36).substr(2, 9);
    this.username = username;
    this.role = role;
    this.createdAt = new Date();
    this.lastLogin = null;
    this.status = "active";
    this.loginCount = 0;
    this.permissions = this.getPermissionsByRole();
}

// Prototype Methods
User.prototype.login = function() {
    this.lastLogin = new Date();
    this.loginCount++;
    this.status = "active";
    
    console.log(`🔑 ${this.username} logged in successfully`);
    console.log(`📊 Total logins: ${this.loginCount}`);
    
    showToast(`${this.username} logged in successfully`, 'success');
    updateUserStats();
};

User.prototype.getUserInfo = function() {
    return {
        id: this.id,
        username: this.username,
        role: this.role,
        created: this.createdAt.toLocaleDateString(),
        lastLogin: this.lastLogin ? this.lastLogin.toLocaleTimeString() : 'Never',
        loginCount: this.loginCount,
        permissions: this.permissions
    };
};

User.prototype.getPermissionsByRole = function() {
    const permissionMap = {
        'Admin': ['read', 'write', 'delete', 'manage_users', 'system_config'],
        'Manager': ['read', 'write', 'manage_team'],
        'Editor': ['read', 'write'],
        'Viewer': ['read'],
        'Guest': ['read_limited']
    };
    return permissionMap[this.role] || ['read'];
};

User.prototype.getDisplayInfo = function() {
    const roleColors = {
        'Admin': 'admin',
        'Manager': 'manager',
        'Editor': 'editor',
        'Viewer': 'viewer',
        'Guest': 'guest'
    };
    
    return {
        name: this.username,
        role: this.role,
        roleClass: roleColors[this.role] || 'guest',
        status: this.status,
        loginCount: this.loginCount
    };
};

// Application State
let users = [];
let userCounter = 0;

// DOM Elements
const addUserBtn = document.getElementById('addUserBtn');
const usernameInput = document.getElementById('username');
const roleSelect = document.getElementById('role');
const usersContainer = document.getElementById('usersContainer');
const totalUsersSpan = document.getElementById('totalUsers');
const activeUsersSpan = document.getElementById('activeUsers');
const refreshBtn = document.getElementById('refreshBtn');
const sortBtn = document.getElementById('sortBtn');
const roleDescription = document.getElementById('roleDescription');
const usernameValidation = document.getElementById('usernameValidation');

// Role Descriptions
const roleDescriptions = {
    'Admin': 'Full system access including user management, system configuration, and all administrative privileges.',
    'Manager': 'Team management access with ability to manage team members and review team activities.',
    'Editor': 'Content creation and editing permissions with limited administrative access.',
    'Viewer': 'Read-only access to view content and reports without modification rights.',
    'Guest': 'Limited access for temporary users with restricted permissions.'
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    console.log('📱 Application loaded successfully');
    setupEventListeners();
    updateUserStats();
    setupFormValidation();
});

function setupEventListeners() {
    addUserBtn.addEventListener('click', handleAddUser);
    refreshBtn.addEventListener('click', refreshUsersList);
    sortBtn.addEventListener('click', toggleSort);
    
    usernameInput.addEventListener('input', validateUsername);
    roleSelect.addEventListener('change', updateRoleDescription);
    
    // Enter key support
    usernameInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleAddUser();
    });
    
    roleSelect.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleAddUser();
    });
}

function setupFormValidation() {
    usernameInput.addEventListener('blur', validateUsername);
}

function validateUsername() {
    const username = usernameInput.value.trim();
    usernameValidation.innerHTML = '';
    
    if (username.length < 3) {
        showValidationError('Username must be at least 3 characters long');
        return false;
    }
    
    if (!/^[a-zA-Z0-9_]+$/.test(username)) {
        showValidationError('Only letters, numbers, and underscores allowed');
        return false;
    }
    
    if (users.some(u => u.username.toLowerCase() === username.toLowerCase())) {
        showValidationError('Username already exists');
        return false;
    }
    
    usernameValidation.innerHTML = `<i class="fas fa-check"></i> Username available`;
    usernameValidation.style.color = '#10b981';
    return true;
}

function showValidationError(message) {
    usernameValidation.innerHTML = `<i class="fas fa-times"></i> ${message}`;
    usernameValidation.style.color = '#ef4444';
}

function updateRoleDescription() {
    const role = roleSelect.value;
    if (role && roleDescriptions[role]) {
        roleDescription.textContent = roleDescriptions[role];
        roleDescription.style.display = 'block';
    } else {
        roleDescription.style.display = 'none';
    }
}

function handleAddUser() {
    const username = usernameInput.value.trim();
    const role = roleSelect.value;
    
    // Validation
    if (!username || !role) {
        showToast('Please fill in all fields', 'error');
        return;
    }
    
    if (!validateUsername()) {
        return;
    }
    
    // Create user
    const user = new User(username, role);
    users.push(user);
    userCounter++;
    
    // Update UI
    renderUserCard(user);
    resetForm();
    updateUserStats();
    
    // Demo call, apply, bind
    demoCallApplyBind(user);
    
    showToast(`User "${username}" added successfully as ${role}`, 'success');
    console.log(`✅ New user created:`, user.getUserInfo());
}

function renderUserCard(user) {
    const info = user.getDisplayInfo();
    
    // Remove empty state if present
    const emptyState = usersContainer.querySelector('.empty-state');
    if (emptyState) {
        emptyState.remove();
    }
    
    const card = document.createElement('div');
    card.className = 'user-card';
    card.dataset.userId = user.id;
    
    card.innerHTML = `
        <div class="user-profile">
            <div class="user-avatar">
                ${info.name.charAt(0).toUpperCase()}
            </div>
            <div class="user-info">
                <span class="user-name">${info.name}</span>
                <span class="user-id">ID: ${user.id.substr(0, 8)}</span>
            </div>
        </div>
        <div class="role-badge ${info.roleClass}">
            ${info.role}
        </div>
        <div class="status-indicator">
            <div class="status-dot"></div>
            <span>${info.status}</span>
        </div>
        <div class="user-actions">
            <button class="action-btn login" onclick="handleLogin('${user.id}')">
                <i class="fas fa-sign-in-alt"></i> Login
            </button>
            <button class="action-btn" onclick="showUserDetails('${user.id}')">
                <i class="fas fa-eye"></i> View
            </button>
            <button class="action-btn" onclick="deleteUser('${user.id}')">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `;
    
    usersContainer.prepend(card);
}

function handleLogin(userId) {
    const user = users.find(u => u.id === userId);
    if (user) {
        user.login();
        highlightUserCard(userId);
        demoCallApplyBind(user);
    }
}

function highlightUserCard(userId) {
    const card = document.querySelector(`[data-user-id="${userId}"]`);
    if (card) {
        card.style.animation = 'none';
        card.offsetHeight; // Trigger reflow
        card.style.animation = 'slideIn 0.4s ease-out';
        
        // Add highlight effect
        card.style.boxShadow = '0 0 0 2px rgba(59, 130, 246, 0.5)';
        setTimeout(() => {
            card.style.boxShadow = '';
        }, 1000);
    }
}

function showUserDetails(userId) {
    const user = users.find(u => u.id === userId);
    if (user) {
        const info = user.getUserInfo();
        alert(`User Details:\n
👤 Username: ${info.username}
🎯 Role: ${info.role}
🆔 ID: ${info.id}
📅 Created: ${info.created}
🔑 Last Login: ${info.lastLogin}
📊 Total Logins: ${info.loginCount}
🔐 Permissions: ${info.permissions.join(', ')}`);
    }
}

function deleteUser(userId) {
    if (confirm('Are you sure you want to delete this user?')) {
        users = users.filter(u => u.id !== userId);
        const card = document.querySelector(`[data-user-id="${userId}"]`);
        if (card) {
            card.style.animation = 'slideIn 0.4s ease-out reverse';
            setTimeout(() => card.remove(), 400);
        }
        updateUserStats();
        showToast('User deleted successfully', 'success');
    }
}

function refreshUsersList() {
    usersContainer.innerHTML = '';
    
    if (users.length === 0) {
        usersContainer.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">
                    <i class="fas fa-user-slash"></i>
                </div>
                <h3>No Users Found</h3>
                <p>Add users to see them listed here</p>
            </div>
        `;
    } else {
        users.forEach(user => renderUserCard(user));
    }
    
    showToast('User list refreshed', 'success');
}

function toggleSort() {
    users.sort((a, b) => a.username.localeCompare(b.username));
    refreshUsersList();
    showToast('Users sorted alphabetically', 'success');
}

function updateUserStats() {
    totalUsersSpan.textContent = users.length;
    activeUsersSpan.textContent = users.filter(u => u.status === 'active').length;
}

function resetForm() {
    usernameInput.value = '';
    roleSelect.value = '';
    usernameValidation.innerHTML = '';
    roleDescription.style.display = 'none';
    usernameInput.focus();
}

function showToast(message, type = 'info') {
    const toastContainer = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
        <div class="toast-icon">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
        </div>
        <div class="toast-message">${message}</div>
    `;
    
    toastContainer.appendChild(toast);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        toast.style.animation = 'slideInRight 0.3s ease-out reverse';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Advanced JavaScript Concepts Demo
function demoCallApplyBind(user) {
    console.group('🚀 Advanced JavaScript Methods Demo');
    
    function showAccess(level, location, additionalInfo = '') {
        const timestamp = new Date().toLocaleTimeString();
        console.log(`[${timestamp}] ${this.username} has ${level} access from ${location} ${additionalInfo}`);
        return `${this.username} - ${level} access granted`;
    }
    
    // Using call - immediate execution with comma separated arguments
    console.log('📞 Using .call():');
    const callResult = showAccess.call(user, "Admin", "Web Dashboard", "(Immediate)");
    console.log('Result:', callResult);
    
    // Using apply - immediate execution with array of arguments
    console.log('📋 Using .apply():');
    const applyResult = showAccess.apply(user, ["User", "Mobile App", "(Array args)"]);
    console.log('Result:', applyResult);
    
    // Using bind - returns a new function
    console.log('🔗 Using .bind():');
    const boundAccess = showAccess.bind(user, "Manager", "Admin Panel", "(Bound function)");
    setTimeout(() => {
        const bindResult = boundAccess();
        console.log('Result:', bindResult);
        console.groupEnd();
    }, 500);
    
    // Prototype Chain Demonstration
    console.log('🔍 Prototype Chain:');
    console.log('User.prototype:', User.prototype);
    console.log('User.prototype.__proto__:', User.prototype.__proto__);
    console.log('user.__proto__ === User.prototype:', user.__proto__ === User.prototype);
    
    // Constructor property demonstration
    console.log('user.constructor:', user.constructor);
    console.log('user instanceof User:', user instanceof User);
}

// Initialize with demo users
setTimeout(() => {
    if (users.length === 0) {
        const demoUsers = [
            new User('admin_user', 'Admin'),
            new User('john_manager', 'Manager'),
            new User('editor_jane', 'Editor')
        ];
        users.push(...demoUsers);
        demoUsers.forEach(user => renderUserCard(user));
        updateUserStats();
    }
}, 1000);