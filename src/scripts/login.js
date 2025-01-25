// System messages to display during initialization
const systemMessages = [
    'INITIALIZING SYSTEM...',
    'CHECKING SECURITY PROTOCOLS...',
    'ESTABLISHING SECURE CONNECTION...',
    'READY FOR LOGIN...'
];

let currentMessageIndex = 0;
const systemMessageElement = document.getElementById('systemMessage');

// Display system messages with typing effect
function typeSystemMessage(message, index = 0) {
    if (index < message.length) {
        systemMessageElement.textContent = '> ' + message.substring(0, index + 1);
        setTimeout(() => typeSystemMessage(message, index + 1), 50);
    } else {
        setTimeout(showNextSystemMessage, 1000);
    }
}

// Show next system message
function showNextSystemMessage() {
    currentMessageIndex++;
    if (currentMessageIndex < systemMessages.length) {
        typeSystemMessage(systemMessages[currentMessageIndex]);
    }
}

// Start displaying system messages
typeSystemMessage(systemMessages[0]);

// Handle login form submission
async function handleLogin(event) {
    event.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('errorMessage');
    
    try {
        // Show loading state
        const submitButton = event.target.querySelector('button[type="submit"]');
        submitButton.disabled = true;
        submitButton.textContent = 'AUTHENTICATING...';
        
        // Simulate API call
        const response = await loginUser(username, password);
        
        if (response.success) {
            // Store the session token
            localStorage.setItem('userToken', response.token);
            
            // Show success message
            errorMessage.style.color = '#00ff00';
            errorMessage.textContent = 'Access Granted. Redirecting...';
            
            // Redirect to key generation page
            setTimeout(() => {
                window.location.href = 'key.html';
            }, 1500);
        } else {
            throw new Error(response.message || 'Invalid username or password');
        }
    } catch (error) {
        // Show error message
        errorMessage.style.color = '#ff0000';
        errorMessage.textContent = error.message;
        
        // Reset button state
        submitButton.disabled = false;
        submitButton.textContent = 'LOGIN';
    }
    
    return false;
}

// Simulate login API call
async function loginUser(username, password) {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // In a real application, this would be an API call
    // For now, we'll just check if the password matches our pattern
    if (password.match(/^[A-Za-z0-9@#$%^&+=]{8,}$/)) {
        return {
            success: true,
            token: 'dummy-token-' + Math.random().toString(36).substring(7),
            message: 'Login successful'
        };
    } else {
        return {
            success: false,
            message: 'Invalid username or password'
        };
    }
}

// Add glitch effect on hover for the login button
const loginButton = document.querySelector('.neon-button');
loginButton.addEventListener('mouseover', () => {
    document.querySelector('.glitch').style.animation = 'glitch 200ms infinite';
});

loginButton.addEventListener('mouseout', () => {
    document.querySelector('.glitch').style.animation = 'glitch 500ms infinite';
});
