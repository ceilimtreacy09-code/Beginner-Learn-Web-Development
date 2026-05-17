// =============================================
// SECTION NAVIGATION & PROGRESS BAR
// =============================================

const sectionProgress = { html: 25, css: 50, js: 75, project: 100 };

function switchSection(id, tabEl) {
  // Hide all sections, deactivate all tabs
  document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));

  // Show the target section and activate the clicked tab
  document.getElementById('section-' + id).classList.add('active');
  if (tabEl) tabEl.classList.add('active');

  // Update progress bar
  document.getElementById('progressFill').style.width = sectionProgress[id] + '%';

  // Scroll back to top smoothly
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// =============================================
// QUIZ ANSWER CHECKING
// =============================================

function checkAnswer(btn, qId, isCorrect) {
  const card = document.getElementById(qId);

  // Prevent answering twice
  if (card.dataset.answered) return;
  card.dataset.answered = 'true';

  const feedback = document.getElementById(qId + '-feedback');

  // Disable all options in this question
  card.querySelectorAll('.quiz-opt').forEach(b => b.disabled = true);

  // Mark the clicked button correct or wrong
  btn.classList.add(isCorrect ? 'correct' : 'wrong');

  // Show feedback message
  feedback.textContent = isCorrect
    ? '✅ Correct! Well done.'
    : '❌ Not quite — check the lesson above.';
  feedback.className = 'quiz-feedback show ' + (isCorrect ? 'correct' : 'wrong');
}

// =============================================
// COPY CODE BUTTON
// =============================================

function copyCode(btn) {
  // The <pre> block is always the next sibling after the .code-label div
  const pre = btn.closest('.code-label').nextElementSibling;

  navigator.clipboard.writeText(pre.innerText).then(() => {
    btn.textContent = 'COPIED!';
    setTimeout(() => btn.textContent = 'COPY', 1500);
  });
}