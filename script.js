const AudioCtx = window.AudioContext || window.webkitAudioContext;
let audioCtx;

function initAudio() {
    if (!audioCtx) {
        audioCtx = new AudioCtx();
    }
}

function playBeep(freq, type, duration) {
    initAudio();
    try {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = type;
        osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
        gain.gain.setValueAtTime(0.12, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + duration);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + duration);
    } catch(e) { console.log("Audio playback blocked by browser."); }
}

function triggerTransformSound() {
    initAudio();
    const freqs = [120, 240, 180, 400, 550, 750];
    freqs.forEach((f, index) => {
        setTimeout(() => {
            playBeep(f, 'sawtooth', 0.15);
        }, index * 75);
    });
    
    const term = document.getElementById('terminal');
    term.innerHTML += `<p style="color: var(--decepticon-red-neon);">[SYSTEM]: IVR System transforming into Siege Mode...</p>`;
    term.scrollTop = term.scrollHeight;
}

let callActive = false;

function startCallSimulator() {
    initAudio();
    callActive = true;
    const term = document.getElementById('terminal');
    term.innerHTML = `<p>[CONNECTING]: Dialing 1-800-TYRANNY...</p>`;
    
    toggleVisualizer(true);
    playBeep(440, 'sine', 0.5);

    setTimeout(() => {
        term.innerHTML += `<p>[CONNECTED]: "Welcome to Decepticall. Your call is extremely unimportant to us."</p>`;
        term.scrollTop = term.scrollHeight;
        playBeep(880, 'square', 0.2);
    }, 1200);

    setTimeout(() => {
        term.innerHTML += `<p style="color: var(--violet-neon);">[SHOCKWAVE_IVR]: "To demand assistance, press 1. To accept your fate, press 2. To speak with Starscream, press 3."</p>`;
        term.scrollTop = term.scrollHeight;
    }, 2500);
}

function sendTerminalInput(option) {
    const term = document.getElementById('terminal');
    playBeep(600, 'sine', 0.1);

    if (!callActive) {
        term.innerHTML += `<p style="color: #ffcc00;">[ERROR]: You must dial support first, organic!</p>`;
        term.scrollTop = term.scrollHeight;
        return;
    }

    if (option === '1') {
        term.innerHTML += `<p>&gt; Option 1 selected.</p>`;
        term.innerHTML += `<p style="color: var(--decepticon-red-neon);">[MEGATRON]: "Escalation requested? FOOL! I escalate your wait time by 4,000 stellar cycles!"</p>`;
    } else if (option === '2') {
        term.innerHTML += `<p>&gt; Option 2 selected.</p>`;
        term.innerHTML += `<p style="color: #00ff66;">[SYSTEM]: Surrender logged. Energon tax applied to your bank account. Good day.</p>`;
        toggleVisualizer(false);
        callActive = false;
    } else if (option === '3') {
        term.innerHTML += `<p>&gt; Option 3 selected.</p>`;
        term.innerHTML += `<p style="color: var(--violet-neon);">[STARSCREAM]: "Hello? Yes! Please help me overthrow Megatron and I will grant your refund— Wait, he's coming! *CLICK*"</p>`;
        term.innerHTML += `<p style="color: var(--decepticon-red);">[LINE DISCONNECTED BY FORCE]</p>`;
        toggleVisualizer(false);
        callActive = false;
    }
    term.scrollTop = term.scrollHeight;
}

function toggleVisualizer(enable) {
    const bars = document.querySelectorAll('.audio-bar');
    bars.forEach(bar => {
        if(enable) bar.classList.add('active-bar');
        else bar.classList.remove('active-bar');
    });
}

function handleComplaintSubmit(e) {
    e.preventDefault();
    const name = document.getElementById('humanName').value;
    const insults = [
        `Grievance received, ${name}. It was promptly routed directly into a localized black hole.`,
        `Thank you, ${name}. Soundwave has added your complaint to his comedy cassette playlist.`,
        `Warning: Expressing dissatisfaction violates Decepticall Terms of Tyranny. A Seeker squad has been dispatched to your location.`
    ];
    
    const randomInsult = insults[Math.floor(Math.random() * insults.length)];
    alert(randomInsult);
    
    document.getElementById('humanName').value = '';
    document.getElementById('complaintText').value = '';
}