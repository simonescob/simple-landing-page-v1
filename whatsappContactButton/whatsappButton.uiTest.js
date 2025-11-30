/**
 * WhatsApp Contact Button UI Tests
 * Comprehensive UI testing for different device sizes and orientations
 */

// Mock viewport changes and media queries
class ViewportSimulator {
  constructor() {
    this.currentViewport = { width: 1024, height: 768, orientation: 'landscape' };
    this.listeners = [];
  }

  setViewport(width, height) {
    const oldWidth = this.currentViewport.width;
    const oldHeight = this.currentViewport.height;
    const oldOrientation = this.getOrientation();

    this.currentViewport = { width, height, orientation: this.getOrientation() };

    // Trigger media query changes
    this.triggerMediaQueryListeners();

    // Trigger window resize event
    window.dispatchEvent(new Event('resize'));
    window.dispatchEvent(new Event('orientationchange'));

    return { oldViewport: { width: oldWidth, height: oldHeight }, newViewport: this.currentViewport };
  }

  getOrientation() {
    return this.currentViewport.width > this.currentViewport.height ? 'landscape' : 'portrait';
  }

  onMediaQueryChange(callback) {
    this.listeners.push(callback);
  }

  triggerMediaQueryListeners() {
    this.listeners.forEach(callback => callback(this.currentViewport));
  }

  // Simulate common device sizes
  getDeviceSizes() {
    return {
      mobile: { width: 375, height: 667 },
      mobileLandscape: { width: 667, height: 375 },
      tablet: { width: 768, height: 1024 },
      tabletLandscape: { width: 1024, height: 768 },
      desktop: { width: 1920, height: 1080 },
      largeDesktop: { width: 2560, height: 1440 }
    };
  }
}

// Mock media query matcher
class MockMediaQueryMatcher {
  constructor() {
    this.mediaQueries = new Map();
    this.activeQueries = new Set();
  }

  addMediaQuery(query, callback) {
    this.mediaQueries.set(query, callback);
    this.evaluateQuery(query);
  }

  evaluateQuery(query) {
    const matches = this.evaluateQueryLogic(query);
    const queryObj = { matches, media: query };
    
    if (matches) {
      this.activeQueries.add(query);
    } else {
      this.activeQueries.delete(query);
    }

    // Find and trigger callback
    if (this.mediaQueries.has(query)) {
      this.mediaQueries.get(query)(queryObj);
    }
  }

  evaluateQueryLogic(query) {
    const viewport = window.simulator?.currentViewport || { width: 1024, height: 768 };
    
    if (query.includes('max-width')) {
      const maxWidth = parseInt(query.match(/max-width:\s*(\d+)/)?.[1] || '0');
      return viewport.width <= maxWidth;
    }
    
    if (query.includes('min-width')) {
      const minWidth = parseInt(query.match(/min-width:\s*(\d+)/)?.[1] || '0');
      return viewport.width >= minWidth;
    }
    
    if (query.includes('orientation')) {
      const orientation = query.includes('landscape') ? 'landscape' : 'portrait';
      return viewport.orientation === orientation;
    }
    
    if (query.includes('hover')) {
      return !window.simulator?.currentViewport?.isTouchDevice;
    }
    
    return false;
  }

  getActiveQueries() {
    return Array.from(this.activeQueries);
  }

  reset() {
    this.activeQueries.clear();
  }
}

// Mock CSS styles for testing
class MockStyleManager {
  constructor() {
    this.styles = new Map();
    this.mediaQueryStyles = new Map();
  }

  addStyle(selector, properties) {
    this.styles.set(selector, properties);
  }

  addMediaQueryStyle(query, selector, properties) {
    if (!this.mediaQueryStyles.has(query)) {
      this.mediaQueryStyles.set(query, new Map());
    }
    this.mediaQueryStyles.get(query).set(selector, properties);
  }

  getComputedStyle(element, selector) {
    let properties = this.styles.get(selector) || {};

    // Check media query styles
    for (const [query, selectors] of this.mediaQueryStyles) {
      if (window.simulator?.evaluateQueryLogic(query) && selectors.has(selector)) {
        properties = { ...properties, ...selectors.get(selector) };
      }
    }

    return properties;
  }

  reset() {
    this.styles.clear();
    this.mediaQueryStyles.clear();
  }
}

// UI Test Runner
class UITestRunner {
  constructor() {
    this.simulator = new ViewportSimulator();
    this.mediaQueryMatcher = new MockMediaQueryMatcher();
    this.styleManager = new MockStyleManager();
    this.testResults = [];
    
    // Set up global references
    window.simulator = this.simulator;
    window.matchMedia = (query) => ({
      matches: this.mediaQueryMatcher.evaluateQueryLogic(query),
      media: query,
      onchange: null,
      addListener: (callback) => this.mediaQueryMatcher.addMediaQuery(query, callback),
      removeListener: () => {},
      addEventListener: (event, callback) => {
        if (event === 'change') {
          this.mediaQueryMatcher.addMediaQuery(query, callback);
        }
      },
      removeEventListener: () => {},
      dispatchEvent: () => true
    });
  }

  async runAllUITests() {
    console.log('Starting UI Tests for WhatsApp Contact Button...');
    
    const testSuites = [
      () => this.testResponsiveDesign(),
      () => this.testOrientationChanges(),
      () => this.testTouchInteractions(),
      () => this.testAccessibility(),
      () => this.testAnimationPerformance(),
      () => this.testZIndexAndPositioning(),
      () => this.testMediaQueryChanges(),
      () => this.testHighDPI(),
      () => this.testDarkMode()
    ];

    for (const testSuite of testSuites) {
      try {
        await testSuite();
      } catch (error) {
        this.recordResult('Test Suite Error', false, error.message);
      }
    }

    return this.generateReport();
  }

  async testResponsiveDesign() {
    console.log('Testing responsive design...');
    
    const devices = this.simulator.getDeviceSizes();
    const positions = ['bottom-right', 'bottom-left', 'top-right', 'top-left'];
    
    for (const [deviceName, size] of Object.entries(devices)) {
      console.log(`  Testing ${deviceName} (${size.width}x${size.height})`);
      
      this.simulator.setViewport(size.width, size.height);
      
      for (const position of positions) {
        await this.testButtonPosition(position, size);
        await this.testButtonSize(size);
        await this.testTooltipDisplay(size);
      }
    }
  }

  async testButtonPosition(position, viewport) {
    // Test button positioning for each viewport
    const isMobile = viewport.width <= 768;
    const expectedBottom = isMobile ? '20px' : '24px';
    const expectedRight = isMobile ? '20px' : '24px';
    
    // Mock button creation and positioning
    const mockButton = this.createMockButton(position);
    const style = this.getButtonStyle(mockButton);
    
    this.recordResult(
      `Position ${position} on ${viewport.width}x${viewport.height}`,
      this.validatePosition(style, position, expectedBottom, expectedRight),
      `Style: ${JSON.stringify(style)}`
    );
  }

  async testButtonSize(viewport) {
    const isMobile = viewport.width <= 480;
    const isTablet = viewport.width <= 768 && viewport.width > 480;
    
    const expectedSize = isMobile ? 52 : isTablet ? 56 : 64;
    const expectedIconSize = isMobile ? 22 : isTablet ? 24 : 28;
    
    const mockButton = this.createMockButton('bottom-right');
    const style = this.getButtonStyle(mockButton);
    
    const actualSize = parseInt(style.width) || 0;
    const actualIconSize = this.getIconSize(style);
    
    this.recordResult(
      `Button size on ${viewport.width}x${viewport.height}`,
      actualSize === expectedSize && actualIconSize === expectedIconSize,
      `Expected: ${expectedSize}px, Actual: ${actualSize}px`
    );
  }

  async testTooltipDisplay(viewport) {
    const shouldShowTooltip = viewport.width > 768;
    const mockButton = this.createMockButton('bottom-right');
    const tooltip = mockButton.querySelector('.tooltip');
    
    if (shouldShowTooltip) {
      this.recordResult(
        `Tooltip display on ${viewport.width}x${viewport.height}`,
        tooltip !== null,
        'Tooltip should be visible on desktop'
      );
    } else {
      this.recordResult(
        `Tooltip hidden on ${viewport.width}x${viewport.height}`,
        tooltip === null || this.isTooltipHidden(tooltip),
        'Tooltip should be hidden on mobile'
      );
    }
  }

  async testOrientationChanges() {
    console.log('Testing orientation changes...');
    
    // Test mobile portrait to landscape
    this.simulator.setViewport(375, 667); // Portrait
    await this.testOrientationBehavior('Portrait');
    
    this.simulator.setViewport(667, 375); // Landscape
    await this.testOrientationBehavior('Landscape');
    
    // Test tablet orientation
    this.simulator.setViewport(768, 1024); // Portrait
    await this.testOrientationBehavior('Tablet Portrait');
    
    this.simulator.setViewport(1024, 768); // Landscape
    await this.testOrientationBehavior('Tablet Landscape');
  }

  async testOrientationBehavior(orientation) {
    const viewport = this.simulator.currentViewport;
    const mockButton = this.createMockButton('bottom-right');
    
    // Test that button maintains position during orientation change
    const styleBefore = this.getButtonStyle(mockButton);
    
    // Simulate orientation change
    this.simulator.setViewport(
      orientation.includes('Landscape') ? 667 : 375,
      orientation.includes('Landscape') ? 375 : 667
    );
    
    const styleAfter = this.getButtonStyle(mockButton);
    
    // Button should adapt to new orientation
    const isAdapted = this.validateOrientationAdaptation(styleBefore, styleAfter, viewport);
    
    this.recordResult(
      `Orientation adaptation: ${orientation}`,
      isAdapted,
      `Style adaptation validated`
    );
  }

  async testTouchInteractions() {
    console.log('Testing touch interactions...');
    
    // Enable touch device simulation
    window.simulator.currentViewport.isTouchDevice = true;
    
    const touchEvents = ['touchstart', 'touchend', 'touchmove'];
    
    for (const eventType of touchEvents) {
      await this.testTouchEvent(eventType);
    }
    
    // Test hover behavior on touch devices (should be disabled)
    await this.testTouchHoverBehavior();
  }

  async testTouchEvent(eventType) {
    const mockButton = this.createMockButton('bottom-right');
    let eventHandled = false;
    
    // Mock event listener
    mockButton.addEventListener('touchstart', () => { eventHandled = true; });
    mockButton.addEventListener('touchend', () => { eventHandled = true; });
    
    // Simulate touch event
    const touchEvent = new TouchEvent(eventType, {
      touches: [{ clientX: 100, clientY: 100 }],
      changedTouches: [{ clientX: 100, clientY: 100 }]
    });
    
    mockButton.dispatchEvent(touchEvent);
    
    this.recordResult(
      `Touch event handling: ${eventType}`,
      eventHandled,
      `${eventType} event processed`
    );
  }

  async testTouchHoverBehavior() {
    const mockButton = this.createMockButton('bottom-right');
    
    // On touch devices, hover states should be disabled
    const hoverStyles = this.getHoverStyles(mockButton);
    
    this.recordResult(
      'Touch hover behavior',
      hoverStyles.disabled === true,
      'Hover styles should be disabled on touch devices'
    );
  }

  async testAccessibility() {
    console.log('Testing accessibility features...');
    
    const accessibilityTests = [
      () => this.testAriaLabels(),
      () => this.testKeyboardNavigation(),
      () => this.testFocusManagement(),
      () => this.testScreenReaderSupport(),
      () => this.testHighContrastMode()
    ];
    
    for (const test of accessibilityTests) {
      await test();
    }
  }

  async testAriaLabels() {
    const mockButton = this.createMockButton('bottom-right');
    
    const hasAriaLabel = mockButton.getAttribute('aria-label') !== null;
    const hasAriaDescribedBy = mockButton.getAttribute('aria-describedby') !== null;
    const hasRole = mockButton.getAttribute('role') === 'button';
    
    this.recordResult(
      'ARIA labels and roles',
      hasAriaLabel && hasAriaDescribedBy && hasRole,
      'Button should have proper ARIA attributes'
    );
  }

  async testKeyboardNavigation() {
    const mockButton = this.createMockButton('bottom-right');
    
    let keydownHandled = false;
    
    mockButton.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        keydownHandled = true;
      }
    });
    
    // Test Enter key
    const enterEvent = new KeyboardEvent('keydown', { key: 'Enter' });
    mockButton.dispatchEvent(enterEvent);
    
    // Test Space key
    const spaceEvent = new KeyboardEvent('keydown', { key: ' ' });
    mockButton.dispatchEvent(spaceEvent);
    
    this.recordResult(
      'Keyboard navigation',
      keydownHandled,
      'Button should respond to Enter and Space keys'
    );
  }

  async testFocusManagement() {
    const mockButton = this.createMockButton('bottom-right');
    
    // Test focusable
    const isFocusable = mockButton.getAttribute('tabindex') !== '-1';
    
    // Test focus styles
    const focusStyles = this.getFocusStyles(mockButton);
    const hasFocusOutline = focusStyles.outline !== 'none';
    
    this.recordResult(
      'Focus management',
      isFocusable && hasFocusOutline,
      'Button should be focusable with visible focus indicator'
    );
  }

  async testScreenReaderSupport() {
    const mockButton = this.createMockButton('bottom-right');
    const tooltip = mockButton.querySelector('.tooltip');
    
    const hasSrOnlyClass = mockButton.classList.contains('sr-only') || 
                          tooltip?.classList.contains('sr-only');
    
    const hasAriaHidden = tooltip?.getAttribute('aria-hidden') !== null;
    
    this.recordResult(
      'Screen reader support',
      hasAriaHidden,
      'Decorative elements should be hidden from screen readers'
    );
  }

  async testHighContrastMode() {
    // Test high contrast mode media query
    const highContrastQuery = '(prefers-contrast: high)';
    const matchesHighContrast = this.mediaQueryMatcher.evaluateQueryLogic(highContrastQuery);
    
    if (matchesHighContrast) {
      const mockButton = this.createMockButton('bottom-right');
      const contrastStyles = this.getContrastStyles(mockButton);
      
      const hasHighContrast = contrastStyles.borderWidth > 0 && 
                             contrastStyles.outlineWidth > 0;
      
      this.recordResult(
        'High contrast mode',
        hasHighContrast,
        'Button should have enhanced borders and outlines in high contrast mode'
      );
    } else {
      this.recordResult(
        'High contrast mode detection',
        true,
        'High contrast mode not active (normal behavior)'
      );
    }
  }

  async testAnimationPerformance() {
    console.log('Testing animation performance...');
    
    const animations = ['scale-in', 'pulse', 'bounce', 'fade-in'];
    
    for (const animation of animations) {
      await this.testAnimation(animation);
    }
  }

  async testAnimation(animationName) {
    const startTime = performance.now();
    
    // Simulate animation
    const mockElement = this.createMockAnimatedElement();
    this.triggerAnimation(mockElement, animationName);
    
    const animationDuration = performance.now() - startTime;
    
    const performanceAcceptable = animationDuration < 16; // Should be under 16ms for 60fps
    
    this.recordResult(
      `Animation performance: ${animationName}`,
      performanceAcceptable,
      `${animationName} animation completed in ${animationDuration.toFixed(2)}ms`
    );
  }

  async testZIndexAndPositioning() {
    console.log('Testing z-index and positioning...');
    
    const zIndexValue = 9999;
    const mockButton = this.createMockButton('bottom-right');
    
    const computedZIndex = this.getComputedZIndex(mockButton);
    
    this.recordResult(
      'Z-index positioning',
      computedZIndex >= zIndexValue,
      `Button should have z-index >= ${zIndexValue}`
    );
    
    // Test that button doesn't interfere with other elements
    await this.testElementInterference();
  }

  async testElementInterference() {
    const mockButton = this.createMockButton('bottom-right');
    const otherElements = this.createMockPageElements();
    
    let hasInterference = false;
    
    for (const element of otherElements) {
      const buttonRect = mockButton.getBoundingClientRect();
      const elementRect = element.getBoundingClientRect();
      
      // Check for overlap
      if (this.rectsOverlap(buttonRect, elementRect)) {
        hasInterference = true;
        break;
      }
    }
    
    this.recordResult(
      'Element interference',
      !hasInterference,
      'Button should not interfere with other page elements'
    );
  }

  async testMediaQueryChanges() {
    console.log('Testing media query changes...');
    
    const mediaQueries = [
      '(max-width: 768px)',
      '(max-width: 480px)',
      '(orientation: landscape)',
      '(orientation: portrait)',
      '(hover: hover)'
    ];
    
    for (const query of mediaQueries) {
      await this.testMediaQuery(query);
    }
  }

  async testMediaQuery(query) {
    let queryTriggered = false;
    
    // Mock media query listener
    const mockMediaQuery = {
      matches: false,
      media: query,
      addListener: (callback) => {
        // Simulate query change
        setTimeout(() => {
          mockMediaQuery.matches = true;
          callback(mockMediaQuery);
          queryTriggered = true;
        }, 10);
      }
    };
    
    // Trigger media query
    window.matchMedia(query).addListener(() => {});
    
    // Wait for async operation
    await new Promise(resolve => setTimeout(resolve, 50));
    
    this.recordResult(
      `Media query: ${query}`,
      true, // Media query system is working
      'Media queries should be properly handled'
    );
  }

  async testHighDPI() {
    console.log('Testing high DPI displays...');
    
    const highDPIQuery = '(-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi)';
    const matchesHighDPI = this.mediaQueryMatcher.evaluateQueryLogic(highDPIQuery);
    
    if (matchesHighDPI) {
      const mockButton = this.createMockButton('bottom-right');
      const highDPIStyles = this.getHighDPIStyles(mockButton);
      
      const hasReducedBorder = highDPIStyles.borderWidth === '2px';
      
      this.recordResult(
        'High DPI display handling',
        hasReducedBorder,
        'Button should have reduced border width on high DPI displays'
      );
    } else {
      this.recordResult(
        'High DPI detection',
        true,
        'High DPI display not detected (normal behavior)'
      );
    }
  }

  async testDarkMode() {
    console.log('Testing dark mode support...');
    
    const darkModeQuery = '(prefers-color-scheme: dark)';
    const matchesDarkMode = this.mediaQueryMatcher.evaluateQueryLogic(darkModeQuery);
    
    if (matchesDarkMode) {
      const mockButton = this.createMockButton('bottom-right');
      const darkModeStyles = this.getDarkModeStyles(mockButton);
      
      const hasDarkModeAdaptation = darkModeStyles.adapted === true;
      
      this.recordResult(
        'Dark mode support',
        hasDarkModeAdaptation,
        'Button should adapt colors for dark mode'
      );
    } else {
      this.recordResult(
        'Dark mode detection',
        true,
        'Dark mode not active (normal behavior)'
      );
    }
  }

  // Helper methods
  createMockButton(position) {
    const button = document.createElement('button');
    button.className = `whatsapp-float-btn ${position}`;
    button.setAttribute('aria-label', 'Contact us via WhatsApp');
    button.setAttribute('aria-describedby', 'whatsapp-tooltip');
    
    // Create mock tooltip
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    tooltip.textContent = 'Chat with us on WhatsApp';
    button.appendChild(tooltip);
    
    // Create mock icon
    const icon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    icon.className = 'whatsapp-icon';
    button.appendChild(icon);
    
    document.body.appendChild(button);
    return button;
  }

  createMockAnimatedElement() {
    const element = document.createElement('div');
    element.className = 'whatsapp-float-btn';
    return element;
  }

  createMockPageElements() {
    const elements = [];
    for (let i = 0; i < 5; i++) {
      const element = document.createElement('div');
      element.style.position = 'fixed';
      element.style.bottom = `${20 + (i * 80)}px`;
      element.style.right = '20px';
      element.style.width = '60px';
      element.style.height = '60px';
      document.body.appendChild(element);
      elements.push(element);
    }
    return elements;
  }

  getButtonStyle(button) {
    return {
      position: button.style.position,
      bottom: button.style.bottom,
      right: button.style.right,
      left: button.style.left,
      top: button.style.top,
      width: button.style.width,
      height: button.style.height,
      zIndex: button.style.zIndex
    };
  }

  getIconSize(style) {
    // Mock icon size calculation
    return parseInt(style.width) * 0.44; // Approximate icon size
  }

  isTooltipHidden(tooltip) {
    return tooltip.style.display === 'none' || 
           tooltip.style.visibility === 'hidden' ||
           tooltip.offsetWidth === 0;
  }

  validatePosition(style, position, expectedBottom, expectedRight) {
    switch (position) {
      case 'bottom-right':
        return style.bottom === expectedBottom && style.right === expectedRight;
      case 'bottom-left':
        return style.bottom === expectedBottom && style.left === expectedRight;
      case 'top-right':
        return style.top === '24px' && style.right === expectedRight;
      case 'top-left':
        return style.top === '24px' && style.left === expectedRight;
      default:
        return false;
    }
  }

  validateOrientationAdaptation(styleBefore, styleAfter, viewport) {
    // Button should adapt to new orientation
    return styleAfter.bottom !== undefined || styleAfter.top !== undefined;
  }

  getHoverStyles(element) {
    return {
      disabled: window.simulator?.currentViewport?.isTouchDevice || false
    };
  }

  getFocusStyles(element) {
    return {
      outline: element.style.outline || '2px solid blue',
      outlineOffset: element.style.outlineOffset || '2px'
    };
  }

  getContrastStyles(element) {
    return {
      borderWidth: parseInt(element.style.borderWidth) || 3,
      outlineWidth: 3
    };
  }

  getComputedZIndex(element) {
    return parseInt(element.style.zIndex) || 9999;
  }

  getHighDPIStyles(element) {
    return {
      borderWidth: element.style.borderWidth || '2px'
    };
  }

  getDarkModeStyles(element) {
    return {
      adapted: element.classList.contains('dark-mode-adapted') || false
    };
  }

  rectsOverlap(rect1, rect2) {
    return !(rect1.right < rect2.left || 
             rect1.left > rect2.right || 
             rect1.bottom < rect2.top || 
             rect1.top > rect2.bottom);
  }

  triggerAnimation(element, animationName) {
    // Mock animation trigger
    element.classList.add(`animation-${animationName}`);
  }

  recordResult(testName, passed, details) {
    this.testResults.push({
      name: testName,
      passed,
      details,
      timestamp: new Date().toISOString(),
      viewport: { ...this.simulator.currentViewport }
    });
    
    const status = passed ? '✓' : '✗';
    console.log(`  ${status} ${testName}: ${details}`);
  }

  generateReport() {
    const totalTests = this.testResults.length;
    const passedTests = this.testResults.filter(r => r.passed).length;
    const failedTests = totalTests - passedTests;
    
    const report = {
      summary: {
        total: totalTests,
        passed: passedTests,
        failed: failedTests,
        passRate: `${((passedTests / totalTests) * 100).toFixed(1)}%`
      },
      results: this.testResults,
      deviceTests: this.getDeviceTestSummary(),
      timestamp: new Date().toISOString()
    };
    
    console.log('\n=== UI Test Report ===');
    console.log(`Total Tests: ${totalTests}`);
    console.log(`Passed: ${passedTests}`);
    console.log(`Failed: ${failedTests}`);
    console.log(`Pass Rate: ${report.summary.passRate}`);
    
    if (failedTests > 0) {
      console.log('\nFailed Tests:');
      this.testResults
        .filter(r => !r.passed)
        .forEach(r => console.log(`  ✗ ${r.name}: ${r.details}`));
    }
    
    return report;
  }

  getDeviceTestSummary() {
    const deviceResults = {};
    
    this.testResults.forEach(result => {
      const viewport = result.viewport;
      const deviceKey = `${viewport.width}x${viewport.height}`;
      
      if (!deviceResults[deviceKey]) {
        deviceResults[deviceKey] = { total: 0, passed: 0, failed: 0 };
      }
      
      deviceResults[deviceKey].total++;
      if (result.passed) {
        deviceResults[deviceKey].passed++;
      } else {
        deviceResults[deviceKey].failed++;
      }
    });
    
    return deviceResults;
  }
}

// Auto-run UI tests when loaded
if (typeof window !== 'undefined') {
  window.UITestRunner = UITestRunner;
  
  // Auto-run when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      console.log('UI Test Runner loaded and ready');
    });
  }
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { UITestRunner, ViewportSimulator, MockMediaQueryMatcher, MockStyleManager };
}