let wellLabels = {};
let testResults = [];
let autoTestInProgress = false;
let toolCount = 0;
let selectedTarget = null;

// Language translations
const translations = {
    paletTetes: 'Palet Tetes',
    pipetTetes: 'Pipet Tetes',
    kertasLakmusMerah: 'Kertas Lakmus Merah',
    kertasLakmusBiru: 'Kertas Lakmus Biru',
    larutanDetergen: 'Larutan Detergen',
    minumanBerkarbonasi: 'Minuman Berkarbonasi',
    larutanPastaGigi: 'Larutan Pasta Gigi',
    larutanGaramDapur: 'Larutan Garam Dapur',
    larutanCuka: 'Larutan Cuka',
    airMineral: 'Air Mineral',
    airJeruk: 'Air Jeruk',
    addToWell: '💧 Tambah ke Lubang',
    empty: '🗑️ Kosongkan',
    select: '🎯 Pilih',
    pour: '💧 Tuang',
    hide: '❌ Sembunyikan',
    suckLiquid: '📥 Sedot Cairan',
    releaseLiquid: '📤 Keluarkan',
    testPH: '🧪 Tes pH',
    dipInLiquid: '🌊 Celup ke Cairan',
    summoned: 'berhasil dipanggil!',
    emptied: 'Wadah dikosongkan!',
    selected: 'Terpilih',
    asTarget: 'sebagai target',
    selectDifferent: 'Pilih target yang berbeda dulu!',
    sourceEmpty: 'Wadah sumber kosong!',
    onlyPalet: 'Hanya bisa tuang ke Palet Tetes!',
    pouredSuccess: 'Berhasil dituang! pH:',
    pipetteCollected: 'Pipet mengambil cairan!',
    pipetteEmpty: 'Pipet kosong!',
    pipetteDelivered: 'Pipet menyalurkan cairan!',
    litmusUsed: 'Kertas lakmus digunakan! Hasil:',
    litmusNoLiquid: 'Tidak ada cairan untuk diuji!',
    selectSourceFirst: 'Pilih wadah sumber dulu!',
    selectTargetFirst: 'Pilih wadah target dulu!',
    acidic: 'ASAM',
    basic: 'BASA',
    neutral: 'NETRAL',
    redToBlue: 'Merah → Biru',
    blueToRed: 'Biru → Merah',
    noChange: 'Tidak berubah'
};

function getText(key) {
    return translations[key] || key;
}

// Dropdown functionality
function toggleDropdown(dropdownId) {
    const dropdown = document.getElementById(dropdownId);
    const allDropdowns = document.querySelectorAll('.dropdown');

    // Close all other dropdowns
    allDropdowns.forEach(d => {
        if (d.id !== dropdownId) {
            d.classList.remove('active');
        }
    });

    // Toggle current dropdown
    dropdown.classList.toggle('active');

    // Close dropdown when clicking outside
    document.addEventListener('click', function closeDropdown(e) {
        if (!dropdown.contains(e.target)) {
            dropdown.classList.remove('active');
            document.removeEventListener('click', closeDropdown);
        }
    });
}

// Modal functionality
function showPostLabModal() {
    const modal = document.getElementById('postLabModal');
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

function hidePostLabModal() {
    const modal = document.getElementById('postLabModal');
    modal.classList.remove('show');
    document.body.style.overflow = 'auto';
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
    }, 2500);
}

function summonTool(type) {
    const tool = document.createElement('div');
    tool.className = 'tool';
    tool.id = 'tool-' + toolCount;

    // Random spawning within the lab table
    const labTable = document.getElementById('lab-table');
    const labRect = labTable.getBoundingClientRect();
    const randomLeft = Math.random() * (labRect.width - 150);
    const randomTop = Math.random() * (labRect.height - 200);

    tool.style.left = randomLeft + 'px';
    tool.style.top = randomTop + 'px';
    tool.dataset.type = type;
    tool.dataset.ph = getInitialPh(type);
    tool.dataset.volume = getInitialVolume(type);

    toolCount++;

    if (type === 'Palet Tetes') {
        tool.classList.add('palet-tetes');
        tool.innerHTML = `
        <div class="palet-body">
            <div class="palet-wells">
                ${Array.from({ length: 8 }, (_, i) =>
            `<div class="palet-well" data-well="${i}">
                        <div class="well-label">${i + 1}</div>
                    </div>`
        ).join('')}
            </div>
        </div>
        <div class="tool-name">${getText('paletTetes')}</div>
    `;
        // Initialize wells data
        tool.dataset.wells = JSON.stringify(Array(8).fill({ ph: 7, volume: 0, color: 'transparent', label: '', type: '' }));
        wellLabels[tool.id] = Array(8).fill('');
    } else if (type === 'Pipet Tetes') {
        tool.classList.add('pipet-tetes');
        tool.dataset.collected = 'false';
        tool.dataset.collectedPh = '7';
        tool.innerHTML = `
            <div class="pipet-body">
                <div class="pipet-bulb"></div>
                <div class="pipet-tube"></div>
                <div class="pipet-tip"></div>
                <div class="pipet-liquid" style="display: none;"></div>
            </div>
            <div class="tool-name">${getText('pipetTetes')}</div>
        `;
    } else if (type === 'Kertas Lakmus Merah') {
        tool.classList.add('kertas-lakmus', 'lakmus-merah');
        tool.innerHTML = `
            <div class="lakmus-handle"></div>
            <div class="lakmus-paper"></div>
            <div class="tool-name">${getText('kertasLakmusMerah')}</div>
        `;
    } else if (type === 'Kertas Lakmus Biru') {
        tool.classList.add('kertas-lakmus', 'lakmus-biru');
        tool.innerHTML = `
            <div class="lakmus-handle"></div>
            <div class="lakmus-paper"></div>
            <div class="tool-name">${getText('kertasLakmusBiru')}</div>
        `;
    } else {
        // Materials (bottles) - FIXED VERSION
        tool.classList.add('bottle');
        const labelText = getMaterialLabel(type);
        const displayName = getMaterialDisplayName(type);
        const liquidColor = getLiquidColor(type, tool.dataset.ph);

        tool.innerHTML = `
            <div class="bottle-body">
                <div class="bottle-label">${labelText}</div>
                <div class="liquid" style="height: ${tool.dataset.volume}%; background-color: ${liquidColor};"></div>
            </div>
            <div class="bottle-neck"></div>
            <div class="bottle-cap"></div>
            <div class="tool-name">${displayName}</div>
        `;
    }

    const buttons = document.createElement('div');
    buttons.className = 'tool-buttons';

    // Set appropriate buttons based on tool type
    if (type === 'Palet Tetes') {
        buttons.innerHTML = `
            <button onclick="emptyTool(event)">${getText('empty')}</button>
            <button onclick="selectTarget(event)">${getText('select')}</button>
            <button onclick="toggleButtons(event)">${getText('hide')}</button>
        `;
    } else if (type === 'Pipet Tetes') {
        buttons.innerHTML = `
            <button onclick="collectWithPipette(event)">${getText('suckLiquid')}</button>
            <button onclick="deliverWithPipette(event)">${getText('releaseLiquid')}</button>
            <button onclick="emptyTool(event)">${getText('empty')}</button>
            <button onclick="toggleButtons(event)">${getText('hide')}</button>
        `;
    } else if (type.includes('Kertas Lakmus')) {
        buttons.innerHTML = `
            <button onclick="useLitmusPaper(event)">${getText('testPH')}</button>
            <button onclick="selectTarget(event)">${getText('dipInLiquid')}</button>
            <button onclick="toggleButtons(event)">${getText('hide')}</button>
        `;
    } else {
        buttons.innerHTML = `
            <button onclick="emptyTool(event)">${getText('empty')}</button>
            <button onclick="selectTarget(event)">${getText('select')}</button>
            <button onclick="pourIntoTarget(event)">${getText('pour')}</button>
            <button onclick="toggleButtons(event)">${getText('hide')}</button>
        `;
    }
    tool.appendChild(buttons);

    // Add click event to toggle buttons
    tool.addEventListener('click', function (e) {
        if (e.target.closest('.tool-buttons')) return;
        e.stopPropagation();
        tool.classList.toggle('show-buttons');
    });

    tool.draggable = true;
    tool.ondragstart = (e) => {
        e.dataTransfer.setData('text/plain', tool.id);
        tool.style.transform = 'scale(0.75) rotate(3deg)';
    };

    tool.ondragend = (e) => {
        tool.style.transform = 'scale(0.85)';
    };

    document.getElementById('lab-table').appendChild(tool);

    // Add entrance animation
    tool.style.opacity = '0';
    tool.style.transform = 'scale(0.4) translateY(-30px)';
    setTimeout(() => {
        tool.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
        tool.style.opacity = '1';
        tool.style.transform = 'scale(0.85) translateY(0)';
    }, 100);

    showToast(`✨ ${type} ${getText('summoned')}`);

    // Close any open dropdowns
    document.querySelectorAll('.dropdown').forEach(d => d.classList.remove('active'));
}

function getMaterialLabel(type) {
    const labels = {
        'Larutan Detergen': 'Detergen\npH ~10',
        'Minuman Berkarbonasi': 'Soda\npH ~3.5',
        'Larutan Pasta Gigi': 'Pasta Gigi\npH ~9',
        'Larutan Garam Dapur': 'NaCl\npH ~7',
        'Larutan Cuka': 'Cuka\npH ~2.5',
        'Air Mineral': 'H₂O\npH ~7',
        'Air Jeruk': 'Jeruk\npH ~3'
    };
    return labels[type] || type;
}

function getMaterialDisplayName(type) {
    const names = {
        'Larutan Detergen': getText('larutanDetergen'),
        'Minuman Berkarbonasi': getText('minumanBerkarbonasi'),
        'Larutan Pasta Gigi': getText('larutanPastaGigi'),
        'Larutan Garam Dapur': getText('larutanGaramDapur'),
        'Larutan Cuka': getText('larutanCuka'),
        'Air Mineral': getText('airMineral'),
        'Air Jeruk': getText('airJeruk')
    };
    return names[type] || type;
}

function collectWithPipette(event) {
    event.stopPropagation();
    const pipette = event.target.closest('.tool');

    if (!selectedTarget) {
        showToast(`❌ ${getText('selectSourceFirst')}`, 'error');
        return;
    }

    if (selectedTarget.dataset.type === 'Pipet Tetes') {
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
    const liquidElement = selectedTarget.querySelector('.liquid');
    if (liquidElement) {
        liquidElement.style.height = (sourceVolume - collectAmount) + '%';
    }

    pipette.dataset.collected = 'true';
    pipette.dataset.collectedPh = selectedTarget.dataset.ph;
    pipette.dataset.collectedVolume = collectAmount;
    pipette.dataset.collectedType = selectedTarget.dataset.type;

    // Show liquid in pipette
    const pipetteLiquid = pipette.querySelector('.pipet-liquid');
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

    if (selectedTarget.dataset.type !== 'Palet Tetes') {
        showToast(`❌ ${getText('onlyPalet')}`, 'error');
        return;
    }

    // Find an empty well in the palet
    const wells = JSON.parse(selectedTarget.dataset.wells);
    const emptyWellIndex = wells.findIndex(well => well.volume === 0);

    if (emptyWellIndex === -1) {
        showToast('❌ Semua lubang palet sudah terisi!', 'error');
        return;
    }

    // Deliver liquid to the well
    const deliverAmount = parseFloat(pipette.dataset.collectedVolume);
    const pipettePh = parseFloat(pipette.dataset.collectedPh);
    const originalType = pipette.dataset.collectedType;

    wells[emptyWellIndex] = {
        ph: pipettePh,
        volume: deliverAmount,
        color: getLiquidColor(originalType, pipettePh)
    };

    selectedTarget.dataset.wells = JSON.stringify(wells);

    // Update visual
    const wellElement = selectedTarget.querySelector(`[data-well="${emptyWellIndex}"]`);
    wellElement.style.backgroundColor = wells[emptyWellIndex].color;
    wellElement.style.border = '2px solid #333';

    // Clear pipette
    pipette.dataset.collected = 'false';
    pipette.querySelector('.pipet-liquid').style.display = 'none';

    showToast(`💧 ${getText('pipetteDelivered')} pH: ${pipettePh.toFixed(1)}`);

    // Clear selection
    selectedTarget.classList.remove('selected');
    selectedTarget = null;
}

function useLitmusPaper(event) {
    event.stopPropagation();
    const litmus = event.target.closest('.tool');
    const isRedLitmus = litmus.classList.contains('lakmus-merah');

    if (!selectedTarget) {
        showToast(`❌ ${getText('selectTargetFirst')}`, 'error');
        return;
    }

    let ph = null;
    let volume = 0;

    // Check if target is a palet with wells
    if (selectedTarget.dataset.type === 'Palet Tetes') {
        const wells = JSON.parse(selectedTarget.dataset.wells);
        const filledWell = wells.find(well => well.volume > 0);
        if (!filledWell) {
            showToast(`❌ ${getText('litmusNoLiquid')}`, 'error');
            return;
        }
        ph = filledWell.ph;
        volume = filledWell.volume;
    } else {
        volume = parseFloat(selectedTarget.dataset.volume);
        if (volume <= 0) {
            showToast(`❌ ${getText('litmusNoLiquid')}`, 'error');
            return;
        }
        ph = parseFloat(selectedTarget.dataset.ph);
    }

    // Test with litmus paper
    let result = '';
    let newColor = '';

    if (isRedLitmus) {
        if (ph > 8) {
            result = getText('redToBlue');
            newColor = '#4488cc';
        } else {
            result = getText('noChange');
            newColor = '#ff4444';
        }
    } else { // Blue litmus
        if (ph < 6) {
            result = getText('blueToRed');
            newColor = '#ff4444';
        } else {
            result = getText('noChange');
            newColor = '#4488cc';
        }
    }

    // Change litmus color
    const litmusPaper = litmus.querySelector('.lakmus-paper');
    litmusPaper.style.background = newColor;

    // Add animation
    litmus.classList.add('testing');
    setTimeout(() => litmus.classList.remove('testing'), 1000);

    // Determine acid/base/neutral
    let nature = '';
    if (ph < 6) nature = getText('acidic');
    else if (ph > 8) nature = getText('basic');
    else nature = getText('neutral');

    showToast(`🧪 ${getText('litmusUsed')} ${result} (${nature}, pH: ${ph.toFixed(1)})`);

    // Update results table
    if (selectedTarget.dataset.type === 'Palet Tetes') {
        const wells = JSON.parse(selectedTarget.dataset.wells);
        const filledWell = wells.find(well => well.volume > 0);
        if (filledWell && filledWell.type) {
            updateResultsTable(filledWell.type, ph, isRedLitmus ? result : null, !isRedLitmus ? result : null);
        }
    } else if (selectedTarget.dataset.type && parseFloat(selectedTarget.dataset.volume) > 0) {
        updateResultsTable(selectedTarget.dataset.type, ph, isRedLitmus ? result : null, !isRedLitmus ? result : null);
    }

    // Clear selection
    selectedTarget.classList.remove('selected');
    selectedTarget = null;
}

function getInitialPh(type) {
    const phValues = {
        'Larutan Detergen': 10.0,
        'Minuman Berkarbonasi': 3.5,
        'Larutan Pasta Gigi': 9.0,
        'Larutan Garam Dapur': 7.0,
        'Larutan Cuka': 2.5,
        'Air Mineral': 7.0,
        'Air Jeruk': 3.0
    };
    return phValues[type] || 7;
}

function getInitialVolume(type) {
    if (type === 'Palet Tetes' || type === 'Pipet Tetes' || type.includes('Kertas Lakmus')) return 0;
    return 80;
}

// FIXED: Updated getLiquidColor function with better, more realistic colors
function getLiquidColor(type, ph) {
    ph = parseFloat(ph);

    // Warna spesifik untuk setiap material - lebih vibrant dan realistis
    const materialColors = {
        'Larutan Detergen': '#00BCD4',      // Cyan terang (seperti detergen sungguhan)
        'Minuman Berkarbonasi': '#8D6E63',   // Coklat cola
        'Larutan Pasta Gigi': '#E8F5E8',    // Hijau mint muda
        'Larutan Garam Dapur': '#F0F8FF',   // Biru sangat muda (hampir transparan)
        'Larutan Cuka': '#FFF59D',          // Kuning muda
        'Air Mineral': '#E3F2FD',           // Biru sangat muda
        'Air Jeruk': '#FFB74D'              // Orange terang
    };

    if (materialColors[type]) {
        return materialColors[type];
    }

    // Warna berdasarkan pH untuk campuran dan well
    if (ph < 4) return '#F44336';      // Merah untuk sangat asam
    if (ph < 6) return '#FF9800';      // Orange untuk asam
    if (ph >= 6 && ph <= 8) return '#E3F2FD';  // Biru muda untuk netral
    if (ph > 8) return '#2196F3';     // Biru untuk basa
    if (ph > 10) return '#3F51B5';    // Biru tua untuk sangat basa
    return '#E3F2FD';                 // Default biru muda
}

function toggleButtons(event) {
    event.stopPropagation();
    const tool = event.target.closest('.tool');
    tool.classList.remove('show-buttons');
}

function emptyTool(event) {
    event.stopPropagation();
    const tool = event.target.closest('.tool');

    if (tool.dataset.type === 'Palet Tetes') {
        // Empty all wells
        tool.dataset.wells = JSON.stringify(Array(8).fill({ ph: 7, volume: 0, color: 'transparent' }));
        const wells = tool.querySelectorAll('.palet-well');
        wells.forEach(well => {
            well.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
            well.style.border = '1px solid #ddd';
        });
    } else {
        const liquid = tool.querySelector('.liquid');
        if (liquid) {
            liquid.style.height = '0%';
            liquid.style.backgroundColor = 'transparent';
        }
    }

    tool.dataset.volume = 0;
    tool.dataset.ph = 7;

    // Special handling for pipette
    if (tool.dataset.type === 'Pipet Tetes') {
        tool.dataset.collected = 'false';
        const pipetteLiquid = tool.querySelector('.pipet-liquid');
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

// FIXED: Updated pourIntoTarget function
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
    if (selectedTarget.dataset.type !== 'Palet Tetes') {
        showToast(`❌ ${getText('onlyPalet')}`, 'error');
        return;
    }

    // Find an empty well in the target palet
    const wells = JSON.parse(selectedTarget.dataset.wells);
    const emptyWellIndex = wells.findIndex(well => well.volume === 0);

    if (emptyWellIndex === -1) {
        showToast('❌ Semua lubang palet sudah terisi!', 'error');
        return;
    }

    source.classList.add('pouring');
    setTimeout(() => source.classList.remove('pouring'), 1500);

    const pourAmount = 15;
    const sourceVol = parseFloat(source.dataset.volume);
    const actualPour = Math.min(pourAmount, sourceVol);
    const newSourceVol = Math.max(0, sourceVol - actualPour);

    source.dataset.volume = newSourceVol;
    const sourceLiquid = source.querySelector('.liquid');
    if (sourceLiquid) {
        sourceLiquid.style.height = newSourceVol + '%';
    }

    const sourcePh = parseFloat(source.dataset.ph);

    // Add liquid to the well - FIXED: use original source type for color
    wells[emptyWellIndex] = {
        ph: sourcePh,
        volume: actualPour,
        color: getLiquidColor(source.dataset.type, sourcePh),
        label: source.dataset.type,
        type: source.dataset.type
    };

    // Update well label
    const wellLabel = selectedTarget.querySelector(`[data-well="${emptyWellIndex}"] .well-label`);
    if (wellLabel) {
        wellLabel.textContent = getMaterialShortName(source.dataset.type);
        wellLabel.style.background = '#e3f2fd';
    }

    selectedTarget.dataset.wells = JSON.stringify(wells);

    // Update visual
    const wellElement = selectedTarget.querySelector(`[data-well="${emptyWellIndex}"]`);
    wellElement.style.backgroundColor = wells[emptyWellIndex].color;
    wellElement.style.border = '2px solid #333';

    showToast(`💧 ${getText('pouredSuccess')} ${sourcePh.toFixed(1)}`);

    selectedTarget.classList.remove('selected');
    selectedTarget = null;
}

// Lab table drag and drop setup
const labTable = document.getElementById('lab-table');
labTable.ondragover = (e) => e.preventDefault();
labTable.ondrop = (e) => {
    e.preventDefault();
    const id = e.dataTransfer.getData('text/plain');
    const tool = document.getElementById(id);
    const rect = labTable.getBoundingClientRect();

    const toolNumber = parseInt(id.split('-')[1]);
    const newLeft = e.clientX - rect.left - 40;
    const baseTop = e.clientY - rect.top - 60;
    const adjustedTop = baseTop - (toolNumber * 80);

    tool.style.left = newLeft + 'px';
    tool.style.top = adjustedTop + 'px';

    // Add drop animation
    tool.style.transform = 'scale(0.95)';
    setTimeout(() => {
        tool.style.transform = 'scale(0.85)';
    }, 200);
};

// Close dropdowns when clicking outside
document.addEventListener('click', function (e) {
    if (!e.target.closest('.dropdown')) {
        document.querySelectorAll('.dropdown').forEach(dropdown => {
            dropdown.classList.remove('active');
        });
    }
});

// Close modal when clicking overlay
document.getElementById('postLabModal').addEventListener('click', function (e) {
    if (e.target === this) {
        hidePostLabModal();
    }
});

// ESC key to close modal
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
        hidePostLabModal();
    }
});

function getMaterialShortName(type) {
    const shortNames = {
        'Larutan Detergen': 'DET',
        'Minuman Berkarbonasi': 'SODA',
        'Larutan Pasta Gigi': 'PASTA',
        'Larutan Garam Dapur': 'GARAM',
        'Larutan Cuka': 'CUKA',
        'Air Mineral': 'AIR',
        'Air Jeruk': 'JERUK'
    };
    return shortNames[type] || 'UNK';
}

function showResultsTable() {
    const resultsSection = document.getElementById('resultsSection');
    resultsSection.style.display = resultsSection.style.display === 'none' ? 'block' : 'none';
}

function updateResultsTable(materialType, ph, redResult, blueResult) {
    const existingIndex = testResults.findIndex(r => r.material === materialType);

    const newResult = {
        material: materialType,
        ph: ph,
        redLitmus: redResult || '-',
        blueLitmus: blueResult || '-',
        nature: ph < 6 ? 'ASAM' : ph > 8 ? 'BASA' : 'NETRAL'
    };

    if (existingIndex >= 0) {
        if (redResult) testResults[existingIndex].redLitmus = redResult;
        if (blueResult) testResults[existingIndex].blueLitmus = blueResult;
        testResults[existingIndex].nature = newResult.nature;
    } else {
        testResults.push(newResult);
    }

    renderResultsTable();
}

function renderResultsTable() {
    const tbody = document.getElementById('resultsBody');
    tbody.innerHTML = testResults.map((result, index) =>
        `<tr>
            <td>${index + 1}</td>
            <td>${result.material}</td>
            <td>${result.ph.toFixed(1)}</td>
            <td>${result.redLitmus}</td>
            <td>${result.blueLitmus}</td>
            <td class="${result.nature.toLowerCase()}">${result.nature}</td>
        </tr>`
    ).join('');
}

function clearResults() {
    testResults = [];
    renderResultsTable();
    showToast('Tabel hasil direset!');
}

async function autoTestAll() {
    if (autoTestInProgress) return;

    const palets = document.querySelectorAll('.palet-tetes');
    const redLitmus = document.querySelector('.lakmus-merah');
    const blueLitmus = document.querySelector('.lakmus-biru');

    if (palets.length === 0 || !redLitmus || !blueLitmus) {
        showToast('Siapkan palet dan kertas lakmus dulu!', 'error');
        return;
    }

    autoTestInProgress = true;
    document.getElementById('resultsSection').style.display = 'block';

    for (const palet of palets) {
        const wells = JSON.parse(palet.dataset.wells);

        for (let i = 0; i < wells.length; i++) {
            if (wells[i].volume > 0 && wells[i].type) {
                await new Promise(resolve => setTimeout(resolve, 800));

                // Test with red litmus
                selectTargetProgrammatically(palet);
                const redResult = testLitmusProgrammatically(redLitmus, wells[i].ph);

                await new Promise(resolve => setTimeout(resolve, 500));

                // Test with blue litmus  
                selectTargetProgrammatically(palet);
                const blueResult = testLitmusProgrammatically(blueLitmus, wells[i].ph);

                updateResultsTable(wells[i].type, wells[i].ph, redResult, blueResult);
            }
        }
    }

    if (selectedTarget) {
        selectedTarget.classList.remove('selected');
        selectedTarget = null;
    }

    autoTestInProgress = false;
    showToast('Auto test selesai! Cek tabel hasil.');
}

function selectTargetProgrammatically(tool) {
    if (selectedTarget) selectedTarget.classList.remove('selected');
    selectedTarget = tool;
    selectedTarget.classList.add('selected');
}

function testLitmusProgrammatically(litmus, ph) {
    const isRedLitmus = litmus.classList.contains('lakmus-merah');

    let result = '';
    let newColor = '';

    if (isRedLitmus) {
        if (ph > 8) {
            result = 'Merah → Biru';
            newColor = '#4488cc';
        } else {
            result = 'Tidak berubah';
            newColor = '#ff4444';
        }
    } else {
        if (ph < 6) {
            result = 'Biru → Merah';
            newColor = '#ff4444';
        } else {
            result = 'Tidak berubah';
            newColor = '#4488cc';
        }
    }

    const litmusPaper = litmus.querySelector('.lakmus-paper');
    litmusPaper.style.background = newColor;

    return result;

    if (selectedTarget) {
        selectedTarget.classList.remove('selected');
        selectedTarget = null;
    }
}