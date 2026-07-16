const buttons = document.querySelectorAll('.specular-button');

for (const button of buttons) {
  button.style.setProperty('--spec-x', '50%');
  button.style.setProperty('--spec-y', '35%');
  button.style.setProperty('--spec-glow', '0.22');

  const updatePointer = (event) => {
    const rect = button.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    button.style.setProperty('--spec-x', `${Math.max(0, Math.min(100, x)).toFixed(2)}%`);
    button.style.setProperty('--spec-y', `${Math.max(0, Math.min(100, y)).toFixed(2)}%`);
    button.style.setProperty('--spec-glow', '0.35');
  };

  button.addEventListener('pointerenter', updatePointer);
  button.addEventListener('pointermove', updatePointer);
  button.addEventListener('pointerleave', () => {
    button.style.setProperty('--spec-x', '50%');
    button.style.setProperty('--spec-y', '35%');
    button.style.setProperty('--spec-glow', '0.22');
  });
}