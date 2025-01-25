// Audio context for reboot sound
let audioContext = null;

function createRebootSound() {
    if (!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }

    // Create oscillator for startup sound
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    // Set initial frequency and gain
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(200, audioContext.currentTime);
    gainNode.gain.setValueAtTime(0, audioContext.currentTime);
    
    // Start sound
    oscillator.start();
    
    // Create the startup sound pattern
    gainNode.gain.linearRampToValueAtTime(0.3, audioContext.currentTime + 0.1);
    oscillator.frequency.linearRampToValueAtTime(1200, audioContext.currentTime + 0.2);
    gainNode.gain.linearRampToValueAtTime(0.1, audioContext.currentTime + 0.3);
    oscillator.frequency.linearRampToValueAtTime(600, audioContext.currentTime + 0.4);
    gainNode.gain.linearRampToValueAtTime(0.2, audioContext.currentTime + 0.5);
    oscillator.frequency.linearRampToValueAtTime(1800, audioContext.currentTime + 0.6);
    gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + 1.0);
    
    // Stop after sound is complete
    setTimeout(() => {
        oscillator.stop();
    }, 1000);
}

// Export the function
window.playRebootSound = createRebootSound;
