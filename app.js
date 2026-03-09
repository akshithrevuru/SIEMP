// SIEMP - Simple Integrated Enterprise Management Platform
// Enterprise database and functions

var userDatabase = {};
var supportTickets = [];
var employees = [
    { id: 'EMP001', name: 'John Smith', department: 'IT', salary: 65000, status: 'Active' },
    { id: 'EMP002', name: 'Sarah Johnson', department: 'Finance', salary: 72000, status: 'Active' },
    { id: 'EMP003', name: 'Mike Davis', department: 'Sales', salary: 58000, status: 'Active' },
    { id: 'EMP004', name: 'Emma Wilson', department: 'HR', salary: 62000, status: 'Active' },
    { id: 'EMP005', name: 'Robert Brown', department: 'Operations', salary: 68000, status: 'Active' }
];
var projects = [
    { name: 'CRM Implementation', team: 'IT & Sales', progress: 75, status: 'In Progress' },
    { name: 'Financial Audit 2024', team: 'Finance', progress: 60, status: 'In Progress' },
    { name: 'Q4 Marketing Campaign', team: 'Sales & Marketing', progress: 45, status: 'Planned' },
    { name: 'HR System Upgrade', team: 'IT & HR', progress: 85, status: 'In Progress' }
];
var inventory = [
    { product: 'Laptops', quantity: 45, value: 45000, reorderLevel: 10 },
    { product: 'Software Licenses', quantity: 120, value: 60000, reorderLevel: 20 },
    { product: 'Office Supplies', quantity: 200, value: 5000, reorderLevel: 50 },
    { product: 'Servers', quantity: 8, value: 80000, reorderLevel: 2 },
    { product: 'Networking Equipment', quantity: 35, value: 17500, reorderLevel: 10 }
];

// Initialize application
function initializeApp() {
    loadUserDatabase();
    checkUserLogin();
    displayUsername();
}

// Load user data from localStorage
function loadUserDatabase() {
    var savedData = localStorage.getItem('userDatabase');
    if (savedData) {
        userDatabase = JSON.parse(savedData);
    }
    
    var ticketsData = localStorage.getItem('supportTickets');
    if (ticketsData) {
        supportTickets = JSON.parse(ticketsData);
    }
}

// Save user data to localStorage
function saveUserDatabase() {
    localStorage.setItem('userDatabase', JSON.stringify(userDatabase));
}

// Save tickets
function saveTickets() {
    localStorage.setItem('supportTickets', JSON.stringify(supportTickets));
}

// Check if user is logged in
function checkUserLogin() {
    var currentUser = localStorage.getItem('currentUser');
    var currentPage = window.location.pathname;
    
    if (!currentUser) {
        if (currentPage.includes('dashboard.html') || currentPage.includes('contact.html')) {
            window.location.href = 'index.html';
        }
    }
}

// Display username on page
function displayUsername() {
    var currentUser = localStorage.getItem('currentUser');
    var userDisplay = document.getElementById('userDisplay');
    
    if (userDisplay && currentUser) {
        userDisplay.textContent = currentUser;
    }
}

// Handle login form submission
function handleLogin(event) {
    event.preventDefault();
    
    var username = document.getElementById('username').value.trim();
    var password = document.getElementById('password').value;
    
    if (!username || !password) {
        alert('Please enter both username and password');
        return;
    }
    
    if (userDatabase[username] && userDatabase[username].password === password) {
        localStorage.setItem('currentUser', username);
        document.getElementById('loginForm').reset();
        window.location.href = 'dashboard.html';
    } else {
        alert('Invalid username or password. Please try again.');
    }
}

// Show signup form
function showSignup(event) {
    event.preventDefault();
    document.getElementById('loginForm').classList.add('hidden');
    document.getElementById('signupForm').classList.remove('hidden');
}

// Hide signup form
function hideSignup(event) {
    event.preventDefault();
    document.getElementById('loginForm').classList.remove('hidden');
    document.getElementById('signupForm').classList.add('hidden');
}

// Handle signup form submission
function handleSignup(event) {
    event.preventDefault();
    
    var username = document.getElementById('newUsername').value.trim();
    var email = document.getElementById('email').value.trim();
    var password = document.getElementById('newPassword').value;
    var confirmPassword = document.getElementById('confirmPassword').value;
    
    if (!username || !email || !password || !confirmPassword) {
        alert('Please fill in all fields');
        return;
    }
    
    if (username.length < 3) {
        alert('Username must be at least 3 characters long');
        return;
    }
    
    if (password.length < 5) {
        alert('Password must be at least 5 characters long');
        return;
    }
    
    if (password !== confirmPassword) {
        alert('Passwords do not match');
        return;
    }
    
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        alert('Please enter a valid email address');
        return;
    }
    
    if (userDatabase[username]) {
        alert('Username already exists. Please choose a different one.');
        return;
    }
    
    userDatabase[username] = {
        email: email,
        password: password,
        createdDate: new Date().toLocaleDateString(),
        role: 'Manager',
        department: 'General'
    };
    
    saveUserDatabase();
    alert('✓ Account created successfully! Please login with your credentials.');
    
    document.getElementById('signupForm').querySelector('form').reset();
    hideSignup(event);
    document.getElementById('loginForm').reset();
}

// Logout function
function logout() {
    var confirmLogout = confirm('Are you sure you want to logout?');
    if (confirmLogout) {
        localStorage.removeItem('currentUser');
        window.location.href = 'index.html';
    }
}

// ===== EMPLOYEE MANAGEMENT =====
function viewEmployees() {
    var empList = '📊 EMPLOYEE RECORDS\n\n';
    empList += '─'.repeat(50) + '\n';
    empList += 'ID'.padEnd(12) + 'Name'.padEnd(18) + 'Department'.padEnd(15) + 'Salary\n';
    empList += '─'.repeat(50) + '\n';
    
    for (var i = 0; i < employees.length; i++) {
        var emp = employees[i];
        empList += emp.id.padEnd(12) + emp.name.padEnd(18) + emp.department.padEnd(15) + '$' + emp.salary + '\n';
    }
    
    empList += '─'.repeat(50) + '\n';
    empList += 'Total Employees: ' + employees.length + '\n';
    empList += 'Total Payroll: $' + employees.reduce(function(sum, e) { return sum + e.salary; }, 0);
    
    alert(empList);
}

// ===== SALES ANALYTICS =====
function viewSalesAnalytics() {
    var analytics = '📈 SALES PERFORMANCE ANALYTICS\n\n';
    analytics += 'Monthly Sales Report\n';
    analytics += '─'.repeat(40) + '\n';
    analytics += 'January: $125,000\n';
    analytics += 'February: $142,000 (↑13.6%)\n';
    analytics += 'March: $158,000 (↑11.3%)\n';
    analytics += 'April: $171,000 (↑8.2%)\n\n';
    analytics += 'Sales by Region:\n';
    analytics += '─'.repeat(40) + '\n';
    analytics += 'North: $189,000 (28%)\n';
    analytics += 'South: $245,000 (36%)\n';
    analytics += 'East: $168,000 (25%)\n';
    analytics += 'West: $94,000 (14%)\n\n';
    analytics += 'Q1 Total Revenue: $425,000\n';
    analytics += 'Growth Rate: 12.5%\n';
    analytics += 'Target Achieved: 95%';
    
    alert(analytics);
}

// ===== INVENTORY MANAGEMENT =====
function viewInventory() {
    var invList = '📦 INVENTORY STATUS\n\n';
    invList += '─'.repeat(70) + '\n';
    invList += 'Product'.padEnd(22) + 'Quantity'.padEnd(12) + 'Value'.padEnd(15) + 'Status\n';
    invList += '─'.repeat(70) + '\n';
    
    for (var i = 0; i < inventory.length; i++) {
        var item = inventory[i];
        var status = item.quantity <= item.reorderLevel ? '⚠️ LOW' : '✓ OK';
        invList += item.product.padEnd(22) + item.quantity.toString().padEnd(12) + ('$' + item.value).padEnd(15) + status + '\n';
    }
    
    invList += '─'.repeat(70) + '\n';
    var totalValue = inventory.reduce(function(sum, i) { return sum + i.value; }, 0);
    invList += 'Total Inventory Value: $' + totalValue + '\n';
    invList += 'Items Below Reorder Level: 2';
    
    alert(invList);
}

// ===== FINANCIAL REPORTS =====
function downloadFinancialReport() {
    var currentUser = localStorage.getItem('currentUser');
    var reportContent = 'SIEMP - FINANCIAL REPORT\n';
    reportContent += '═'.repeat(50) + '\n';
    reportContent += 'Report Generated: ' + new Date().toLocaleString() + '\n';
    reportContent += 'Generated By: ' + currentUser + '\n\n';
    reportContent += 'Q1 FINANCIAL SUMMARY\n';
    reportContent += '─'.repeat(50) + '\n';
    reportContent += 'Total Revenue: $425,000\n';
    reportContent += 'Operating Expenses: $285,000\n';
    reportContent += 'Employee Payroll: $365,000\n';
    reportContent += 'Equipment & Tech: $42,000\n';
    reportContent += 'Utilities & Facilities: $28,000\n';
    reportContent += 'Net Profit: $95,000\n\n';
    reportContent += 'BALANCE SHEET SUMMARY\n';
    reportContent += '─'.repeat(50) + '\n';
    reportContent += 'Current Assets: $520,000\n';
    reportContent += 'Fixed Assets: $385,000\n';
    reportContent += 'Total Assets: $905,000\n';
    reportContent += 'Current Liabilities: $145,000\n';
    reportContent += 'Owner\'s Equity: $760,000\n\n';
    reportContent += 'PROFIT MARGIN: 22.4%\n';
    reportContent += 'RETURN ON INVESTMENT: 15.8%';
    
    var blob = new Blob([reportContent], {type: 'text/plain'});
    var url = window.URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = 'Financial_Report_' + new Date().getFullYear() + '.txt';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
    
    alert('✓ Financial report downloaded successfully!');
}

// ===== TEAM COLLABORATION =====
function viewTeamProjects() {
    var projList = '👥 TEAM PROJECTS & MILESTONES\n\n';
    projList += '─'.repeat(70) + '\n';
    projList += 'Project Name'.padEnd(30) + 'Team'.padEnd(20) + 'Progress\n';
    projList += '─'.repeat(70) + '\n';
    
    for (var i = 0; i < projects.length; i++) {
        var proj = projects[i];
        var bar = '[' + '█'.repeat(Math.floor(proj.progress / 10)) + '░'.repeat(10 - Math.floor(proj.progress / 10)) + '] ' + proj.progress + '%';
        projList += proj.name.padEnd(30) + proj.team.padEnd(20) + bar + '\n';
    }
    
    projList += '─'.repeat(70) + '\n';
    var activeProjects = projects.filter(function(p) { return p.status === 'In Progress'; }).length;
    projList += 'Active Projects: ' + activeProjects + '\n';
    projList += 'Planned Projects: ' + (projects.length - activeProjects) + '\n';
    projList += 'Average Progress: ' + Math.round(projects.reduce(function(sum, p) { return sum + p.progress; }, 0) / projects.length) + '%';
    
    alert(projList);
}

// ===== PAYROLL MANAGEMENT =====
function viewPayroll() {
    var payrollInfo = '💰 PAYROLL PROCESSING\n\n';
    payrollInfo += 'Current Payroll Period: ' + new Date().toLocaleDateString() + '\n';
    payrollInfo += '─'.repeat(50) + '\n\n';
    
    var totalPayroll = 0;
    for (var i = 0; i < employees.length; i++) {
        var emp = employees[i];
        var monthly = Math.round(emp.salary / 12);
        payrollInfo += emp.name + ' (' + emp.id + '): $' + monthly + '\n';
        totalPayroll += monthly;
    }
    
    payrollInfo += '─'.repeat(50) + '\n';
    payrollInfo += 'Monthly Payroll Total: $' + totalPayroll + '\n';
    payrollInfo += 'Tax Deduction (15%): $' + Math.round(totalPayroll * 0.15) + '\n';
    payrollInfo += 'Net Payroll: $' + Math.round(totalPayroll * 0.85) + '\n\n';
    payrollInfo += '✓ Status: Ready for Processing\n';
    payrollInfo += 'Payslips Generated: ' + employees.length;
    
    alert(payrollInfo);
}

// ===== SYSTEM SETTINGS =====
function openSettings() {
    var currentUser = localStorage.getItem('currentUser');
    var userInfo = userDatabase[currentUser];
    
    var settingsInfo = '⚙️ SYSTEM SETTINGS & ACCOUNT\n\n';
    settingsInfo += 'User Profile\n';
    settingsInfo += '─'.repeat(40) + '\n';
    settingsInfo += 'Username: ' + currentUser + '\n';
    settingsInfo += 'Email: ' + userInfo.email + '\n';
    settingsInfo += 'Role: ' + userInfo.role + '\n';
    settingsInfo += 'Department: ' + userInfo.department + '\n';
    settingsInfo += 'Account Created: ' + userInfo.createdDate + '\n\n';
    settingsInfo += 'System Settings\n';
    settingsInfo += '─'.repeat(40) + '\n';
    settingsInfo += '✓ Two-Factor Authentication: Enabled\n';
    settingsInfo += '✓ Data Backup: Daily\n';
    settingsInfo += '✓ Security Updates: Auto\n';
    settingsInfo += '✓ Email Notifications: Enabled\n';
    settingsInfo += '✓ System Logs: Enabled\n\n';
    settingsInfo += 'Contact Admin for profile changes.';
    
    alert(settingsInfo);
}

// ===== MESSAGING & COMMUNICATION =====
function openMessaging() {
    var messagingInfo = '📧 COMMUNICATION HUB\n\n';
    messagingInfo += 'Message Summary\n';
    messagingInfo += '─'.repeat(40) + '\n';
    messagingInfo += 'Inbox: 12 messages\n';
    messagingInfo += 'Sent: 28 messages\n';
    messagingInfo += 'Drafts: 3 messages\n';
    messagingInfo += 'Archived: 156 messages\n\n';
    messagingInfo += 'Recent Messages\n';
    messagingInfo += '─'.repeat(40) + '\n';
    messagingInfo += '1. Q1 Review Meeting - Admin\n';
    messagingInfo += '2. Project Update - Finance Team\n';
    messagingInfo += '3. System Maintenance Alert - IT\n';
    messagingInfo += '4. Performance Notification - HR\n\n';
    messagingInfo += 'Unread: 3 critical messages\n';
    messagingInfo += 'Last Message: 2 hours ago';
    
    alert(messagingInfo);
}

// ===== AUDIT & COMPLIANCE =====
function viewAuditLogs() {
    var auditInfo = '📋 COMPLIANCE & AUDIT LOGS\n\n';
    auditInfo += 'System Audit Trail\n';
    auditInfo += '─'.repeat(50) + '\n';
    auditInfo += '2024-03-09 10:45 - Login: user1 from 192.168.1.5\n';
    auditInfo += '2024-03-09 11:20 - Viewed: Employee Records\n';
    auditInfo += '2024-03-09 12:05 - Downloaded: Financial Report\n';
    auditInfo += '2024-03-09 13:30 - Modified: Inventory Data\n';
    auditInfo += '2024-03-09 14:15 - Processed: Payroll\n';
    auditInfo += '2024-03-09 15:00 - Generated: Sales Report\n\n';
    auditInfo += 'Compliance Status\n';
    auditInfo += '─'.repeat(50) + '\n';
    auditInfo += '✓ Data Security: Compliant\n';
    auditInfo += '✓ Financial Records: Audited\n';
    auditInfo += '✓ Employee Privacy: Protected\n';
    auditInfo += '✓ Access Control: Enforced\n';
    auditInfo += '✓ System Integrity: Verified\n\n';
    auditInfo += 'Last Audit: March 5, 2024\n';
    auditInfo += 'Next Audit: April 5, 2024';
    
    alert(auditInfo);
}

// ===== SUPPORT TICKET SYSTEM =====
function sendMessage(event) {
    event.preventDefault();
    
    var fullName = document.getElementById('fullName').value.trim();
    var email = document.getElementById('contactEmail').value.trim();
    var department = document.getElementById('department').value;
    var priority = document.getElementById('priority').value;
    var issueType = document.getElementById('issueType').value;
    var message = document.getElementById('message').value.trim();
    var currentUser = localStorage.getItem('currentUser');
    
    if (!fullName || !email || !department || !priority || !issueType || !message) {
        alert('Please fill in all fields');
        return;
    }
    
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        alert('Please enter a valid email address');
        return;
    }
    
    var ticketId = 'TKT-' + Math.floor(100000 + Math.random() * 900000);
    var ticket = {
        ticketId: ticketId,
        submittedBy: currentUser,
        fullName: fullName,
        email: email,
        department: department,
        priority: priority,
        issueType: issueType,
        message: message,
        timestamp: new Date().toLocaleString(),
        status: 'Open'
    };
    
    supportTickets.push(ticket);
    saveTickets();
    
    alert('✓ Support Ticket Created Successfully!\n\n' +
          'Ticket ID: ' + ticketId + '\n' +
          'Priority: ' + priority + '\n' +
          'Status: Open\n' +
          'Department: ' + department + '\n\n' +
          'Expected Response Time: 24 hours');
    
    document.getElementById('contactForm').reset();
}

// Run initialization when page loads
window.addEventListener('load', function() {
    initializeApp();
});
