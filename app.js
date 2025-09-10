const SYSTEM_DATA = {
    students: [
        {
            rollNumber: "21CS101",
            password: "student123",
            name: "Arjun Kumar",
            hostelBlock: "A Block",
            roomNumber: "201",
            department: "Computer Science",
            year: "3rd Year",
            permanentQRCode: "HST-21CS101-A201-2025",
            todayTokens: {
                date: "2025-09-10",
                snacks: {
                    selected: false,
                    used: false,
                    time: null
                },
                iceCream: {
                    selected: false,
                    used: false,
                    time: null
                },
                dinner: {
                    selected: false,
                    type: "none",
                    used: false,
                    time: null
                }
            }
        },
        {
            rollNumber: "21CS102",
            password: "student456",
            name: "Priya Sharma",
            hostelBlock: "B Block",
            roomNumber: "105",
            department: "Computer Science",
            year: "3rd Year",
            permanentQRCode: "HST-21CS102-B105-2025",
            todayTokens: {
                date: "2025-09-10",
                snacks: {
                    selected: false,
                    used: false,
                    time: null
                },
                iceCream: {
                    selected: false,
                    used: false,
                    time: null
                },
                dinner: {
                    selected: false,
                    type: "none",
                    used: false,
                    time: null
                }
            }
        }
    ],
    specialDays: {
        tuesday: {
            hasIceCream: true,
            hasDinnerOptions: true,
            vegMenu: "Cauliflower Chilli + Mushroom Biryani with Mushroom Gravy",
            nonVegMenu: "Chicken Gravy + Chicken/Mutton Biryani (alternating weeks)"
        },
        thursday: {
            hasIceCream: false,
            hasDinnerOptions: true,
            vegMenu: "Chapati with Cauliflower and Mushroom Gravy",
            nonVegMenu: "Chapati with Chicken Gravy"
        }
    },
    messCounters: [
        {
            name: "Snack Counter",
            type: "snacks",
            timing: "4:00 PM - 6:00 PM",
            emoji: "🍿"
        },
        {
            name: "Veg Counter",
            type: "veg",
            timing: "7:00 PM - 9:00 PM",
            emoji: "🥬"
        },
        {
            name: "Non-Veg Counter", 
            type: "nonveg",
            timing: "7:00 PM - 9:00 PM",
            emoji: "🍗"
        },
        {
            name: "Ice Cream Counter",
            type: "icecream",
            timing: "8:00 PM - 9:00 PM",
            emoji: "🍦"
        }
    ]
};

// Application State
let currentStudent = null;
let currentSection = 'tokens';
let todayDate = new Date();

// DOM Elements
const loginScreen = document.getElementById('loginScreen');
const mainDashboard = document.getElementById('mainDashboard');
const loginForm = document.getElementById('loginForm');
const loginError = document.getElementById('loginError');

// Initialize Application
document.addEventListener('DOMContentLoaded', function() {
    // Check if student is already logged in
    const savedStudent = sessionStorage.getItem('currentStudent');
    if (savedStudent) {
        try {
            currentStudent = JSON.parse(savedStudent);
            showDashboard();
        } catch (e) {
            console.error('Error parsing saved student data:', e);
        }
    }

    // Setup event listeners
    setupEventListeners();
    
    // Update current date displays
    updateDateDisplays();
    
    // Update date every minute
    setInterval(updateDateDisplays, 60000);
});

// Setup Event Listeners
function setupEventListeners() {
    // Login form
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    
    // Logout button
    document.addEventListener('click', function(e) {
        if (e.target.id === 'logoutBtn' || e.target.closest('#logoutBtn')) {
            handleLogout();
        }
    });
    
    // Navigation links
    document.addEventListener('click', function(e) {
        const navLink = e.target.closest('.nav-link');
        if (navLink && navLink.dataset.section) {
            e.preventDefault();
            showSection(navLink.dataset.section);
        }
    });
}

// Handle Login
function handleLogin(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const rollNumber = formData.get('rollNumber').trim();
    const password = formData.get('password').trim();
    
    // Find student
    const student = SYSTEM_DATA.students.find(s => 
        s.rollNumber === rollNumber && s.password === password
    );
    
    if (student) {
        currentStudent = student;
        sessionStorage.setItem('currentStudent', JSON.stringify(currentStudent));
        showDashboard();
        hideElement(loginError);
        showMessage('Welcome to the token system!', 'success');
    } else {
        showError('Invalid roll number or password. Please try again.');
    }
}

// Handle Logout
function handleLogout() {
    currentStudent = null;
    sessionStorage.removeItem('currentStudent');
    showLogin();
    showMessage('Logged out successfully', 'info');
}

// Show Login Screen
function showLogin() {
    hideElement(mainDashboard);
    showElement(loginScreen);
    if (loginForm) {
        loginForm.reset();
    }
}

// Show Dashboard
function showDashboard() {
    hideElement(loginScreen);
    showElement(mainDashboard);
    initializeDashboard();
}

// Initialize Dashboard
function initializeDashboard() {
    if (!currentStudent) return;
    
    // Update welcome message
    const welcomeElement = document.getElementById('studentWelcome');
    if (welcomeElement) {
        welcomeElement.textContent = `Welcome, ${currentStudent.name}!`;
    }
    
    // Load sections
    loadTokenSelection();
    loadProfile();
    loadUsageHistory();
    
    // Show current section
    showSection(currentSection);
}

// Show Section
function showSection(sectionName) {
    // Update navigation
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    
    const activeLink = document.querySelector(`[data-section="${sectionName}"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }
    
    // Update content sections
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
    });
    
    const targetSection = document.getElementById(sectionName + 'Section');
    if (targetSection) {
        targetSection.classList.add('active');
    }
    
    currentSection = sectionName;
}

// Load Token Selection
function loadTokenSelection() {
    if (!currentStudent) return;
    
    const today = todayDate.getDay(); // 0 = Sunday, 1 = Monday, etc.
    const dayNames = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    const currentDay = dayNames[today];
    
    // Update token availability based on day
    updateTokenAvailability(currentDay);
    
    // Load current token selections
    loadCurrentTokens();
}

// Update Token Availability
function updateTokenAvailability(currentDay) {
    const iceCreamCard = document.getElementById('iceCreamCard');
    const dinnerTokens = document.getElementById('dinnerTokens');
    const specialTokens = document.getElementById('specialTokens');
    const specialDayTitle = document.getElementById('specialDayTitle');
    
    // Ice cream only on Tuesday
    if (currentDay === 'tuesday') {
        showElement(iceCreamCard);
        const iceCreamStatus = document.getElementById('iceCreamStatus');
        if (iceCreamStatus) {
            iceCreamStatus.textContent = 'Available Today';
            iceCreamStatus.className = 'token-status not-selected';
        }
        document.getElementById('iceCreamToken').disabled = false;
    } else {
        hideElement(iceCreamCard);
    }
    
    // Dinner options on Tuesday and Thursday
    if (currentDay === 'tuesday' || currentDay === 'thursday') {
        showElement(dinnerTokens);
        showElement(specialTokens);
        
        if (specialDayTitle) {
            specialDayTitle.textContent = currentDay === 'tuesday' ? 'Tuesday Special Options' : 'Thursday Special Options';
        }
        
        // Update menu descriptions
        const vegMenu = document.getElementById('vegMenuToday');
        const nonVegMenu = document.getElementById('nonVegMenuToday');
        
        if (vegMenu && nonVegMenu) {
            const dayData = SYSTEM_DATA.specialDays[currentDay];
            vegMenu.textContent = dayData.vegMenu;
            nonVegMenu.textContent = dayData.nonVegMenu;
        }
    } else {
        hideElement(dinnerTokens);
        if (currentDay !== 'tuesday') {
            hideElement(specialTokens);
        }
    }
}

// Load Current Tokens
function loadCurrentTokens() {
    if (!currentStudent) return;
    
    const tokens = currentStudent.todayTokens;
    
    // Update snacks token
    const snacksToken = document.getElementById('snacksToken');
    const snacksStatus = document.getElementById('snacksStatus');
    if (snacksToken && snacksStatus) {
        snacksToken.checked = tokens.snacks.selected;
        snacksStatus.textContent = tokens.snacks.selected ? 'Selected' : 'Not Selected';
        snacksStatus.className = `token-status ${tokens.snacks.selected ? 'selected' : 'not-selected'}`;
        if (tokens.snacks.used) {
            snacksStatus.textContent = 'Used';
            snacksStatus.className = 'token-status used';
            snacksToken.disabled = true;
        }
    }
    
    // Update ice cream token
    const iceCreamToken = document.getElementById('iceCreamToken');
    const iceCreamStatus = document.getElementById('iceCreamStatus');
    if (iceCreamToken && iceCreamStatus) {
        iceCreamToken.checked = tokens.iceCream.selected;
        const today = todayDate.getDay();
        if (today === 2) { // Tuesday
            iceCreamStatus.textContent = tokens.iceCream.selected ? 'Selected' : 'Available Today';
            iceCreamStatus.className = `token-status ${tokens.iceCream.selected ? 'selected' : 'not-selected'}`;
            iceCreamToken.disabled = false;
            if (tokens.iceCream.used) {
                iceCreamStatus.textContent = 'Used';
                iceCreamStatus.className = 'token-status used';
                iceCreamToken.disabled = true;
            }
        } else {
            iceCreamStatus.textContent = 'Not Available';
            iceCreamStatus.className = 'token-status not-available';
            iceCreamToken.disabled = true;
        }
    }
    
    // Update dinner selection
    const vegDinner = document.getElementById('vegDinner');
    const nonVegDinner = document.getElementById('nonVegDinner');
    const noDinner = document.getElementById('noDinner');
    
    if (vegDinner && nonVegDinner && noDinner) {
        if (tokens.dinner.type === 'veg') {
            vegDinner.checked = true;
        } else if (tokens.dinner.type === 'nonveg') {
            nonVegDinner.checked = true;
        } else {
            noDinner.checked = true;
        }
        
        // Update visual selection
        document.querySelectorAll('.dinner-option').forEach(option => {
            option.classList.remove('selected');
        });
        
        if (tokens.dinner.type !== 'none') {
            const selectedOption = tokens.dinner.type === 'veg' ? vegDinner : nonVegDinner;
            selectedOption.closest('.dinner-option').classList.add('selected');
        }
        
        // Disable if used
        if (tokens.dinner.used) {
            [vegDinner, nonVegDinner, noDinner].forEach(radio => {
                radio.disabled = true;
            });
        }
    }
}

// Toggle Token
function toggleToken(tokenType) {
    if (!currentStudent) return;
    
    const tokens = currentStudent.todayTokens;
    
    if (tokenType === 'snacks') {
        tokens.snacks.selected = !tokens.snacks.selected;
        updateTokenStatus('snacksStatus', tokens.snacks.selected, tokens.snacks.used);
    } else if (tokenType === 'iceCream') {
        tokens.iceCream.selected = !tokens.iceCream.selected;
        updateTokenStatus('iceCreamStatus', tokens.iceCream.selected, tokens.iceCream.used);
    }
    
    // Save to session storage
    sessionStorage.setItem('currentStudent', JSON.stringify(currentStudent));
}

// Select Dinner
function selectDinner(type) {
    if (!currentStudent) return;
    
    const tokens = currentStudent.todayTokens;
    
    // Don't allow changes if already used
    if (tokens.dinner.used) return;
    
    tokens.dinner.type = type;
    tokens.dinner.selected = type !== 'none';
    
    // Update visual selection
    document.querySelectorAll('.dinner-option').forEach(option => {
        option.classList.remove('selected');
    });
    
    if (type !== 'none') {
        const selectedRadio = document.getElementById(type === 'veg' ? 'vegDinner' : 'nonVegDinner');
        if (selectedRadio) {
            selectedRadio.checked = true;
            selectedRadio.closest('.dinner-option').classList.add('selected');
        }
    } else {
        const noDinner = document.getElementById('noDinner');
        if (noDinner) {
            noDinner.checked = true;
        }
    }
    
    // Save to session storage
    sessionStorage.setItem('currentStudent', JSON.stringify(currentStudent));
}

// Update Token Status
function updateTokenStatus(statusId, selected, used) {
    const statusElement = document.getElementById(statusId);
    if (!statusElement) return;
    
    if (used) {
        statusElement.textContent = 'Used';
        statusElement.className = 'token-status used';
    } else if (selected) {
        statusElement.textContent = 'Selected';
        statusElement.className = 'token-status selected';
    } else {
        statusElement.textContent = 'Not Selected';
        statusElement.className = 'token-status not-selected';
    }
}

// Save Tokens
function saveTokens() {
    if (!currentStudent) return;
    
    // Update the student data in SYSTEM_DATA
    const studentIndex = SYSTEM_DATA.students.findIndex(s => s.rollNumber === currentStudent.rollNumber);
    if (studentIndex !== -1) {
        SYSTEM_DATA.students[studentIndex].todayTokens = currentStudent.todayTokens;
    }
    
    // Save to session storage
    sessionStorage.setItem('currentStudent', JSON.stringify(currentStudent));
    
    showMessage('Tokens saved successfully!', 'success');
    
    // Refresh the display
    loadTokenSelection();
    loadUsageHistory();
}

// Load Profile
function loadProfile() {
    if (!currentStudent) return;
    
    // Update profile information
    const profileFields = {
        'profileName': currentStudent.name,
        'profileRoll': currentStudent.rollNumber,
        'profileBlock': `${currentStudent.hostelBlock}, Room ${currentStudent.roomNumber}`,
        'qrCodeId': currentStudent.permanentQRCode
    };
    
    Object.keys(profileFields).forEach(fieldId => {
        const element = document.getElementById(fieldId);
        if (element) {
            element.textContent = profileFields[fieldId];
        }
    });
    
    // Generate QR Code
    generateQRCode();
}

// Generate QR Code
function generateQRCode() {
    if (!currentStudent || !window.QRCode) return;
    
    const qrContainer = document.getElementById('permanentQRCode');
    if (!qrContainer) return;
    
    // Clear existing QR code
    qrContainer.innerHTML = '';
    
    // Generate new QR code
    setTimeout(() => {
        new QRCode(qrContainer, {
            text: currentStudent.permanentQRCode,
            width: 200,
            height: 200,
            colorDark: '#1e293b',
            colorLight: '#ffffff',
            correctLevel: QRCode.CorrectLevel.H
        });
    }, 100);
}

// Load Usage History
function loadUsageHistory() {
    if (!currentStudent) return;
    
    const tokens = currentStudent.todayTokens;
    const todayUsage = document.getElementById('todayUsage');
    
    if (!todayUsage) return;
    
    let usageHTML = '';
    
    // Snacks usage
    usageHTML += `
        <div class="usage-item">
            <div class="usage-icon">🍿</div>
            <div class="usage-info">
                <h5>Evening Snacks</h5>
                <p>${tokens.snacks.used ? 'Used at ' + tokens.snacks.time : tokens.snacks.selected ? 'Selected, not used' : 'Not selected'}</p>
            </div>
        </div>
    `;
    
    // Ice cream usage (if Tuesday)
    const today = todayDate.getDay();
    if (today === 2) {
        usageHTML += `
            <div class="usage-item">
                <div class="usage-icon">🍦</div>
                <div class="usage-info">
                    <h5>Ice Cream</h5>
                    <p>${tokens.iceCream.used ? 'Used at ' + tokens.iceCream.time : tokens.iceCream.selected ? 'Selected, not used' : 'Not selected'}</p>
                </div>
            </div>
        `;
    }
    
    // Dinner usage (if Tuesday or Thursday)
    if (today === 2 || today === 4) {
        const dinnerType = tokens.dinner.type === 'veg' ? 'Vegetarian' : tokens.dinner.type === 'nonveg' ? 'Non-Vegetarian' : 'None';
        usageHTML += `
            <div class="usage-item">
                <div class="usage-icon">${tokens.dinner.type === 'veg' ? '🥬' : tokens.dinner.type === 'nonveg' ? '🍗' : '❌'}</div>
                <div class="usage-info">
                    <h5>Dinner (${dinnerType})</h5>
                    <p>${tokens.dinner.used ? 'Used at ' + tokens.dinner.time : tokens.dinner.selected ? 'Selected, not used' : 'Not selected'}</p>
                </div>
            </div>
        `;
    }
    
    todayUsage.innerHTML = usageHTML;
    
    // Update stats
    const snacksUsedCount = document.getElementById('snacksUsedCount');
    const dinnersUsedCount = document.getElementById('dinnersUsedCount');
    const iceCreamUsedCount = document.getElementById('iceCreamUsedCount');
    
    if (snacksUsedCount) {
        snacksUsedCount.textContent = tokens.snacks.used ? '1 today' : '0 today';
    }
    
    if (dinnersUsedCount) {
        dinnersUsedCount.textContent = tokens.dinner.used ? '1 today' : '0 today';
    }
    
    if (iceCreamUsedCount) {
        iceCreamUsedCount.textContent = tokens.iceCream.used ? '1 today' : '0 today';
    }
}

// Update Date Displays
function updateDateDisplays() {
    const now = new Date();
    
    // Format date for different displays
    const longFormat = now.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    const shortFormat = now.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric'
    });
    
    // Update login screen date
    const loginCurrentDate = document.getElementById('loginCurrentDate');
    if (loginCurrentDate) {
        loginCurrentDate.textContent = longFormat;
    }
    
    // Update dashboard header date
    const currentDate = document.getElementById('currentDate');
    if (currentDate) {
        currentDate.textContent = shortFormat;
    }
    
    // Update today date in token section
    const todayDate = document.getElementById('todayDate');
    if (todayDate) {
        todayDate.textContent = longFormat;
    }
}

// Utility Functions
function showElement(element) {
    if (element) {
        element.classList.remove('hidden');
        element.classList.add('active');
    }
}

function hideElement(element) {
    if (element) {
        element.classList.add('hidden');
        element.classList.remove('active');
    }
}

function showError(message) {
    if (loginError) {
        loginError.textContent = message;
        loginError.classList.remove('hidden');
    }
}

function showMessage(message, type = 'info') {
    const messageContainer = document.getElementById('messageContainer');
    if (!messageContainer) return;
    
    const messageElement = document.createElement('div');
    messageElement.className = `message ${type}`;
    
    const icons = {
        success: 'check-circle',
        error: 'exclamation-circle',
        info: 'info-circle'
    };
    
    messageElement.innerHTML = `
        <i class="fas fa-${icons[type] || 'info-circle'}"></i>
        <span>${message}</span>
    `;
    
    messageContainer.appendChild(messageElement);
    
    // Remove message after 5 seconds
    setTimeout(() => {
        if (messageElement.parentNode) {
            messageElement.parentNode.removeChild(messageElement);
        }
    }, 5000);
}

// Make functions available globally for onclick handlers
window.toggleToken = toggleToken;
window.selectDinner = selectDinner;
window.saveTokens = saveTokens;