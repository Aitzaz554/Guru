// Reboot Screen Handler
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        const rebootScreen = document.getElementById('rebootScreen');
        const mainContainer = document.getElementById('mainContainer');
        
        // Hide reboot screen and show main container
        rebootScreen.style.opacity = '0';
        setTimeout(() => {
            rebootScreen.style.display = 'none';
            mainContainer.style.display = 'flex';
            setTimeout(() => {
                mainContainer.classList.add('active');
            }, 100);
        }, 500);
    }, 5000); // Show reboot screen for 5 seconds
});

// Panel Selection
function selectPanel(type) {
    // Hide both forms
    document.querySelectorAll('.login-form').forEach(form => {
        form.style.display = 'none';
    });

    // Show selected form
    const form = document.getElementById(`${type}LoginForm`);
    form.style.display = 'block';

    // Highlight selected button
    document.querySelectorAll('.btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.closest('.btn').classList.add('active');
}

// Admin Login Handler
document.getElementById('adminLoginForm').addEventListener('submit', (e) => handleFormSubmit(e, true));

function handleFormSubmit(event, isAdmin = false) {
    event.preventDefault();
    const form = event.target;
    
    // Show loading effect
    showLoadingEffect();
    
    // Simulate "hacking" progress
    simulateHackingProgress()
        .then(() => {
            hideLoadingEffect();
            if (isAdmin) {
                handleAdminLogin(form);
            } else {
                handleUserLogin(form);
            }
        });
}

function simulateHackingProgress() {
    const progress = document.createElement('div');
    progress.className = 'hacking-progress';
    progress.innerHTML = '<div class="progress-text"></div>';
    document.body.appendChild(progress);
    
    const steps = [
        'Initializing connection...',
        'Bypassing security...',
        'Accessing mainframe...',
        'Decrypting data...',
        'Authorization complete'
    ];
    
    return new Promise((resolve) => {
        let step = 0;
        const interval = setInterval(() => {
            if (step >= steps.length) {
                clearInterval(interval);
                progress.remove();
                resolve();
                return;
            }
            
            progress.querySelector('.progress-text').textContent = steps[step];
            step++;
        }, 500);
    });
}

function handleAdminLogin(form) {
    const email = form.querySelector('input[type="email"]').value;
    const password = form.querySelector('input[type="password"]').value;

    if (email === 'admin@guruapp.com' && password === 'admin123') {
        showSuccessMessage('Access Granted');
        setTimeout(redirectToAdminDashboard, 1500);
    } else {
        showErrorMessage('Access Denied');
    }
}

// User Login Handler
document.getElementById('userLoginForm').addEventListener('submit', (e) => handleFormSubmit(e, false));

function handleUserLogin(form) {
    const username = form.querySelector('input[type="text"]').value;
    const password = form.querySelector('input[type="password"]').value;

    if (username && password) {
        const key = generateKey(username);
        document.getElementById('generatedKey').value = key;
        showSuccessMessage('Key Generated Successfully');
        setTimeout(() => showModal('keyModal'), 1500);
    } else {
        showErrorMessage('Invalid Credentials');
    }
}

// Message display functions
function showSuccessMessage(message) {
    const messageEl = createMessageElement(message, 'success');
    document.body.appendChild(messageEl);
    setTimeout(() => messageEl.remove(), 3000);
}

function showErrorMessage(message) {
    const messageEl = createMessageElement(message, 'error');
    document.body.appendChild(messageEl);
    setTimeout(() => messageEl.remove(), 3000);
}

function createMessageElement(message, type) {
    const div = document.createElement('div');
    div.className = `message ${type}`;
    div.textContent = message;
    return div;
}

// Loading effects
function showLoadingEffect() {
    const spinner = document.getElementById('loadingSpinner');
    spinner.style.display = 'block';
}

function hideLoadingEffect() {
    const spinner = document.getElementById('loadingSpinner');
    spinner.style.display = 'none';
}

// Generate Key with more complex algorithm
function generateKey(username) {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substr(2, 5);
    const hash = btoa(username + timestamp).substr(0, 8);
    return `GURU-${hash}-${timestamp.substr(-6)}-${random}`.toUpperCase();
}

// Copy key with effect
function copyKey() {
    const keyInput = document.getElementById('generatedKey');
    keyInput.select();
    document.execCommand('copy');
    
    const button = document.querySelector('#keyModal button');
    button.textContent = 'Copied!';
    button.style.backgroundColor = 'var(--neon-green)';
    
    setTimeout(() => {
        button.textContent = 'Copy Key';
        button.style.backgroundColor = '';
    }, 1500);
}

// Modal Handling with Glitch Effect
function showModal(modalId) {
    hideAllModals();
    const modal = document.getElementById(modalId);
    modal.style.display = 'block';
    
    // Add glitch effect to modal
    modal.style.animation = 'glitch 0.3s ease';
    setTimeout(() => {
        modal.classList.add('active');
    }, 10);
}

function hideAllModals() {
    document.querySelectorAll('.modal').forEach(modal => {
        modal.classList.remove('active');
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300);
    });
}

// Matrix Rain Effect
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
document.body.appendChild(canvas);

canvas.style.position = 'fixed';
canvas.style.top = '0';
canvas.style.left = '0';
canvas.style.zIndex = '-1';
canvas.style.opacity = '0.1';

let matrixCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%'.split('');
let fontSize = 10;
let columns;
let drops = [];

function initMatrix() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    columns = canvas.width / fontSize;
    drops = [];
    for (let i = 0; i < columns; i++) {
        drops[i] = 1;
    }
}

function drawMatrix() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#0F0';
    ctx.font = fontSize + 'px monospace';

    for (let i = 0; i < drops.length; i++) {
        let text = matrixCharacters[Math.floor(Math.random() * matrixCharacters.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i]++;
    }
}

window.addEventListener('resize', initMatrix);
initMatrix();
setInterval(drawMatrix, 50);

// Glitch Text Effect
function glitchText(element) {
    const original = element.textContent;
    const glitchChars = '!<>-_\\/[]{}—=+*^?#________';
    let iterations = 0;
    
    const interval = setInterval(() => {
        element.textContent = original.split('')
            .map((char, index) => {
                if (index < iterations) {
                    return original[index];
                }
                return glitchChars[Math.floor(Math.random() * glitchChars.length)];
            })
            .join('');
        
        if (iterations >= original.length) {
            clearInterval(interval);
            element.textContent = original;
        }
        iterations += 1/3;
    }, 30);
}

// Apply glitch effect to title
const title = document.querySelector('.app-title');
title.addEventListener('mouseover', () => glitchText(title));

// Typing effect for subtitle
function typeWriter(element) {
    const text = element.textContent;
    element.textContent = '';
    element.style.opacity = '1';
    
    let i = 0;
    const speed = 50;

    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }

    type();
}

// Initialize typing effect
document.addEventListener('DOMContentLoaded', () => {
    const subtitle = document.querySelector('.app-subtitle');
    setTimeout(() => typeWriter(subtitle), 1000);
});

// Button hover sound effect
const buttons = document.querySelectorAll('.btn');
const hoverSound = new Audio('data:audio/wav;base64,UklGRl9vT19XQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgA');
hoverSound.volume = 0.1;

buttons.forEach(button => {
    button.addEventListener('mouseover', () => {
        hoverSound.currentTime = 0;
        hoverSound.play();
    });
});

// Redirect to admin dashboard
function redirectToAdminDashboard() {
    // Add transition effect
    document.body.style.opacity = '0';
    setTimeout(() => {
        window.location.href = '/admin-dashboard';
    }, 500);
}

// Keyboard Navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        hideAllModals();
    }
});

// Initialize event listeners
document.addEventListener('DOMContentLoaded', () => {
    // Modal close on outside click
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            hideAllModals();
        }
    });
});

// Voice synthesis setup
const synth = window.speechSynthesis;
let voices = [];

function loadVoices() {
    voices = synth.getVoices();
}

if (speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = loadVoices;
}

// Reboot messages
const rebootMessages = {
    US: [
        "Hello and welcome to Guru App!",
        "My name is Guru, and I'm here to guide you.",
        "Aapka swagat hai hamari app mein!",
        "Enjoy all the amazing features this app offers.",
        "Let's get started and explore!"
    ],
    Saraiki: [
        "Hello Ji! Mera naam Guru hai.",
        "Aap sabka swagat hai hamari app mein!",
        "Is app ko enjoy karen, aur saare features ka lutf uthain!",
        "Enjoy the features and explore the app with ease!"
    ]
};

// Session management
const SESSION_TIMEOUT = 15 * 60 * 1000; // 15 minutes
let sessionTimer;

function resetSessionTimer() {
    clearTimeout(sessionTimer);
    sessionTimer = setTimeout(logout, SESSION_TIMEOUT);
}

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
    document.addEventListener('mousemove', resetSessionTimer);
    document.addEventListener('keypress', resetSessionTimer);
});

async function initializeApp() {
    const loadingScreen = document.getElementById('loadingScreen');
    const mainContent = document.getElementById('mainContent');
    const progressBar = document.getElementById('progressBar');
    
    // Show loading screen
    loadingScreen.style.display = 'flex';
    mainContent.style.display = 'none';
    
    // Simulate loading and play welcome message
    let progress = 0;
    const interval = setInterval(() => {
        progress += 2;
        progressBar.style.width = `${progress}%`;
        
        if (progress >= 100) {
            clearInterval(interval);
            setTimeout(() => {
                loadingScreen.style.opacity = '0';
                mainContent.style.display = 'block';
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                    mainContent.style.opacity = '1';
                    playRebootMessage();
                }, 500);
            }, 500);
        }
    }, 50);
}

async function playRebootMessage() {
    const accent = Math.random() < 0.5 ? 'US' : 'Saraiki';
    const messages = rebootMessages[accent];
    
    for (const message of messages) {
        await speakMessage(message, accent);
    }
}

function speakMessage(text, accent) {
    return new Promise(resolve => {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.voice = voices.find(voice => 
            accent === 'US' ? voice.lang === 'en-US' : voice.lang === 'en-GB'
        );
        utterance.rate = 0.9;
        utterance.onend = resolve;
        synth.speak(utterance);
    });
}

// Admin login handler
function handleAdminLogin() {
    const email = document.getElementById('adminEmail').value;
    const password = document.getElementById('adminPassword').value;
    const errorDiv = document.getElementById('adminError');

    if (email === 'Azharazii91@gmail.com' && password === 'Azhar5547@@') {
        localStorage.setItem('adminEmail', email);
        resetSessionTimer();
        window.location.href = 'admin-dashboard.html';
    } else {
        errorDiv.textContent = 'Invalid email or password';
        errorDiv.style.display = 'block';
    }
}

// User login handler
function handleUserLogin() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('userPassword').value;
    const errorDiv = document.getElementById('userError');
    
    // Here you would typically validate against a backend
    if (username && password) {
        const key = generateKey();
        document.getElementById('generatedKey').value = key;
        closeModal('userModal');
        showModal('keyModal');
    } else {
        errorDiv.textContent = 'Please enter both username and password';
        errorDiv.style.display = 'block';
    }
}

function generateKey() {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substring(2, 8);
    return `GURU-${timestamp}-${random}`.toUpperCase();
}

function copyKey() {
    const keyInput = document.getElementById('generatedKey');
    keyInput.select();
    document.execCommand('copy');
    
    // Show copy confirmation
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = 'Key copied to clipboard!';
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 2000);
    }, 100);
}

function showModal(modalId) {
    document.getElementById(modalId).style.display = 'block';
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

function logout() {
    localStorage.removeItem('adminEmail');
    window.location.href = 'index.html';
}

// Search functionality
function searchApps() {
    const searchInput = document.getElementById('searchInput');
    const searchTerm = searchInput.value.toLowerCase().trim();
    
    // Get all app elements (assuming they have class 'app-item')
    const apps = document.querySelectorAll('.btn');
    
    apps.forEach(app => {
        const appText = app.textContent.toLowerCase();
        if (searchTerm === '' || appText.includes(searchTerm)) {
            app.style.display = 'flex';
        } else {
            app.style.display = 'none';
        }
    });

    // Add animation effect
    apps.forEach(app => {
        if (app.style.display === 'flex') {
            app.classList.add('search-appear');
            setTimeout(() => app.classList.remove('search-appear'), 500);
        }
    });
}

// Add search on enter key press
document.getElementById('searchInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        searchApps();
    }
});

// Handle user login
function handleUserLogin(event) {
    event.preventDefault();
    const username = document.getElementById('userUsername').value;
    const password = document.getElementById('userPassword').value;

    // Simple validation (replace with your actual login logic)
    if (username === 'user' && password === 'password') {
        // Hide login section and show apps section
        document.getElementById('userLoginSection').style.display = 'none';
        document.getElementById('userAppsSection').style.display = 'block';
        
        // Store login state
        localStorage.setItem('userLoggedIn', 'true');
    } else {
        alert('Invalid username or password');
    }
}

// Search apps functionality
function searchUserApps() {
    const searchInput = document.getElementById('userAppSearch');
    const searchQuery = searchInput.value.toLowerCase().trim();
    const appCards = document.querySelectorAll('.app-card');
    
    appCards.forEach(card => {
        const appName = card.getAttribute('data-app-name').toLowerCase();
        const appDescription = card.querySelector('p').textContent.toLowerCase();
        
        if (appName.includes(searchQuery) || appDescription.includes(searchQuery)) {
            card.style.display = 'block';
            // Add fade-in animation
            card.classList.add('fade-in');
        } else {
            card.style.display = 'none';
        }
    });
}

// Handle real-time search
document.getElementById('userAppSearch')?.addEventListener('input', searchUserApps);

// Logout function
function logout() {
    // Clear login state
    localStorage.removeItem('userLoggedIn');
    
    // Show login section and hide apps section
    document.getElementById('userLoginSection').style.display = 'block';
    document.getElementById('userAppsSection').style.display = 'none';
    
    // Clear search input
    document.getElementById('userAppSearch').value = '';
    
    // Show all apps again
    document.querySelectorAll('.app-card').forEach(card => {
        card.style.display = 'block';
    });
}

// Check login state on page load
document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('userLoggedIn') === 'true') {
        document.getElementById('userLoginSection').style.display = 'none';
        document.getElementById('userAppsSection').style.display = 'block';
    }
});
