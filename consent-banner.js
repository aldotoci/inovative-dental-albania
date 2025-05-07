// Initialize consent state
let consentState = {
    analytics: false,
    marketing: false,
    necessary: true // Always true as these are essential cookies
};

// Function to show the consent banner
function showConsentBanner() {
    const banner = document.getElementById('consent-banner');
    if (!localStorage.getItem('consent-given')) {
        banner.classList.add('active');
    }
}

// Function to hide the consent banner
function hideConsentBanner() {
    const banner = document.getElementById('consent-banner');
    banner.classList.remove('active');
}

// Function to show preferences panel
function showPreferences() {
    const preferences = document.getElementById('consent-preferences');
    preferences.classList.add('active');
}

// Function to save preferences
function savePreferences() {
    const analyticsCheckbox = document.getElementById('analytics-consent');
    const marketingCheckbox = document.getElementById('marketing-consent');

    consentState.analytics = analyticsCheckbox.checked;
    consentState.marketing = marketingCheckbox.checked;

    // Update Google Analytics consent state
    updateConsentState();

    // Save to localStorage
    localStorage.setItem('consent-given', 'true');
    localStorage.setItem('consent-state', JSON.stringify(consentState));

    hideConsentBanner();
}

// Function to accept all
function acceptAll() {
    consentState.analytics = true;
    consentState.marketing = true;

    // Update Google Analytics consent state
    updateConsentState();

    // Save to localStorage
    localStorage.setItem('consent-given', 'true');
    localStorage.setItem('consent-state', JSON.stringify(consentState));

    hideConsentBanner();
}

// Function to update Google Analytics consent state
function updateConsentState() {
    // Update Google Analytics consent mode
    gtag('consent', 'update', {
        'analytics_storage': consentState.analytics ? 'granted' : 'denied',
        'ad_storage': consentState.marketing ? 'granted' : 'denied'
    });

    // If analytics is granted, initialize Google Analytics
    if (consentState.analytics) {
        initializeGoogleAnalytics();
    }
}

// Function to initialize Google Analytics
function initializeGoogleAnalytics() {
    // Google Analytics is already initialized in the head, but we can add additional configuration here
    gtag('config', 'G-69M504H7QT', {
        'anonymize_ip': true,
        'cookie_domain': 'auto',
        'cookie_flags': 'SameSite=None;Secure'
    });
}

// Load saved preferences on page load
document.addEventListener('DOMContentLoaded', function() {
    const savedConsent = localStorage.getItem('consent-state');
    if (savedConsent) {
        consentState = JSON.parse(savedConsent);
        updateConsentState();
    } else {
        showConsentBanner();
    }
}); 