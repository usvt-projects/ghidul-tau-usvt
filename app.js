// 1. Multilingual dictionary for UI components
const translations = {
  ro: { 
    navAsk: 'Întreabă', 
    navSources: 'Surse', 
    navAbout: 'Despre', 
    eyebrow: 'Informații universitare, simplificate', 
    heroTitle: 'Răspunsuri clare pentru drumul tău la USVT.', 
    heroText: 'Descoperă admiterea, programele de studiu și viața în campus într-un ghid bilingv.' 
  },
  en: { 
    navAsk: 'Ask', 
    navSources: 'Sources', 
    navAbout: 'About', 
    eyebrow: 'University information, simplified', 
    heroTitle: 'Clear answers for your journey at USVT.', 
    heroText: 'Discover admissions, academic programs, and campus life in a bilingual guide.' 
  }
};

let language = 'ro';

// 2. Helper to remove Romanian diacritics and normalize search strings
const normalizeString = s => s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9\s]/g, "");

// 3. UI Multi-language toggle engine
function setLanguage(next) {
  language = next;
  document.documentElement.lang = next;
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    if (translations[next][key]) el.textContent = translations[next][key];
  });
}

// 4. Source-grounded search algorithm (Prevents AI Hallucinations)
function findAnswer(question) {
  const q = normalizeString(question);
  let bestMatch = null;
  let bestScore = 0;
  
  window.USVT_KNOWLEDGE.forEach(item => {
    let score = 0;
    item.keywords.forEach(keyword => {
      if (q.includes(normalizeString(keyword))) score++;
    });
    if (score > bestScore) {
      bestScore = score;
      bestMatch = item;
    }
  });
  return bestMatch;
}

// 5. Render answer with source fallback and safety HTML escaping
function renderAnswer(question) {
  const item = findAnswer(question);
  const trans = translations[language];
  const answerArea = document.getElementById('answerArea');
  
  if (item) {
    answerArea.innerHTML = `<p>${item.answer[language] || item.answer.ro}</p><p class="source-tag"><strong>${trans.navSources}:</strong> <a href="${item.source}" target="_blank">${item.source}</a></p>`;
  } else {
    answerArea.innerHTML = `<p>${language === 'ro' ? 'Ne pare rău, nu am găsit un răspuns exact. Vă rugăm să verificați site-ul oficial USVT.' : 'Sorry, we could not find an exact answer. Please check the official USVT website.'}</p>`;
  }
}

// 6. Security escape helper for user input
function escapeHtml(value) {
    return String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

// 7. Event Listeners for UI interaction
document.getElementById('languageToggle')?.addEventListener('click', () => {
  setLanguage(language === 'ro' ? 'en' : 'ro');
});

document.getElementById('questionForm')?.addEventListener('submit', event => {
  event.preventDefault();
  const inputEl = document.getElementById('questionInput');
  const query = inputEl.value.trim();
  if (query) renderAnswer(query);
});

document.querySelectorAll('.quick-topics button').forEach(button => {
  button.addEventListener('click', () => {
    const query = language === 'ro' ? button.dataset.questionRo : button.dataset.questionEn;
    document.getElementById('questionInput').value = query;
    setLanguage(language);
  });
});
