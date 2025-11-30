/**
 * WhatsApp Floating Contact Button Component
 * A comprehensive, accessible, and customizable WhatsApp contact button
 * for web applications with support for deep linking, animations, and graceful degradation.
 */

class WhatsAppContactButton {
  constructor(config = {}) {
    this.config = this.mergeConfig(config);
    this.button = null;
    this.toast = null;
    this.isInitialized = false;
    this.deviceInfo = this.detectDevice();
    this.animationTimeout = null;
    
    // Bind methods
    this.handleClick = this.handleClick.bind(this);
    this.handleKeydown = this.handleKeydown.bind(this);
    this.showToast = this.showToast.bind(this);
    this.hideToast = this.hideToast.bind(this);
    
    // Initialize if enabled
    if (this.config.enabled) {
      this.init();
    }
  }

  /**
   * Merge default configuration with provided config
   */
  mergeConfig(userConfig) {
    const defaultConfig = {
      enabled: true,
      phoneNumber: '',
      businessName: '',
      customMessage: '',
      position: 'bottom-right',
      zIndex: 9999,
      animationDelay: 1000,
      bounceAnimation: true,
      pulseAnimation: true,
      showOnPages: ['all'],
      tooltip: {
        enabled: true,
        text: 'Chat with us on WhatsApp',
        position: 'left'
      },
      deviceDetection: {
        androidApp: 'com.whatsapp',
        iosApp: 'whatsapp://',
        fallbackUrl: 'https://web.whatsapp.com'
      },
      analytics: {
        enabled: false,
        eventName: 'whatsapp_contact_click'
      },
      accessibility: {
        ariaLabel: 'Contact us via WhatsApp',
        keyboardShortcuts: {
          enabled: true,
          key: 'w',
          modifiers: ['ctrl', 'alt']
        }
      }
    };

    return this.deepMerge(defaultConfig, userConfig);
  }

  /**
   * Deep merge utility for objects
   */
  deepMerge(target, source) {
    const result = { ...target };
    
    for (const key in source) {
      if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
        result[key] = this.deepMerge(target[key] || {}, source[key]);
      } else {
        result[key] = source[key];
      }
    }
    
    return result;
  }

  /**
   * Initialize the WhatsApp button
   */
  init() {
    try {
      // Check if should show on current page
      if (!this.shouldShowOnPage()) {
        console.log('WhatsApp button disabled for this page');
        return;
      }

      // Create button element
      this.createButton();
      
      // Create toast container
      this.createToast();
      
      // Set up event listeners
      this.setupEventListeners();
      
      // Start animations
      this.startAnimations();
      
      this.isInitialized = true;
      console.log('WhatsApp contact button initialized successfully');
      
    } catch (error) {
      console.error('Failed to initialize WhatsApp contact button:', error);
    }
  }

  /**
   * Check if button should show on current page
   */
  shouldShowOnPage() {
    const pages = this.config.showOnPages;
    
    if (pages.includes('all')) {
      return true;
    }
    
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    return pages.some(page => {
      if (page === 'index' && (currentPage === '' || currentPage === 'index.html')) {
        return true;
      }
      return currentPage.includes(page);
    });
  }

  /**
   * Detect device and platform information
   */
  detectDevice() {
    const userAgent = navigator.userAgent.toLowerCase();
    const isMobile = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
    const isAndroid = /android/i.test(userAgent);
    const isIOS = /iphone|ipad|ipod/i.test(userAgent);
    const isTablet = /ipad|android(?!.*mobile)/i.test(userAgent);
    
    // Check for WhatsApp app
    const hasWhatsApp = this.checkWhatsAppInstalled();
    
    return {
      isMobile,
      isAndroid,
      isIOS,
      isTablet,
      hasWhatsApp,
      userAgent,
      platform: navigator.platform
    };
  }

  /**
   * Check if WhatsApp is installed on the device
   */
  checkWhatsAppInstalled() {
    const { isAndroid, isIOS } = this.deviceInfo;
    
    if (isAndroid) {
      // Try to open WhatsApp app - if installed, it will handle the intent
      return this.testAndroidIntent();
    } else if (isIOS) {
      // iOS doesn't provide reliable way to check app installation
      return this.testIOSScheme();
    }
    
    return false;
  }

  /**
   * Test Android WhatsApp intent
   */
  testAndroidIntent() {
    const start = Date.now();
    const timeout = setTimeout(() => {
      // If timeout occurs, likely no WhatsApp installed
      this.deviceInfo.hasWhatsApp = false;
    }, 2000);

    // Create iframe to test WhatsApp intent
    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    iframe.src = `whatsapp://send?text=test`;
    
    document.body.appendChild(iframe);
    
    setTimeout(() => {
      clearTimeout(timeout);
      document.body.removeChild(iframe);
      // If we're still here, WhatsApp might be installed
      this.deviceInfo.hasWhatsApp = true;
    }, 1000);
    
    return true; // Assume installed until proven otherwise
  }

  /**
   * Test iOS WhatsApp scheme
   */
  testIOSScheme() {
    // iOS doesn't allow reliable app detection
    // We'll assume it's possible and handle failures gracefully
    return true;
  }

  /**
   * Create the WhatsApp button element
   */
  createButton() {
    const button = document.createElement('button');
    button.className = `whatsapp-float-btn ${this.config.position}`;
    button.setAttribute('type', 'button');
    button.setAttribute('aria-label', this.config.accessibility.ariaLabel);
    button.setAttribute('aria-describedby', 'whatsapp-tooltip');
    button.setAttribute('data-phone', this.config.phoneNumber);
    button.setAttribute('data-message', this.config.customMessage);
    button.style.setProperty('--whatsapp-z-index', this.config.zIndex);
    
    // Create WhatsApp icon SVG
    const icon = this.createWhatsAppIcon();
    
    // Create tooltip if enabled
    if (this.config.tooltip.enabled) {
      const tooltip = document.createElement('div');
      tooltip.className = 'tooltip';
      tooltip.id = 'whatsapp-tooltip';
      tooltip.textContent = this.config.tooltip.text;
      button.appendChild(tooltip);
    }
    
    button.appendChild(icon);
    
    // Add to DOM
    document.body.appendChild(button);
    this.button = button;
  }

  /**
   * Create WhatsApp icon SVG
   */
  createWhatsAppIcon() {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.className = 'whatsapp-icon';
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('aria-hidden', 'true');
    
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', 'M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488');
    
    svg.appendChild(path);
    return svg;
  }

  /**
   * Create toast notification element
   */
  createToast() {
    const toast = document.createElement('div');
    toast.className = 'whatsapp-toast';
    toast.setAttribute('role', 'alert');
    toast.setAttribute('aria-live', 'polite');
    toast.setAttribute('aria-hidden', 'true');
    
    toast.innerHTML = `
      <div class="toast-content">
        <svg class="toast-icon" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
        </svg>
        <div class="toast-text">
          WhatsApp is not installed. Would you like to download it?
        </div>
      </div>
      <div class="toast-actions">
        <button class="toast-btn primary" onclick="window.open('https://play.google.com/store/apps/details?id=com.whatsapp', '_blank')">
          Download
        </button>
        <button class="toast-btn secondary" onclick="this.closest('.whatsapp-toast').classList.remove('visible')">
          Dismiss
        </button>
      </div>
    `;
    
    document.body.appendChild(toast);
    this.toast = toast;
  }

  /**
   * Set up event listeners
   */
  setupEventListeners() {
    if (!this.button) return;

    // Click event
    this.button.addEventListener('click', this.handleClick);
    
    // Keyboard events
    this.button.addEventListener('keydown', this.handleKeydown);
    
    // Global keyboard shortcut
    if (this.config.accessibility.keyboardShortcuts.enabled) {
      document.addEventListener('keydown', (e) => {
        this.handleGlobalKeydown(e);
      });
    }
    
    // Focus events for accessibility
    this.button.addEventListener('focus', () => {
      this.button.setAttribute('aria-pressed', 'true');
    });
    
    this.button.addEventListener('blur', () => {
      this.button.setAttribute('aria-pressed', 'false');
    });
    
    // Touch events for mobile
    this.button.addEventListener('touchstart', (e) => {
      e.preventDefault();
      this.button.style.transform = 'scale(0.95)';
    });
    
    this.button.addEventListener('touchend', (e) => {
      e.preventDefault();
      this.button.style.transform = '';
      setTimeout(() => this.handleClick(e), 10);
    });
  }

  /**
   * Handle button click
   */
  handleClick(event) {
    event.preventDefault();
    
    // Add bounce animation
    if (this.config.bounceAnimation) {
      this.button.classList.add('bounce');
      setTimeout(() => {
        this.button.classList.remove('bounce');
      }, 600);
    }
    
    // Track analytics
    if (this.config.analytics.enabled) {
      this.trackEvent(this.config.analytics.eventName);
    }
    
    // Open WhatsApp
    this.openWhatsApp();
  }

  /**
   * Handle keyboard navigation
   */
  handleKeydown(event) {
    // Handle Enter and Space keys
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.handleClick(event);
    }
    
    // Handle Escape key to close any modals or hide tooltip
    if (event.key === 'Escape') {
      if (this.toast && this.toast.classList.contains('visible')) {
        this.hideToast();
      }
    }
  }

  /**
   * Handle global keyboard shortcuts
   */
  handleGlobalKeydown(event) {
    const { key, modifiers } = this.config.accessibility.keyboardShortcuts;
    
    // Check if the pressed key matches our shortcut
    if (event.key.toLowerCase() === key.toLowerCase()) {
      let allModifiersPressed = true;
      
      if (modifiers.includes('ctrl') && !event.ctrlKey) allModifiersPressed = false;
      if (modifiers.includes('alt') && !event.altKey) allModifiersPressed = false;
      if (modifiers.includes('shift') && !event.shiftKey) allModifiersPressed = false;
      
      if (allModifiersPressed) {
        event.preventDefault();
        
        // Focus the button
        this.button.focus();
        
        // Open WhatsApp after a brief delay
        setTimeout(() => this.openWhatsApp(), 100);
      }
    }
  }

  /**
   * Open WhatsApp with appropriate deep linking
   */
  openWhatsApp() {
    const { isAndroid, isIOS, isMobile } = this.deviceInfo;
    const { phoneNumber, customMessage, businessName } = this.config;
    
    // Format phone number (remove all non-digits)
    const cleanPhone = phoneNumber.replace(/\D/g, '');
    
    // Create message with business context
    const message = customMessage || `Hello ${businessName}, I need assistance with finding my perfect vehicle. Can you help me?`;
    const encodedMessage = encodeURIComponent(message);
    
    try {
      if (isMobile) {
        if (isAndroid) {
          this.openAndroidWhatsApp(cleanPhone, encodedMessage);
        } else if (isIOS) {
          this.openIOSWhatsApp(cleanPhone, encodedMessage);
        } else {
          this.openWebWhatsApp(cleanPhone, encodedMessage);
        }
      } else {
        // Desktop - always use web WhatsApp
        this.openWebWhatsApp(cleanPhone, encodedMessage);
      }
    } catch (error) {
      console.error('Error opening WhatsApp:', error);
      // Fallback to web WhatsApp
      this.openWebWhatsApp(cleanPhone, encodedMessage);
    }
  }

  /**
   * Open WhatsApp on Android
   */
  openAndroidWhatsApp(phone, message) {
    // Try to open the app directly
    const appUrl = `whatsapp://send?phone=${phone}&text=${message}`;
    const webUrl = `https://wa.me/${phone}?text=${message}`;
    
    // Attempt to open app
    window.location.href = appUrl;
    
    // If app is not installed, fallback to web after a delay
    setTimeout(() => {
      window.open(webUrl, '_blank');
    }, 2000);
  }

  /**
   * Open WhatsApp on iOS
   */
  openIOSWhatsApp(phone, message) {
    // iOS URL scheme
    const appUrl = `whatsapp://send?phone=${phone}&text=${message}`;
    const webUrl = `https://web.whatsapp.com/send?phone=${phone}&text=${message}`;
    
    // Try to open app
    window.location.href = appUrl;
    
    // Fallback to web
    setTimeout(() => {
      window.open(webUrl, '_blank');
    }, 2000);
  }

  /**
   * Open WhatsApp Web
   */
  openWebWhatsApp(phone, message) {
    const url = `https://web.whatsapp.com/send?phone=${phone}&text=${message}`;
    
    // Check if popup blocker might interfere
    const popup = window.open(url, '_blank', 'noopener,noreferrer');
    
    if (!popup || popup.closed || typeof popup.closed === 'undefined') {
      // Popup was blocked, redirect current window
      window.location.href = url;
    }
  }

  /**
   * Start button animations
   */
  startAnimations() {
    if (!this.button) return;
    
    // Show button after delay
    this.animationTimeout = setTimeout(() => {
      this.button.classList.add('visible');
      
      // Add pulse animation if enabled
      if (this.config.pulseAnimation) {
        this.button.classList.add('pulse-ring');
      }
    }, this.config.animationDelay);
  }

  /**
   * Show toast notification
   */
  showToast(message, type = 'info') {
    if (!this.toast) return;
    
    const toastText = this.toast.querySelector('.toast-text');
    if (toastText && message) {
      toastText.textContent = message;
    }
    
    this.toast.classList.add('visible');
    this.toast.setAttribute('aria-hidden', 'false');
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
      this.hideToast();
    }, 5000);
  }

  /**
   * Hide toast notification
   */
  hideToast() {
    if (!this.toast) return;
    
    this.toast.classList.remove('visible');
    this.toast.setAttribute('aria-hidden', 'true');
  }

  /**
   * Track analytics events
   */
  trackEvent(eventName, data = {}) {
    if (!this.config.analytics.enabled) return;
    
    // Google Analytics 4
    if (typeof gtag !== 'undefined') {
      gtag('event', eventName, {
        ...data,
        event_category: 'engagement',
        event_label: 'whatsapp_contact'
      });
    }
    
    // Custom analytics
    if (typeof analytics !== 'undefined') {
      analytics.track(eventName, {
        ...data,
        source: 'whatsapp_button'
      });
    }
    
    console.log('Analytics event tracked:', eventName, data);
  }

  /**
   * Update configuration
   */
  updateConfig(newConfig) {
    this.config = this.mergeConfig(newConfig);
    
    if (this.isInitialized) {
      // Re-initialize if needed
      this.destroy();
      this.init();
    }
  }

  /**
   * Show/hide button
   */
  show() {
    if (this.button && !this.button.classList.contains('visible')) {
      this.button.classList.add('visible');
    }
  }

  hide() {
    if (this.button) {
      this.button.classList.remove('visible');
    }
  }

  /**
   * Enable/disable button
   */
  enable() {
    if (this.button) {
      this.button.setAttribute('aria-disabled', 'false');
      this.button.disabled = false;
    }
  }

  disable() {
    if (this.button) {
      this.button.setAttribute('aria-disabled', 'true');
      this.button.disabled = true;
    }
  }

  /**
   * Destroy the button and clean up
   */
  destroy() {
    if (this.animationTimeout) {
      clearTimeout(this.animationTimeout);
    }
    
    if (this.button) {
      this.button.remove();
      this.button = null;
    }
    
    if (this.toast) {
      this.toast.remove();
      this.toast = null;
    }
    
    this.isInitialized = false;
  }

  /**
   * Get device information
   */
  getDeviceInfo() {
    return { ...this.deviceInfo };
  }

  /**
   * Get current configuration
   */
  getConfig() {
    return { ...this.config };
  }
}

// Auto-initialize when DOM is ready
let whatsappButtonInstance = null;

function initializeWhatsAppButton(config = {}) {
  if (whatsappButtonInstance) {
    whatsappButtonInstance.destroy();
  }
  
  whatsappButtonInstance = new WhatsAppContactButton(config);
  return whatsappButtonInstance;
}

// Global initialization function
window.initializeWhatsAppButton = initializeWhatsAppButton;
window.WhatsAppContactButton = WhatsAppContactButton;

// Initialize when DOM is loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    // Configuration will be loaded by individual pages
    console.log('WhatsApp button component loaded and ready');
  });
} else {
  // DOM is already loaded
  console.log('WhatsApp button component loaded and ready');
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
  module.exports = WhatsAppContactButton;
}

if (typeof exports !== 'undefined') {
  exports.WhatsAppContactButton = WhatsAppContactButton;
}