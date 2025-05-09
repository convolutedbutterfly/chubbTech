  //contact form js
  document.getElementById('contact-form').addEventListener('submit', async function (e) {
    e.preventDefault();
    const form = e.target;

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

    // reCAPTCHA
    const recaptchaToken = grecaptcha.getResponse();
    if (!recaptchaToken) {
      alert("Please complete the reCAPTCHA.");
      return;
    }

    // Build payload
    const data = {
      name: form.name.value,
      email: form.email.value,
      message: form.message.value,
      recaptchaToken
    };

    try {
      const res = await fetch('chubb-tech.vercel.app/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      const result = await res.json();
      if (res.ok) {
        alert("Message sent successfully!");
        form.reset();
        grecaptcha.reset(); // reset reCAPTCHA
      } else {
        alert("Server error: " + (result.error || "Something went wrong."));
      }
    } catch (err) {
      console.error(err);
      alert("Failed to send message.");
    }
  });

  const expandBtn = document.getElementById("contact-form-expand-button");
  const form = document.getElementById("contact-form-container");
  
  expandBtn.addEventListener("click", function() {
      form.classList.add("visible")
      expandBtn.style.display = "none";
    }
  );
