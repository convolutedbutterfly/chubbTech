// Wait until the DOM is fully loaded
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById('contact-form');
  const messageDiv = document.getElementById('form-message');

  form.addEventListener('submit', async function (e) {
    e.preventDefault();

    // Reset previous messages
    messageDiv.textContent = "";
    messageDiv.className = "hidden";

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();
    const recaptchaToken = grecaptcha.getResponse();

    // Basic form validation
    if (name.length < 2) {
      return showMessage("Please enter a valid name.", "error");
    }
    if (!email.includes("@")) {
      return showMessage("Please enter a valid email address.", "error");
    }
    if (message.length < 10) {
      return showMessage("Your message must be at least 10 characters.", "error");
    }
    if (!recaptchaToken) {
      return showMessage("Please complete the reCAPTCHA.", "error");
    }

    // Send to backend
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message, recaptchaToken })
      });

      const result = await res.json();

      if (res.ok) {
        showMessage("✅ Message sent successfully!", "success");
        form.reset();
        grecaptcha.reset();
      } else {
        showMessage(`❌ ${result.error || "Server error. Please try again."}`, "error");
      }
    } catch (err) {
      console.error(err);
      showMessage("❌ Failed to send message.", "error");
    }
  });

  function showMessage(msg, type) {
    messageDiv.textContent = msg;
    messageDiv.className = type === "success" ? "form-message success" : "form-message error";
  }

  // Expand form logic
  const expandBtn = document.getElementById("contact-form-expand-button");
  const formContainer = document.getElementById("contact-form-container");
  if (expandBtn && formContainer) {
    expandBtn.addEventListener("click", () => {
      formContainer.classList.add("visible");
      expandBtn.style.display = "none";
    });
  }
});
