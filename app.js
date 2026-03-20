// RADIANCE ENGINE
// Unpredictable • Kind • Ephemeral • Radiant

class RadianceEngine {
    constructor() {
        this.codes = [];
        this.mood = 'neutral';
        this.interactions = 0;
        this.startTime = Date.now();
        this.userPath = [];
        this.noSaveMode = true; // Critical: No persistence
        
        this.init();
    }
    
    init() {
        this.generateUniqueSession();
        this.createUnpredictableOrbs();
        this.monitorMood();
        this.setupRandomKindness();
    }
    
    generateUniqueSession() {
        // Cryptographically random session (never repeated)
        this.sessionId = Array.from(crypto.getRandomValues(new Uint8Array(32)))
            .map(b => b.toString(16).padStart(2, '0'))
            .join('');
        
        console.log('New Radiance Session:', this.sessionId);
        console.log('Record this moment. It will not return.');
    }
    
    createUnpredictableOrbs() {
        const garden = document.getElementById('orbGarden');
        if(!garden) return;
        
        // Random number of orbs (5-12)
        const orbCount = 5 + Math.floor(Math.random() * 8);
        
        for(let i=0; i<orbCount; i++) {
            const orb = document.createElement('div');
            orb.className = 'radiance-orb';
            
            // Random positioning within grid
            orb.style.gridColumn = `span ${Math.random() > 0.7 ? 2 : 1}`;
            
            // Random delay for organic feel
            orb.style.animationDelay = `${Math.random() * 2}s`;
            
            // Random color assignment
            const hue = Math.random() * 360;
            orb.style.setProperty('--current-color', `hsl(${hue}, 70%, 60%)`);
            
            // Random label (positive words)
            const labels = ['Breath', 'Light', 'Warmth', 'Grace', 'Peace', 'Joy', 'Hope', 'Love', 'Trust', 'Calm', 'Glow', 'Soft'];
            const label = labels[Math.floor(Math.random() * labels.length)];
            
            orb.innerHTML = `
                <div class="orb-label">${label}</div>
                <div class="orb-code">••••••</div>
            `;
            
            // Unique interaction per orb
            orb.addEventListener('click', (e) => this.handleOrbClick(e, orb, i));
            orb.addEventListener('mouseenter', () => this.shiftMood(hue));
            
            garden.appendChild(orb);
        }
    }
    
    handleOrbClick(event, orb, index) {
        this.interactions++;
        
        // Generate completely unique code
        const code = this.generateSnowflakeCode(index);
        this.codes.push(code);
        
        // Reveal with gratification
        orb.classList.add('revealed');
        orb.querySelector('.orb-code').innerText = code;
        
        // Visual feedback (randomized)
        this.triggerGratification(event.clientX, event.clientY);
        
        // Update reminder
        this.updateReminder(code);
        
        // Log path (but don't save)
        this.userPath.push({
            timestamp: Date.now(),
            action: 'orb_reveal',
            code: code,
            position: index
        });
        
        console.log(`Code ${this.interactions} generated: ${code}`);
        console.log('Please write this down. It exists only now.');
    }
    
    generateSnowflakeCode(seed) {
        // Complex, unique code based on session + time + interaction + random
        const time = Date.now();
        const random = Math.random();
        const hash = Math.sin(seed * time * random).toString(36).substring(2, 15);
        const hash2 = Math.cos(seed * this.sessionId.length).toString(36).substring(2, 15);
        
        return `RAD-${hash.toUpperCase()}-${hash2.toUpperCase()}`;
    }
    
    triggerGratification(x, y) {
        // Random gratification type
        const types = ['emoji', 'particle', 'ripple', 'colorBurst'];
        const type = types[Math.floor(Math.random() * types.length)];
        
        if(type === 'emoji') {
            this.showerEmojis(x, y);
        } else if(type === 'particle') {
            this.createParticle(x, y);
        }
        
        // Always show kindness message occasionally
        if(Math.random() > 0.7) {
            this.showKindnessMessage();
        }
    }
    
    showerEmojis(x, y) {
        const emojis = ['✦', '✧', '✨', '❋', '✺', '✻', '✼', '✽'];
        const container = document.getElementById('gratitudeShower');
        
        for(let i=0; i<5; i++) {
            const el = document.createElement('div');
            el.className = 'gratitude-particle';
            el.innerText = emojis[Math.floor(Math.random() * emojis.length)];
            el.style.left = x + (Math.random() - 0.5) * 100 + 'px';
            el.style.top = y + 'px';
            el.style.animationDuration = (2 + Math.random() * 2) + 's';
            el.style.color = `hsl(${Math.random()*360}, 70%, 70%)`;
            
            container.appendChild(el);
            setTimeout(() => el.remove(), 4000);
        }
    }
    
    createParticle(x, y) {
        // WebGL-like effect without canvas for simplicity
        const burst = document.createElement('div');
        burst.style.position = 'fixed';
        burst.style.left = x + 'px';
        burst.style.top = y + 'px';
        burst.style.width = '10px';
        burst.style.height = '10px';
        burst.style.background = 'radial-gradient(circle, gold, transparent)';
        burst.style.borderRadius = '50%';
        burst.style.pointerEvents = 'none';
        burst.style.zIndex = '9999';
        burst.style.transition = 'all 1s ease-out';
        
        document.body.appendChild(burst);
        
        setTimeout(() => {
            burst.style.transform = `scale(${10 + Math.random() * 20})`;
            burst.style.opacity = '0';
        }, 10);
        
        setTimeout(() => burst.remove(), 1000);
    }
    
    shiftMood(hue) {
        // Change mood based on interaction hue
        if(hue < 60) this.setMood('joy');
        else if(hue < 180) this.setMood('calm');
        else if(hue < 300) this.setMood('passion');
        
        document.body.style.setProperty('--mood-primary', `hsl(${hue}, 70%, 60%)`);
    }
    
    setMood(mood) {
        this.mood = mood;
        document.body.className = document.body.className.replace(/mood-\w+/g, '');
        document.body.classList.add(`mood-${mood}`);
    }
    
    monitorMood() {
        // Random mood shifts (unpredictable)
        setInterval(() => {
            if(Math.random() > 0.8) {
                const moods = ['joy', 'calm', 'passion', 'neutral'];
                this.setMood(moods[Math.floor(Math.random() * moods.length)]);
            }
        }, 10000);
    }
    
    setupRandomKindness() {
        // Random acts of UI kindness
        setInterval(() => {
            if(Math.random() > 0.9) {
                this.showKindnessMessage();
            }
        }, 30000); // Every ~30 seconds
    }
    
    showKindnessMessage() {
        const messages = [
            "You are doing wonderfully.",
            "Take a breath. You have time.",
            "Your presence is enough.",
            "This moment is yours alone.",
            "You are radiating beautifully.",
            "Rest if you need to. The codes will wait.",
            "You are exactly where you need to be.",
            "Thank you for being here.",
            "Your journey is valid, however long it takes.",
            "You are seen. You are valued."
        ];
        
        const msg = messages[Math.floor(Math.random() * messages.length)];
        
        // Subtle notification
        const notice = document.createElement('div');
        notice.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: rgba(255,255,255,0.05);
            padding: 20px;
            border-radius: 15px;
            border-left: 3px solid gold;
            color: #aaa;
            font-size: 0.9rem;
            max-width: 250px;
            z-index: 1000;
            animation: slideIn 0.5s ease;
        `;
        notice.innerText = msg;
        document.body.appendChild(notice);
        
        setTimeout(() => {
            notice.style.opacity = '0';
            setTimeout(() => notice.remove(), 500);
        }, 5000);
    }
    
    updateReminder(code) {
        const display = document.getElementById('currentCode');
        if(display) {
            display.innerText = code;
            display.style.color = `hsl(${Math.random()*360}, 70%, 60%)`;
        }
    }
    
    attemptCompile() {
        const input = document.getElementById('compileInput');
        const message = document.getElementById('compileMessage');
        
        if(!input || !message) return;
        
        const enteredCodes = input.value.split(/[\s,]+/).filter(c => c.length > 0);
        
        if(enteredCodes.length === 0) {
            message.innerText = "Please enter the codes you've collected. Each one is a step toward your radiance.";
            message.style.color = "#888";
            return;
        }
        
        // Check if codes match current session (they won't if from previous sessions)
        const validCodes = enteredCodes.filter(code => this.codes.includes(code));
        
        if(validCodes.length === 0 && enteredCodes.length > 0) {
            message.innerHTML = `
                <span style="color: #ff6b6b;">These codes appear to be from a previous session.</span><br>
                <span style="color: #888; font-size: 0.9rem;">
                    As agreed, each session is unique. Previous codes have returned to the void.<br>
                    Keep your journal safe. All codes—past, present, future—will be needed at the final compilation.
                </span>
            `;
        } else if(validCodes.length === this.codes.length && this.codes.length > 0) {
            message.innerHTML = `
                <span style="color: #4ecdc4;">✦ Radiance Compiled Successfully ✦</span><br>
                <span style="color: #888; font-size: 0.9rem;">
                    ${validCodes.length} codes validated for this session.<br>
                    Remember: This is one of billions of sessions in your lifetime.<br>
                    Continue collecting. Continue radiating.
                </span>
            `;
        } else {
            message.innerText = `Validating... ${validCodes.length} codes recognized from current session.`;
        }
    }
    
    initializeKindness() {
        console.log('✦ Radiance Engine Initialized ✦');
        console.log('Session:', this.sessionId);
        console.log('Remember: Record everything. This session dies when you leave.');
    }
}

// Initialize
window.RadianceEngine = new RadianceEngine();

// Prevent any storage
window.addEventListener('beforeunload', () => {
    // Clear any accidental storage
    localStorage.clear();
    sessionStorage.clear();
});

// Attempt compile function global
function attemptCompile() {
    window.RadianceEngine.attemptCompile();
}

