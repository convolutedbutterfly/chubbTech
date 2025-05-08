  // Function to hide the banner
  function hideBanner() {
    document.getElementById("cookie-banner").style.display = "none";
    }

  // Check for existing consent
  const consent = localStorage.getItem("cookieConsent");
  if (consent === "accepted" || consent === "declined") {
    hideBanner();
  }

  // Handle Accept button click
  document.getElementById("accept-cookies").addEventListener("click", function () {
    localStorage.setItem("cookieConsent", "accepted");
    hideBanner();
    // Initialize analytics or other scripts here
  });

  // Handle Decline button click
  document.getElementById("decline-cookies").addEventListener("click", function () {
    localStorage.setItem("cookieConsent", "declined");
    hideBanner();
    // Do not initialize analytics or other scripts
  });