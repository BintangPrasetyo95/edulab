let toolCount = 0;
let selectedTarget = null;
let currentLanguage = 'english'; // Default language

// Language translations
const translations = {
    english: {
        beaker: 'Beaker',
        pipette: 'Pipet',
        litmusPaper: 'Litmus Paper',
        acid: 'Acid',
        base: 'Base',
        indicator: 'Indicator',
        shake: '🔄 Shake',
        empty: '🗑️ Empty',
        select: '🎯 Select',
        pour: '💧 Pour',
        hide: '❌ Hide',
        use: '🧪 Use',
        // Pipette specific
        suckLiquid: '📥 Suck Liquid',
        releaseLiquid: '📤 Release',
        // Litmus specific
        testPH: '🧪 Test pH',
        dipInLiquid: '🌊 Dip in Liquid',
        summoned: 'summoned successfully!',
        shaken: 'Tool shaken!',
        emptied: 'Container emptied!',
        selected: 'Selected',
        asTarget: 'as target',
        selectDifferent: 'Select a different target first!',
        sourceEmpty: 'Source container is empty!',
        onlyBeaker: 'Can only pour into Beaker!',
        indicatorAdded: 'Indicator added - shake to see reaction!',
        pouredSuccess: 'Poured successfully! New pH:',
        pipetteCollected: 'Pipette collected liquid!',
        pipetteEmpty: 'Pipette is empty!',
        pipetteDelivered: 'Pipette delivered liquid!',
        litmusUsed: 'Litmus paper used! pH:',
        litmusNoLiquid: 'No liquid to test!',
        languageToggle: '🌐 Language',
        selectSourceFirst: 'Select source container first!',
        selectTargetFirst: 'Select target container first!'
    },
    indonesian: {
        beaker: 'Gelas Kimia',
        pipette: 'Pipet',
        litmusPaper: 'Kertas Lakmus',
        acid: 'Asam',
        base: 'Basa',
        indicator: 'Indikator',
        shake: '🔄 Kocok',
        empty: '🗑️ Kosongkan',
        select: '🎯 Pilih',
        pour: '💧 Tuang',
        hide: '❌ Sembunyikan',
        use: '🧪 Gunakan',
        // Pipette specific
        suckLiquid: '📥 Sedot Cairan',
        releaseLiquid: '📤 Keluarkan',
        // Litmus specific
        testPH: '🧪 Tes pH',
        dipInLiquid: '🌊 Celup ke Cairan',
        summoned: 'berhasil dipanggil!',
        shaken: 'Alat dikocok!',
        emptied: 'Wadah dikosongkan!',
        selected: 'Terpilih',
        asTarget: 'sebagai target',
        selectDifferent: 'Pilih target yang berbeda dulu!',
        sourceEmpty: 'Wadah sumber kosong!',
        onlyBeaker: 'Hanya bisa tuang ke Gelas Kimia!',
        indicatorAdded: 'Indikator ditambahkan - kocok untuk melihat reaksi!',
        pouredSuccess: 'Berhasil dituang! pH baru:',
        pipetteCollected: 'Pipet mengambil cairan!',
        pipetteEmpty: 'Pipet kosong!',
        pipetteDelivered: 'Pipet menyalurkan cairan!',
        litmusUsed: 'Kertas lakmus digunakan! pH:',
        litmusNoLiquid: 'Tidak ada cairan untuk diuji!',
        languageToggle: '🌐 Bahasa',
        selectSourceFirst: 'Pilih wadah sumber dulu!',
        selectTargetFirst: 'Pilih wadah target dulu!'
    }
};

function getText(key) {
    return translations[currentLanguage][key] || key;
}

function toggleLanguage() {
    currentLanguage = currentLanguage === 'english' ? 'indonesian' : 'english';
    updateAllToolNames();
    updateLanguageButton();
    showToast(`Language changed to ${currentLanguage === 'english' ? 'English' : 'Indonesian'}!`);
}

function updateLanguageButton() {
    const button = document.querySelector('.language-toggle');
    if (button) {
        button.textContent = getText('languageToggle');
    }
}

function updateAllToolNames() {
    const tools = document.querySelectorAll('.tool');
    tools.forEach(tool => {
        const toolName = tool.querySelector('.tool-name');
        const buttons = tool.querySelector('.tool-buttons');

        if (toolName && buttons) {
            const type = tool.dataset.type;

            // Update tool name
            if (type === 'Beaker') {
                toolName.textContent = getText('beaker');
            } else if (type === 'Pipette') {
                toolName.textContent = getText('pipette');
            } else if (type === 'Litmus Paper') {
                toolName.textContent = getText('litmusPaper');
            } else if (type.includes('Acid')) {
                toolName.textContent = getText('acid');
            } else if (type.includes('Base')) {
                toolName.textContent = getText('base');
            } else if (type.includes('Indicator')) {
                toolName.textContent = getText('indicator');
            }

            // Update buttons
            updateToolButtons(tool);
        }
    });
}

function updateToolButtons(tool) {
    const type = tool.dataset.type;
    let buttonsHTML = '';

    if (type === 'Pipette') {
        buttonsHTML = `
                    <button onclick="collectWithPipette(event)">${getText('suckLiquid')}</button>
                    <button onclick="deliverWithPipette(event)">${getText('releaseLiquid')}</button>
                    <button onclick="emptyTool(event)">${getText('empty')}</button>
                    <button onclick="toggleButtons(event)">${getText('hide')}</button>
                `;
    } else if (type === 'Litmus Paper') {
        buttonsHTML = `
                    <button onclick="useLitmusPaper(event)">${getText('testPH')}</button>
                    <button onclick="selectTarget(event)">${getText('dipInLiquid')}</button>
                    <button onclick="toggleButtons(event)">${getText('hide')}</button>
                `;
    } else {
        buttonsHTML = `
                    <button onclick="shakeTool(event)">${getText('shake')}</button>
                    <button onclick="emptyTool(event)">${getText('empty')}</button>
                    <button onclick="selectTarget(event)">${getText('select')}</button>
                    <button onclick="pourIntoTarget(event)">${getText('pour')}</button>
                    <button onclick="toggleButtons(event)">${getText('hide')}</button>
                `;
    }

    tool.querySelector('.tool-buttons').innerHTML = buttonsHTML;
}

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
    tool.id = 'tool-' + toolCount;

    // Normal random spawning without any Y adjustment
    const randomLeft = Math.random() * 700;
    const randomTop = Math.random() * 450;

    tool.style.left = randomLeft + 'px';
    tool.style.top = randomTop + 'px';
    tool.dataset.type = type;
    tool.dataset.ph = getInitialPh(type);
    tool.dataset.volume = getInitialVolume(type);

    toolCount++; // Increment after using

    if (type === 'Beaker') {
        tool.classList.add('beaker');
        tool.innerHTML = `
                    <div class="beaker-body">
                        <div class="liquid" style="height: ${tool.dataset.volume}%; background-color: ${getLiquidColor(type, tool.dataset.ph)};"></div>
                    </div>
                    <div class="beaker-rim"></div>
                    <div class="beaker-spout"></div>
                    <div class="tool-name">${getText('beaker')}</div>
                `;
    } else if (type === 'Pipette') {
        tool.classList.add('pipette');
        tool.dataset.collected = 'false';
        tool.dataset.collectedPh = '7';
        tool.innerHTML = `
                    <div class="pipette-body" style="transform: scale(1.3);">
                        <div class="pipette-bulb"></div>
                        <div class="pipette-tube"></div>
                        <div class="pipette-tip"></div>
                        <div class="pipette-liquid" style="display: none;"></div>
                    </div>
                    <div class="tool-name">${getText('pipette')}</div>
                `;
    } else if (type === 'Litmus Paper') {
        tool.classList.add('litmus-paper');
        tool.innerHTML = `
                    <div class="litmus-handle" style="height: 60px; background: #8B4513;"></div>
                    <div class="litmus-body" style="width: 25px; height: 80px; background: linear-gradient(to right, #ff6b6b 0%, #feca57 50%, #48dbfb 100%); border-radius: 3px; position: relative; top: -5px;"></div>
                    <div class="tool-name">${getText('litmusPaper')}</div>
                `;
    } else {
        tool.classList.add('bottle');
        const labelText = type.includes('Acid') ? 'HCl\npH 2' :
            type.includes('Base') ? 'NaOH\npH 12' :
                'C₂₀H₁₄O₄\nIndicator';
        const displayName = type.includes('Acid') ? getText('acid') :
            type.includes('Base') ? getText('base') : getText('indicator');
        tool.innerHTML = `
                    <div class="bottle-body">
                        <div class="bottle-label">${labelText}</div>
                        <div class="liquid" style="height: ${tool.dataset.volume}%; background-color: ${getLiquidColor(type, tool.dataset.ph)};"></div>
                    </div>
                    <div class="bottle-neck"></div>
                    <div class="bottle-cap"></div>
                    <div class="tool-name">${displayName}</div>
                `;
    }

    const buttons = document.createElement('div');
    buttons.className = 'tool-buttons';

    // Set appropriate buttons based on tool type
    if (type === 'Pipette') {
        buttons.innerHTML = `
                    <button onclick="collectWithPipette(event)">${getText('suckLiquid')}</button>
                    <button onclick="deliverWithPipette(event)">${getText('releaseLiquid')}</button>
                    <button onclick="emptyTool(event)">${getText('empty')}</button>
                    <button onclick="toggleButtons(event)">${getText('hide')}</button>
                `;
    } else if (type === 'Litmus Paper') {
        buttons.innerHTML = `
                    <button onclick="useLitmusPaper(event)">${getText('testPH')}</button>
                    <button onclick="selectTarget(event)">${getText('dipInLiquid')}</button>
                    <button onclick="toggleButtons(event)">${getText('hide')}</button>
                `;
    } else {
        buttons.innerHTML = `
                    <button onclick="shakeTool(event)">${getText('shake')}</button>
                    <button onclick="emptyTool(event)">${getText('empty')}</button>
                    <button onclick="selectTarget(event)">${getText('select')}</button>
                    <button onclick="pourIntoTarget(event)">${getText('pour')}</button>
                    <button onclick="toggleButtons(event)">${getText('hide')}</button>
                `;
    }
    tool.appendChild(buttons);

    // Add click event to toggle buttons
    tool.addEventListener('click', function (e) {
        if (e.target.closest('.tool-buttons')) return; // Don't toggle if clicking buttons
        e.stopPropagation();
        tool.classList.toggle('show-buttons');
    });

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

    showToast(`✨ ${type} ${getText('summoned')}`);
}

function collectWithPipette(event) {
    event.stopPropagation();
    const pipette = event.target.closest('.tool');

    if (!selectedTarget) {
        showToast(`❌ ${getText('selectSourceFirst')}`, 'error');
        return;
    }

    if (selectedTarget.dataset.type === 'Pipette') {
        showToast(`❌ ${getText('selectDifferent')}`, 'error');
        return;
    }

    const sourceVolume = parseFloat(selectedTarget.dataset.volume);
    if (sourceVolume <= 0) {
        showToast(`❌ ${getText('sourceEmpty')}`, 'error');
        return;
    }

    // Collect liquid
    const collectAmount = Math.min(10, sourceVolume);
    selectedTarget.dataset.volume = sourceVolume - collectAmount;
    selectedTarget.querySelector('.liquid').style.height = (sourceVolume - collectAmount) + '%';

    pipette.dataset.collected = 'true';
    pipette.dataset.collectedPh = selectedTarget.dataset.ph;
    pipette.dataset.collectedVolume = collectAmount;

    // Show liquid in pipette
    const pipetteLiquid = pipette.querySelector('.pipette-liquid');
    pipetteLiquid.style.display = 'block';
    pipetteLiquid.style.backgroundColor = getLiquidColor(selectedTarget.dataset.type, selectedTarget.dataset.ph);

    showToast(`💧 ${getText('pipetteCollected')}`);

    // Clear selection
    selectedTarget.classList.remove('selected');
    selectedTarget = null;
}

function deliverWithPipette(event) {
    event.stopPropagation();
    const pipette = event.target.closest('.tool');

    if (pipette.dataset.collected !== 'true') {
        showToast(`❌ ${getText('pipetteEmpty')}`, 'error');
        return;
    }

    if (!selectedTarget) {
        showToast(`❌ ${getText('selectTargetFirst')}`, 'error');
        return;
    }

    if (selectedTarget.dataset.type !== 'Beaker') {
        showToast(`❌ ${getText('onlyBeaker')}`, 'error');
        return;
    }

    // Deliver liquid
    const deliverAmount = parseFloat(pipette.dataset.collectedVolume);
    const targetVolume = parseFloat(selectedTarget.dataset.volume);
    const newTargetVolume = Math.min(100, targetVolume + deliverAmount);

    // Calculate new pH
    const pipettePh = parseFloat(pipette.dataset.collectedPh);
    const targetPh = parseFloat(selectedTarget.dataset.ph);
    const newPh = targetVolume === 0 ? pipettePh :
        ((targetPh * targetVolume) + (pipettePh * deliverAmount)) / newTargetVolume;

    selectedTarget.dataset.volume = newTargetVolume;
    selectedTarget.dataset.ph = newPh;
    selectedTarget.querySelector('.liquid').style.height = newTargetVolume + '%';
    selectedTarget.querySelector('.liquid').style.backgroundColor = getLiquidColor('Beaker', newPh);

    // Clear pipette
    pipette.dataset.collected = 'false';
    pipette.querySelector('.pipette-liquid').style.display = 'none';

    showToast(`💧 ${getText('pipetteDelivered')} pH: ${newPh.toFixed(1)}`);

    // Clear selection
    selectedTarget.classList.remove('selected');
    selectedTarget = null;
}

function useLitmusPaper(event) {
    event.stopPropagation();
    const litmus = event.target.closest('.tool');

    if (!selectedTarget) {
        showToast(`❌ ${getText('selectTargetFirst')}`, 'error');
        return;
    }

    const targetVolume = parseFloat(selectedTarget.dataset.volume);
    if (targetVolume <= 0) {
        showToast(`❌ ${getText('litmusNoLiquid')}`, 'error');
        return;
    }

    const ph = parseFloat(selectedTarget.dataset.ph);
    const litmusBody = litmus.querySelector('.litmus-body');

    // Change litmus color based on pH
    let color;
    if (ph < 5) {
        color = '#ff6b6b'; // Red for acidic
    } else if (ph > 9) {
        color = '#48dbfb'; // Blue for basic
    } else {
        color = '#feca57'; // Yellow for neutral
    }

    litmusBody.style.background = color;

    // Add animation
    litmus.classList.add('testing');
    setTimeout(() => litmus.classList.remove('testing'), 1000);

    showToast(`🧪 ${getText('litmusUsed')} ${ph.toFixed(1)}`);

    // Clear selection
    selectedTarget.classList.remove('selected');
    selectedTarget = null;
}

function getInitialPh(type) {
    if (type === 'Acid Bottle') return 2;
    if (type === 'Base Bottle') return 12;
    if (type === 'Indicator Bottle') return 7;
    return 7;
}

function getInitialVolume(type) {
    if (type === 'Beaker') return 0;
    if (type === 'Pipette') return 0;
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

function toggleButtons(event) {
    event.stopPropagation();
    const tool = event.target.closest('.tool');
    tool.classList.remove('show-buttons');
}

function shakeTool(event) {
    event.stopPropagation();
    const tool = event.target.closest('.tool');
    tool.classList.add('shaking');
    setTimeout(() => tool.classList.remove('shaking'), 1000);
    if (tool.dataset.type === 'Beaker') {
        applyIndicator(tool);
    }
    showToast(`🌀 ${getText('shaken')}`);
}

function emptyTool(event) {
    event.stopPropagation();
    const tool = event.target.closest('.tool');
    const liquid = tool.querySelector('.liquid');
    if (liquid) {
        liquid.style.height = '0%';
        liquid.style.backgroundColor = 'transparent';
    }
    tool.dataset.volume = 0;
    tool.dataset.ph = 7;

    // Special handling for pipette
    if (tool.dataset.type === 'Pipette') {
        tool.dataset.collected = 'false';
        const pipetteLiquid = tool.querySelector('.pipette-liquid');
        if (pipetteLiquid) {
            pipetteLiquid.style.display = 'none';
        }
    }

    showToast(`🗑️ ${getText('emptied')}`);
}

function selectTarget(event) {
    event.stopPropagation();
    const tool = event.target.closest('.tool');
    if (selectedTarget) {
        selectedTarget.classList.remove('selected');
    }
    selectedTarget = tool;
    selectedTarget.classList.add('selected');
    showToast(`🎯 ${getText('selected')} ${selectedTarget.dataset.type} ${getText('asTarget')}`);
}

function pourIntoTarget(event) {
    event.stopPropagation();
    const source = event.target.closest('.tool');
    if (!selectedTarget || source === selectedTarget) {
        showToast(`❌ ${getText('selectDifferent')}`, 'error');
        return;
    }
    if (parseFloat(source.dataset.volume) <= 0) {
        showToast(`❌ ${getText('sourceEmpty')}`, 'error');
        return;
    }
    if (selectedTarget.dataset.type !== 'Beaker') {
        showToast(`❌ ${getText('onlyBeaker')}`, 'error');
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
        showToast(`🧪 ${getText('indicatorAdded')}`);
    } else {
        const newPh = targetVol === 0 ? sourcePh :
            ((targetPh * targetVol) + (sourcePh * actualPour)) / newTargetVol;
        selectedTarget.dataset.ph = newPh;
        selectedTarget.querySelector('.liquid').style.backgroundColor =
            getLiquidColor('Beaker', newPh);
        showToast(`💧 ${getText('pouredSuccess')} ${newPh.toFixed(1)}`);
    }

    selectedTarget.classList.remove('selected');
    selectedTarget = null;
}

// Add CSS for new animations
const additionalStyles = document.createElement('style');
additionalStyles.textContent = `
            .pipette-liquid {
                position: absolute;
                width: 6px;
                height: 30px;
                background: #ff6b6b;
                left: 50%;
                top: 40%;
                transform: translateX(-50%);
                border-radius: 0 0 3px 3px;
            }
            
            .testing {
                animation: litmus-test 1s ease-in-out;
            }
            
            @keyframes litmus-test {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(1.1) rotate(5deg); }
            }
        `;
document.head.appendChild(additionalStyles);

const labTable = document.getElementById('lab-table');
labTable.ondragover = (e) => e.preventDefault();
labTable.ondrop = (e) => {
    e.preventDefault();
    const id = e.dataTransfer.getData('text/plain');
    const tool = document.getElementById(id);
    const rect = labTable.getBoundingClientRect();

    // Extract tool number from ID (e.g., "tool-2" -> 2)
    const toolNumber = parseInt(id.split('-')[1]);

    // Calculate position with progressive Y adjustment based on tool ID
    const newLeft = e.clientX - rect.left - 40;
    const baseTop = e.clientY - rect.top - 60;
    const adjustedTop = baseTop - (toolNumber * 100); // Apply -100px per tool number

    tool.style.left = newLeft + 'px';
    tool.style.top = adjustedTop + 'px';

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

// Remove particle system for performance
// setInterval(createParticle, 800);