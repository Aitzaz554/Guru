class VoiceManager {
    constructor() {
        this.synth = window.speechSynthesis;
        this.isFirstBoot = true;
        this.voices = [];
    }

    init() {
        // Load voices when they're ready
        if (speechSynthesis.onvoiceschanged !== undefined) {
            speechSynthesis.onvoiceschanged = () => {
                this.voices = this.synth.getVoices();
                this.playBootSound();
            };
        }
    }

    playBootSound() {
        if (this.isFirstBoot) {
            // US English voice for first boot
            this.speak("Hello and welcome to Guru App! My name is Guru, and I'm here to guide you. Aapka swagat hai hamari app mein!", "en-US");
            this.isFirstBoot = false;
        } else {
            // Urdu/Hindi voice for subsequent boots (closest to Saraiki)
            this.speak("Hello Ji! Mera naam Guru hai. Aap sabka swagat hai hamari app mein!", "hi-IN");
        }
    }

    speak(text, lang) {
        // Cancel any ongoing speech
        this.synth.cancel();

        const utterance = new SpeechSynthesisUtterance(text);
        
        // Find the appropriate voice
        const voice = this.voices.find(v => v.lang.includes(lang));
        if (voice) {
            utterance.voice = voice;
        }
        
        utterance.lang = lang;
        utterance.rate = 1;
        utterance.pitch = 1;
        
        this.synth.speak(utterance);
    }
}

// Initialize voice manager when the page loads
const voiceManager = new VoiceManager();
document.addEventListener('DOMContentLoaded', () => {
    voiceManager.init();
});

// Handle page visibility changes (for reboot sound)
document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
        voiceManager.playBootSound();
    }
});
