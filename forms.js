const storageKey = 'prospera.enrollmentSubmissions';
const form = document.getElementById('enrollment-form');
const savedSubmissions = document.getElementById('saved-submissions');
const clearButton = document.getElementById('clear-saved-submissions');
const downloadButton = document.getElementById('download-saved-submissions');

if (form && savedSubmissions) {
  const loadSubmissions = () => {
    try {
      return JSON.parse(localStorage.getItem(storageKey) || '[]');
    } catch {
      return [];
    }
  };

  const saveSubmissions = (submissions) => {
    localStorage.setItem(storageKey, JSON.stringify(submissions));
  };

  const renderSubmissions = () => {
    const submissions = loadSubmissions();

    if (!submissions.length) {
      savedSubmissions.innerHTML = '<div class="bullet-item"><strong>No saved submissions yet</strong><span>Submitted enrollment details will appear here after you save them.</span></div>';
      return;
    }

    savedSubmissions.innerHTML = submissions
      .map((submission) => {
        return `
          <div class="bullet-item">
            <strong>${submission.student} - ${submission.interest}</strong>
            <span>${submission.name} | ${submission.email}${submission.message ? ' | ' + submission.message : ''}</span>
          </div>
        `;
      })
      .join('');
  };

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const submission = {
      name: String(formData.get('name') || '').trim(),
      email: String(formData.get('email') || '').trim(),
      student: String(formData.get('student') || '').trim(),
      interest: String(formData.get('interest') || '').trim(),
      message: String(formData.get('message') || '').trim(),
      savedAt: new Date().toISOString(),
    };

    const submissions = loadSubmissions();
    submissions.unshift(submission);
    saveSubmissions(submissions);
    form.reset();
    renderSubmissions();
  });

  if (clearButton) {
    clearButton.addEventListener('click', () => {
      localStorage.removeItem(storageKey);
      renderSubmissions();
    });
  }

  if (downloadButton) {
    downloadButton.addEventListener('click', () => {
      const submissions = loadSubmissions();
      const blob = new Blob([JSON.stringify(submissions, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'prospera-submissions.json';
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
    });
  }

  renderSubmissions();
}