document.addEventListener("DOMContentLoaded", () => {
  initLoader();
  initNavbar();
  initMobileMenu();
  initBackToTop();
  initTheme();
  initSmoothScroll();
  initActiveNav();
  initCounters();
  initScrollReveal();
  initSearch();
  initFAQ();
  initTestimonials();
  initProgressBar();
  initWelcomeNotice();
  initRipple();
  initQuizEngine();
});

function initLoader() {
  const loader = document.getElementById("loader");
  if (!loader) return;

  window.addEventListener("load", () => {
    setTimeout(() => loader.classList.add("hidden"), 900);
  });
}

function initNavbar() {
  const navbar = document.querySelector(".navbar");
  if (!navbar) return;

  window.addEventListener("scroll", () => {
    navbar.classList.toggle("sticky", window.scrollY > 80);
  });
}

function initMobileMenu() {
  const menuBtn = document.querySelector(".menu-btn");
  const navLinks = document.querySelector(".nav-links");
  if (!menuBtn || !navLinks) return;

  menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("show");
    const isOpen = navLinks.classList.contains("show");
    menuBtn.innerHTML = isOpen
      ? '<i class="fas fa-times"></i>'
      : '<i class="fas fa-bars"></i>';
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("show");
      menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    });
  });
}

function initBackToTop() {
  const backBtn = document.getElementById("backToTop");
  if (!backBtn) return;

  window.addEventListener("scroll", () => {
    backBtn.style.display = window.scrollY > 500 ? "flex" : "none";
  });

  backBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

function initTheme() {
  const darkBtn = document.querySelector(".dark-btn");
  if (!darkBtn) return;

  const applyTheme = (theme) => {
    document.body.classList.toggle("light-theme", theme === "light");
    darkBtn.innerHTML =
      theme === "light"
        ? '<i class="fas fa-sun"></i>'
        : '<i class="fas fa-moon"></i>';
  };

  applyTheme(localStorage.getItem("theme") || "dark");

  darkBtn.addEventListener("click", () => {
    const next = document.body.classList.contains("light-theme")
      ? "dark"
      : "light";
    localStorage.setItem("theme", next);
    applyTheme(next);
  });
}

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      const href = anchor.getAttribute("href");
      if (!href || href === "#" || href.startsWith("#/")) return;

      const target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth" });
    });
  });
}

function initActiveNav() {
  const sections = document.querySelectorAll("section[id]");
  const navItems = document.querySelectorAll(".nav-links a");
  if (!sections.length || !navItems.length) return;

  window.addEventListener("scroll", () => {
    let current = "home";

    sections.forEach((section) => {
      if (window.scrollY >= section.offsetTop - 120) {
        current = section.getAttribute("id");
      }
    });

    navItems.forEach((link) => {
      link.classList.toggle(
        "active",
        link.getAttribute("href") === "#" + current
      );
    });
  });
}

function initCounters() {
  const counters = document.querySelectorAll(".counter");
  if (!counters.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const counter = entry.target;
        const target = parseInt(counter.dataset.target, 10);
        let count = 0;
        const step = Math.max(target / 60, 1);

        const tick = () => {
          count += step;
          if (count < target) {
            counter.textContent = Math.floor(count).toLocaleString() + "+";
            requestAnimationFrame(tick);
          } else {
            counter.textContent = target.toLocaleString() + "+";
          }
        };

        tick();
        observer.unobserve(counter);
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach((counter) => observer.observe(counter));
}

function initScrollReveal() {
  const items = document.querySelectorAll(
    ".category-card, .feature-card, .testimonial-card, .faq-item"
  );
  if (!items.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("show");
      });
    },
    { threshold: 0.15 }
  );

  items.forEach((item) => {
    item.classList.add("hidden-element");
    observer.observe(item);
  });
}

function initSearch() {
  const searchInput = document.getElementById("searchBox");
  if (!searchInput) return;

  searchInput.addEventListener("input", () => {
    const value = searchInput.value.toLowerCase().trim();

    document.querySelectorAll(".category-card").forEach((card) => {
      const text = card.textContent.toLowerCase();
      card.style.display = text.includes(value) ? "" : "none";
    });
  });
}

function initFAQ() {
  document.querySelectorAll(".faq-item").forEach((item) => {
    const answer = item.querySelector(".faq-answer");
    const toggle = item.querySelector(".faq-toggle");
    if (!answer || !toggle) return;

    item.addEventListener("click", () => {
      const isOpen = item.classList.contains("open");

      document.querySelectorAll(".faq-item").forEach((faq) => {
        faq.classList.remove("open");
        const btn = faq.querySelector(".faq-toggle");
        if (btn) btn.textContent = "+";
      });

      if (!isOpen) {
        item.classList.add("open");
        toggle.textContent = "−";
      }
    });
  });
}

function initTestimonials() {
  const cards = document.querySelectorAll(".testimonial-card");
  if (!cards.length) return;

  let index = 0;

  const show = () => {
    cards.forEach((card, i) => {
      card.classList.toggle("active", i === index);
    });
    index = (index + 1) % cards.length;
  };

  show();
  setInterval(show, 4500);
}

function initProgressBar() {
  let bar = document.getElementById("progressBar");
  if (!bar) {
    bar = document.createElement("div");
    bar.id = "progressBar";
    document.body.appendChild(bar);
  }

  window.addEventListener("scroll", () => {
    const total =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    const progress = total > 0 ? (window.scrollY / total) * 100 : 0;
    bar.style.width = progress + "%";
  });
}

function initWelcomeNotice() {
  if (sessionStorage.getItem("welcomed")) return;

  setTimeout(() => {
    const notice = document.createElement("div");
    notice.className = "welcome-popup";
    notice.innerHTML =
      '<i class="fas fa-star"></i> Welcome to Smart Quiz Master!';
    document.body.appendChild(notice);

    sessionStorage.setItem("welcomed", "1");

    setTimeout(() => {
      notice.classList.add("fade-out");
      setTimeout(() => notice.remove(), 400);
    }, 3200);
  }, 1200);
}

function initRipple() {
  document
    .querySelectorAll("button, .start-btn, .explore-btn, .quiz-start-btn")
    .forEach((btn) => {
      btn.addEventListener("click", function (e) {
        if (typeof this.getBoundingClientRect !== "function") return;

        const rect = this.getBoundingClientRect();
        const ripple = document.createElement("span");
        ripple.className = "ripple";
        ripple.style.left = e.clientX - rect.left + "px";
        ripple.style.top = e.clientY - rect.top + "px";
        this.appendChild(ripple);
        setTimeout(() => ripple.remove(), 700);
      });
    });
}

function initQuizEngine() {
  if (typeof QuizEngine !== "undefined") return;
  const modal = document.getElementById("quizModal");
  if (!modal || typeof QUIZ_DATA === "undefined") return;

  const titleEl = document.getElementById("quizTitle");
  const questionEl = document.getElementById("quizQuestion");
  const optionsEl = document.getElementById("quizOptions");
  const progressEl = document.getElementById("quizProgress");
  const progressText = document.getElementById("quizProgressText");
  const scoreEl = document.getElementById("quizScore");
  const nextBtn = document.getElementById("quizNext");
  const closeBtn = document.getElementById("quizClose");
  const resultPanel = document.getElementById("quizResult");
  const quizBody = document.getElementById("quizBody");
  const timerEl = document.getElementById("quizTimer");

  let currentQuiz = null;
  let currentIndex = 0;
  let score = 0;
  let selected = null;
  let timerInterval = null;
  let timeLeft = 30;

  function openQuiz(category) {
    currentQuiz = QUIZ_DATA[category];
    if (!currentQuiz) return;

    currentIndex = 0;
    score = 0;
    selected = null;
    resultPanel.hidden = true;
    quizBody.hidden = false;
    nextBtn.textContent = "Next Question";
    nextBtn.disabled = true;
    scoreEl.textContent = "Score: 0";
    titleEl.textContent = currentQuiz.title;
    modal.classList.add("open");
    document.body.style.overflow = "hidden";
    renderQuestion();
    startTimer();
  }

  function closeQuiz() {
    modal.classList.remove("open");
    document.body.style.overflow = "";
    stopTimer();
  }

  function startTimer() {
    stopTimer();
    timeLeft = 30;
    timerEl.textContent = timeLeft + "s";

    timerInterval = setInterval(() => {
      timeLeft -= 1;
      timerEl.textContent = timeLeft + "s";
      timerEl.classList.toggle("warning", timeLeft <= 10);

      if (timeLeft <= 0) {
        stopTimer();
        if (selected === null) revealAnswer(-1);
        setTimeout(() => goNext(), 800);
      }
    }, 1000);
  }

  function stopTimer() {
    if (timerInterval) {
      clearInterval(timerInterval);
      timerInterval = null;
    }
    timerEl.classList.remove("warning");
  }

  function renderQuestion() {
    const question = currentQuiz.questions[currentIndex];
    selected = null;
    nextBtn.disabled = true;

    const pct = ((currentIndex + 1) / currentQuiz.questions.length) * 100;
    progressEl.style.width = pct + "%";
    progressText.textContent =
      "Question " + (currentIndex + 1) + " of " + currentQuiz.questions.length;

    questionEl.textContent = question.q;
    optionsEl.innerHTML = "";

    question.options.forEach((option, i) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "quiz-option";
      btn.textContent = option;
      btn.addEventListener("click", () => selectOption(i, btn));
      optionsEl.appendChild(btn);
    });

    startTimer();
  }

  function selectOption(index, btn) {
    if (selected !== null) return;
    selected = index;
    revealAnswer(index);
    nextBtn.disabled = false;
    stopTimer();
  }

  function revealAnswer(index) {
    const correct = currentQuiz.questions[currentIndex].answer;
    const buttons = optionsEl.querySelectorAll(".quiz-option");

    buttons.forEach((btn, i) => {
      btn.disabled = true;
      if (i === correct) btn.classList.add("correct");
      if (i === index && index !== correct) btn.classList.add("wrong");
    });

    if (index === correct) {
      score += 1;
      scoreEl.textContent = "Score: " + score;
    }
  }

  function goNext() {
    currentIndex += 1;

    if (currentIndex >= currentQuiz.questions.length) {
      showResult();
      return;
    }

    renderQuestion();
  }

  function showResult() {
    quizBody.hidden = true;
    resultPanel.hidden = false;
    stopTimer();

    const total = currentQuiz.questions.length;
    const pct = Math.round((score / total) * 100);
    const emoji = pct >= 80 ? "🏆" : pct >= 50 ? "👍" : "📚";

    document.getElementById("resultEmoji").textContent = emoji;
    document.getElementById("resultScore").textContent = score + " / " + total;
    document.getElementById("resultMessage").textContent =
      pct >= 80
        ? "Excellent work! You're a quiz master!"
        : pct >= 50
        ? "Good job! Keep practicing to improve."
        : "Nice try! Review the topics and try again.";

    if (pct >= 80) celebrate();
  }

  document.querySelectorAll("[data-quiz]").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      openQuiz(btn.dataset.quiz);
    });
  });

  nextBtn.addEventListener("click", goNext);
  closeBtn.addEventListener("click", closeQuiz);

  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeQuiz();
  });

  document.getElementById("quizRetry").addEventListener("click", () => {
    const key = Object.keys(QUIZ_DATA).find(
      (k) => QUIZ_DATA[k].title === titleEl.textContent
    );
    if (key) openQuiz(key);
  });

  document.getElementById("quizDone").addEventListener("click", closeQuiz);
}

function celebrate() {
  for (let i = 0; i < 60; i++) {
    const confetti = document.createElement("div");
    confetti.className = "confetti";
    confetti.style.left = Math.random() * 100 + "vw";
    confetti.style.background = "hsl(" + Math.random() * 360 + ",100%,55%)";
    confetti.style.animationDuration = 2 + Math.random() * 2 + "s";
    document.body.appendChild(confetti);
    setTimeout(() => confetti.remove(), 4000);
  }
}

localStorage.setItem("lastVisit", new Date().toLocaleString());
