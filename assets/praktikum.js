let toolCount = 0;
let selectedTarget = null;

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
        <button onclick="shakeTool(event)">Shake</button>
        <button onclick="emptyTool(event)">Empty</button>
        <button onclick="selectTarget(event)">Select Target</button>
        <button onclick="pourIntoTarget(event)">Pour Into</button>
    `;
    tool.appendChild(buttons);

    tool.draggable = true;
    tool.ondragstart = (e) => {
        e.dataTransfer.setData('text/plain', tool.id);
    };

    document.getElementById('lab-table').appendChild(tool);
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
    if (type.includes('Acid')) return '#ef5350'; // Adjusted to EduLab's red hover color
    if (type.includes('Base')) return '#1565c0'; // Adjusted to EduLab's blue
    ph = parseFloat(ph);
    if (ph < 4) return '#ef5350'; // Red for very acidic
    if (ph < 6) return '#ffca28'; // Yellow for acidic (EduLab-like color)
    if (ph >= 6 && ph <= 8) return 'transparent'; // Clear for neutral
    if (ph > 8) return '#2e7d32'; // Green for basic (EduLab's progress color)
    if (ph > 10) return '#1565c0'; // Blue for very basic
    return 'transparent';
}

function applyIndicator(beaker) {
    const ph = parseFloat(beaker.dataset.ph);
    const liquid = beaker.querySelector('.liquid');
    // Phenolphthalein turns pink in basic solutions (pH > 8.2)
    if (ph >= 8.2) {
        liquid.style.backgroundColor = '#ec407a'; // Pink, consistent with EduLab's vibrant palette
    } else {
        liquid.style.backgroundColor = 'transparent';
    }
}

function shakeTool(event) {
    event.stopPropagation();
    const tool = event.target.closest('.tool');
    tool.classList.add('shaking');
    setTimeout(() => tool.classList.remove('shaking'), 800);
    if (tool.dataset.type === 'Beaker') {
        applyIndicator(tool);
    }
}

function emptyTool(event) {
    event.stopPropagation();
    const tool = event.target.closest('.tool');
    const liquid = tool.querySelector('.liquid');
    liquid.style.height = '0%';
    tool.dataset.volume = 0;
    tool.dataset.ph = 7;
    liquid.style.backgroundColor = 'transparent';
}

function selectTarget(event) {
    event.stopPropagation();
    const tool = event.target.closest('.tool');
    if (selectedTarget) {
        selectedTarget.classList.remove('selected');
    }
    selectedTarget = tool;
    selectedTarget.classList.add('selected');
    alert('✅ Selected ' + selectedTarget.dataset.type + ' as target.', { background: '#e0f7fa', color: '#2c3e50' });
}

function pourIntoTarget(event) {
    event.stopPropagation();
    const source = event.target.closest('.tool');
    if (!selectedTarget || source === selectedTarget) {
        alert('❌ Select a different target first!', { background: '#e0f7fa', color: '#2c3e50' });
        return;
    }
    if (parseFloat(source.dataset.volume) <= 0) {
        alert('❌ Source container is empty!', { background: '#e0f7fa', color: '#2c3e50' });
        return;
    }
    if (selectedTarget.dataset.type !== 'Beaker') {
        alert('❌ Can only pour into Beaker!', { background: '#e0f7fa', color: '#2c3e50' });
        return;
    }
    source.classList.add('pouring');
    setTimeout(() => source.classList.remove('pouring'), 1200);
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
        setTimeout(() => applyIndicator(selectedTarget), 600);
    } else {
        const newPh = targetVol === 0 ? sourcePh :
            ((targetPh * targetVol) + (sourcePh * actualPour)) / newTargetVol;
        selectedTarget.dataset.ph = newPh;
        selectedTarget.querySelector('.liquid').style.backgroundColor =
            getLiquidColor('Beaker', newPh);
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
    tool.style.left = Math.max(0, Math.min(720, e.clientX - rect.left - 40)) + 'px';
    tool.style.top = Math.max(0, Math.min(450, e.clientY - rect.top - 60)) + 'px';
};