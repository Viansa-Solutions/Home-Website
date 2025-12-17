// Contact form handling
const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

contactForm.addEventListener("submit", function (e) {
  e.preventDefault();

  // Get existing messages OR empty array
  let messages = JSON.parse(localStorage.getItem("messages")) || [];

  const newMessage = {
    id: Date.now(), // unique id
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    phone: document.getElementById("phone").value,
    service: document.getElementById("service").value,
    message: document.getElementById("message").value,
    time: new Date().toISOString(),
    status: "incomplete"
  };

  // Add new message
  messages.push(newMessage);

  // Save back to localStorage
  localStorage.setItem("messages", JSON.stringify(messages));

  // UI feedback
  const submitButton = contactForm.querySelector(".submit-button");
  submitButton.disabled = true;
  submitButton.textContent = "Sending...";

  setTimeout(() => {
    formMessage.textContent =
      "Thank you! Your message has been sent successfully.";
    formMessage.className = "form-message success";
    formMessage.style.display = "block";

    contactForm.reset();

    submitButton.disabled = false;
    submitButton.textContent = "Send Message";

    setTimeout(() => {
      formMessage.style.display = "none";
    }, 5000);
  }, 1000);
});
