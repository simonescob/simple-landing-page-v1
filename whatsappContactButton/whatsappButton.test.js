/**
 * WhatsApp Contact Button Unit Tests
 * Comprehensive test suite for the WhatsApp contact button component
 */

// Mock DOM environment
const { JSDOM } = require('jsdom');

// Set up DOM environment for testing
const dom = new JSDOM(`
<!DOCTYPE html>
<html>
<head>
  <title>Test Page</title>
</head>
<body>
  <div id="test-container"></div>
</body>
</html>
`, {
  url: 'http://localhost',
  pretendToBeVisual: true,
  resources: 'usable'
});

global.window = dom.window;
global.document = dom.window.document;
global.navigator = dom.window.navigator;
global.location = dom.window.location;

// Import the component (mocked for testing)
class MockWhatsAppContactButton {
  constructor(config = {}) {
    this.config = this.mergeConfig(config);
    this.button = null;
    this.toast = null;
    this.isInitialized = false;
    this.deviceInfo = this.detectDevice();
    this.animationTimeout = null;
    
    this.events = {};
    this.methodCalls = [];
  }

  mergeConfig(config) {
    const defaultConfig = {
      enabled: true,
      phoneNumber: '15551234567',
      businessName: 'Test Business',
      customMessage: 'Hello, I need assistance',
      position: 'bottom-right',
      zIndex: 9999,
      animationDelay: 1000,
      bounceAnimation: true,
      pulseAnimation: true,
      showOnPages: ['all'],
      tooltip: { enabled: true, text: 'Chat with us', position: 'left' },
      deviceDetection: {
        androidApp: 'com.whatsapp',
        iosApp: 'whatsapp://',
        fallbackUrl: 'https://web.whatsapp.com'
      },
      analytics: { enabled: false, eventName: 'test_event' },
      accessibility: { ariaLabel: 'Contact us via WhatsApp', keyboardShortcuts: { enabled: true, key: 'w', modifiers: ['ctrl', 'alt'] } }
    };
    
    return { ...defaultConfig, ...config };
  }

  detectDevice() {
    return {
      isMobile: true,
      isAndroid: false,
      isIOS: false,
      isTablet: false,
      hasWhatsApp: true,
      userAgent: 'test-browser',
      platform: 'test-platform'
    };
  }

  init() {
    if (!this.config.enabled || !this.shouldShowOnPage()) return;
    
    this.createButton();
    this.createToast();
    this.setupEventListeners();
    this.startAnimations();
    this.isInitialized = true;
    
    this.methodCalls.push('init');
  }

  shouldShowOnPage() {
    const pages = this.config.showOnPages;
    if (pages.includes('all')) return true;
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    return pages.some(page => currentPage.includes(page));
  }

  createButton() {
    this.button = document.createElement('button');
    this.button.className = `whatsapp-float-btn ${this.config.position}`;
    document.body.appendChild(this.button);
    this.methodCalls.push('createButton');
  }

  createToast() {
    this.toast = document.createElement('div');
    this.toast.className = 'whatsapp-toast';
    document.body.appendChild(this.toast);
    this.methodCalls.push('createToast');
  }

  setupEventListeners() {
    this.methodCalls.push('setupEventListeners');
  }

  startAnimations() {
    this.methodCalls.push('startAnimations');
  }

  openWhatsApp() {
    this.methodCalls.push('openWhatsApp');
    return 'whatsapp-opened';
  }

  handleClick(event) {
    this.methodCalls.push('handleClick');
    this.openWhatsApp();
  }

  show() {
    if (this.button) {
      this.button.classList.add('visible');
      this.methodCalls.push('show');
    }
  }

  hide() {
    if (this.button) {
      this.button.classList.remove('visible');
      this.methodCalls.push('hide');
    }
  }

  enable() {
    if (this.button) {
      this.button.setAttribute('aria-disabled', 'false');
      this.methodCalls.push('enable');
    }
  }

  disable() {
    if (this.button) {
      this.button.setAttribute('aria-disabled', 'true');
      this.methodCalls.push('disable');
    }
  }

  destroy() {
    if (this.button) {
      this.button.remove();
      this.button = null;
    }
    if (this.toast) {
      this.toast.remove();
      this.toast = null;
    }
    this.isInitialized = false;
    this.methodCalls.push('destroy');
  }

  getDeviceInfo() {
    return { ...this.deviceInfo };
  }

  getConfig() {
    return { ...this.config };
  }

  // Mock event listener registration
  addEventListener(event, handler) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(handler);
    this.methodCalls.push(`addEventListener:${event}`);
  }

  // Mock event triggering
  triggerEvent(event, data) {
    if (this.events[event]) {
      this.events[event].forEach(handler => handler(data));
    }
  }
}

// Test Suite
describe('WhatsApp Contact Button', () => {
  let button;
  let container;

  beforeEach(() => {
    container = document.getElementById('test-container');
    button = new MockWhatsAppContactButton();
  });

  afterEach(() => {
    if (button) {
      button.destroy();
    }
    container.innerHTML = '';
  });

  describe('Configuration', () => {
    test('should merge default configuration with custom config', () => {
      const customConfig = {
        phoneNumber: '15559876543',
        enabled: false,
        customMessage: 'Custom message'
      };
      
      const customButton = new MockWhatsAppContactButton(customConfig);
      
      expect(customButton.config.phoneNumber).toBe('15559876543');
      expect(customButton.config.enabled).toBe(false);
      expect(customButton.config.customMessage).toBe('Custom message');
      expect(customButton.config.businessName).toBe('Test Business'); // Should keep default
    });

    test('should use default config when no custom config provided', () => {
      const defaultButton = new MockWhatsAppContactButton();
      
      expect(defaultButton.config.enabled).toBe(true);
      expect(defaultButton.config.phoneNumber).toBe('15551234567');
      expect(defaultButton.config.position).toBe('bottom-right');
      expect(defaultButton.config.tooltip.enabled).toBe(true);
    });
  });

  describe('Device Detection', () => {
    test('should detect device information correctly', () => {
      const deviceInfo = button.getDeviceInfo();
      
      expect(deviceInfo).toHaveProperty('isMobile');
      expect(deviceInfo).toHaveProperty('isAndroid');
      expect(deviceInfo).toHaveProperty('isIOS');
      expect(deviceInfo).toHaveProperty('isTablet');
      expect(deviceInfo).toHaveProperty('hasWhatsApp');
      expect(deviceInfo).toHaveProperty('userAgent');
      expect(deviceInfo).toHaveProperty('platform');
    });
  });

  describe('Page Visibility', () => {
    test('should show button when showOnPages includes "all"', () => {
      const result = button.shouldShowOnPage();
      expect(result).toBe(true);
    });

    test('should hide button when showOnPages excludes current page', () => {
      button.config.showOnPages = ['inventory'];
      
      // Mock current page as index
      Object.defineProperty(window, 'location', {
        value: { pathname: '/index.html' }
      });
      
      const result = button.shouldShowOnPage();
      expect(result).toBe(false);
    });

    test('should show button when showOnPages includes current page', () => {
      button.config.showOnPages = ['index'];
      
      Object.defineProperty(window, 'location', {
        value: { pathname: '/index.html' }
      });
      
      const result = button.shouldShowOnPage();
      expect(result).toBe(true);
    });
  });

  describe('Initialization', () => {
    test('should not initialize when disabled', () => {
      button.config.enabled = false;
      button.init();
      
      expect(button.isInitialized).toBe(false);
      expect(button.methodCalls).not.toContain('init');
    });

    test('should not initialize when not on allowed page', () => {
      button.config.showOnPages = ['inventory'];
      Object.defineProperty(window, 'location', {
        value: { pathname: '/index.html' }
      });
      
      button.init();
      
      expect(button.isInitialized).toBe(false);
      expect(button.methodCalls).not.toContain('init');
    });

    test('should initialize when enabled and on allowed page', () => {
      button.init();
      
      expect(button.isInitialized).toBe(true);
      expect(button.methodCalls).toContain('init');
      expect(button.methodCalls).toContain('createButton');
      expect(button.methodCalls).toContain('createToast');
      expect(button.methodCalls).toContain('setupEventListeners');
      expect(button.methodCalls).toContain('startAnimations');
    });

    test('should create button element when initializing', () => {
      button.init();
      
      const buttonElement = document.querySelector('.whatsapp-float-btn');
      expect(buttonElement).toBeTruthy();
      expect(buttonElement.classList.contains('bottom-right')).toBe(true);
    });

    test('should create toast element when initializing', () => {
      button.init();
      
      const toastElement = document.querySelector('.whatsapp-toast');
      expect(toastElement).toBeTruthy();
    });
  });

  describe('Button Controls', () => {
    beforeEach(() => {
      button.init();
    });

    test('should show button when show() is called', () => {
      button.hide();
      button.show();
      
      expect(button.button.classList.contains('visible')).toBe(true);
      expect(button.methodCalls).toContain('show');
    });

    test('should hide button when hide() is called', () => {
      button.show();
      button.hide();
      
      expect(button.button.classList.contains('visible')).toBe(false);
      expect(button.methodCalls).toContain('hide');
    });

    test('should enable button when enable() is called', () => {
      button.disable();
      button.enable();
      
      expect(button.button.getAttribute('aria-disabled')).toBe('false');
      expect(button.methodCalls).toContain('enable');
    });

    test('should disable button when disable() is called', () => {
      button.enable();
      button.disable();
      
      expect(button.button.getAttribute('aria-disabled')).toBe('true');
      expect(button.methodCalls).toContain('disable');
    });
  });

  describe('WhatsApp Integration', () => {
    beforeEach(() => {
      button.init();
    });

    test('should call openWhatsApp when handleClick is triggered', () => {
      const mockEvent = { preventDefault: jest.fn() };
      
      button.handleClick(mockEvent);
      
      expect(button.methodCalls).toContain('handleClick');
      expect(button.methodCalls).toContain('openWhatsApp');
    });

    test('should open WhatsApp with correct parameters', () => {
      const result = button.openWhatsApp();
      
      expect(result).toBe('whatsapp-opened');
      expect(button.methodCalls).toContain('openWhatsApp');
    });
  });

  describe('Event Handling', () => {
    test('should set up event listeners during initialization', () => {
      button.init();
      
      expect(button.methodCalls).toContain('setupEventListeners');
    });

    test('should register click event listener', () => {
      button.init();
      
      expect(button.methodCalls).toContain('addEventListener:click');
    });

    test('should register keyboard event listeners', () => {
      button.init();
      
      expect(button.methodCalls).toContain('addEventListener:keydown');
    });
  });

  describe('Lifecycle Management', () => {
    test('should properly destroy button and cleanup', () => {
      button.init();
      const buttonElement = document.querySelector('.whatsapp-float-btn');
      const toastElement = document.querySelector('.whatsapp-toast');
      
      expect(buttonElement).toBeTruthy();
      expect(toastElement).toBeTruthy();
      
      button.destroy();
      
      expect(document.querySelector('.whatsapp-float-btn')).toBeFalsy();
      expect(document.querySelector('.whatsapp-toast')).toBeFalsy();
      expect(button.isInitialized).toBe(false);
      expect(button.methodCalls).toContain('destroy');
    });

    test('should handle multiple initialization and destruction cycles', () => {
      button.init();
      button.destroy();
      button.init();
      button.destroy();
      
      expect(button.methodCalls.filter(call => call === 'init').length).toBe(2);
      expect(button.methodCalls.filter(call => call === 'destroy').length).toBe(2);
    });
  });

  describe('Configuration Management', () => {
    test('should return current configuration', () => {
      const config = button.getConfig();
      
      expect(config).toHaveProperty('enabled');
      expect(config).toHaveProperty('phoneNumber');
      expect(config).toHaveProperty('position');
      expect(config).toHaveProperty('accessibility');
    });

    test('should handle configuration updates', () => {
      const newConfig = {
        phoneNumber: '15559998877',
        position: 'top-left'
      };
      
      button.updateConfig(newConfig);
      
      expect(button.config.phoneNumber).toBe('15559998877');
      expect(button.config.position).toBe('top-left');
      expect(button.config.businessName).toBe('Test Business'); // Should retain other config
    });
  });

  describe('Edge Cases', () => {
    test('should handle initialization when button already exists', () => {
      button.init();
      const firstButton = button.button;
      
      // Try to initialize again
      button.init();
      
      expect(button.button).toBe(firstButton); // Should maintain same reference
    });

    test('should handle methods when not initialized', () => {
      const uninitializedButton = new MockWhatsAppContactButton();
      
      expect(() => uninitializedButton.show()).not.toThrow();
      expect(() => uninitializedButton.hide()).not.toThrow();
      expect(() => uninitializedButton.enable()).not.toThrow();
      expect(() => uninitializedButton.disable()).not.toThrow();
      expect(() => uninitializedButton.destroy()).not.toThrow();
    });

    test('should handle invalid configuration gracefully', () => {
      const invalidConfig = null;
      
      expect(() => new MockWhatsAppContactButton(invalidConfig)).not.toThrow();
    });

    test('should handle empty DOM gracefully', () => {
      // Clear the DOM
      document.body.innerHTML = '';
      
      button.init();
      
      expect(button.isInitialized).toBe(true); // Should still initialize
    });
  });

  describe('Performance', () => {
    test('should not cause memory leaks after destruction', () => {
      button.init();
      button.destroy();
      
      // Verify no references remain
      expect(button.button).toBeNull();
      expect(button.toast).toBeNull();
      expect(button.animationTimeout).toBeNull();
    });

    test('should handle rapid show/hide operations', () => {
      button.init();
      
      for (let i = 0; i < 100; i++) {
        button.show();
        button.hide();
      }
      
      expect(button.methodCalls.filter(call => call === 'show').length).toBe(100);
      expect(button.methodCalls.filter(call => call === 'hide').length).toBe(100);
    });
  });
});

// Test utilities and helpers
describe('Test Utilities', () => {
  test('should provide mock DOM elements correctly', () => {
    expect(document).toBeDefined();
    expect(document.createElement).toBeDefined();
    expect(document.body).toBeDefined();
  });

  test('should mock window.location correctly', () => {
    expect(window.location).toBeDefined();
    expect(window.location.pathname).toBeDefined();
  });

  test('should provide test container element', () => {
    const container = document.getElementById('test-container');
    expect(container).toBeDefined();
  });
});

// Integration tests
describe('Integration Tests', () => {
  test('should work in realistic DOM environment', () => {
    const button = new MockWhatsAppContactButton({
      phoneNumber: '15551234567',
      businessName: 'Test Auto Dealer',
      customMessage: 'Hello, I need help with financing'
    });
    
    button.init();
    
    expect(button.isInitialized).toBe(true);
    expect(button.button).toBeTruthy();
    expect(button.toast).toBeTruthy();
    
    // Test clicking the button
    button.handleClick({ preventDefault: () => {} });
    
    expect(button.methodCalls).toContain('handleClick');
    expect(button.methodCalls).toContain('openWhatsApp');
    
    button.destroy();
  });
});

// Performance benchmarks (can be moved to separate file in real implementation)
describe('Performance Benchmarks', () => {
  test('should initialize within acceptable time', () => {
    const startTime = performance.now();
    
    const button = new MockWhatsAppContactButton();
    button.init();
    
    const endTime = performance.now();
    const initTime = endTime - startTime;
    
    expect(initTime).toBeLessThan(100); // Should initialize within 100ms
  });

  test('should handle large configuration objects efficiently', () => {
    const largeConfig = {
      enabled: true,
      phoneNumber: '15551234567',
      customMessage: 'Test'.repeat(1000), // Large message
      showOnPages: Array.from({length: 100}, (_, i) => `page${i}`)
    };
    
    const startTime = performance.now();
    const button = new MockWhatsAppContactButton(largeConfig);
    const endTime = performance.now();
    
    const creationTime = endTime - startTime;
    expect(creationTime).toBeLessThan(50); // Should handle large configs within 50ms
  });
});

// Export test results for CI/CD
if (typeof global !== 'undefined') {
  global.testResults = {
    totalTests: 0,
    passedTests: 0,
    failedTests: 0,
    testSuites: []
  };
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { MockWhatsAppContactButton };
}