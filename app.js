// Professional Weekly Token System Data
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
            weeklyBookings: {}
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
            weeklyBookings: {}
        }
    ],
    
    weeklyMenu: {
        sunday: {
            breakfast: {
                timing: "6:30-9:15 AM",
                items: "Noodles, sauce, Tea, Coffee, Milk, Bread, Jam, Butter"
            },
            lunch: {
                timing: "12:00-2:15 PM", 
                items: "Non-veg: Rice, Chicken Gravy, Kuska | Veg: Mushroom Gravy, Cauliflower 65,Juices (lemon/nanari sarbath)",
                hasOptions: true
            },
            snack: {
                timing: "4:00-6:30 PM",
                items: " Tea, Coffee, Milk + Onion Pakoda/French fries"
            },
            dinner: {
                timing: "7:00-8:30 PM",
                items: "Rava Idly, Groundnut Chutney, Sambar, Milk"
            }
        },
        monday: {
            breakfast: {
                timing: "6:30-9:15 AM",
                items: "Idiappam, Kadala curry, Bread Toast, Omelette, Sauce, Kuruma, Tea, Coffee, Milk, Bread, Jam, Butter"
            },
            lunch: {
                timing: "12:00-2:15 PM",
                items: "Rice, Murungai sambar, milagu rasam, Appalam, payasam, Sena kelangu Poriyal"
            },
            snack: {
                timing: "4:00-6:30 PM", 
                items: "Tea, Coffee, Milk + groundnut with masala"
            },
            dinner: {
                timing: "7:00-8:30 PM",
                items: "Tomato Dosai, Thick Coconut Chutney, Arisi Parupu, Badam Milk, Banana"
            }
        },
        tuesday: {
            breakfast: {
                timing: "6:30-9:15 AM",
                items: "Onion Uthappam, Groundnut Chutney, Tomato Kuruma, Bread halwa, Tea, Coffee, Milk, Bread, Jam, Butter"
            },
            lunch: {
                timing: "12:00-2:15 PM",
                items: "Rice, Thatta payir Puli kolambu, Tomato rasam, curd, Keerai Koottu, Vadagam"
            },
            snack: {
                timing: "4:00-6:30 PM",
                items: "Tea, Coffee, Milk + white channa/maravalli kilangu chips/Sweet corn with masala"
            },
            dinner: {
                timing: "7:00-8:30 PM",
                items: "Chapathi, Non-veg: Pepper Chicken | Veg: Paneer Butter Masala, Boost, Banana",
                hasOptions: true
            }
        },
        wednesday: {
            breakfast: {
                timing: "6:30-9:15 AM",
                items: "Venpongal, Vada, Sambar, coconut Chutney, Tea, Coffee, Milk, Bread, Jam, Butter"
            },
            lunch: {
                timing: "12:00-2:15 PM",
                items: "Egg, Variety rice (Sambar rice, Coconut rice, Lemon rice, Puliyodharai), Potato Masala, rasam, Rava Kesari, wheel vadagam"
            },
            snack: {
                timing: "4:00-6:30 PM",
                items: "Tea, Coffee, Milk + potato samosa"
            },
            dinner: {
                timing: "7:00-8:30 PM",
                items: "Adai, White Kuruma, Kaara Chutney, Mint Rice, Brown sugar, Banana"
            }
        },
        thursday: {
            breakfast: {
                timing: "6:30-9:15 AM",
                items: "Bombay toast, Semiya Kichadi, Tomato Kuruma, Toast Bread, Tea, Coffee, Milk, Bread, Jam, Butter"
            },
            lunch: {
                timing: "12:00-2:15 PM",
                items: "Rice, Morkolambu, Vathakolambu, Paruppu Rasam, Carrot and Beans Poriyal, Ring vadagam"
            },
            snack: {
                timing: "4:00-6:30 PM",
                items: "Tea, Coffee, Milk + Fruits (Seasonal)/ellu urundai/Pacha payir"
            },
            dinner: {
                timing: "7:00-8:30 PM",
                items: "Non-veg: Chicken Biryani with Chicken Gravy | Veg: Mushroom Biryani gravy with Cauliflower 65, Panakarkandu, milk, Banana, Ice Cream (cone)",
                hasOptions: true,
                hasIceCream: true
            }
        },
        friday: {
            breakfast: {
                timing: "6:30-9:15 AM",
                items: "Idly, Sambar, Coconut Chutney, Sakkarai Pongal, Tea, Coffee, Milk, Bread, Jam, Butter"
            },
            lunch: {
                timing: "12:00-2:15 PM",
                items: "Egg, Rice, Mix Veg Sambar, Vada, Payasam, Cabbage with Pattani Poriyal"
            },
            snack: {
                timing: "4:00-6:30 PM",
                items: "Tea, Coffee, Milk + Biscuit (Milk Bikies, Bounce)"
            },
            dinner: {
                timing: "7:00-8:30 PM",
                items: "Carrot KalUthappam, Mint Chutney, Veg kuruma, Holicks milk, Banana"
            }
        },
        saturday: {
            breakfast: {
                timing: "6:30-9:15 AM",
                items: "Masala Dosa, Sambar, Chutney, Tea, Coffee, Milk, Bread, Jam, Butter"
            },
            lunch: {
                timing: "12:00-2:15 PM",
                items: "Egg, Rice, Pachapayir Kadaiyal, Rasam, Curd, Vadagam, Beetroot Poriyal"
            },
            snack: {
                timing: "4:00-6:30 PM",
                items: "Tea, Coffee, Milk + black Channa"
            },
            dinner: {
                timing: "7:00-8:30 PM",
                items: "Chapathi, Tomato thokku, White kuruma, Curd rice, Milk + Banana"
            }
        }
    }
};

// Application State
let currentStudent = null;
let currentWeekBookings = {};
let activeTab = 'booking';

// DOM Elements
const loginScreen = document.getElementById('loginScreen');
const mainDashboard = document.getElementById('mainDashboard');
const loginForm = document.getElementById('loginForm');
const loginError = document.getElementById('loginError');

// Initialize Application
document.addEventListener('DOMContentLoaded', function() {
    // Check for saved session
    const savedStudent = sessionStorage.getItem('currentStudent');
    if (savedStudent) {
        try {
            currentStudent = JSON.parse(savedStudent);
            showDashboard();
        } catch (e) {
            console.error('Session restore error:', e);
        }
    }

    setupEventListeners();
    updateBookingStatus();
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
        
        // Confirm booking button
        if (e.target.id === 'confirmBookingBtn') {
            confirmWeeklyBooking();
        }
    });
    
    // Navigation tabs
    document.addEventListener('click', function(e) {
        const navTab = e.target.closest('.nav-tab');
        if (navTab && navTab.dataset.tab) {
            switchTab(navTab.dataset.tab);
        }
    });
    
    // Meal toggles
    document.addEventListener('change', function(e) {
        if (e.target.classList.contains('meal-checkbox')) {
            handleMealToggle(e.target);
        }
    });
    
    // Food option buttons
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('option-btn')) {
            handleFoodOption(e.target);
        }
    });
}

// Handle Login
function handleLogin(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const rollNumber = formData.get('rollNumber').trim();
    const password = formData.get('password').trim();
    
    const student = SYSTEM_DATA.students.find(s => 
        s.rollNumber === rollNumber && s.password === password
    );
    
    if (student) {
        currentStudent = student;
        sessionStorage.setItem('currentStudent', JSON.stringify(currentStudent));
        showDashboard();
        hideElement(loginError);
        showToast('Welcome to the token system!', 'success');
    } else {
        showError('Invalid roll number or password.');
    }
}

// Handle Logout
function handleLogout() {
    currentStudent = null;
    currentWeekBookings = {};
    sessionStorage.removeItem('currentStudent');
    showLogin();
    showToast('Logged out successfully', 'info');
}

// Show Login
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
    
    // Update user info in header
    updateUserInfo();
    
    // Load all sections
    loadBookingSection();
    loadProfileSection();
    loadMenuSection();
    loadHistorySection();
    
    // Switch to active tab
    switchTab(activeTab);
}

// Update User Info
function updateUserInfo() {
    document.getElementById('userName').textContent = currentStudent.name;
    document.getElementById('userRoll').textContent = currentStudent.rollNumber;
}

// Switch Tab
function switchTab(tabName) {
    // Update navigation
    document.querySelectorAll('.nav-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
    
    // Update content
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });
    document.getElementById(tabName + 'Tab').classList.add('active');
    
    activeTab = tabName;
}

// Update Booking Status
function updateBookingStatus() {
    const today = new Date();
    const dayOfWeek = today.getDay(); // 0 = Sunday, 4 = Thursday
    const isThursday = dayOfWeek === 4;
    
    const statusElement = document.getElementById('bookingStatusHeader');
    const statusText = document.getElementById('bookingStatusText');
    
    if (isThursday) {
        statusElement.className = 'booking-status open';
        statusText.textContent = 'Booking Open';
    } else {
        statusElement.className = 'booking-status closed';
        statusText.textContent = 'Booking Closed';
    }
}

// Load Booking Section
function loadBookingSection() {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const isThursday = dayOfWeek === 4;
    
    const bookingClosed = document.getElementById('bookingClosed');
    const weeklyBookingForm = document.getElementById('weeklyBookingForm');
    
    if (isThursday) {
        hideElement(bookingClosed);
        showElement(weeklyBookingForm);
        generateWeeklyBookingForm();
    } else {
        hideElement(weeklyBookingForm);
        showElement(bookingClosed);
        updateNextThursday();
    }
}

// Update Next Thursday
function updateNextThursday() {
    const today = new Date();
    const daysUntilThursday = (4 - today.getDay() + 7) % 7 || 7;
    const nextThursday = new Date(today);
    nextThursday.setDate(today.getDate() + daysUntilThursday);
    
    const dateStr = nextThursday.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    document.getElementById('nextThursday').textContent = dateStr;
}

// Generate Weekly Booking Form
function generateWeeklyBookingForm() {
    const today = new Date();
    const nextSunday = new Date(today);
    nextSunday.setDate(today.getDate() + (7 - today.getDay()));
    
    // Update week dates
    const weekEnd = new Date(nextSunday);
    weekEnd.setDate(nextSunday.getDate() + 6);
    
    const startStr = nextSunday.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
    const endStr = weekEnd.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    document.getElementById('weekDates').textContent = `${startStr} - ${endStr}`;
    
    // Generate weekly grid
    const weeklyGrid = document.getElementById('weeklyGrid');
    const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    
    let gridHTML = '';
    
    days.forEach((day, index) => {
        const dayData = SYSTEM_DATA.weeklyMenu[day];
        const isSpecialDay = ['tuesday', 'thursday', 'sunday'].includes(day);
        
        gridHTML += `
            <div class="day-card ${isSpecialDay ? 'special-day' : ''}">
                <div class="day-header">
                    ${dayNames[index]}
                </div>
                <div class="meal-list">
                    ${generateMealItems(day, dayData)}
                </div>
            </div>
        `;
    });
    
    weeklyGrid.innerHTML = gridHTML;
    
    // Initialize booking data
    initializeBookingData();
}

// Generate Meal Items
function generateMealItems(day, dayData) {
    const meals = ['breakfast', 'lunch', 'snack', 'dinner'];
    const mealIcons = {
        breakfast: 'fa-coffee',
        lunch: 'fa-utensils', 
        snack: 'fa-cookie-bite',
        dinner: 'fa-moon'
    };
    
    let mealsHTML = '';
    
    meals.forEach(meal => {
        const mealData = dayData[meal];
        if (!mealData) return;
        
        const mealId = `${day}_${meal}`;
        const hasOptions = mealData.hasOptions;
        
        mealsHTML += `
            <div class="meal-item">
                <div class="meal-header">
                    <div class="meal-name">
                        <i class="fas ${mealIcons[meal]}"></i>
                        ${meal.charAt(0).toUpperCase() + meal.slice(1)}
                    </div>
                    <div class="meal-time">${mealData.timing}</div>
                </div>
                <label class="meal-toggle">
                    <input type="checkbox" class="meal-checkbox" data-day="${day}" data-meal="${meal}" id="${mealId}">
                    <span class="toggle-slider"></span>
                </label>
                ${hasOptions ? `
                <div class="meal-options" id="${mealId}_options">
                    <button type="button" class="option-btn veg-btn" data-day="${day}" data-meal="${meal}" data-option="veg">
                        🥬 Veg
                    </button>
                    <button type="button" class="option-btn nonveg-btn" data-day="${day}" data-meal="${meal}" data-option="nonveg">
                        🍗 Non-Veg
                    </button>
                </div>
                ` : ''}
            </div>
        `;
    });
    
    return mealsHTML;
}

// Initialize Booking Data
function initializeBookingData() {
    currentWeekBookings = {};
    const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    const meals = ['breakfast', 'lunch', 'snack', 'dinner'];
    
    days.forEach(day => {
        currentWeekBookings[day] = {};
        meals.forEach(meal => {
            currentWeekBookings[day][meal] = {
                selected: false,
                option: null
            };
        });
    });
    
    updateBookingSummary();
}

// Handle Meal Toggle
function handleMealToggle(checkbox) {
    const day = checkbox.dataset.day;
    const meal = checkbox.dataset.meal;
    const isChecked = checkbox.checked;
    
    // Update booking data
    currentWeekBookings[day][meal].selected = isChecked;
    
    // Show/hide options
    const optionsElement = document.getElementById(`${day}_${meal}_options`);
    if (optionsElement) {
        if (isChecked) {
            optionsElement.classList.add('show');
            // Auto-select veg option
            const vegBtn = optionsElement.querySelector('.veg-btn');
            if (vegBtn) {
                vegBtn.classList.add('selected');
                currentWeekBookings[day][meal].option = 'veg';
            }
        } else {
            optionsElement.classList.remove('show');
            // Clear option selection
            optionsElement.querySelectorAll('.option-btn').forEach(btn => {
                btn.classList.remove('selected');
            });
            currentWeekBookings[day][meal].option = null;
        }
    }
    
    updateBookingSummary();
}

// Handle Food Option
function handleFoodOption(button) {
    const day = button.dataset.day;
    const meal = button.dataset.meal;
    const option = button.dataset.option;
    
    // Clear other selections
    const optionsContainer = button.parentElement;
    optionsContainer.querySelectorAll('.option-btn').forEach(btn => {
        btn.classList.remove('selected');
    });
    
    // Select this option
    button.classList.add('selected');
    currentWeekBookings[day][meal].option = option;
    
    updateBookingSummary();
}

// Update Booking Summary
function updateBookingSummary() {
    let totalMeals = 0;
    const breakdown = {
        breakfast: 0,
        lunch: 0,
        snack: 0,
        dinner: 0
    };
    
    Object.keys(currentWeekBookings).forEach(day => {
        Object.keys(currentWeekBookings[day]).forEach(meal => {
            if (currentWeekBookings[day][meal].selected) {
                totalMeals++;
                breakdown[meal]++;
            }
        });
    });
    
    // Update total count
    document.getElementById('totalMealsCount').textContent = totalMeals;
    
    // Update breakdown
    const breakdownElement = document.getElementById('mealBreakdown');
    let breakdownHTML = '';
    
    Object.keys(breakdown).forEach(meal => {
        if (breakdown[meal] > 0) {
            breakdownHTML += `
                <div class="breakdown-item">
                    <span>${meal.charAt(0).toUpperCase() + meal.slice(1)}:</span>
                    <span>${breakdown[meal]} days</span>
                </div>
            `;
        }
    });
    
    breakdownElement.innerHTML = breakdownHTML;
    
    // Enable/disable confirm button
    const confirmBtn = document.getElementById('confirmBookingBtn');
    confirmBtn.disabled = totalMeals === 0;
}

// Confirm Weekly Booking
function confirmWeeklyBooking() {
    if (!currentStudent) return;
    
    // Validate selection
    let hasSelections = false;
    Object.keys(currentWeekBookings).forEach(day => {
        Object.keys(currentWeekBookings[day]).forEach(meal => {
            if (currentWeekBookings[day][meal].selected) {
                hasSelections = true;
            }
        });
    });
    
    if (!hasSelections) {
        showToast('Please select at least one meal.', 'error');
        return;
    }
    
    // Save booking
    currentStudent.weeklyBookings = JSON.parse(JSON.stringify(currentWeekBookings));
    sessionStorage.setItem('currentStudent', JSON.stringify(currentStudent));
    
    showToast('Weekly booking confirmed successfully!', 'success');
    
    // Switch to profile tab to show QR code
    setTimeout(() => {
        switchTab('profile');
    }, 1500);
}

// Load Profile Section
function loadProfileSection() {
    if (!currentStudent) return;
    
    // Update profile info
    document.getElementById('profileName').textContent = currentStudent.name;
    document.getElementById('profileRoll').textContent = currentStudent.rollNumber;
    document.getElementById('profileBlock').textContent = `${currentStudent.hostelBlock}, Room ${currentStudent.roomNumber}`;
    document.getElementById('profileDepartment').textContent = `${currentStudent.department} - ${currentStudent.year}`;
    document.getElementById('qrCodeId').textContent = currentStudent.permanentQRCode;
    
    // Generate QR Code
    generateQRCode();
}

// Generate QR Code
function generateQRCode() {
    if (!currentStudent || !window.QRCode) return;
    
    const qrContainer = document.getElementById('qrCodeDisplay');
    if (!qrContainer) return;
    
    qrContainer.innerHTML = '';
    
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

// Load Menu Section
function loadMenuSection() {
    const menuGrid = document.getElementById('menuGrid');
    const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    
    let menuHTML = '';
    
    days.forEach((day, index) => {
        const dayData = SYSTEM_DATA.weeklyMenu[day];
        
        menuHTML += `
            <div class="menu-day-card">
                <div class="menu-day-header">
                    ${dayNames[index]}
                </div>
                <div class="menu-day-content">
                    ${generateMenuMeals(dayData)}
                </div>
            </div>
        `;
    });
    
    menuGrid.innerHTML = menuHTML;
}

// Generate Menu Meals
function generateMenuMeals(dayData) {
    const meals = ['breakfast', 'lunch', 'snack', 'dinner'];
    let mealsHTML = '';
    
    meals.forEach(meal => {
        const mealData = dayData[meal];
        if (!mealData) return;
        
        mealsHTML += `
            <div class="menu-meal">
                <div class="menu-meal-header">
                    <div class="menu-meal-name">${meal.charAt(0).toUpperCase() + meal.slice(1)}</div>
                    <div class="menu-meal-time">${mealData.timing}</div>
                </div>
                <div class="menu-meal-items">${mealData.items}</div>
            </div>
        `;
    });
    
    return mealsHTML;
}

// Load History Section
function loadHistorySection() {
    const currentWeekStatus = document.getElementById('currentWeekStatus');
    
    if (currentStudent && currentStudent.weeklyBookings && Object.keys(currentStudent.weeklyBookings).length > 0) {
        let statusHTML = '';
        const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
        const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        
        days.forEach((day, index) => {
            const dayBookings = currentStudent.weeklyBookings[day] || {};
            const selectedMeals = Object.keys(dayBookings).filter(meal => dayBookings[meal].selected);
            
            if (selectedMeals.length > 0) {
                statusHTML += `
                    <div style="margin-bottom: 1rem; padding: 1rem; background: #f8fafc; border-radius: 8px; border: 1px solid #e2e8f0;">
                        <h5 style="color: #1e293b; margin-bottom: 0.5rem;">${dayNames[index]}</h5>
                        <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
                            ${selectedMeals.map(meal => {
                                const option = dayBookings[meal].option;
                                const optionText = option ? ` (${option})` : '';
                                return `<span style="background: #dcfce7; color: #166534; padding: 0.25rem 0.5rem; border-radius: 12px; font-size: 0.8rem; font-weight: 500;">${meal}${optionText}</span>`;
                            }).join('')}
                        </div>
                    </div>
                `;
            }
        });
        
        if (statusHTML) {
            currentWeekStatus.innerHTML = statusHTML;
        } else {
            currentWeekStatus.innerHTML = '<p>No active bookings found.</p>';
        }
    } else {
        currentWeekStatus.innerHTML = '<p>No active bookings found.</p>';
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
        setTimeout(() => {
            loginError.classList.add('hidden');
        }, 5000);
    }
}

function showToast(message, type = 'info') {
    const toastContainer = document.getElementById('toastContainer');
    if (!toastContainer) return;
    
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    const icons = {
        success: 'fa-check-circle',
        error: 'fa-exclamation-circle',
        info: 'fa-info-circle'
    };
    
    toast.innerHTML = `
        <i class="fas ${icons[type] || 'fa-info-circle'}"></i>
        <span>${message}</span>
    `;
    
    toastContainer.appendChild(toast);
    
    setTimeout(() => {
        if (toast.parentNode) {
            toast.parentNode.removeChild(toast);
        }
    }, 5000);
}