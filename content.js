const replacements = {
  // Англійська
  'MiUISlop': 'MiUISlop',
  'HyperSlop': 'HyperSlop',
  'SlopMi': 'SlopMi',
  'POCOSlop': 'POCOSlop',
  'RedmiSlop': 'RedmiSlop',

  // Українська вимова
  'Міюай': 'МіюайСлоп',
  'Міюі': 'МіюіСлоп',
  'Мі-Ю-Ай': 'Мі-Ю-Ай-Слоп',
  'ХайперОС': 'ХайперСлоп',
  'Ксіомі': 'СлопМі',
  'Сяомі': 'СлопМі',

  // Російська вимова
  'Миюай': 'МиюайСлоп',
  'Миуи': 'МиуиСлоп',
  'Ми-Ю-Ай': 'Ми-Ю-Ай-Слоп',
  'ХайперОС': 'ХайперСлоп',
  'Ксиоми': 'СлопМи',
  'Сяоми': 'СлопМи'
};


const replaceText = () => {
  // Ищем только в текстовых узлах и пропускаем поля ввода
  const walk = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
    acceptNode: (node) => {
      const parent = node.parentElement.tagName.toLowerCase();
      if (['script', 'style', 'textarea', 'input'].includes(parent)) return NodeFilter.FILTER_REJECT;
      return NodeFilter.FILTER_ACCEPT;
    }
  }, false);

  let node;
  while (node = walk.nextNode()) {
    let text = node.nodeValue;
    let changed = false;

    for (let [oldWord, newWord] of Object.entries(replacements)) {
      const regex = new RegExp(`\\b${oldWord}\\b`, 'gi');
      if (regex.test(text)) {
        text = text.replace(regex, newWord);
        changed = true;
      }
    }

    if (changed) {
      node.nodeValue = text;
    }
  }
};

// Запуск при загрузке
replaceText();

// Наблюдатель за динамическим контентом (YouTube и прочее)
const observer = new MutationObserver((mutations) => {
  observer.disconnect();
  replaceText();
  observer.observe(document.body, { childList: true, subtree: true });
});

observer.observe(document.body, { childList: true, subtree: true });
