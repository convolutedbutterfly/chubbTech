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

  //contact form js
  document.getElementById('contact-form').addEventListener('submit', async function (e) {
    e.preventDefault();
    const form = e.target;

    const recaptchaToken = grecaptcha.getResponse();
    if (!recaptchaToken) {
      alert("Please complete the reCAPTCHA.");
      return;
    }

    const data = {
      name: form.name.value,
      email: form.email.value,
      message: form.message.value,
      recaptchaToken
    };
  
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
  
    if (res.ok) {
      alert('Message sent!');
      form.reset();
    } else {
      alert('Something went wrong.');
    }
    // Basic validation
  if (!form.name.value || form.name.value.length < 2) {
    alert("Please enter a valid name.");
    return;
  }
  if (!form.email.value || !form.email.value.includes("@")) {
    alert("Please enter a valid email address.");
    return;
  }
  if (!form.message.value || form.message.value.length < 10) {
    alert("Your message must be at least 10 characters.");
    return;
  }
  });