const API_BASE = "http://localhost:5000/api";

function updateLog(msg) {
    const feed = document.getElementById('log-feed');
    const entry = document.createElement('p');
    entry.className = 'log-entry';
    entry.textContent = `[${new Date().toLocaleTimeString()}] ${msg}`;
    feed.prepend(entry);
}

// Fetch Status from Backend
async function syncStatus() {
    try {
        const response = await fetch(`${API_BASE}/status`);
        const data = await response.json();
        
        document.getElementById('battery-val').textContent = `${data.battery}%`;
        document.getElementById('voltage').textContent = data.voltage;
        document.getElementById('lock-state').textContent = data.locked ? "LOCKED" : "UNLOCKED";
    } catch (e) {
        console.error("Connection Lost");
    }
}

// Trigger Hardware Commands
async function toggleLock() {
    updateLog("CMD: Rotating NEMA 17 Stepper...");
    const res = await fetch(`${API_BASE}/toggle`, { method: 'POST' });
    if(res.ok) updateLog("SUCCESS: Physical state changed.");
}

async function triggerGlobalUnlock() {
    if(confirm("Confirm Emergency Global Unlock?")) {
        updateLog("CRITICAL: Executing Global Release...");
        await fetch(`${API_BASE}/emergency`, { method: 'POST' });
    }
}

setInterval(syncStatus, 3000); // 3-second heartbeat
