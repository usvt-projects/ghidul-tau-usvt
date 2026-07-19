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

// 2. Curatare text si eliminare diacritice pentru cautare flexibila
const normalizeString = s => {
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

// 4. Algoritm flexibil de cautare bazat pe potrivirea cuvintelor-cheie
function findAnswer(question) {
  const q = normalizeString(question);
  if (!q) return null;
  
  let bestMatch = null;
  let bestScore = 0;
  
  const knowledgeBase = window.USVT_KNOWLEDGE || [];
  
  knowledgeBase.forEach(item => {
    let score = 0;
    if (item.keywords && Array.isArray(item.keywords)) {
      item.keywords.forEach(keyword => {
        const normalizedKeyword = normalizeString(keyword);
        if (normalizedKeyword && q.includes(normalizedKeyword)) {
          score += 2; // Scoring mai mare pentru potrivire directa de cuvant-cheie
        }
      });
    }
    
    // Verificare suplimentara in textul raspunsului pentru siguranta
    if (item.answer && item.answer.ro && normalizeString(item.answer.ro).includes(q)) {
      score += 1;
    }
    
    if (score > bestScore) {
      bestScore = score;
      bestMatch = item;
    }
  });
  
  return bestMatch;
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
      answerArea.innerHTML = `<p>${language === 'ro' ? 'Ne pare rău, nu am găsit un răspuns exact pentru această întrebare. Vă rugăm să folosiți cuvinte cheie simple (ex: admitere, facultati, campus) sau să verificați site-ul oficial USVT.' : 'Sorry, we could not find an exact answer. Please use simple keywords or check the official USVT website.'}</p>`;
    }
  }
}

// 6. Initializare evenimente dupa incarcarea completa a paginii HTML
document.addEventListener('DOMContentLoaded', () => {
  // Comutator limba
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

  // Logica reparata pentru butoanele rapide (01 Admitere, 02 Facultati etc.)
  document.querySelectorAll('.quick-topics button, .quick-topic-card, [data-topic]').forEach(element => {
    element.addEventListener('click', (e) => {
      // Determinam subiectul in funcție de textul sau atributele butonului apasat
      const text = element.textContent ? element.textContent.toLowerCase() : '';
      let query = 'admitere'; // Valoare de rezerva
      
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
});
