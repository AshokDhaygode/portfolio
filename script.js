// typing effect for the role text
const roles = ['QA Automation Engineer', 'SDET', 'Mobile Test Automation Engineer', 'API Testing Specialist'];
const typed = document.getElementById('typed');
let roleIndex = 0;
let charIndex = 0;
let deleting = false;

function type() {
  const word = roles[roleIndex];
  typed.textContent = word.substring(0, charIndex);

  if (!deleting && charIndex < word.length) {
    charIndex++;
    setTimeout(type, 70);
  } else if (!deleting) {
    deleting = true;
    setTimeout(type, 1500);
  } else if (charIndex > 0) {
    charIndex--;
    setTimeout(type, 35);
  } else {
    deleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    setTimeout(type, 300);
  }
}
type();

// glow follows the mouse
const glow = document.getElementById('glow');
document.addEventListener('mousemove', (e) => {
  glow.style.left = e.clientX + 'px';
  glow.style.top = e.clientY + 'px';
});

// count up numbers
function countUp(el) {
  const target = Number(el.dataset.to);
  let current = 0;
  const step = Math.max(1, Math.floor(target / 60));
  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    el.textContent = current;
  }, 25);
}

// reveal sections when they scroll into view
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
      entry.target.querySelectorAll('.count').forEach(countUp);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

// mobile menu
const menuBtn = document.getElementById('menuBtn');
const navLinks = document.getElementById('navLinks');
menuBtn.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.addEventListener('click', () => navLinks.classList.remove('open'));