// Initialize consent state
let consentState = {
    analytics: false,
    marketing: false,
    necessary: true // Always true as these are essential cookies
};

// Function to load Google tag
function loadGoogleTag() {
    var gtagScript = document.createElement('script');
    gtagScript.async = true;
    gtagScript.src = 'https://www.googletagmanager.com/gtag/js?id=G-69M504H7QT';
    document.head.appendChild(gtagScript);

    gtag('js', new Date());
    gtag('config', 'G-69M504H7QT', {
        'anonymize_ip': true,
        'cookie_domain': 'auto',
        'cookie_flags': 'SameSite=None;Secure'
    });
}

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
        'ad_user_data': consentState.marketing ? 'granted' : 'denied',
        'ad_personalization': consentState.marketing ? 'granted' : 'denied',
        'ad_storage': consentState.marketing ? 'granted' : 'denied',
        'analytics_storage': consentState.analytics ? 'granted' : 'denied'
    });

    // If analytics is granted, load Google tag
    if (consentState.analytics) {
        loadGoogleTag();
    }
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