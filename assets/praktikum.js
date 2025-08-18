let toolCount = 0;
let selectedTarget = null;

function showToast(message, type = 'success') {
    // Remove existing toast
    const existingToast = document.querySelector('.message-toast');
    if (existingToast) {
        existingToast.remove();
    }

    const toast = document.createElement('div');
    toast.className = `message-toast ${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);

    // Trigger animation
    setTimeout(() => toast.classList.add('show'), 100);

    // Remove after 3 seconds
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 400);
    }, 3000);
}

function summonTool(type) {
    const tool = document.createElement('div');
    tool.className = 'tool';
    tool.id = 'tool-' + toolCount++;
    tool.style.left = Math.random() * 700 + 'px';
    tool.style.top = Math.random() * 450 + 'px';
    tool.dataset.type = type;
    tool.dataset.ph = getInitialPh(type);
    tool.dataset.volume = getInitialVolume(type);

    if (type === 'Beaker') {
        tool.classList.add('beaker');
        tool.innerHTML = `
                    <div class="beaker-body">
                        <div class="liquid" style="height: ${tool.dataset.volume}%; background-color: ${getLiquidColor(type, tool.dataset.ph)};"></div>
                    </div>
                    <div class="beaker-rim"></div>
                    <div class="beaker-spout"></div>
                    <div class="tool-name">Beaker</div>
                `;
    } else if (type === 'Pipette') {
        tool.classList.add('pipette');
        tool.innerHTML = `
                    <div class="pipette-body"></div>
                    <div class="tool-name">Pipet</div>
                `;
    } else if (type === 'Litmus Paper') {
        tool.classList.add('litmus-paper');
        tool.innerHTML = `
                    <div class="litmus-body"></div>
                    <div class="tool-name">Kertas Lakmus</div>
                `;
    } else {
        tool.classList.add('bottle');
        const labelText = type.includes('Acid') ? 'HCl\npH 2' :
            type.includes('Base') ? 'NaOH\npH 12' :
                'C₂₀H₁₄O₄\nIndicator';
        tool.innerHTML = `
                    <div class="bottle-body">
                        <div class="bottle-label">${labelText}</div>
                        <div class="liquid" style="height: ${tool.dataset.volume}%; background-color: ${getLiquidColor(type, tool.dataset.ph)};"></div>
                    </div>
                    <div class="bottle-neck"></div>
                    <div class="bottle-cap"></div>
                    <div class="tool-name">${type.replace(' Bottle', '')}</div>
                `;
    }

    const buttons = document.createElement('div');
    buttons.className = 'tool-buttons';
    buttons.innerHTML = `
                <button onclick="shakeTool(event)">🔄 Shake</button>
                <button onclick="emptyTool(event)">🗑️ Empty</button>
                <button onclick="selectTarget(event)">🎯 Select</button>
                <button onclick="pourIntoTarget(event)">💧 Pour</button>
            `;
    tool.appendChild(buttons);

    tool.draggable = true;
    tool.ondragstart = (e) => {
        e.dataTransfer.setData('text/plain', tool.id);
        tool.style.transform = 'scale(0.95) rotate(5deg)';
    };

    tool.ondragend = (e) => {
        tool.style.transform = '';
    };

    document.getElementById('lab-table').appendChild(tool);

    // Add entrance animation
    tool.style.opacity = '0';
    tool.style.transform = 'scale(0.5) translateY(-50px)';
    setTimeout(() => {
        tool.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
        tool.style.opacity = '1';
        tool.style.transform = 'scale(1) translateY(0)';
    }, 100);

    showToast(`✨ ${type} summoned successfully!`);
}

function getInitialPh(type) {
    if (type === 'Acid Bottle') return 2;
    if (type === 'Base Bottle') return 12;
    if (type === 'Indicator Bottle') return 7;
    return 7;
}

function getInitialVolume(type) {
    if (type === 'Beaker') return 0;
    return 60;
}

function getLiquidColor(type, ph) {
    if (type === 'Indicator Bottle') return '#8e44ad';
    if (type.includes('Acid')) return '#ef5350';
    if (type.includes('Base')) return '#1565c0';
    ph = parseFloat(ph);
    if (ph < 4) return '#ef5350';
    if (ph < 6) return '#ffca28';
    if (ph >= 6 && ph <= 8) return 'transparent';
    if (ph > 8) return '#2e7d32';
    if (ph > 10) return '#1565c0';
    return 'transparent';
}

function applyIndicator(beaker) {
    const ph = parseFloat(beaker.dataset.ph);
    const liquid = beaker.querySelector('.liquid');
    if (ph >= 8.2) {
        liquid.style.backgroundColor = '#ec407a';
    } else {
        liquid.style.backgroundColor = 'transparent';
    }
}

function shakeTool(event) {
    event.stopPropagation();
    const tool = event.target.closest('.tool');
    tool.classList.add('shaking');
    setTimeout(() => tool.classList.remove('shaking'), 1000);
    if (tool.dataset.type === 'Beaker') {
        applyIndicator(tool);
    }
    showToast('🌀 Tool shaken!');
}

function emptyTool(event) {
    event.stopPropagation();
    const tool = event.target.closest('.tool');
    const liquid = tool.querySelector('.liquid');
    liquid.style.height = '0%';
    tool.dataset.volume = 0;
    tool.dataset.ph = 7;
    liquid.style.backgroundColor = 'transparent';
    showToast('🗑️ Container emptied!');
}

function selectTarget(event) {
    event.stopPropagation();
    const tool = event.target.closest('.tool');
    if (selectedTarget) {
        selectedTarget.classList.remove('selected');
    }
    selectedTarget = tool;
    selectedTarget.classList.add('selected');
    showToast(`🎯 Selected ${selectedTarget.dataset.type} as target`);
}

function pourIntoTarget(event) {
    event.stopPropagation();
    const source = event.target.closest('.tool');
    if (!selectedTarget || source === selectedTarget) {
        showToast('❌ Select a different target first!', 'error');
        return;
    }
    if (parseFloat(source.dataset.volume) <= 0) {
        showToast('❌ Source container is empty!', 'error');
        return;
    }
    if (selectedTarget.dataset.type !== 'Beaker') {
        showToast('❌ Can only pour into Beaker!', 'error');
        return;
    }

    source.classList.add('pouring');
    setTimeout(() => source.classList.remove('pouring'), 1500);

    const pourAmount = 15;
    const sourceVol = parseFloat(source.dataset.volume);
    const targetVol = parseFloat(selectedTarget.dataset.volume);
    const actualPour = Math.min(pourAmount, sourceVol);
    const newSourceVol = Math.max(0, sourceVol - actualPour);
    const newTargetVol = Math.min(100, targetVol + actualPour);

    source.dataset.volume = newSourceVol;
    source.querySelector('.liquid').style.height = newSourceVol + '%';
    selectedTarget.dataset.volume = newTargetVol;
    selectedTarget.querySelector('.liquid').style.height = newTargetVol + '%';

    const sourcePh = parseFloat(source.dataset.ph);
    const targetPh = parseFloat(selectedTarget.dataset.ph);

    if (source.dataset.type === 'Indicator Bottle') {
        setTimeout(() => applyIndicator(selectedTarget), 800);
        showToast('🧪 Indicator added - shake to see reaction!');
    } else {
        const newPh = targetVol === 0 ? sourcePh :
            ((targetPh * targetVol) + (sourcePh * actualPour)) / newTargetVol;
        selectedTarget.dataset.ph = newPh;
        selectedTarget.querySelector('.liquid').style.backgroundColor =
            getLiquidColor('Beaker', newPh);
        showToast(`💧 Poured successfully! New pH: ${newPh.toFixed(1)}`);
    }

    selectedTarget.classList.remove('selected');
    selectedTarget = null;
}

const labTable = document.getElementById('lab-table');
labTable.ondragover = (e) => e.preventDefault();
labTable.ondrop = (e) => {
    e.preventDefault();
    const id = e.dataTransfer.getData('text/plain');
    const tool = document.getElementById(id);
    const rect = labTable.getBoundingClientRect();
    tool.style.left = Math.max(0, Math.min(820, e.clientX - rect.left - 40)) + 'px';
    tool.style.top = Math.max(0, Math.min(480, e.clientY - rect.top - 60)) + 'px';

    // Add drop animation
    tool.style.transform = 'scale(1.1)';
    setTimeout(() => {
        tool.style.transform = '';
    }, 200);
};

// Add some ambient particle effects
function createParticle() {
    const particle = document.createElement('div');
    particle.style.cssText = `
                position: fixed;
                width: 4px;
                height: 4px;
                background: rgba(255, 255, 255, 0.6);
                border-radius: 50%;
                pointer-events: none;
                z-index: -1;
                left: ${Math.random() * window.innerWidth}px;
                top: -10px;
                animation: particle-fall ${3 + Math.random() * 4}s linear infinite;
            `;
    document.body.appendChild(particle);

    setTimeout(() => particle.remove(), 7000);
}

// Add particle animation
const style = document.createElement('style');
style.textContent = `
            @keyframes particle-fall {
                to {
                    transform: translateY(${window.innerHeight + 20}px) rotate(360deg);
                    opacity: 0;
                }
            }
        `;
document.head.appendChild(style);