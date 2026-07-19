// 1. Dictionar bilingv pentru componentele de interfata
const translations = {
  ro: { 
    navAsk: 'Întreabă', 
    navSources: 'Surse', 
    navAbout: 'Despre', 
    eyebrow: 'Informații universitare, simplificate', 
    heroTitle: 'Răspunsuri clare pentru drumul tău la USVT.', 
    heroText: 'Descoperă admiterea, programele de studiu și viața în campus într-un ghid bilingv.',
    navSourcesLabel: 'Surse'
  },
  en: { 
    navAsk: 'Ask', 
    navSources: 'Sources', 
    navAbout: 'About', 
    eyebrow: 'University information, simplified', 
    heroTitle: 'Clear answers for your journey at USVT.', 
    heroText: 'Discover admissions, academic programs, and campus life in a bilingual guide.',
    navSourcesLabel: 'Sources'
  }
};

let language = 'ro';

// 2. Curatare text si transformare in litere mici
const cleanText = s => {
  if (!s) return '';
  return s.toLowerCase()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, "")
          .replace(/[^a-z0-9\s]/g, "")
          .trim();
};

// 3. Schimbarea bilingva a interfetei grafice
function setLanguage(next) {
  language = next;
  document.documentElement.lang = next;
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    if (translations[next][key]) el.textContent = translations[next][key];
  });
}

// 4. Cautare simpla si directa in baza de date USVT
function findAnswer(question) {
  const q = cleanText(question);
  if (!q) return null;
  
  let match = null;
  const knowledgeBase = window.USVT_KNOWLEDGE || [];
  
  // Cautam daca textul introdus contine vreun cuvant cheie din baza de date
  knowledgeBase.forEach(item => {
    if (item.keywords && Array.isArray(item.keywords)) {
      item.keywords.forEach(keyword => {
        const ck = cleanText(keyword);
        if (ck && (q.includes(ck) || ck.includes(q))) {
          match = item;
        }
      });
    }
  });
  
  return match;
}

// 5. Afisarea raspunsului in zona de chat
function renderAnswer(question) {
  const item = findAnswer(question);
  const trans = translations[language];
  const answerArea = document.getElementById('answerArea');
  
  if (answerArea) {
    if (item && item.answer) {
      const answerText = item.answer[language] || item.answer.ro || '';
      const sourceLabel = trans.navSourcesLabel || 'Surse';
      answerArea.innerHTML = `<p>${answerText}</p><p class="source-tag"><strong>${sourceLabel}:</strong> <a href="${item.source}" target="_blank">${item.source}</a></p>`;
    } else {
      answerArea.innerHTML = `<p>${language === 'ro' ? 'Nu am găsit un răspuns exact. Încearcă cuvinte simple ca: admitere, facultati, campus.' : 'Answer not found. Please try keywords like: admission, faculties, campus.'}</p>`;
    }
  }
}

// 6. Initializare evenimente
document.getElementById('languageToggle')?.addEventListener('click', () => {
  setLanguage(language === 'ro' ? 'en' : 'ro');
});

// Trimitere formular manual
document.getElementById('questionForm')?.addEventListener('submit', event => {
  event.preventDefault();
  const inputEl = document.getElementById('questionInput');
  if (inputEl) {
    const query = inputEl.value.trim();
    if (query) renderAnswer(query);
  }
});

// Ascultator complet pentru butoanele rapide
document.querySelectorAll('.quick-topics button, .quick-topic-card, [data-topic], .quick-topics a').forEach(element => {
  element.addEventListener('click', (e) => {
    e.preventDefault();
    const text = element.textContent ? element.textContent.toLowerCase() : '';
    let query = 'admitere';
    
    if (text.includes('admitere')) query = 'admitere';
    else if (text.includes('facult')) query = 'facultate';
    else if (text.includes('programe') || text.includes('studiu')) query = 'program';
    else if (text.includes('campus') || text.includes('camin')) query = 'campus';
    
    const inputEl = document.getElementById('questionInput');
    if (inputEl) {
      inputEl.value = element.textContent ? element.textContent.trim() : query;
    }
    
    renderAnswer(query);
  });
});
