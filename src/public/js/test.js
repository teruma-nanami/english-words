document.addEventListener('DOMContentLoaded', function () {
  let currentWordIndex = 0;
  const totalWords = document.querySelectorAll('.word-container').length;
  let understoodCount = 0;
  let didNotUnderstandCount = 0;

  // 読み上げ機能を実装予定
  document.querySelectorAll('.word').forEach(function (element) {
    element.addEventListener('click', function () {
      const word = this.dataset.word;
      const utterance = new SpeechSynthesisUtterance(word);
      utterance.lang = 'en-US'; // 読み上げ言語を設定
      window.speechSynthesis.speak(utterance);
    });
  });

  function showNextWord() {
    document.getElementById(`word-${currentWordIndex}`).style.display = 'none';
    currentWordIndex++;
    if (currentWordIndex < totalWords) {
      document.getElementById(`word-${currentWordIndex}`).style.display = 'block';
    } else {
      document.getElementById('quiz').style.display = 'none';
      document.getElementById('results').classList.remove('hidden');
      document.getElementById('understoodCount').innerText = understoodCount;
      document.getElementById('didNotUnderstandCount').innerText = didNotUnderstandCount;
    }
  }

  document.querySelectorAll('.showAnswer').forEach(button => {
    button.addEventListener('click', function () {
      const parent = this.parentElement;
      parent.querySelector('.answer').classList.remove('hidden');
      parent.querySelector('.understood').classList.remove('hidden');
      parent.querySelector('.didNotUnderstand').classList.remove('hidden');
      this.disabled = true;
    });
  });

  document.querySelectorAll('.understood').forEach(button => {
    button.addEventListener('click', function () {
      understoodCount++;
      showNextWord();
    });
  });

  document.querySelectorAll('.didNotUnderstand').forEach(button => {
    button.addEventListener('click', function () {
      didNotUnderstandCount++;
      showNextWord();
    });
  });
});
