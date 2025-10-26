// Reagents and tools data
const itemsData = [
    // BAHAN (Reagents)
    { id: 'river', name: 'Air Sungai', type: 'reagent', pH: 7.0, color: '#60a5fa', vol: 30 },
    { id: 'lemon', name: 'Air Jeruk', type: 'reagent', pH: 2.2, color: '#ffd93d', vol: 20 },
    { id: 'beckline', name: 'Air Beckline', type: 'reagent', pH: 8.5, color: '#4dd0e1', vol: 25 },
    { id: 'vinegar', name: 'Air Cuka', type: 'reagent', pH: 2.8, color: '#ff8a80', vol: 20 },
    { id: 'rose', name: 'Air Mawar', type: 'reagent', pH: 5.5, color: '#ffb3d9', vol: 15 },
    { id: 'turmeric', name: 'Air Kunyit', type: 'reagent', pH: 6.5, color: '#ffab00', vol: 20 },

    // ALAT (Tools)
    { id: 'litmus', name: 'Kertas Lakmus', type: 'tool', mode: 'paper', color: '#ffffff' },
    { id: 'testtube', name: 'Tabung Reaksi', type: 'tool', mode: 'tube', color: '#b0bec5' },
];

const toolsContainer = document.getElementById('tools');
const bench = document.getElementById('bench');
const beaker = document.getElementById('beaker');
const liquidEl = document.getElementById('liquid');
const phValueEl = document.getElementById('phValue');
const historyEl = document.getElementById('history');
const tray = document.getElementById('tray');
const trayToggle = document.getElementById('trayToggle');
const resetBtn = document.getElementById('resetBtn');
const lab = document.getElementById('lab');

const volumeValueEl = document.getElementById('volumeValue');
const volumeFillEl = document.getElementById('volumeFill');
const volumePercentEl = document.getElementById('volumePercent');
const breakdownListEl = document.getElementById('breakdownList');

let state = {
    contents: [], // baseline water
}

function createToolCard(item) {
    const el = document.createElement('div');
    el.className = 'tool';
    el.dataset.id = item.id;
    el.tabIndex = 0;
    el.setAttribute('role', 'button');
    el.setAttribute('aria-label', `${item.name} - ${item.type === 'reagent' ? 'pH ' + item.pH + ', ' + item.vol + 'ml' : 'Alat ukur'}`);

    // Badge volume untuk reagent
    const volumeBadge = item.type === 'reagent' ? `<div class="volume-badge">${item.vol}ml</div>` : '';

    el.innerHTML = `
                <div style="position:relative">
                ${volumeBadge}
                <div style="height:46px; display:flex; align-items:center; justify-content:center">
                    ${getIconSVG(item)}
                </div>
                </div>
                <div class="name">${item.name}</div>
                <div class="label">${item.type === 'reagent' ? 'pH ~' + item.pH : 'Alat Ukur'}</div>
            `;

    makeDraggable(el, item);
    return el;
}

function getIconSVG(item) {
    if (item.type === 'reagent') {
        return `<svg width="44" height="44" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="4" width="14" height="16" rx="2" fill="${item.color}" fill-opacity="0.95" stroke="rgba(0,0,0,0.2)" stroke-width="1"/>
      <rect x="7" y="6" width="10" height="2" fill="rgba(255,255,255,0.3)"/>
    </svg>`
    }

    // Icon untuk Kertas Lakmus
    if (item.id === 'litmus') {
        return `<svg width="44" height="44" viewBox="0 0 24 24">
      <rect x="7" y="4" width="5" height="16" rx="1" fill="#ffffff" stroke="#cbd5e1" stroke-width="1"/>
      <rect x="12" y="4" width="5" height="16" rx="1" fill="#ffffff" stroke="#cbd5e1" stroke-width="1"/>
    </svg>`
    }

    // Icon untuk Tabung Reaksi
    if (item.id === 'testtube') {
        return `<svg width="44" height="44" viewBox="0 0 24 24">
      <rect x="9" y="3" width="6" height="18" rx="3" fill="rgba(176,190,197,0.3)" stroke="${item.color}" stroke-width="2"/>
      <rect x="9" y="15" width="6" height="6" rx="3" fill="${item.color}" opacity="0.7"/>
      <circle cx="12" cy="5" r="1" fill="#37474f"/>
    </svg>`
    }

    // Default icon (pH meter atau lainnya)
    return `<svg width="44" height="44" viewBox="0 0 24 24">
    <rect x="9" y="3" width="6" height="18" rx="2" fill="#cbd5e1"/>
    <circle cx="12" cy="8" r="2" fill="#60a5fa"/>
    <rect x="10" y="12" width="4" height="6" rx="1" fill="#1e293b"/>
  </svg>`
}

// Populate tools
itemsData.forEach(it => {
    const node = createToolCard(it);
    toolsContainer.appendChild(node);
});

// Add quick items to tray
itemsData.forEach(it => {
    const node = document.createElement('div');
    node.className = 'tool';
    node.style.width = '100%';
    node.style.display = 'flex';
    node.style.alignItems = 'center';
    node.style.justifyContent = 'space-between';
    node.style.padding = '8px';
    node.style.cursor = 'default';

    const detail = it.type === 'reagent' ? `pH ${it.pH} • ${it.vol}ml` : 'Alat Ukur';

    node.innerHTML = `
    <div style="display:flex; align-items:center; gap:8px; flex:1">
      <div style="width:28px;height:20px;border-radius:6px;background:${it.color || '#cbd5e1'}; box-shadow:0 2px 6px rgba(0,0,0,0.3)"></div>
      <div style="flex:1">
        <div style="font-weight:600; font-size:13px">${it.name}</div>
        <div style="font-size:11px;color:var(--muted)">${detail}</div>
      </div>
    </div>
    <button class="btn" style="padding:4px 10px; font-size:12px; margin-left:8px">+</button>
  `;

    node.querySelector('.btn').addEventListener('click', (e) => {
        e.stopPropagation();
        addToBeaker(it);
    });
    tray.appendChild(node);
});

// Toggle tray
trayToggle.addEventListener('click', () => {
    tray.classList.toggle('open');
});

// Make draggable
function makeDraggable(domNode, item) {
    let ghost = null; let dragging = false;

    function start(ev) {
        ev.preventDefault();
        ev.stopPropagation();
        dragging = true;

        const clientX = ev.clientX !== undefined ? ev.clientX : ev.touches?.[0]?.clientX;
        const clientY = ev.clientY !== undefined ? ev.clientY : ev.touches?.[0]?.clientY;

        ghost = domNode.cloneNode(true);
        ghost.classList.add('floating', 'tool-ghost');
        ghost.style.position = 'fixed';
        ghost.style.left = clientX + 'px';
        ghost.style.top = clientY + 'px';
        ghost.style.width = Math.max(80, domNode.offsetWidth) + 'px';
        ghost.style.pointerEvents = 'none';
        ghost.style.zIndex = '1000';
        document.body.appendChild(ghost);

        document.addEventListener('pointermove', move, { passive: false });
        document.addEventListener('pointerup', end);
        document.addEventListener('touchmove', move, { passive: false });
        document.addEventListener('touchend', end);
    }

    function move(ev) {
        if (!dragging) return;
        ev.preventDefault();

        const clientX = ev.clientX !== undefined ? ev.clientX : ev.touches?.[0]?.clientX;
        const clientY = ev.clientY !== undefined ? ev.clientY : ev.touches?.[0]?.clientY;

        ghost.style.left = clientX + 'px';
        ghost.style.top = clientY + 'px';

        // Collision check
        const ghostRect = ghost.getBoundingClientRect();
        const ghostCenterX = ghostRect.left + ghostRect.width / 2;
        const ghostCenterY = ghostRect.top + ghostRect.height / 2;

        const beakerRect = beaker.getBoundingClientRect();
        const isOver = ghostCenterX >= beakerRect.left &&
            ghostCenterX <= beakerRect.right &&
            ghostCenterY >= beakerRect.top &&
            ghostCenterY <= beakerRect.bottom;

        if (isOver) {
            ghost.style.transform = 'translate(-50%,-50%) scale(1.12)';
            beaker.style.border = '2px solid rgba(96,165,250,0.6)';
            beaker.style.animation = 'glow 1s infinite';
        } else {
            ghost.style.transform = 'translate(-50%,-50%) scale(1)';
            beaker.style.border = '2px solid rgba(255,255,255,0.04)';
            beaker.style.animation = 'none';
        }
    }

    function end(ev) {
        if (!dragging) return;
        dragging = false;

        document.removeEventListener('pointermove', move);
        document.removeEventListener('pointerup', end);
        document.removeEventListener('touchmove', move);
        document.removeEventListener('touchend', end);

        if (ghost) {
            const ghostRect = ghost.getBoundingClientRect();
            const ghostCenterX = ghostRect.left + ghostRect.width / 2;
            const ghostCenterY = ghostRect.top + ghostRect.height / 2;

            const beakerRect = beaker.getBoundingClientRect();
            const isOver = ghostCenterX >= beakerRect.left &&
                ghostCenterX <= beakerRect.right &&
                ghostCenterY >= beakerRect.top &&
                ghostCenterY <= beakerRect.bottom;

            if (isOver) {
                animateAddition(ghostRect, () => onDropIntoBeaker(item));
            }

            beaker.style.border = '2px solid rgba(255,255,255,0.04)';
            beaker.style.animation = 'none';
            ghost.remove();
            ghost = null;
        }
    }

    domNode.addEventListener('pointerdown', start);
    domNode.addEventListener('touchstart', start, { passive: false });
}

function animateAddition(fromRect, callback) {
    const particle = document.createElement('div');
    particle.style.position = 'fixed';
    particle.style.left = fromRect.left + fromRect.width / 2 + 'px';
    particle.style.top = fromRect.top + fromRect.height / 2 + 'px';
    particle.style.width = '20px';
    particle.style.height = '20px';
    particle.style.borderRadius = '50%';
    particle.style.background = 'radial-gradient(circle, #60a5fa, #3b82f6)';
    particle.style.transform = 'translate(-50%, -50%)';
    particle.style.transition = 'all 0.4s ease-out';
    particle.style.zIndex = '999';
    particle.style.pointerEvents = 'none';
    document.body.appendChild(particle);

    const liquidRect = liquidEl.getBoundingClientRect();
    setTimeout(() => {
        particle.style.left = liquidRect.left + liquidRect.width / 2 + 'px';
        particle.style.top = liquidRect.top + liquidRect.height / 2 + 'px';
        particle.style.opacity = '0';
        particle.style.transform = 'translate(-50%, -50%) scale(0.3)';
    }, 10);

    setTimeout(() => {
        particle.remove();
        callback();
    }, 450);
}

// Add via tray button
function addToBeaker(item) {
    onDropIntoBeaker(item);
}

// Handle drop
function onDropIntoBeaker(item) {
    if (item.type === 'reagent') {
        state.contents.push({ id: item.id, pH: item.pH, vol: item.vol });
        logEvent(`<span style="color:#60a5fa">✔</span> Ditambahkan: <strong>${item.name}</strong> (pH ${item.pH}, ${item.vol}ml)`);
        updateBeakerAppearance();
        computePH();
        flashMessage(`${item.name} ditambahkan!`);

    } else if (item.id === 'litmus') {
        const currentPH = computePH(true);

        if (currentPH === null) {
            logEvent(`<span style="color:#94a3b8">⚠️</span> Kertas lakmus: <strong>Tidak ada cairan untuk diuji</strong>`);
            flashMessage(`Beaker kosong - tambahkan reagent dahulu`);
            return;
        }

        let result, color;
        if (currentPH < 7) {
            result = 'merah (asam)';
            color = '#ff6b6b';
        } else if (currentPH > 7) {
            result = 'biru (basa)';
            color = '#6ee7b7';
        } else {
            result = 'ungu (netral)';
            color = '#a78bfa';
        }

        logEvent(`<span style="color:${color}">🧪</span> Kertas lakmus: <strong style="color:${color}">${result}</strong> (pH ${currentPH.toFixed(2)})`);
        flashMessage(`Kertas lakmus: ${result}`);

    } else if (item.id === 'testtube') {
        // Tabung Reaksi: Uji skala kecil
        const currentPH = computePH(true);

        if (currentPH === null) {
            logEvent(`<span style="color:#94a3b8">⚠️</span> Tabung reaksi: <strong>Tidak ada cairan untuk diuji</strong>`);
            flashMessage(`Beaker kosong - tambahkan reagent dahulu`);
            return;
        }

        const totalVol = state.contents.reduce((sum, c) => sum + c.vol, 0);

        logEvent(`<span style="color:#b0bec5">🧬</span> Tabung reaksi: <strong>Sampel ${totalVol}ml</strong> diambil untuk uji coba (pH ${currentPH.toFixed(2)})`);
        flashMessage(`🧬 Sampel diuji: pH ${currentPH.toFixed(2)}`);

        // Animasi tabung reaksi muncul sebentar
        showTestTubeAnimation(currentPH);
    }
}

function logEvent(text) {
    const el = document.createElement('div');
    el.style.padding = '8px';
    el.style.borderBottom = '1px dashed rgba(255,255,255,0.08)';
    el.style.fontSize = '13px';
    el.style.animation = 'slideIn 0.3s ease-out';
    el.innerHTML = `<div style="color:#94a3b8; font-size:11px">${new Date().toLocaleTimeString()}</div><div style="margin-top:2px">${text}</div>`;
    historyEl.prepend(el);
}

function flashMessage(text) {
    const f = document.createElement('div');
    f.style.position = 'fixed';
    f.style.left = '50%';
    f.style.top = '20%';
    f.style.transform = 'translateX(-50%) scale(0.8)';
    f.style.background = 'var(--glass-bg)';
    f.style.color = 'var(--text-dark)';
    f.style.backdropFilter = 'blur(10px)';
    f.style.padding = '16px 24px';
    f.style.borderRadius = '12px';
    f.style.zIndex = '9999';
    f.style.fontSize = '16px';
    f.style.fontWeight = '600';
    f.style.boxShadow = '0 8px 32px rgba(0,0,0,0.5)';
    f.style.border = '1px solid rgba(255,255,255,0.1)';
    f.style.transition = 'all 0.3s ease-out';
    f.innerText = text;
    document.body.appendChild(f);

    setTimeout(() => f.style.transform = 'translateX(-50%) scale(1)', 10);
    setTimeout(() => {
        f.style.opacity = '0';
        f.style.transform = 'translateX(-50%) scale(0.8)';
    }, 1500);
    setTimeout(() => f.remove(), 1800);
}

// Compute pH
function computePH(short = false) {
    if (state.contents.length === 0) {
        if (!short) updatePHUI(null);
        updateVolumeUI();
        return null;
    }

    let V = 0; let Htotal = 0;
    state.contents.forEach(c => { V += c.vol; Htotal += Math.pow(10, -c.pH) * c.vol; });
    const Hconc = Htotal / V;
    const pH = -Math.log10(Hconc);

    if (!short) {
        updatePHUI(pH);
        updateVolumeUI();
    }
    return pH;
}

function updatePHUI(pH) {
    // TAMBAHKAN di awal fungsi:
    if (pH === null || pH === undefined) {
        // Beaker kosong
        phValueEl.style.background = 'rgba(255,255,255,0.05)';
        phValueEl.style.color = '#94a3b8';
        phValueEl.innerHTML = `--<div style="font-size:13px;margin-top:4px;opacity:0.9;font-weight:500">Beaker Kosong</div>`;

        liquidEl.style.background = 'transparent';
        liquidEl.style.height = '0%';
        return;
    }

    // Sisa kode tetap sama untuk pH yang valid
    const p = Number.isFinite(pH) ? pH : 7.0;

    let bg, textColor, indicator;
    if (p < 3) {
        bg = '#ff6b6b';
        textColor = '#ffffff';
        indicator = 'Asam Kuat';
    } else if (p < 6.5) {
        bg = '#ffb86b';
        textColor = '#1a1a1a';
        indicator = 'Asam Lemah';
    } else if (p <= 7.5) {
        bg = '#60a5fa';
        textColor = '#ffffff';
        indicator = 'Netral';
    } else if (p <= 9) {
        bg = '#99f6e4';
        textColor = '#1a1a1a';
        indicator = 'Basa Lemah';
    } else {
        bg = '#6ee7b7';
        textColor = '#1a1a1a';
        indicator = 'Basa Kuat';
    }

    phValueEl.style.background = bg;
    phValueEl.style.color = textColor;
    phValueEl.innerHTML = `${p.toFixed(2)}<div style="font-size:13px;margin-top:4px;opacity:0.9;font-weight:500">${indicator}</div>`;

    // Update liquid
    const liquidBg = adjustBrightness(bg, p < 7 ? 1.1 : 1.2);
    liquidEl.style.background = `linear-gradient(180deg, ${liquidBg}, ${shade(liquidBg, -15)})`;

    const totalVol = state.contents.reduce((s, c) => s + c.vol, 0);
    const pct = Math.min(90, 20 + (totalVol / 3));
    liquidEl.style.height = pct + '%';
}

function updateVolumeUI() {
    const totalVol = state.contents.reduce((sum, c) => sum + c.vol, 0);
    const maxCapacity = 200; // ml
    const percentage = Math.min(100, (totalVol / maxCapacity) * 100);

    // Update angka volume
    if (totalVol === 0) {
        volumeValueEl.innerHTML = `0 <span style="font-size:16px; opacity:0.9">ml</span>`;
    } else {
        volumeValueEl.innerHTML = `${totalVol.toFixed(0)} <span style="font-size:16px; opacity:0.9">ml Total</span>`;
    }

    // Update progress bar
    volumeFillEl.style.width = percentage + '%';
    volumePercentEl.textContent = percentage.toFixed(0) + '%';

    // Ubah warna berdasarkan kapasitas
    let barColor;
    if (percentage < 50) {
        barColor = 'linear-gradient(90deg, #6ee7b7, #34d399)'; // Hijau
    } else if (percentage < 80) {
        barColor = 'linear-gradient(90deg, #fbbf24, #f59e0b)'; // Kuning
    } else {
        barColor = 'linear-gradient(90deg, #ef4444, #dc2626)'; // Merah
    }

    volumeFillEl.style.background = barColor;

    // Animasi saat hampir penuh
    if (percentage >= 90) {
        volumeValueEl.style.animation = 'pulse 1s infinite';
    } else {
        volumeValueEl.style.animation = 'none';
    }

    // ===== UPDATE BREAKDOWN LIST =====
    updateBreakdownList();
}

// Fungsi baru untuk update breakdown per reagent
function updateBreakdownList() {
    if (state.contents.length === 0) {
        breakdownListEl.innerHTML = `
                    <div style="font-size:11px; color:#94a3b8; font-style:italic; text-align:center; padding:8px">
                        Belum ada cairan
                    </div>
                `;
        return;
    }

    // Gabungkan reagent yang sama
    const summary = {};
    state.contents.forEach(c => {
        if (!summary[c.id]) {
            summary[c.id] = { vol: 0, pH: c.pH };
        }
        summary[c.id].vol += c.vol;
    });

    // Render breakdown
    let html = '';
    Object.keys(summary).forEach(id => {
        const item = itemsData.find(x => x.id === id);
        const vol = summary[id].vol;
        const pH = summary[id].pH;
        const percentage = ((vol / state.contents.reduce((s, c) => s + c.vol, 0)) * 100).toFixed(0);

        if (item) {
            html += `
                        <div style="display:flex; align-items:center; gap:6px; padding:4px 6px; background:rgba(102,126,234,0.05); border-radius:6px; font-size:11px; animation:slideIn 0.3s ease-out">
                            <div style="width:12px; height:12px; border-radius:3px; background:${item.color}; box-shadow:0 2px 4px rgba(0,0,0,0.2); flex-shrink:0"></div>
                            <div style="flex:1; display:flex; justify-content:space-between; align-items:center">
                                <span style="font-weight:600; color:var(--text-dark)">${item.name}</span>
                                <span style="color:var(--muted); font-weight:500">${vol.toFixed(0)}ml</span>
                            </div>
                            <div style="font-size:10px; color:var(--muted); background:rgba(255,255,255,0.5); padding:2px 6px; border-radius:8px">
                                ${percentage}%
                            </div>
                        </div>
                    `;
        }
    });

    breakdownListEl.innerHTML = html;
}

function adjustBrightness(hex, factor) {
    const c = hexToRgb(hex);
    return rgbToHex(
        Math.min(255, Math.round(c.r * factor)),
        Math.min(255, Math.round(c.g * factor)),
        Math.min(255, Math.round(c.b * factor))
    );
}

function updateBeakerAppearance() {
    // TAMBAHKAN di awal:
    if (state.contents.length === 0) {
        liquidEl.style.background = 'transparent';
        liquidEl.style.height = '0%';
        return;
    }

    // Sisa kode tetap sama
    const base = { r: 155, g: 231, b: 255, v: 30 };
    const rgbList = [base];

    state.contents.forEach(c => {
        const it = itemsData.find(x => x.id === c.id);
        if (it && it.color) {
            rgbList.push({ ...hexToRgb(it.color), v: c.vol });
        }
    });

    let Vr = 0, Vg = 0, Vb = 0, Vt = 0;
    rgbList.forEach(r => { Vr += r.r * r.v; Vg += r.g * r.v; Vb += r.b * r.v; Vt += r.v; });

    const r = Math.min(255, Math.round(Vr / Vt * 1.1));
    const g = Math.min(255, Math.round(Vg / Vt * 1.1));
    const b = Math.min(255, Math.round(Vb / Vt * 1.1));
    const hex = rgbToHex(r, g, b);

    liquidEl.style.background = `linear-gradient(180deg, ${hex}, ${shade(hex, -15)})`;
    liquidEl.style.animation = 'none';
    setTimeout(() => liquidEl.style.animation = 'ripple 0.6s ease-out', 10);
}

// Color utilities
function hexToRgb(hex) {
    hex = hex.replace('#', '');
    if (hex.length === 3) hex = hex.split('').map(s => s + s).join('');
    const n = parseInt(hex, 16);
    return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
}

function rgbToHex(r, g, b) {
    return '#' + [r, g, b].map(x => Math.round(x).toString(16).padStart(2, '0')).join('');
}

function shade(hex, percent) {
    const c = hexToRgb(hex);
    const amt = Math.round(2.55 * percent);
    return rgbToHex(clamp(c.r + amt, 0, 255), clamp(c.g + amt, 0, 255), clamp(c.b + amt, 0, 255));
}

function clamp(a, b, c) {
    return Math.max(b, Math.min(c, a));
}

// Reset with confirmation
resetBtn.addEventListener('click', () => {
    if (state.contents.length > 0) {
        const confirmReset = document.createElement('div');
        confirmReset.style.position = 'fixed';
        confirmReset.style.left = '50%';
        confirmReset.style.top = '50%';
        confirmReset.style.transform = 'translate(-50%, -50%)';
        confirmReset.style.background = 'rgba(255, 255, 255, 0.98)';
        confirmReset.style.backdropFilter = 'blur(10px)';
        confirmReset.style.padding = '24px';
        confirmReset.style.borderRadius = '12px';
        confirmReset.style.border = '1px solid rgba(255,255,255,0.1)';
        confirmReset.style.boxShadow = '0 8px 32px rgba(0,0,0,0.5)';
        confirmReset.style.zIndex = '9999';
        confirmReset.style.textAlign = 'center';
        confirmReset.style.maxWidth = '300px';

        confirmReset.innerHTML = `
        <div style="font-size:18px;font-weight:700;margin-bottom:12px;color:var(--text-dark)">Reset Beaker?</div>
        <div style="color:var(--text-muted);margin-bottom:20px;font-size:14px">Semua reagent akan dihapus dan beaker dikembalikan ke kondisi awal</div>
        <div style="display:flex;gap:10px;justify-content:center">
        <button id="cancelReset" style="padding:10px 20px;border-radius:8px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);color:#e6eef8;font-weight:600;cursor:pointer">Batal</button>
        <button id="confirmReset" style="padding:10px 20px;border-radius:8px;background:linear-gradient(90deg,#ef4444,#dc2626);border:none;color:white;font-weight:600;cursor:pointer">Reset</button>
      </div>
    `;

        document.body.appendChild(confirmReset);

        document.getElementById('cancelReset').addEventListener('click', () => confirmReset.remove());
        document.getElementById('confirmReset').addEventListener('click', () => {
            performReset();
            confirmReset.remove();
        });

    } else {
        flashMessage('Beaker sudah kosong!');
    }
});

function performReset() {
    state.contents = []; // beaker kosong
    historyEl.innerHTML = '';
    updateBeakerAppearance();
    updatePHUI(null);
    updateVolumeUI();
    logEvent('<span style="color:#94a3b8">🔄</span> Beaker direset ke kondisi awal (kosong)');
    flashMessage('✓ Beaker dikosongkan!');
}

// Initialize
updateBeakerAppearance();
computePH();
updateVolumeUI();

// Keyboard accessibility
document.querySelectorAll('.tool').forEach(t => {
    t.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            const id = t.dataset.id;
            const it = itemsData.find(x => x.id === id);
            if (it) {
                t.style.transform = 'scale(0.95)';
                setTimeout(() => t.style.transform = 'scale(1)', 100);
                onDropIntoBeaker(it);
            }
        }
    });

    t.addEventListener('focus', () => t.style.outline = '2px solid #60a5fa');
    t.addEventListener('blur', () => t.style.outline = 'none');
});

// Responsive adjustments
function touchHack() {
    if (window.innerWidth < 600) {
        document.querySelectorAll('.tool').forEach(t => {
            t.style.padding = '14px';
            t.style.minHeight = '100px';
        });
        beaker.style.width = '180px';
        beaker.style.height = '230px';
    } else {
        document.querySelectorAll('.tool').forEach(t => {
            t.style.padding = '10px';
            t.style.minHeight = 'auto';
        });
        beaker.style.width = '210px';
        beaker.style.height = '260px';
    }
}
window.addEventListener('resize', touchHack);
touchHack();

// Welcome message + hide preloader when fully loaded
window.addEventListener('load', () => {
    const loader = document.querySelector('.loader');
    if (loader) loader.style.display = 'none';
    flashMessage('🧪 Virtual Lab siap digunakan!');
});

// Help tooltip
let hasInteracted = false;
function showHelpTooltip() {
    if (hasInteracted) return;

    const tooltip = document.createElement('div');
    tooltip.style.position = 'fixed';
    tooltip.style.left = '50%';
    tooltip.style.bottom = '20px';
    tooltip.style.transform = 'translateX(-50%)';
    tooltip.style.background = 'rgba(96,165,250,0.95)';
    tooltip.style.color = '#04263b';
    tooltip.style.padding = '12px 20px';
    tooltip.style.borderRadius = '24px';
    tooltip.style.fontWeight = '600';
    tooltip.style.fontSize = '14px';
    tooltip.style.zIndex = '9998';
    tooltip.style.boxShadow = '0 4px 16px rgba(96,165,250,0.4)';
    tooltip.style.animation = 'pulse 2s infinite';
    tooltip.innerHTML = '💡 Seret alat/bahan ke beaker untuk memulai eksperimen!';

    document.body.appendChild(tooltip);

    setTimeout(() => tooltip.remove(), 8000);
}

// Animasi tabung reaksi muncul
function showTestTubeAnimation(pH) {
    const tube = document.createElement('div');
    tube.style.position = 'fixed';
    tube.style.left = '50%';
    tube.style.top = '50%';
    tube.style.transform = 'translate(-50%, -50%) scale(0.5)';
    tube.style.width = '80px';
    tube.style.height = '160px';
    tube.style.background = 'rgba(176, 190, 197, 0.9)';
    tube.style.borderRadius = '8px 8px 30px 30px';
    tube.style.border = '2px solid #37474f';
    tube.style.zIndex = '9999';
    tube.style.transition = 'all 0.4s ease-out';
    tube.style.boxShadow = '0 8px 32px rgba(0,0,0,0.3)';

    // Isi cairan
    let color;
    if (pH < 4) color = '#ff6b6b';
    else if (pH < 6.5) color = '#ffb86b';
    else if (pH <= 7.5) color = '#60a5fa';
    else if (pH <= 9) color = '#99f6e4';
    else color = '#6ee7b7';

    tube.innerHTML = `
                <div style="position:absolute; bottom:10px; left:50%; transform:translateX(-50%); width:70%; height:40%; background:${color}; border-radius:4px 4px 20px 20px; box-shadow:inset 0 -2px 8px rgba(0,0,0,0.2)"></div>
                <div style="position:absolute; bottom:4px; left:50%; transform:translateX(-50%); font-size:10px; color:#37474f; font-weight:600">pH ${pH.toFixed(1)}</div>
            `;

    document.body.appendChild(tube);

    setTimeout(() => tube.style.transform = 'translate(-50%, -50%) scale(1)', 10);
    setTimeout(() => {
        tube.style.opacity = '0';
        tube.style.transform = 'translate(-50%, -50%) scale(0.5)';
    }, 2000);
    setTimeout(() => tube.remove(), 2400);
}

// ===== POST TEST FUNCTIONALITY =====
const postTestPopup = document.getElementById('postTestPopup');
const selesaiBtn = document.getElementById('selesaiBtn');
const closePostTest = document.getElementById('closePostTest');
const closePostTestBtn = document.getElementById('closePostTestBtn');

// Open Post Test popup when "Selesai" button clicked
selesaiBtn.addEventListener('click', () => {
    postTestPopup.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
    flashMessage('📋 Silakan baca soal Post Test');
});

// Close popup via X button
closePostTest.addEventListener('click', () => {
    postTestPopup.classList.remove('active');
    document.body.style.overflow = 'auto';
});

// Close popup via footer button
closePostTestBtn.addEventListener('click', () => {
    postTestPopup.classList.remove('active');
    document.body.style.overflow = 'auto';
    flashMessage('✓ Terima kasih telah membaca Post Test');
});

// Close on background click
postTestPopup.addEventListener('click', (e) => {
    if (e.target === postTestPopup) {
        postTestPopup.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// Close with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && postTestPopup.classList.contains('active')) {
        postTestPopup.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

setTimeout(showHelpTooltip, 2000);
document.addEventListener('pointerdown', () => hasInteracted = true, { once: true });