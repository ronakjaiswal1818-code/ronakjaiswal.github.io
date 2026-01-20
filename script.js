document.addEventListener("DOMContentLoaded", () => {

  /* ================= SMOOTH SCROLL ================= */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
  });

  /* ================= REGISTER BUTTON ================= */
  const registerBtn = document.getElementById("registerBtn");
  if (registerBtn) {
    registerBtn.addEventListener("click", () => {
      window.location.href = "registration.html";
    });
  }

  /* ================= VIEW DETAILS TOGGLE ================= */
  const viewDetailsBtn = document.getElementById("viewDetailsBtn");
  const aboutSection = document.getElementById("about");
  let aboutVisible = false;

  if (viewDetailsBtn && aboutSection) {
    viewDetailsBtn.addEventListener("click", () => {
      if (!aboutVisible) {
        aboutSection.style.display = "block";
        viewDetailsBtn.textContent = "Hide Details";
      } else {
        aboutSection.style.display = "none";
        viewDetailsBtn.textContent = "View Details";
      }
      aboutVisible = !aboutVisible;
    });
  }

  /* ================= ELIGIBILITY ANIMATION ================= */
  const eligibilitySection = document.querySelector('.eligibility');
  const eligibilityCards = document.querySelectorAll('.eligibility-card');

  if (eligibilitySection) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          eligibilityCards.forEach(card => card.classList.add('reveal'));
          observer.disconnect();
        }
      });
    }, { threshold: 0.3 });

    observer.observe(eligibilitySection);
  }

  /* ================= NAV ACTIVE ON SCROLL ================= */
  const navLinks = document.querySelectorAll(".topbar nav a");
  const sections = document.querySelectorAll("section[id], footer[id]");

  window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach(section => {
      if (scrollY >= section.offsetTop - 120) {
        current = section.id;
      }
    });

    navLinks.forEach(link => {
      link.classList.toggle("active", link.getAttribute("href") === `#${current}`);
    });
  });

  /* ================= COUNTER ANIMATION ================= */
  document.querySelectorAll('.counter').forEach(counter => {
    const target = +counter.dataset.target;
    let count = 0;
    const step = Math.ceil(target / 80);

    const update = () => {
      count += step;
      if (count < target) {
        counter.textContent = count;
        setTimeout(update, 30);
      } else {
        counter.textContent = target;
      }
    };
    update();
  });

  /* ================= IEEE FEE AUTO UPDATE ================= */
  const ieeeSelect = document.getElementById("ieeeMember");
  const ieeeIdBox = document.getElementById("ieeeIdBox");
  const ieeeIdInput = document.getElementById("ieeeIdInput");
  const totalFee = document.getElementById("totalFee");
  const round1Fee = document.getElementById("round1Fee");
  const remainingFee = document.getElementById("remainingFee");
  const qrFeeText = document.getElementById("qrFeeText");

  if (ieeeSelect) {
    ieeeSelect.addEventListener("change", () => {

      if (ieeeSelect.value === "yes") {
        totalFee.innerHTML = "<strong>₹1200</strong> (IEEE Member)";
        round1Fee.innerHTML = "<strong>₹150</strong>";
        remainingFee.innerHTML = "<strong>₹1050</strong>";
        qrFeeText.innerHTML = "Scan QR to pay <strong>₹150</strong> (Round-1 fee)";

        ieeeIdBox.style.display = "block";
        ieeeIdInput.required = true;

      } else if (ieeeSelect.value === "no") {
        totalFee.innerHTML = "<strong>₹1500</strong> (Non-IEEE Member)";
        round1Fee.innerHTML = "<strong>₹200</strong>";
        remainingFee.innerHTML = "<strong>₹1300</strong>";
        qrFeeText.innerHTML = "Scan QR to pay <strong>₹200</strong> (Round-1 fee)";

        ieeeIdBox.style.display = "none";
        ieeeIdInput.required = false;
        ieeeIdInput.value = "";
      }
    });
  }

  /* ================= GALLERY ================= */
  const galleryPanel = document.getElementById("galleryPanel");
  if (galleryPanel) {
    const images = [
      "assets/images/img1.jpg",
      "assets/images/img2.jpg",
      "assets/images/img3.jpg",
      "assets/images/img4.jpg"
    ];

    let index = 0;
    const img = document.getElementById("galleryImage");

    document.getElementById("nextImg").onclick = () => {
      index = (index + 1) % images.length;
      img.src = images[index];
    };

    document.getElementById("prevImg").onclick = () => {
      index = (index - 1 + images.length) % images.length;
      img.src = images[index];
    };

    document.getElementById("closeGallery").onclick = () => {
      galleryPanel.classList.remove("active");
    };

    window.openGallery = () => {
      index = 0;
      img.src = images[index];
      galleryPanel.classList.add("active");
    };
  }

});
