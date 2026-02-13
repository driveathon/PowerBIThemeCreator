/**
 * Power BI Advanced Theme Creator - Designed & Created by Adam Porter
 * Main Application Logic - V2 (Premium Redesign)
 */

// ============================================
// State Management
// ============================================
let undoStack = [];
let redoStack = [];
const MAX_STACK_SIZE = 50;

let libraryThemes = JSON.parse(localStorage.getItem('themeLibrary')) || [];

const themeState = {
    name: "My Custom Theme",
    dataColors: [
        "#118DFF", "#12239E", "#E66C37", "#6B007B",
        "#E044A7", "#744EC2", "#D9B300", "#D64550"
    ],
    background: "#FFFFFF",
    foreground: "#252423",
    tableAccent: "#118DFF",
    // Additional properties
    visualBackground: "#FFFFFF",
    visualBackgroundTransparency: 0,
    foregroundSecondary: "#605E5C",
    hyperlink: "#118DFF",
    good: "#107C10",
    neutral: "#D83B01",
    bad: "#E81123",
    // Typography
    fontFamily: "Segoe UI",
    fontFamilySecondary: "Segoe UI Light",
    titleFontSize: 12,
    titleColor: "#252423",
    headerFontSize: 12,
    headerColor: "#252423",
    calloutFontSize: 45,
    calloutColor: "#252423",
    // Visual Styles
    visualBorder: false,
    borderColor: "#E6E6E6",
    borderRadius: 0,
    dropShadow: false,
    shadowColor: "#000000",
    shadowPosition: "OuterBottom",
    // Tables
    gridColor: "#E6E6E6",
    gridWeight: 1,
    rowPadding: 3,
    alternateRowColor: "#F5F5F5",
    tableHeaderBackground: "#FFFFFF",
    tableHeaderColor: "#252423",
    tableHeaderFontSize: 9,
    // Cards
    cardCalloutFontSize: 45,
    cardCalloutColor: "#118DFF",
    cardCategoryFontSize: 12,
    cardCategoryColor: "#605E5C",
    // Slicers
    slicerHeaderFontSize: 10,
    slicerHeaderColor: "#000000",
    slicerItemFontSize: 10,
    slicerItemColor: "#555555",
    slicerSelectionColor: "#118DFF",
    slicerHoverColor: "#E0E0E0",
    // Premium Features
    glassMode: false,
    gradientTitles: false,
    themeType: 'standard', // New property
    lastUpdated: Date.now()
};

const presetPalettes = {
    default: ["#118DFF", "#12239E", "#E66C37", "#6B007B", "#E044A7", "#744EC2", "#D9B300", "#D64550"],
    professional: ["#2E4057", "#048A81", "#54C6EB", "#8EE3EF", "#F7A072", "#FFD166", "#06D6A0", "#118AB2"],
    vibrant: ["#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4", "#FFEAA7", "#DDA0DD", "#98D8C8", "#F7DC6F"],
    corporate: ["#003F5C", "#2F4B7C", "#665191", "#A05195", "#D45087", "#F95D6A", "#FF7C43", "#FFA600"],
    nature: ["#2D5016", "#4A7C23", "#8BC34A", "#CDDC39", "#795548", "#A1887F", "#4DB6AC", "#81C784"],
    sunset: ["#FF5E5B", "#FF9E4A", "#FFDC5E", "#A855F7", "#6366F1", "#EC4899", "#10B981", "#3B82F6"]
};

// ============================================
// DOM Elements
// ============================================
const elements = {
    // Navigation
    navItems: document.querySelectorAll('.nav-item'),
    sections: document.querySelectorAll('.section-content'),

    // General
    themeName: document.getElementById('themeName'),
    themeType: document.getElementById('themeType'),
    firstColor: document.getElementById('firstColor'),
    firstColorText: document.getElementById('firstColorText'),
    secondColor: document.getElementById('secondColor'),
    secondColorText: document.getElementById('secondColorText'),
    thirdColor: document.getElementById('thirdColor'),
    thirdColorText: document.getElementById('thirdColorText'),
    fourthColor: document.getElementById('fourthColor'),
    fourthColorText: document.getElementById('fourthColorText'),

    // Color Palette
    colorPalette: document.getElementById('colorPalette'),
    addColorBtn: document.getElementById('addColorBtn'),

    // Background
    pageBackground: document.getElementById('pageBackground'),
    pageBackgroundText: document.getElementById('pageBackgroundText'),
    visualBackground: document.getElementById('visualBackground'),
    visualBackgroundText: document.getElementById('visualBackgroundText'),
    visualBackgroundTransparency: document.getElementById('visualBackgroundTransparency'),
    visualBackgroundTransparencyValue: document.getElementById('visualBackgroundTransparencyValue'),
    tableAccent: document.getElementById('tableAccent'),
    tableAccentText: document.getElementById('tableAccentText'),

    // Foreground
    foreground: document.getElementById('foreground'),
    foregroundText: document.getElementById('foregroundText'),
    foregroundSecondary: document.getElementById('foregroundSecondary'),
    foregroundSecondaryText: document.getElementById('foregroundSecondaryText'),
    hyperlink: document.getElementById('hyperlink'),
    hyperlinkText: document.getElementById('hyperlinkText'),
    good: document.getElementById('good'),
    goodText: document.getElementById('goodText'),
    neutral: document.getElementById('neutral'),
    neutralText: document.getElementById('neutralText'),
    bad: document.getElementById('bad'),
    badText: document.getElementById('badText'),

    // Typography
    fontFamily: document.getElementById('fontFamily'),
    fontFamilySecondary: document.getElementById('fontFamilySecondary'),
    titleFontSize: document.getElementById('titleFontSize'),
    titleColor: document.getElementById('titleColor'),
    titleColorText: document.getElementById('titleColorText'),
    headerFontSize: document.getElementById('headerFontSize'),
    headerColor: document.getElementById('headerColor'),
    headerColorText: document.getElementById('headerColorText'),
    calloutFontSize: document.getElementById('calloutFontSize'),
    calloutColor: document.getElementById('calloutColor'),
    calloutColorText: document.getElementById('calloutColorText'),

    gradientPreview: document.getElementById('gradientPreview'),

    // Visual Styles
    visualBorder: document.getElementById('visualBorder'),
    borderColor: document.getElementById('borderColor'),
    borderColorText: document.getElementById('borderColorText'),
    borderRadius: document.getElementById('borderRadius'),
    dropShadow: document.getElementById('dropShadow'),
    shadowColor: document.getElementById('shadowColor'),
    shadowColorText: document.getElementById('shadowColorText'),
    shadowPosition: document.getElementById('shadowPosition'),

    // Color Harmony
    seedColor: document.getElementById('seedColor'),
    seedColorText: document.getElementById('seedColorText'),
    harmonyRule: document.getElementById('harmonyRule'),
    generateHarmonyBtn: document.getElementById('generateHarmonyBtn'),

    // Tables
    gridColor: document.getElementById('gridColor'),
    gridColorText: document.getElementById('gridColorText'),
    gridWeight: document.getElementById('gridWeight'),
    rowPadding: document.getElementById('rowPadding'),
    alternateRowColor: document.getElementById('alternateRowColor'),
    alternateRowColorText: document.getElementById('alternateRowColorText'),
    tableHeaderBackground: document.getElementById('tableHeaderBackground'),
    tableHeaderBackgroundText: document.getElementById('tableHeaderBackgroundText'),
    tableHeaderColor: document.getElementById('tableHeaderColor'),
    tableHeaderColorText: document.getElementById('tableHeaderColorText'),
    tableHeaderFontSize: document.getElementById('tableHeaderFontSize'),

    // Cards
    cardCalloutFontSize: document.getElementById('cardCalloutFontSize'),
    cardCalloutColor: document.getElementById('cardCalloutColor'),
    cardCalloutColorText: document.getElementById('cardCalloutColorText'),
    cardCategoryFontSize: document.getElementById('cardCategoryFontSize'),
    cardCategoryColor: document.getElementById('cardCategoryColor'),
    cardCategoryColorText: document.getElementById('cardCategoryColorText'),

    // Slicers
    slicerHeaderFontSize: document.getElementById('slicerHeaderFontSize'),
    slicerHeaderColor: document.getElementById('slicerHeaderColor'),
    slicerHeaderColorText: document.getElementById('slicerHeaderColorText'),
    slicerItemFontSize: document.getElementById('slicerItemFontSize'),
    slicerItemColor: document.getElementById('slicerItemColor'),
    slicerItemColorText: document.getElementById('slicerItemColorText'),
    slicerSelectionColor: document.getElementById('slicerSelectionColor'),
    slicerSelectionColorText: document.getElementById('slicerSelectionColorText'),
    slicerHoverColor: document.getElementById('slicerHoverColor'),
    slicerHoverColorText: document.getElementById('slicerHoverColorText'),

    visionSimulator: document.getElementById('visionSimulator'),
    reportScenario: document.getElementById('reportScenario'),

    // Preview
    previewTabs: document.querySelectorAll('.preview-tab'),
    visualPreview: document.getElementById('visualPreview'),
    jsonPreview: document.getElementById('jsonPreview'),
    jsonOutput: document.getElementById('jsonOutput'),
    previewCanvas: document.querySelector('.preview-canvas'),
    previewReport: document.querySelector('.preview-report'),

    // Actions
    importBtn: document.getElementById('importBtn'),
    exportBtn: document.getElementById('exportBtn'),
    shareBtn: document.getElementById('shareBtn'),
    copyJsonBtn: document.getElementById('copyJsonBtn'),
    randomizeBtn: document.getElementById('randomizeBtn'),
    themesBtn: document.getElementById('themesBtn'),
    sayThanksBtn: document.getElementById('sayThanksBtn'),
    feedbackBtn: document.getElementById('feedbackBtn'),
    undoBtn: document.getElementById('undoBtn'),
    redoBtn: document.getElementById('redoBtn'),
    resetBtn: document.getElementById('resetBtn'),
    mobilePreviewToggle: document.getElementById('mobilePreviewToggle'),
    libraryBtn: document.getElementById('libraryBtn'),
    libraryModal: document.getElementById('libraryModal'),
    closeLibraryModal: document.getElementById('closeLibraryModal'),
    saveCurrentToLibraryBtn: document.getElementById('saveCurrentToLibraryBtn'),
    libraryGrid: document.getElementById('libraryGrid'),
    importValidationResults: document.getElementById('importValidationResults'),

    // Modal
    importModal: document.getElementById('importModal'),
    themesModal: document.getElementById('themesModal'),
    closeThemesModal: document.getElementById('closeThemesModal'),
    popularThemesGrid: document.getElementById('popularThemesGrid'),

    // Layouts
    previewReport: document.getElementById('previewReport'),

    // Premium Effects
    glassMode: document.getElementById('glassMode'),
    gradientTitles: document.getElementById('gradientTitles'),

    // Accessibility
    a11yScore: document.getElementById('a11yScore'),
    a11yResults: document.getElementById('a11yResults'),
    autoFixBtn: document.getElementById('autoFixBtn'),

    closeImportModal: document.getElementById('closeImportModal'),
    cancelImport: document.getElementById('cancelImport'),
    confirmImport: document.getElementById('confirmImport'),
    importTextarea: document.getElementById('importTextarea'),

    // Toast
    toast: document.getElementById('toast')
};

// ============================================
// Initialization
// ============================================
function init() {
    loadPersistence();
    renderColorPalette();
    renderReportScenario('executive');
    renderPopularThemes();
    renderLibraryGrid();
    setupEventListeners();
    updatePreview();
}

// ============================================
// Event Listeners
// ============================================
function setupEventListeners() {
    // Unified Highlighting System (Marry Settings to Preview)
    const sectionToPreviewMap = {
        'section-general': { target: '.preview-canvas', pulse: false },
        'section-colors': { target: '.chart-svg path, .chart-svg rect', pulse: true },
        'section-background': { target: '.preview-report', pulse: false },
        'section-foreground': { target: '.preview-report', pulse: false },
        'section-typography': { target: '.preview-visual-title, .preview-card-label', pulse: false },
        'section-visuals': { target: '.preview-visual', pulse: true },
        'section-tables': { target: '.preview-table', pulse: true, forceScenario: 'inventory' },
        'section-cards': { target: '.preview-card', pulse: true, forceScenario: 'executive' },
        'section-slicers': { target: '.preview-slicer', pulse: true, forceScenario: 'sales' }
    };

    document.querySelectorAll('.section-content').forEach(section => {
        section.addEventListener('mouseenter', () => {
            const map = sectionToPreviewMap[section.id];
            if (map) {
                // Feature: Context Aware Layout - Auto-switch scenario
                if (map.forceScenario && elements.reportScenario.value !== map.forceScenario) {
                    elements.reportScenario.value = map.forceScenario;
                    renderReportScenario(map.forceScenario);
                    updateVisualPreview(); // Ensure new scenario is correctly themed
                }

                document.querySelectorAll(map.target).forEach(el => {
                    el.classList.add('highlight-active');
                    if (map.pulse) el.classList.add('highlight-pulse');
                });
            }
        });

        section.addEventListener('mouseleave', () => {
            document.querySelectorAll('.highlight-active, .highlight-pulse').forEach(el => {
                el.classList.remove('highlight-active', 'highlight-pulse');
            });
        });
    });

    // Navigation item sync (original logic preserved but integrated)
    elements.navItems.forEach(item => {
        item.addEventListener('click', () => switchSection(item.dataset.section));
    });


    // Preview tabs
    elements.previewTabs.forEach(tab => {
        tab.addEventListener('click', () => switchPreviewTab(tab.dataset.preview));
    });

    // General inputs
    elements.themeName.addEventListener('input', (e) => {
        saveState();
        themeState.name = e.target.value;
        updatePreview();
    });

    elements.themeType.addEventListener('change', (e) => {
        saveState();
        themeState.themeType = e.target.value;
        updatePreview();
    });

    // Color pickers with text sync
    setupColorPicker('firstColor', (color) => {
        saveState();
        themeState.dataColors[0] = color;
        renderColorPalette();
        updatePreview();
    });

    setupColorPicker('secondColor', (color) => {
        saveState();
        themeState.dataColors[1] = color;
        renderColorPalette();
        updatePreview();
    });

    setupColorPicker('thirdColor', (color) => {
        saveState();
        themeState.dataColors[2] = color;
        renderColorPalette();
        updatePreview();
    });

    setupColorPicker('fourthColor', (color) => {
        saveState();
        themeState.dataColors[3] = color;
        renderColorPalette();
        updatePreview();
    });

    // Background colors
    setupColorPicker('pageBackground', (color) => {
        saveState();
        themeState.background = color;
        updatePreview();
    });

    setupColorPicker('visualBackground', (color) => {
        saveState();
        themeState.visualBackground = color;
        updatePreview();
    });

    elements.visualBackgroundTransparency.addEventListener('input', (e) => {
        saveState(); // Consider debouncing this if it's too much for range sliders
        themeState.visualBackgroundTransparency = parseInt(e.target.value);
        elements.visualBackgroundTransparencyValue.textContent = e.target.value + '%';
        updatePreview();
    });

    setupColorPicker('tableAccent', (color) => {
        saveState();
        themeState.tableAccent = color;
        updatePreview();
    });

    // Foreground colors
    setupColorPicker('foreground', (color) => {
        saveState();
        themeState.foreground = color;
        updatePreview();
    });

    setupColorPicker('foregroundSecondary', (color) => {
        themeState.foregroundSecondary = color;
        updatePreview();
    });

    setupColorPicker('hyperlink', (color) => {
        themeState.hyperlink = color;
        updatePreview();
    });

    setupColorPicker('good', (color) => {
        themeState.good = color;
        updatePreview();
    });

    setupColorPicker('neutral', (color) => {
        themeState.neutral = color;
        updatePreview();
    });

    setupColorPicker('bad', (color) => {
        themeState.bad = color;
        updatePreview();
    });

    // Typography
    elements.fontFamily.addEventListener('change', (e) => {
        saveState();
        themeState.fontFamily = e.target.value;
        updatePreview();
    });

    elements.fontFamilySecondary.addEventListener('change', (e) => {
        saveState();
        themeState.fontFamilySecondary = e.target.value;
        updatePreview();
    });

    elements.titleFontSize.addEventListener('input', (e) => {
        saveState();
        themeState.titleFontSize = parseInt(e.target.value);
        updatePreview();
    });

    setupColorPicker('titleColor', (color) => {
        saveState();
        themeState.titleColor = color;
        updatePreview();
    });

    elements.headerFontSize.addEventListener('input', (e) => {
        saveState();
        themeState.headerFontSize = parseInt(e.target.value);
        updatePreview();
    });

    setupColorPicker('headerColor', (color) => {
        saveState();
        themeState.headerColor = color;
        updatePreview();
    });

    elements.calloutFontSize.addEventListener('input', (e) => {
        saveState();
        themeState.calloutFontSize = parseInt(e.target.value);
        updatePreview();
    });

    setupColorPicker('calloutColor', (color) => {
        saveState();
        themeState.calloutColor = color;
        updatePreview();
    });

    // Gradient Designer
    setupColorPicker('bad', (color) => {
        themeState.bad = color;
        updateGradientPreview();
    });

    setupColorPicker('neutral', (color) => {
        themeState.neutral = color;
        updateGradientPreview();
    });

    setupColorPicker('good', (color) => {
        themeState.good = color;
        updateGradientPreview();
    });

    // Visual styles
    elements.visualBorder.addEventListener('change', (e) => {
        saveState();
        themeState.visualBorder = e.target.checked;
        updatePreview();
    });

    setupColorPicker('borderColor', (color) => {
        saveState();
        themeState.borderColor = color;
        updatePreview();
    });

    elements.borderRadius.addEventListener('input', (e) => {
        saveState();
        themeState.borderRadius = parseInt(e.target.value);
        updatePreview();
    });

    elements.dropShadow.addEventListener('change', (e) => {
        saveState();
        themeState.dropShadow = e.target.checked;
        updatePreview();
    });

    setupColorPicker('shadowColor', (color) => {
        saveState();
        themeState.shadowColor = color;
        updatePreview();
    });

    elements.shadowPosition.addEventListener('change', (e) => {
        saveState();
        themeState.shadowPosition = e.target.value;
        updatePreview();
    });

    // Tables
    setupColorPicker('gridColor', (color) => {
        saveState();
        themeState.gridColor = color;
        updatePreview();
    });

    elements.gridWeight.addEventListener('input', (e) => {
        saveState();
        themeState.gridWeight = parseInt(e.target.value);
        updatePreview();
    });

    elements.rowPadding.addEventListener('input', (e) => {
        saveState();
        themeState.rowPadding = parseInt(e.target.value);
        updatePreview();
    });

    setupColorPicker('alternateRowColor', (color) => {
        saveState();
        themeState.alternateRowColor = color;
        updatePreview();
    });

    setupColorPicker('tableHeaderBackground', (color) => {
        saveState();
        themeState.tableHeaderBackground = color;
        updatePreview();
    });

    setupColorPicker('tableHeaderColor', (color) => {
        saveState();
        themeState.tableHeaderColor = color;
        updatePreview();
    });

    elements.tableHeaderFontSize.addEventListener('input', (e) => {
        saveState();
        themeState.tableHeaderFontSize = parseInt(e.target.value);
        updatePreview();
    });

    // Cards
    elements.cardCalloutFontSize.addEventListener('input', (e) => {
        saveState();
        themeState.cardCalloutFontSize = parseInt(e.target.value);
        updatePreview();
    });

    setupColorPicker('cardCalloutColor', (color) => {
        saveState();
        themeState.cardCalloutColor = color;
        updatePreview();
    });

    elements.cardCategoryFontSize.addEventListener('input', (e) => {
        saveState();
        themeState.cardCategoryFontSize = parseInt(e.target.value);
        updatePreview();
    });

    setupColorPicker('cardCategoryColor', (color) => {
        saveState();
        themeState.cardCategoryColor = color;
        updatePreview();
    });

    // Slicers
    elements.slicerHeaderFontSize.addEventListener('input', (e) => {
        saveState();
        themeState.slicerHeaderFontSize = parseInt(e.target.value);
        updatePreview();
    });

    setupColorPicker('slicerHeaderColor', (color) => {
        saveState();
        themeState.slicerHeaderColor = color;
        updatePreview();
    });

    elements.slicerItemFontSize.addEventListener('input', (e) => {
        saveState();
        themeState.slicerItemFontSize = parseInt(e.target.value);
        updatePreview();
    });

    setupColorPicker('slicerItemColor', (color) => {
        saveState();
        themeState.slicerItemColor = color;
        updatePreview();
    });

    setupColorPicker('slicerSelectionColor', (color) => {
        saveState();
        themeState.slicerSelectionColor = color;
        updatePreview();
    });

    setupColorPicker('slicerHoverColor', (color) => {
        saveState();
        themeState.slicerHoverColor = color;
        updatePreview();
    });

    // Add color button
    elements.addColorBtn.addEventListener('click', () => {
        if (themeState.dataColors.length < 16) {
            saveState();
            themeState.dataColors.push(generateRandomColor());
            renderColorPalette();
            updatePreview();
        } else {
            showToast('Maximum 16 colors allowed', 'error');
        }
    });

    // Preset palettes
    document.querySelectorAll('.preset-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const preset = btn.dataset.preset;
            if (presetPalettes[preset]) {
                saveState();
                themeState.dataColors = [...presetPalettes[preset]];
                renderColorPalette();
                syncGeneralColors();
                updatePreview();
                showToast(`Applied ${preset} palette`, 'success');
            }
        });
    });

    // Actions
    elements.importBtn.addEventListener('click', () => {
        elements.importModal.classList.add('show');
    });

    elements.closeImportModal.addEventListener('click', () => {
        elements.importModal.classList.remove('show');
    });

    elements.cancelImport.addEventListener('click', () => {
        elements.importModal.classList.remove('show');
    });

    elements.confirmImport.addEventListener('click', importTheme);

    // Color Harmony
    setupColorPicker('seedColor', (color) => {
        // Just syncs text, generation happens on click
    });

    elements.generateHarmonyBtn.addEventListener('click', generateHarmony);

    elements.exportBtn.addEventListener('click', exportTheme);

    elements.shareBtn.addEventListener('click', shareTheme);

    elements.copyJsonBtn.addEventListener('click', () => {
        const json = elements.jsonOutput.textContent;
        navigator.clipboard.writeText(json).then(() => {
            showToast('JSON copied to clipboard!', 'success');
        });
    });

    elements.randomizeBtn.addEventListener('click', randomizeTheme);

    elements.visionSimulator.addEventListener('change', (e) => {
        const type = e.target.value;
        const preview = document.querySelector('.preview-report');
        if (type === 'none') {
            preview.style.filter = 'none';
        } else {
            preview.style.filter = `url(#${type})`;
        }
    });

    elements.reportScenario.addEventListener('change', (e) => {
        renderReportScenario(e.target.value);
        updateVisualPreview();
    });

    elements.mobilePreviewToggle.addEventListener('click', () => {
        const canvas = elements.previewCanvas;
        canvas.classList.toggle('mobile-mode');
        elements.mobilePreviewToggle.classList.toggle('active');

        const isMobile = canvas.classList.contains('mobile-mode');
        showToast(isMobile ? 'Mobile Preview Active' : 'Desktop Preview Active', 'success');
    });

    elements.themesBtn.addEventListener('click', () => {
        renderPopularThemes();
        elements.themesModal.classList.add('show');
    });

    elements.closeThemesModal.addEventListener('click', () => {
        elements.themesModal.classList.remove('show');
    });

    elements.libraryBtn.addEventListener('click', () => {
        renderLibraryGrid();
        elements.libraryModal.classList.add('show');
    });

    elements.closeLibraryModal.addEventListener('click', () => {
        elements.libraryModal.classList.remove('show');
    });

    elements.saveCurrentToLibraryBtn.addEventListener('click', saveThemeToLibrary);

    elements.sayThanksBtn.addEventListener('click', () => {
        const email = "Adam.Porter@lloydsbanking.com";
        const subject = encodeURIComponent("Thanks for the Power BI Theme Creator!");
        const body = encodeURIComponent("Hi Adam,\n\nI really like the Power BI Theme Creator you built! It's super helpful.\n\nKeep up the great work!");
        window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
        showToast('Opening your email client...', 'success');
    });

    elements.feedbackBtn.addEventListener('click', () => {
        const email = "Adam.Porter@lloydsbanking.com";
        const subject = encodeURIComponent("Feedback: Power BI Theme Creator");
        const body = encodeURIComponent("Hi Adam,\n\nHere is some feedback for the Theme Creator:\n\n[Your feedback here]");
        window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
        showToast('Opening your email client...', 'success');
    });

    elements.gradientTitles.addEventListener('change', (e) => {
        saveState();
        themeState.gradientTitles = e.target.checked;
        updatePreview();
    });

    elements.glassMode.addEventListener('change', (e) => {
        saveState();
        themeState.glassMode = e.target.checked;
        updatePreview();
    });

    elements.resetBtn.addEventListener('click', resetTheme);
    elements.autoFixBtn.addEventListener('click', autoFixColors);

    elements.undoBtn.addEventListener('click', undo);
    elements.redoBtn.addEventListener('click', redo);

    // Keyboard Shortcuts
    window.addEventListener('keydown', (e) => {
        if (e.ctrlKey || e.metaKey) {
            if (e.key === 'z') {
                e.preventDefault();
                undo();
            } else if (e.key === 'y' || (e.shiftKey && e.key === 'Z')) {
                e.preventDefault();
                redo();
            }
        }
    });

    // Magic Theme Generator
    const logoUpload = document.getElementById('logoUpload');
    if (logoUpload) {
        logoUpload.addEventListener('change', handleLogoUpload);
    }
}

// ============================================
// Color Picker Helper
// ============================================
function setupColorPicker(id, callback) {
    const colorInput = document.getElementById(id);
    const textInput = document.getElementById(id + 'Text');

    if (!colorInput || !textInput) return;

    colorInput.addEventListener('input', (e) => {
        textInput.value = e.target.value.toUpperCase();
        callback(e.target.value);
    });

    textInput.addEventListener('input', (e) => {
        let value = e.target.value;
        if (!value.startsWith('#')) value = '#' + value;
        if (/^#[0-9A-Fa-f]{6}$/.test(value)) {
            colorInput.value = value;
            callback(value);
        }
    });
}

// ============================================
// Navigation
// ============================================
function switchSection(sectionId) {
    elements.navItems.forEach(item => {
        item.classList.toggle('active', item.dataset.section === sectionId);
    });

    elements.sections.forEach(section => {
        section.classList.toggle('active', section.id === `section-${sectionId}`);
    });
}

function switchPreviewTab(tab) {
    elements.previewTabs.forEach(t => {
        t.classList.toggle('active', t.dataset.preview === tab);
    });

    elements.visualPreview.classList.toggle('hidden', tab !== 'visual');
    elements.jsonPreview.classList.toggle('hidden', tab !== 'json');

    if (tab === 'json') {
        updateJsonPreview();
    }
}

// ============================================
// Color Palette
// ============================================
function renderColorPalette() {
    elements.colorPalette.innerHTML = '';

    themeState.dataColors.forEach((color, index) => {
        const chip = document.createElement('div');
        chip.className = 'color-chip';
        chip.style.backgroundColor = color;

        // Number label
        const numberLabel = document.createElement('span');
        numberLabel.className = 'color-index';
        numberLabel.textContent = index + 1;
        chip.appendChild(numberLabel);

        const colorInput = document.createElement('input');
        colorInput.type = 'color';
        colorInput.value = color;
        colorInput.addEventListener('input', (e) => {
            themeState.dataColors[index] = e.target.value;
            chip.style.backgroundColor = e.target.value;
            syncGeneralColors();
            updatePreview();
        });

        const removeBtn = document.createElement('button');
        removeBtn.className = 'remove-color';
        removeBtn.innerHTML = '×';
        removeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (themeState.dataColors.length > 1) {
                themeState.dataColors.splice(index, 1);
                renderColorPalette();
                syncGeneralColors();
                updatePreview();
            }
        });

        chip.appendChild(colorInput);
        chip.appendChild(removeBtn);
        elements.colorPalette.appendChild(chip);
    });
}

function syncGeneralColors() {
    // Sync first 4 colors to general section
    if (themeState.dataColors[0]) {
        elements.firstColor.value = themeState.dataColors[0];
        elements.firstColorText.value = themeState.dataColors[0].toUpperCase();
    }
    if (themeState.dataColors[1]) {
        elements.secondColor.value = themeState.dataColors[1];
        elements.secondColorText.value = themeState.dataColors[1].toUpperCase();
    }
    if (themeState.dataColors[2]) {
        elements.thirdColor.value = themeState.dataColors[2];
        elements.thirdColorText.value = themeState.dataColors[2].toUpperCase();
    }
    if (themeState.dataColors[3]) {
        elements.fourthColor.value = themeState.dataColors[3];
        elements.fourthColorText.value = themeState.dataColors[3].toUpperCase();
    }
}

function updateGradientPreview() {
    elements.gradientPreview.style.background = `linear-gradient(to right, ${themeState.bad}, ${themeState.neutral}, ${themeState.good})`;
}

function generateRandomColor() {
    return '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
}

// ============================================
// Preview
// ============================================
function updatePreview() {
    updateVisualPreview();
    runA11yAudit();
    savePersistence(); // Save every time we update
    if (!elements.jsonPreview.classList.contains('hidden')) {
        updateJsonPreview();
    }
}

function updateVisualPreview() {
    const previewReport = elements.previewReport;
    if (!previewReport) return;

    // 1. Apply Theme Mode Classes (Standard/Dark/High Contrast)
    previewReport.classList.remove('theme-standard', 'theme-dark', 'theme-high-contrast');
    previewReport.classList.add(`theme-${(themeState.themeType || 'standard').replace(' ', '-')}`);

    // 2. Map State to CSS Variables (Isolated Scope)
    const vars = {
        '--pbi-bg': themeState.background,
        '--pbi-text': themeState.foreground,
        '--pbi-visual-bg': themeState.visualBackground,
        '--pbi-border-color': themeState.borderColor,
        '--pbi-border-radius': themeState.borderRadius + 'px',
        '--pbi-font-family': themeState.fontFamily,
        '--pbi-primary': themeState.dataColors[0],
        '--pbi-secondary': themeState.dataColors[1],
        '--pbi-accent': themeState.tableAccent,
        '--pbi-card-val-color': themeState.cardCalloutColor,
        '--pbi-card-val-size': themeState.cardCalloutFontSize + 'pt',
        '--pbi-card-cat-color': themeState.cardCategoryColor,
        '--pbi-card-cat-size': themeState.cardCategoryFontSize + 'pt',
        '--pbi-grid-color': themeState.gridColor,
        '--pbi-row-padding': themeState.rowPadding + 'px',
        '--pbi-alt-row': themeState.alternateRowColor,
        '--pbi-table-header-bg': themeState.tableHeaderBackground,
        '--pbi-table-header-color': themeState.tableHeaderColor,
        '--pbi-table-header-size': themeState.tableHeaderFontSize + 'pt',
        '--pbi-title-color': themeState.titleColor,
        '--pbi-title-size': themeState.titleFontSize + 'pt',
        '--pbi-slicer-header-size': themeState.slicerHeaderFontSize + 'pt',
        '--pbi-slicer-header-color': themeState.slicerHeaderColor,
        '--pbi-slicer-item-size': themeState.slicerItemFontSize + 'pt',
        '--pbi-slicer-item-color': themeState.slicerItemColor,
        '--pbi-slicer-selected': themeState.slicerSelectionColor,
        '--pbi-success': themeState.good,
        '--pbi-warning': themeState.neutral,
        '--pbi-danger': themeState.bad
    };

    // Apply data colors as sequential variables
    themeState.dataColors.forEach((color, i) => {
        vars[`--pbi-data-${i}`] = color;
    });

    Object.entries(vars).forEach(([key, val]) => {
        previewReport.style.setProperty(key, val);
    });

    // 3. Premium Effects
    previewReport.classList.toggle('glass-mode', themeState.glassMode);
    previewReport.classList.toggle('gradient-titles', themeState.gradientTitles);
    previewReport.style.backgroundColor = themeState.background; // Forced override

    // 4. Update SVG fills dynamically if they exist
    previewReport.querySelectorAll('.chart-svg').forEach(svg => {
        svg.querySelectorAll('path[data-series], rect[data-series]').forEach(el => {
            const index = parseInt(el.getAttribute('data-series')) || 0;
            const color = themeState.dataColors[index % themeState.dataColors.length];
            el.setAttribute('fill', color);
            el.setAttribute('stroke', color);
        });
    });
}

function updateJsonPreview() {
    elements.jsonOutput.textContent = generateThemeJson();
}

// ============================================
// Theme JSON Generation
// ============================================
function generateThemeJson() {
    const theme = {
        name: themeState.name,
        dataColors: themeState.dataColors,
        background: themeState.background,
        foreground: themeState.foreground,
        tableAccent: themeState.tableAccent,
        visualStyles: {
            "*": {
                "*": {
                    "background": [{
                        "show": true,
                        "color": { "solid": { "color": themeState.visualBackground } },
                        "transparency": themeState.visualBackgroundTransparency
                    }],
                    "border": [{
                        "show": themeState.visualBorder,
                        "color": { "solid": { "color": themeState.borderColor } },
                        "radius": themeState.borderRadius
                    }],
                    "dropShadow": [{
                        "show": themeState.dropShadow,
                        "color": { "solid": { "color": themeState.shadowColor } },
                        "position": themeState.shadowPosition
                    }]
                }
            },
            "tableEx": {
                "*": {
                    "grid": [{
                        "outlineColor": { "solid": { "color": themeState.gridColor } },
                        "gridVertical": true,
                        "gridHorizontal": true
                    }],
                    "columnHeaders": [{
                        "fontColor": { "solid": { "color": themeState.tableHeaderColor } },
                        "backColor": { "solid": { "color": themeState.tableHeaderBackground } },
                        "fontSize": themeState.tableHeaderFontSize
                    }],
                    "values": [{
                        "backColorSecondary": { "solid": { "color": themeState.alternateRowColor } }
                    }]
                }
            },
            "card": {
                "*": {
                    "labels": [{
                        "color": { "solid": { "color": themeState.cardCalloutColor } },
                        "fontSize": themeState.cardCalloutFontSize
                    }],
                    "categoryLabels": [{
                        "color": { "solid": { "color": themeState.cardCategoryColor } },
                        "fontSize": themeState.cardCategoryFontSize
                    }]
                }
            }
        }
    };

    return JSON.stringify(theme, null, 4);
}

// ============================================
// Import/Export
// ============================================
function importTheme() {
    const resultsArea = elements.importValidationResults;
    resultsArea.classList.add('hidden');
    resultsArea.innerHTML = '';

    try {
        const json = elements.importTextarea.value.trim();
        if (!json) throw new Error('JSON is empty');

        const theme = JSON.parse(json);
        const issues = validateTheme(theme);

        if (issues.errors.length > 0) {
            renderValidationResults(issues, true);
            return; // Don't proceed if there are errors
        }

        if (issues.warnings.length > 0) {
            renderValidationResults(issues, false);
            // We can proceed with warnings if needed, but let's just show them
        }

        saveState();

        if (theme.name) themeState.name = theme.name;
        if (theme.dataColors) themeState.dataColors = theme.dataColors;
        if (theme.background) themeState.background = theme.background;
        if (theme.foreground) themeState.foreground = theme.foreground;
        if (theme.tableAccent) themeState.tableAccent = theme.tableAccent;

        // Partial styles extraction can be added here

        updateAllInputs();
        renderColorPalette();
        updatePreview();
        elements.importModal.classList.remove('show');
        showToast('Theme imported successfully!', 'success');
    } catch (e) {
        showToast('Invalid JSON format', 'error');
    }
}

function exportTheme() {
    const json = generateThemeJson();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${themeState.name.replace(/\s+/g, '_')}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast('Theme exported!', 'success');
}

function resetTheme() {
    if (confirm('Are you sure you want to reset all changes?')) {
        saveState();
        Object.assign(themeState, {
            name: "My Custom Theme",
            dataColors: ["#118DFF", "#12239E", "#E66C37", "#6B007B", "#E044A7", "#744EC2", "#D9B300", "#D64550"],
            background: "#FFFFFF",
            foreground: "#252423",
            tableAccent: "#118DFF",
            visualBackground: "#FFFFFF",
            visualBackgroundTransparency: 0,
            fontFamily: "Segoe UI",
            // ... reset others ...
        });
        updateAllInputs();
        renderColorPalette();
        updatePreview();
        showToast('Theme reset to default', 'success');
    }
}

function randomizeTheme() {
    saveState();
    themeState.dataColors = Array.from({ length: 8 }, () => generateRandomColor());
    themeState.background = Math.random() > 0.5 ? "#FFFFFF" : "#0F0F23";
    themeState.foreground = themeState.background === "#FFFFFF" ? "#252423" : "#FFFFFF";
    themeState.visualBackground = themeState.background === "#FFFFFF" ? "#FAFAFA" : "#1A1A2E";

    updateAllInputs();
    renderColorPalette();
    updatePreview();
    showToast('Random theme generated!', 'success');
}

function generateHarmony() {
    saveState();
    const seed = elements.seedColor.value;
    const rule = elements.harmonyRule.value;
    const hsl = hexToHsl(seed);
    let colors = [];

    switch (rule) {
        case 'analogous':
            colors = [
                hslToHex((hsl.h + 330) % 360, hsl.s, hsl.l),
                hslToHex((hsl.h + 345) % 360, hsl.s, hsl.l),
                seed,
                hslToHex((hsl.h + 15) % 360, hsl.s, hsl.l),
                hslToHex((hsl.h + 30) % 360, hsl.s, hsl.l)
            ];
            break;
        case 'monochromatic':
            colors = [
                hslToHex(hsl.h, hsl.s, Math.max(10, hsl.l - 30)),
                hslToHex(hsl.h, hsl.s, Math.max(20, hsl.l - 15)),
                seed,
                hslToHex(hsl.h, hsl.s, Math.min(90, hsl.l + 15)),
                hslToHex(hsl.h, hsl.s, Math.min(100, hsl.l + 30))
            ];
            break;
        case 'triad':
            colors = [
                seed,
                hslToHex((hsl.h + 120) % 360, hsl.s, hsl.l),
                hslToHex((hsl.h + 240) % 360, hsl.s, hsl.l)
            ];
            break;
        case 'complementary':
            colors = [
                seed,
                hslToHex((hsl.h + 180) % 360, hsl.s, hsl.l)
            ];
            break;
    }

    themeState.dataColors = colors;
    renderColorPalette();
    updatePreview();
    showToast(`Generated ${rule} harmony`, 'success');
}

// --------------------------------------------
// Color Conversion Helpers
// --------------------------------------------
function hexToHsl(hex) {
    let r = parseInt(hex.slice(1, 3), 16) / 255;
    let g = parseInt(hex.slice(3, 5), 16) / 255;
    let b = parseInt(hex.slice(5, 7), 16) / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max === min) {
        h = s = 0;
    } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }
    return { h: h * 360, s: s * 100, l: l * 100 };
}

function hslToHex(h, s, l) {
    l /= 100;
    const a = s * Math.min(l, 1 - l) / 100;
    const f = n => {
        const k = (n + h / 30) % 12;
        const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
        return Math.round(255 * color).toString(16).padStart(2, '0');
    };
    return `#${f(0)}${f(8)}${f(4)}`.toUpperCase();
}

function updateAllInputs() {
    elements.themeName.value = themeState.name;
    elements.pageBackground.value = themeState.background;
    elements.pageBackgroundText.value = themeState.background.toUpperCase();
    elements.visualBackground.value = themeState.visualBackground;
    elements.visualBackgroundText.value = themeState.visualBackground.toUpperCase();
    elements.visualBackgroundTransparency.value = themeState.visualBackgroundTransparency;
    elements.visualBackgroundTransparencyValue.textContent = themeState.visualBackgroundTransparency + '%';
    elements.tableAccent.value = themeState.tableAccent;
    elements.tableAccentText.value = themeState.tableAccent.toUpperCase();
    elements.foreground.value = themeState.foreground;
    elements.foregroundText.value = themeState.foreground.toUpperCase();
    elements.foregroundSecondary.value = themeState.foregroundSecondary;
    elements.foregroundSecondaryText.value = themeState.foregroundSecondary.toUpperCase();
    elements.hyperlink.value = themeState.hyperlink;
    elements.hyperlinkText.value = themeState.hyperlink.toUpperCase();
    elements.good.value = themeState.good;
    elements.goodText.value = themeState.good.toUpperCase();
    elements.neutral.value = themeState.neutral;
    elements.neutralText.value = themeState.neutral.toUpperCase();
    elements.bad.value = themeState.bad;
    elements.badText.value = themeState.bad.toUpperCase();
    elements.fontFamily.value = themeState.fontFamily;
    elements.fontFamilySecondary.value = themeState.fontFamilySecondary;
    elements.themeType.value = themeState.themeType || 'standard';

    syncGeneralColors();
}

// ============================================
// Toast Notification
// ============================================
function showToast(message, type = 'success') {
    const toast = elements.toast;
    if (!toast) return;
    toast.querySelector('.toast-message').textContent = message;
    toast.className = `toast ${type} show`;

    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// ============================================
// Popular Themes
// ============================================
const popularThemes = [
    {
        name: "Midnight Executive",
        tag: "Dark Professional",
        dataColors: ["#118DFF", "#12239E", "#E66C37", "#6B007B", "#E044A7", "#744EC2", "#D9B300", "#D64550"],
        background: "#0F0F23",
        foreground: "#FFFFFF",
        visualBackground: "#1A1A2E",
        visualBorder: true,
        borderColor: "#2E2E45",
        borderRadius: 8,
        fontFamily: "Segoe UI"
    },
    {
        name: "Eco Forest",
        tag: "Nature & Growth",
        dataColors: ["#2D6A4F", "#40916C", "#52B788", "#74C69D", "#95D5B2", "#D8F3DC", "#1B4332", "#081C15"],
        background: "#F0FFF4",
        foreground: "#1B4332",
        visualBackground: "#FFFFFF",
        visualBorder: true,
        borderColor: "#95D5B2",
        borderRadius: 6,
        fontFamily: "Trebuchet MS"
    },
    {
        name: "Solaris Professional",
        tag: "Modern Corporate",
        dataColors: ["#FFB900", "#D83B01", "#B50E0E", "#E81123", "#B4009E", "#5C2D91", "#0078D4", "#00BCF2"],
        background: "#FFFFFF",
        foreground: "#252423",
        visualBackground: "#F8F8F8",
        visualBorder: false,
        fontFamily: "Segoe UI Semibold",
        themeType: "dark"
    },
    {
        name: "Cyberpunk Neon",
        tag: "High Energy",
        dataColors: ["#FF00FF", "#00FFFF", "#FFFF00", "#00FF00", "#FF0000", "#7F00FF", "#FF7F00", "#007FFF"],
        background: "#000000",
        foreground: "#00FFFF",
        visualBackground: "#050505",
        visualBorder: true,
        borderColor: "#FF00FF",
        borderRadius: 0,
        fontFamily: "Courier New",
        themeType: "dark"
    },
    {
        name: "Soft Pastel",
        tag: "Gentle & Clean",
        dataColors: ["#FFADAD", "#FFD6A5", "#FDFFB6", "#CAFFBF", "#9BF6FF", "#A0C4FF", "#BDB2FF", "#FFC6FF"],
        background: "#FFFFFF",
        foreground: "#4A4A4A",
        visualBackground: "#FAFAFA",
        visualBorder: false,
        fontFamily: "Outfit"
    },
    {
        name: "Ocean Breeze",
        tag: "Cool & Calm",
        dataColors: ["#00B4D8", "#0077B6", "#03045E", "#90E0EF", "#CAF0F8", "#48CAE4", "#0096C7", "#023E8A"],
        background: "#F0F9FF",
        foreground: "#023E8A",
        visualBackground: "#FFFFFF",
        visualBorder: true,
        borderColor: "#CAF0F8",
        borderRadius: 12,
        fontFamily: "Inter"
    },
    {
        name: "Autumn Leaves",
        tag: "Warm & Earthy",
        dataColors: ["#8B4513", "#A0522D", "#D2691E", "#CD853F", "#BC8F8F", "#DEB887", "#F4A460", "#DAA520"],
        background: "#FFF8F0",
        foreground: "#5D4037",
        visualBackground: "#FFFFFF",
        visualBorder: true,
        borderColor: "#DEB887",
        borderRadius: 4,
        fontFamily: "Georgia"
    },
    {
        name: "Coffee House",
        tag: "Rich & Cozy",
        dataColors: ["#3E2723", "#4E342E", "#5D4037", "#6D4C41", "#795548", "#8D6E63", "#A1887F", "#BCAAA4"],
        background: "#EFEBE9",
        foreground: "#3E2723",
        visualBackground: "#FFFFFF",
        visualBorder: true,
        borderColor: "#BCAAA4",
        borderRadius: 2,
        fontFamily: "Verdana"
    },
    {
        name: "High Contrast",
        tag: "Bold Accessibility",
        dataColors: ["#FFFF00", "#FF00FF", "#00FFFF", "#FF8000", "#80FF00", "#00FF80", "#0080FF", "#8000FF"],
        background: "#000000",
        foreground: "#FFFFFF",
        visualBackground: "#000000",
        visualBorder: true,
        borderColor: "#FFFFFF",
        borderRadius: 0,
        fontFamily: "Arial Black",
        themeType: "high-contrast"
    },
    {
        name: "Luxury Gold",
        tag: "Premium & Sleek",
        dataColors: ["#D4AF37", "#C5A028", "#B8860B", "#996515", "#855E42", "#704214", "#5C4033", "#3D2B1F"],
        background: "#121212",
        foreground: "#D4AF37",
        visualBackground: "#1E1E1E",
        visualBorder: true,
        borderColor: "#D4AF37",
        borderRadius: 10,
        fontFamily: "Playfair Display",
        themeType: "dark"
    },
    {
        name: "Nordic Light",
        tag: "Minimalist",
        dataColors: ["#4C566A", "#5E81AC", "#81A1C1", "#88C0D0", "#8FBCBB", "#A3BE8C", "#EBCB8B", "#D08770"],
        background: "#ECEFF4",
        foreground: "#2E3440",
        visualBackground: "#FFFFFF",
        visualBorder: false,
        fontFamily: "Nunito"
    },
    {
        name: "Tropical Punch",
        tag: "Fun & Playful",
        dataColors: ["#FF007F", "#FF8C00", "#FFD700", "#32CD32", "#00CED1", "#8A2BE2", "#FF1493", "#40E0D0"],
        background: "#FFF0F5",
        foreground: "#C71585",
        visualBackground: "#FFFFFF",
        visualBorder: true,
        borderColor: "#FFB6C1",
        borderRadius: 15,
        fontFamily: "Comic Sans MS"
    },
    {
        name: "Space Voyager",
        tag: "Cosmic & Deep",
        dataColors: ["#1B1B3A", "#333366", "#454B66", "#677DB7", "#9CA3DB", "#C0B9DD", "#D8D2E1", "#EFE9F4"],
        background: "#0B0B19",
        foreground: "#D8D2E1",
        visualBackground: "#13132B",
        visualBorder: true,
        borderColor: "#333366",
        borderRadius: 20,
        fontFamily: "Syncopate"
    },
    {
        name: "Retro Wave",
        tag: "80s Aesthetic",
        dataColors: ["#FF00FF", "#7F00FF", "#00FFFF", "#00FF7F", "#FFFF00", "#FF7F00", "#FF007F", "#007FFF"],
        background: "#240046",
        foreground: "#00FFFF",
        visualBackground: "#3C096C",
        visualBorder: true,
        borderColor: "#FF00FF",
        borderRadius: 5,
        fontFamily: "Varela Round"
    },
    {
        name: "Calm Mountains",
        tag: "Serene & Natural",
        dataColors: ["#264653", "#2A9D8F", "#E9C46A", "#F4A261", "#E76F51", "#8AB17D", "#EF233C", "#D90429"],
        background: "#F4F1DE",
        foreground: "#3D405B",
        visualBackground: "#FFFFFF",
        visualBorder: false,
        fontFamily: "Montserrat"
    },
    {
        name: "Urban Industrial",
        tag: "Raw & Edgy",
        dataColors: ["#212529", "#343A40", "#495057", "#6C757D", "#ADB5BD", "#CED4DA", "#DEE2E6", "#F8F9FA"],
        background: "#333333",
        foreground: "#ADB5BD",
        visualBackground: "#444444",
        visualBorder: true,
        borderColor: "#6C757D",
        borderRadius: 3,
        fontFamily: "Roboto Mono"
    },
    {
        name: "Berry Medley",
        tag: "Sweet & Berry",
        dataColors: ["#6A0DAD", "#800080", "#8A2BE2", "#9932CC", "#BA55D3", "#DA70D6", "#EE82EE", "#DDA0DD"],
        background: "#FFF0FF",
        foreground: "#4B0082",
        visualBackground: "#FFFFFF",
        visualBorder: true,
        borderColor: "#EE82EE",
        borderRadius: 10,
        fontFamily: "Pacifico"
    },
    {
        name: "Desert Sunset",
        tag: "Dusk Colors",
        dataColors: ["#641220", "#6E1423", "#85182A", "#A11D33", "#A71E34", "#B21E35", "#BD1F36", "#C71F37"],
        background: "#4A0E0E",
        foreground: "#FFD700",
        visualBackground: "#5D1212",
        visualBorder: true,
        borderColor: "#A11D33",
        borderRadius: 8,
        fontFamily: "Arvo"
    },
    {
        name: "Minty Fresh",
        tag: "Cool & Crisp",
        dataColors: ["#B7E4C7", "#95D5B2", "#74C69D", "#52B788", "#40916C", "#2D6A4F", "#1B4332", "#081C15"],
        background: "#E8F5E9",
        foreground: "#1B5E20",
        visualBackground: "#FFFFFF",
        visualBorder: false,
        fontFamily: "Lato"
    },
    {
        name: "Corporate Blue",
        tag: "Classic Trust",
        dataColors: ["#0D47A1", "#1565C0", "#1976D2", "#1E88E5", "#2196F3", "#42A5F5", "#64B5F6", "#90CAF9"],
        background: "#FFFFFF",
        foreground: "#0D47A1",
        visualBackground: "#F5F5F5",
        visualBorder: true,
        borderColor: "#BBDEFB",
        borderRadius: 0,
        fontFamily: "Open Sans"
    },
    {
        name: "Elegant Monochrome",
        tag: "Grayscale Luxury",
        dataColors: ["#000000", "#1A1A1A", "#333333", "#4D4D4D", "#666666", "#808080", "#999999", "#B3B3B3"],
        background: "#FFFFFF",
        foreground: "#000000",
        visualBackground: "#FAFAFA",
        visualBorder: true,
        borderColor: "#E0E0E0",
        borderRadius: 0,
        fontFamily: "Palatino"
    },
    {
        name: "Vivid Rainbow",
        tag: "Spectrum Bold",
        dataColors: ["#FF0000", "#FF7F00", "#FFFF00", "#00FF00", "#0000FF", "#4B0082", "#9400D3", "#000000"],
        background: "#F8F9FA",
        foreground: "#212529",
        visualBackground: "#FFFFFF",
        visualBorder: true,
        borderColor: "#DEE2E6",
        borderRadius: 6,
        fontFamily: "Quicksand"
    },
    {
        name: "Deep Sea",
        tag: "Abyssal Tech",
        dataColors: ["#012A4A", "#013A63", "#01497C", "#014F86", "#2A6F97", "#2C7DA0", "#468FAF", "#61A5C2"],
        background: "#001219",
        foreground: "#94D2BD",
        visualBackground: "#002233",
        visualBorder: true,
        borderColor: "#01497C",
        borderRadius: 10,
        fontFamily: "Orbitron"
    },
    {
        name: "Sunny Day",
        tag: "Cheerful Bright",
        dataColors: ["#FFC300", "#FFD60A", "#FFEA00", "#FDFF00", "#003566", "#001D3D", "#000814", "#FFC300"],
        background: "#FFFBEB",
        foreground: "#001D3D",
        visualBackground: "#FFFFFF",
        visualBorder: false,
        fontFamily: "Raleway"
    },
    {
        name: "Rose Quartz",
        tag: "Elegant Pink",
        dataColors: ["#F94144", "#F3722C", "#F8961E", "#F9844A", "#F9C74F", "#90BE6D", "#43AA8B", "#4D908E"],
        background: "#FFF5F5",
        foreground: "#7209B7",
        visualBackground: "#FFFFFF",
        visualBorder: true,
        borderColor: "#FFCCD5",
        borderRadius: 12,
        fontFamily: "Playfair Display"
    },
    {
        name: "Slate & Stone",
        tag: "Muted Urban",
        dataColors: ["#264653", "#2A9D8F", "#E9C46A", "#F4A261", "#E76F51", "#7FB3D5", "#C0392B", "#2980B9"],
        background: "#F2F4F4",
        foreground: "#2C3E50",
        visualBackground: "#FFFFFF",
        visualBorder: false,
        fontFamily: "Source Sans Pro"
    },
    {
        name: "Lavender Field",
        tag: "Floral Calm",
        dataColors: ["#CDB4DB", "#FFC8DD", "#FFAFCC", "#BDE0FE", "#A2D2FF", "#E9ECEF", "#DEE2E6", "#CED4DA"],
        background: "#F3E5F5",
        foreground: "#4A148C",
        visualBackground: "#FFFFFF",
        visualBorder: true,
        borderColor: "#E1BEE7",
        borderRadius: 8,
        fontFamily: "Dancing Script"
    },
    {
        name: "Royal Velvet",
        tag: "Majestic Deep",
        dataColors: ["#600047", "#800060", "#A00078", "#C00090", "#E000A8", "#FF00C0", "#FF40D0", "#FF80E0"],
        background: "#2A001E",
        foreground: "#FFD700",
        visualBackground: "#3C002B",
        visualBorder: true,
        borderColor: "#600047",
        borderRadius: 4,
        fontFamily: "Garamond"
    },
    {
        name: "Citrus Zing",
        tag: "Fresh Energy",
        dataColors: ["#FB5607", "#FF006E", "#8338EC", "#3A86FF", "#FFBE0B", "#00F5D4", "#00BBF9", "#F15BB5"],
        background: "#FFF8E1",
        foreground: "#E65100",
        visualBackground: "#FFFFFF",
        visualBorder: true,
        borderColor: "#FFE082",
        borderRadius: 10,
        fontFamily: "Righteous"
    },
    {
        name: "Arctic Frost",
        tag: "Chilled Professional",
        dataColors: ["#D8E2DC", "#FFE5D9", "#FFCAD4", "#F4ACB7", "#9D8189", "#6B705C", "#A5A58D", "#B7B7A4"],
        background: "#F8F9FA",
        foreground: "#457B9D",
        visualBackground: "#FFFFFF",
        visualBorder: true,
        borderColor: "#A8DADC",
        borderRadius: 6,
        fontFamily: "Slabo 27px"
    }
];


function renderPopularThemes() {
    elements.popularThemesGrid.innerHTML = '';

    popularThemes.forEach(theme => {
        const card = document.createElement('div');
        card.className = 'theme-card';

        const previewColors = theme.dataColors.slice(0, 5);
        const colorSpans = previewColors.map(c => `<span style="background: ${c}"></span>`).join('');

        card.innerHTML = `
            <div class="theme-card-preview" style="background: ${theme.background}">
                <div class="theme-card-colors">${colorSpans}</div>
            </div>
            <div class="theme-card-info">
                <div class="theme-card-name">${theme.name}</div>
                <div class="theme-card-tag">${theme.tag}</div>
            </div>
        `;

        card.addEventListener('click', () => applyPopularTheme(theme));
        elements.popularThemesGrid.appendChild(card);
    });
}

function applyPopularTheme(theme) {
    saveState();
    // Re-initialize themeState if it's missing properties
    const newTheme = { ...theme };
    Object.assign(themeState, newTheme);

    updateAll(); // Triggers inputs, palette, and preview
    elements.themesModal.classList.remove('show');
    showToast(`Applied ${theme.name} theme`, 'success');
}

// ============================================
// Accessibility Auditor
// ============================================
function runA11yAudit() {
    const results = [];
    let score = 100;

    // Check data colors contrast against visual background
    themeState.dataColors.forEach((color, i) => {
        const contrast = calculateContrastRatio(color, themeState.visualBackground);
        if (contrast < 3) {
            results.push({
                type: 'error',
                message: `Data Color ${i + 1} (${color}) has low contrast (${contrast.toFixed(1)}:1) against visual background.`
            });
            score -= 5;
        }
    });

    // Check foreground contrast
    const fgContrast = calculateContrastRatio(themeState.foreground, themeState.background);
    if (fgContrast < 4.5) {
        results.push({
            type: 'warning',
            message: `Main text contrast (${fgContrast.toFixed(1)}:1) is below WCAG AA (4.5:1).`
        });
        score -= 10;
    }

    elements.a11yScore.textContent = Math.max(0, score);
    elements.a11yResults.innerHTML = results.map(r => `
        <div class="a11y-item ${r.type}">
            <span class="a11y-icon">${r.type === 'error' ? '❌' : '⚠️'}</span>
            <span class="a11y-message">${r.message}</span>
        </div>
    `).join('') || '<div class="a11y-item success">✅ No accessibility issues found!</div>';
}

function autoFixColors() {
    saveState();
    // Basic auto-fix logic
    themeState.dataColors = themeState.dataColors.map(color => {
        let contrast = calculateContrastRatio(color, themeState.visualBackground);
        let hsl = hexToHsl(color);
        while (contrast < 3 && hsl.l > 0 && hsl.l < 100) {
            if (getLuminance(themeState.visualBackground) > 0.5) {
                hsl.l -= 5; // Darken
            } else {
                hsl.l += 5; // Lighten
            }
            color = hslToHex(hsl.h, hsl.s, hsl.l);
            contrast = calculateContrastRatio(color, themeState.visualBackground);
        }
        return color;
    });

    updateAllInputs();
    renderColorPalette();
    updatePreview();
    showToast('Applied accessibility auto-fixes!', 'success');
}

function calculateContrastRatio(color1, color2) {
    const l1 = getLuminance(color1);
    const l2 = getLuminance(color2);
    const brightest = Math.max(l1, l2);
    const darkest = Math.min(l1, l2);
    return (brightest + 0.05) / (darkest + 0.05);
}

function getLuminance(hex) {
    const rgb = hexToRgb(hex);
    const a = [rgb.r, rgb.g, rgb.b].map(v => {
        v /= 255;
        return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}

function hexToRgb(hex) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return { r, g, b };
}

// ============================================
// Logo to Theme Generator
// ============================================
function handleLogoUpload(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
            extractColorsFromImage(img);
        };
        img.src = event.target.result;
    };
    reader.readAsDataURL(file);
}

function extractColorsFromImage(img) {
    const canvas = document.createElement('canvas'); // Use virtual canvas
    const ctx = canvas.getContext('2d');

    const MAX_WIDTH = 200;
    const scale = Math.min(1, MAX_WIDTH / img.width);
    canvas.width = img.width * scale;
    canvas.height = img.height * scale;

    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    const colorMap = {};
    const quantization = 20;

    for (let i = 0; i < imageData.length; i += 4) {
        const r = imageData[i];
        const g = imageData[i + 1];
        const b = imageData[i + 2];
        const a = imageData[i + 3];

        if (a < 128) continue;

        const rQ = Math.floor(r / quantization) * quantization;
        const gQ = Math.floor(g / quantization) * quantization;
        const bQ = Math.floor(b / quantization) * quantization;
        const hex = hexToRgbToHex(rQ, gQ, bQ);

        colorMap[hex] = (colorMap[hex] || 0) + 1;
    }

    const sortedColors = Object.entries(colorMap)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 8)
        .map(entry => entry[0]);

    if (sortedColors.length > 0) {
        themeState.dataColors = sortedColors;
        // Auto-guess background
        const firstColorHSL = hexToHsl(sortedColors[0]);
        if (firstColorHSL.l > 80) {
            themeState.background = "#0F0F23";
            themeState.foreground = "#FFFFFF";
        } else {
            themeState.background = "#FFFFFF";
            themeState.foreground = "#252423";
        }

        updateAllInputs();
        renderColorPalette();
        updatePreview();
        showToast('Generated theme from logo!', 'success');
    }
}

function hexToRgbToHex(r, g, b) {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
}

// ============================================
// Persistence & Sharing
// ============================================
function savePersistence() {
    localStorage.setItem('pbiThemeState', JSON.stringify(themeState));
}

function loadPersistence() {
    const saved = localStorage.getItem('pbiThemeState');
    if (saved) {
        try {
            const parsed = JSON.parse(saved);
            Object.assign(themeState, parsed);
            updateAllInputs();
        } catch (e) {
            console.error("Failed to load saved theme", e);
        }
    }

    const urlParams = new URLSearchParams(window.location.search);
    const shared = urlParams.get('theme');
    if (shared) {
        try {
            const parsed = JSON.parse(atob(shared));
            Object.assign(themeState, parsed);
            updateAllInputs();
            showToast('Loaded shared theme!', 'success');
        } catch (e) {
            console.error("Failed to load shared theme", e);
        }
    }
}

function shareTheme() {
    const base64 = btoa(JSON.stringify(themeState));
    const url = new URL(window.location.href);
    url.searchParams.set('theme', base64);
    const shareUrl = url.toString();

    navigator.clipboard.writeText(shareUrl).then(() => {
        showToast('Share link copied to clipboard!', 'success');
    });
}

// ============================================
// Library Logic
// ============================================
function saveThemeToLibrary() {
    const name = prompt('Enter a name for this theme:', themeState.name) || `Theme ${new Date().toLocaleString()}`;
    const newTheme = {
        id: Date.now().toString(),
        name: name,
        createdAt: new Date().toISOString(),
        state: JSON.parse(JSON.stringify(themeState))
    };

    libraryThemes.unshift(newTheme);
    localStorage.setItem('themeLibrary', JSON.stringify(libraryThemes));
    renderLibraryGrid();
    showToast('Theme saved to library!', 'success');
}

function deleteThemeFromLibrary(id) {
    if (confirm('Are you sure you want to delete this saved theme?')) {
        libraryThemes = libraryThemes.filter(t => t.id !== id);
        localStorage.setItem('themeLibrary', JSON.stringify(libraryThemes));
        renderLibraryGrid();
        showToast('Theme deleted', 'success');
    }
}

function applyThemeFromLibrary(id) {
    const theme = libraryThemes.find(t => t.id === id);
    if (theme) {
        saveState();
        Object.assign(themeState, JSON.parse(JSON.stringify(theme.state)));
        updateAll();
        elements.libraryModal.classList.remove('show');
        showToast(`Applied ${theme.name}`, 'success');
    }
}

function renderLibraryGrid() {
    if (!elements.libraryGrid) return;

    if (libraryThemes.length === 0) {
        elements.libraryGrid.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 40px; color: var(--text-muted);">
                <p>Your library is empty. Save a theme to get started!</p>
            </div>
        `;
        return;
    }

    elements.libraryGrid.innerHTML = libraryThemes.map(theme => {
        const colors = theme.state.dataColors.slice(0, 5);
        return `
            <div class="theme-card library-card" data-id="${theme.id}">
                <div class="theme-card-header">
                    <span class="theme-card-title">${theme.name}</span>
                    <button class="btn-icon delete-theme-btn" onclick="event.stopPropagation(); deleteThemeFromLibrary('${theme.id}')" title="Delete">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="3 6 5 6 21 6"></polyline>
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        </svg>
                    </button>
                </div>
                <div class="theme-card-preview" onclick="applyThemeFromLibrary('${theme.id}')">
                    <div class="theme-card-colors">
                        ${colors.map(c => `<div class="theme-card-color" style="background: ${c}"></div>`).join('')}
                    </div>
                </div>
                <div class="theme-card-footer">
                    <span>${new Date(theme.createdAt).toLocaleDateString()}</span>
                </div>
            </div>
        `;
    }).join('');
}

window.deleteThemeFromLibrary = deleteThemeFromLibrary;
window.applyThemeFromLibrary = applyThemeFromLibrary;

// ============================================
// Magic Polish
// ============================================
function applyMagicPolish(style) {
    saveState();
    switch (style) {
        case 'flat':
            themeState.visualBorder = false;
            themeState.dropShadow = false;
            themeState.borderRadius = 0;
            break;
        case 'soft':
            themeState.visualBorder = true;
            themeState.borderColor = "#F0F0F0";
            themeState.borderRadius = 12;
            themeState.dropShadow = true;
            break;
        case 'glass':
            themeState.glassMode = true;
            themeState.visualBackgroundTransparency = 60;
            themeState.borderRadius = 16;
            break;
    }
    updateAllInputs();
    updatePreview();
    showToast(`Applied ${style} polish!`, 'success');
}

function renderReportScenario(scenario) {
    const preview = elements.previewReport;
    if (!preview) return;

    let content = '';
    const wrap = (items) => `<div class="preview-page">${items}</div>`;

    if (scenario === 'executive') {
        content = wrap(`
            <div class="report-row animate-fade-up stagger-1">
                <div class="col-12">
                    <div class="preview-visual">
                         <div class="preview-visual-title">
                            <span>Key Performance Indicators</span>
                            <span style="font-size: 0.7rem; color: var(--pbi-text); opacity: 0.6; font-weight: normal;">Live Update</span>
                         </div>
                         <div class="preview-line-chart" style="height: 180px;">
                            <svg viewBox="0 0 400 120" preserveAspectRatio="none" style="width:100%; height:100%;" class="chart-svg">
                                <defs>
                                    <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stop-color="var(--pbi-primary)" stop-opacity="0.3"></stop>
                                        <stop offset="100%" stop-color="var(--pbi-primary)" stop-opacity="0"></stop>
                                    </linearGradient>
                                </defs>
                                <path d="M0,100 L0,80 Q50,20 100,50 T200,30 T300,70 T400,10 L400,120 L0,120 Z" fill="url(#areaGrad)" />
                                <path d="M0,80 Q50,20 100,50 T200,30 T300,70 T400,10" fill="none" stroke="var(--pbi-primary)" stroke-width="4" stroke-linecap="round" data-series="0" />
                                <path d="M0,100 Q50,60 100,90 T200,80 T300,110 T400,60" fill="none" stroke="var(--pbi-secondary)" stroke-width="2" stroke-dasharray="4,4" data-series="1" />
                            </svg>
                         </div>
                         <div style="display: flex; gap: 20px; margin-top: 16px; border-top: 1px solid rgba(0,0,0,0.05); padding-top: 16px;">
                            <div style="font-size: 0.75rem; color: var(--pbi-text);"><span style="color: var(--pbi-primary)">●</span> Actual</div>
                            <div style="font-size: 0.75rem; color: var(--pbi-text);"><span style="color: var(--pbi-secondary)">---</span> Target</div>
                         </div>
                    </div>
                </div>
            </div>
            <div class="report-row animate-fade-up stagger-2">
                <div class="col-4">
                    <div class="preview-card">
                        <div class="preview-card-value">$4.2M</div>
                        <div class="preview-card-label">Revenue</div>
                        <div style="font-size: 0.7rem; color: var(--pbi-success); margin-top: 8px; font-weight:700;">↑ 12.4%</div>
                    </div>
                </div>
                <div class="col-4">
                    <div class="preview-card">
                        <div class="preview-card-value">18.5k</div>
                        <div class="preview-card-label">Users</div>
                        <div style="font-size: 0.7rem; color: var(--pbi-primary); margin-top: 8px; font-weight:700;">◈ Growth</div>
                    </div>
                </div>
                <div class="col-4">
                    <div class="preview-card">
                         <div class="preview-card-value" style="color: var(--pbi-danger)">2.4%</div>
                         <div class="preview-card-label">Churn</div>
                         <div style="font-size: 0.7rem; color: var(--pbi-danger); margin-top: 8px; font-weight:700;">↓ Risk</div>
                    </div>
                </div>
            </div>
        `);
    } else if (scenario === 'sales') {
        content = wrap(`
            <div class="report-row animate-fade-up stagger-1">
                <div class="col-4">
                    <div class="preview-visual" style="height: 100%;">
                        <div class="preview-visual-title">Category</div>
                         <div class="preview-slicer">
                            <div class="preview-slicer-header">Select Level</div>
                            <div class="preview-slicer-item selected">All Categories</div>
                            <div class="preview-slicer-item">High Growth</div>
                            <div class="preview-slicer-item">Retail</div>
                         </div>
                    </div>
                </div>
                <div class="col-8">
                    <div class="preview-visual">
                        <div class="preview-visual-title">Regional Performance</div>
                        <div class="preview-bars" style="height: 200px; display: grid; grid-template-columns: repeat(4, 1fr); align-items: end; gap: 30px;">
                            <div style="display: flex; flex-direction: column; gap: 8px; align-items: center;">
                                <div style="width: 100%; height: 160px; background: rgba(0,0,0,0.02); display: flex; flex-direction: column-reverse; border-radius: 4px;">
                                    <div style="height: 85%; background: var(--pbi-primary); border-radius: 2px;"></div>
                                </div>
                                <div style="font-size: 0.65rem; font-weight: 700; color: var(--pbi-text);">AMER</div>
                            </div>
                            <div style="display: flex; flex-direction: column; gap: 8px; align-items: center;">
                                <div style="width: 100%; height: 160px; background: rgba(0,0,0,0.02); display: flex; flex-direction: column-reverse; border-radius: 4px;">
                                    <div style="height: 65%; background: var(--pbi-secondary); border-radius: 2px;"></div>
                                </div>
                                <div style="font-size: 0.65rem; font-weight: 700; color: var(--pbi-text);">EMEA</div>
                            </div>
                             <div style="display: flex; flex-direction: column; gap: 8px; align-items: center;">
                                <div style="width: 100%; height: 160px; background: rgba(0,0,0,0.02); display: flex; flex-direction: column-reverse; border-radius: 4px;">
                                    <div style="height: 45%; background: var(--pbi-data-2); border-radius: 2px;"></div>
                                </div>
                                <div style="font-size: 0.65rem; font-weight: 700; color: var(--pbi-text);">APAC</div>
                            </div>
                            <div style="display: flex; flex-direction: column; gap: 8px; align-items: center;">
                                <div style="width: 100%; height: 160px; background: rgba(0,0,0,0.02); display: flex; flex-direction: column-reverse; border-radius: 4px;">
                                    <div style="height: 30%; background: var(--pbi-data-3); border-radius: 2px;"></div>
                                </div>
                                <div style="font-size: 0.65rem; font-weight: 700; color: var(--pbi-text);">OTHER</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="report-row animate-fade-up stagger-2">
                <div class="col-6">
                    <div class="preview-visual">
                        <div class="preview-visual-title">Profit Margin</div>
                        <div style="height: 120px; display: flex; justify-content: center; align-items: center;">
                            <svg viewBox="0 0 100 60" style="width: 200px;">
                                <path d="M10,50 A40,40 0 1,1 90,50" fill="none" stroke="rgba(0,0,0,0.05)" stroke-width="12" stroke-linecap="round" />
                                <path d="M10,50 A40,40 0 1,1 90,50" fill="none" stroke="var(--pbi-primary)" stroke-width="12" stroke-linecap="round" stroke-dasharray="90 251.3" />
                                <text x="50" y="45" text-anchor="middle" font-size="12" font-weight="800" fill="var(--pbi-text)">74%</text>
                            </svg>
                        </div>
                    </div>
                </div>
                <div class="col-6">
                    <div class="preview-visual">
                        <div class="preview-visual-title">Top Products</div>
                        <div style="display: flex; flex-direction: column; gap: 12px;">
                            <div><div style="display: flex; justify-content: space-between; font-size: 0.75rem; margin-bottom: 4px; color: var(--pbi-text);"><span>Solaris X</span><span>82%</span></div><div style="height: 6px; background: rgba(0,0,0,0.05); border-radius: 3px;"><div style="width: 82%; height: 100%; background: var(--pbi-primary); border-radius: 2px;"></div></div></div>
                            <div><div style="display: flex; justify-content: space-between; font-size: 0.75rem; margin-bottom: 4px; color: var(--pbi-text);"><span>Luna Pro</span><span>54%</span></div><div style="height: 6px; background: rgba(0,0,0,0.05); border-radius: 3px;"><div style="width: 54%; height: 100%; background: var(--pbi-secondary); border-radius: 2px;"></div></div></div>
                            <div><div style="display: flex; justify-content: space-between; font-size: 0.75rem; margin-bottom: 4px; color: var(--pbi-text);"><span>Nova Lite</span><span>31%</span></div><div style="height: 6px; background: rgba(0,0,0,0.05); border-radius: 3px;"><div style="width: 31%; height: 100%; background: var(--pbi-data-2); border-radius: 2px;"></div></div></div>
                        </div>
                    </div>
                </div>
            </div>
        `);
    } else if (scenario === 'inventory') {
        content = wrap(`
            <div class="report-row animate-fade-up stagger-1">
                <div class="col-4">
                    <div class="preview-card">
                        <div class="preview-card-value">1,245</div>
                        <div class="preview-card-label">Stock Units</div>
                        <div style="color: var(--pbi-success); font-size: 0.7rem; font-weight: 700;">● HEALTHY</div>
                    </div>
                </div>
                <div class="col-4">
                    <div class="preview-card">
                        <div class="preview-card-value" style="color:var(--pbi-warning)">340</div>
                        <div class="preview-card-label">Pending</div>
                        <div style="color: var(--pbi-warning); font-size: 0.7rem; font-weight: 700;">◈ REPLENISHING</div>
                    </div>
                </div>
                <div class="col-4">
                    <div class="preview-card">
                        <div class="preview-card-value" style="color:var(--pbi-danger)">12</div>
                        <div class="preview-card-label">Urgent</div>
                        <div style="color: var(--pbi-danger); font-size: 0.7rem; font-weight: 700;">▲ STOCKOUT</div>
                    </div>
                </div>
            </div>
            <div class="report-row animate-fade-up stagger-2">
                <div class="col-12">
                    <div class="preview-visual">
                        <div class="preview-visual-title">Inventory Health by Warehouse</div>
                        <table class="preview-table">
                            <thead>
                                <tr>
                                    <th>LOCATION</th>
                                    <th>CAPACITY</th>
                                    <th>TURNOVER</th>
                                    <th style="text-align: right;">STATUS</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr><td>London SW Logistics</td><td>94%</td><td>3.2x</td><td style="text-align: right; color: var(--pbi-warning);">Full</td></tr>
                                <tr><td>Berlin Central Hub</td><td>62%</td><td>5.1x</td><td style="text-align: right; color: var(--pbi-success);">Optimal</td></tr>
                                <tr><td>NYC East Distribution</td><td>12%</td><td>2.0x</td><td style="text-align: right; color: var(--pbi-danger);">Critical</td></tr>
                                <tr><td>Tokyo Global Port</td><td>88%</td><td>4.8x</td><td style="text-align: right; color: var(--pbi-success);">Stable</td></tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        `);
    }

    preview.innerHTML = content;
}

window.applyMagicPolish = applyMagicPolish;

// ============================================
// History Logic
// ============================================
function saveState() {
    // Push a deep clone of the current theme state to the undo stack
    undoStack.push(JSON.parse(JSON.stringify(themeState)));

    // Clear redo stack on new action
    redoStack = [];

    // Limit stack size
    if (undoStack.length > MAX_STACK_SIZE) {
        undoStack.shift();
    }

    updateHistoryButtons();
}

function undo() {
    if (undoStack.length === 0) return;

    // Save current to redo stack
    redoStack.push(JSON.parse(JSON.stringify(themeState)));

    // Restore from undo stack
    const previousState = undoStack.pop();
    Object.assign(themeState, previousState);

    updateAll();
    showToast('Undo successful', 'success');
}

function redo() {
    if (redoStack.length === 0) return;

    // Save current to undo stack
    undoStack.push(JSON.parse(JSON.stringify(themeState)));

    // Restore from redo stack
    const nextState = redoStack.pop();
    Object.assign(themeState, nextState);

    updateAll();
    showToast('Redo successful', 'success');
}

function updateHistoryButtons() {
    if (elements.undoBtn) elements.undoBtn.disabled = undoStack.length === 0;
    if (elements.redoBtn) elements.redoBtn.disabled = redoStack.length === 0;
}

function updateAll() {
    updateAllInputs();
    renderColorPalette();
    updatePreview();
    updateHistoryButtons();
}

function validateTheme(obj) {
    const issues = { errors: [], warnings: [] };

    if (!obj.name) issues.warnings.push("Missing 'name' field. Using default.");

    if (!obj.dataColors) {
        issues.errors.push("Missing required field: 'dataColors'");
    } else if (!Array.isArray(obj.dataColors)) {
        issues.errors.push("'dataColors' must be an array");
    } else if (obj.dataColors.length === 0) {
        issues.errors.push("'dataColors' array is empty");
    } else {
        // Validate individual colors
        obj.dataColors.forEach((color, i) => {
            if (typeof color !== 'string' || !/^#[0-9A-Fa-f]{6,8}$/.test(color)) {
                issues.errors.push(`Invalid color format at index ${i}: "${color}"(must be #RRGGBB)`);
            }
        });
    }

    return issues;
}

function renderValidationResults(issues) {
    const area = elements.importValidationResults;
    area.classList.remove('hidden');

    let html = '';
    if (issues.errors.length > 0) {
        html += `< div class="v-errors-list" style = "background: rgba(239, 68, 68, 0.1); border: 1px solid var(--danger); padding: 12px; border-radius: 4px; margin-top: 10px;" >
            <strong style="color: var(--danger);">Errors (Import Blocked):</strong>
            <ul style="font-size: 0.8rem; margin: 8px 0 0 16px; color: #ffcccc;">${issues.errors.map(err => `<li>${err}</li>`).join('')}</ul>
        </div > `;
    }
    if (issues.warnings.length > 0) {
        html += `< div class="v-warnings-list" style = "background: rgba(217, 179, 0, 0.1); border: 1px solid var(--warning); padding: 12px; border-radius: 4px; margin-top: 10px;" >
            <strong style="color: var(--warning);">Warnings:</strong>
            <ul style="font-size: 0.8rem; margin: 8px 0 0 16px; color: #fff8cc;">${issues.warnings.map(warn => `<li>${warn}</li>`).join('')}</ul>
        </div > `;
    }

    area.innerHTML = html;
}

// ============================================
// Initialize App
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    init();
    updateHistoryButtons();
});
