// Script para aplicar cursor personalizado durante seleção de texto
if (typeof window !== 'undefined') {
  let isDragging = false;
  let mouseDownTime = 0;

  const applySelectCursor = () => {
    const allElements = document.querySelectorAll('*');
    allElements.forEach((el) => {
      (el as HTMLElement).style.setProperty('cursor', "url('/select-text.svg') 8 8, text", 'important');
    });
  };

  const removeSelectCursor = () => {
    const allElements = document.querySelectorAll('*');
    allElements.forEach((el) => {
      (el as HTMLElement).style.removeProperty('cursor');
    });
  };

  document.addEventListener('mousedown', (e) => {
    mouseDownTime = Date.now();
    isDragging = false;
  });

  document.addEventListener('mousemove', (e) => {
    // Se o mouse está pressionado por mais de 50ms e movendo, é uma seleção
    if (e.buttons === 1 && Date.now() - mouseDownTime > 50) {
      if (!isDragging) {
        isDragging = true;
        applySelectCursor();
      }
    }
  });

  document.addEventListener('mouseup', () => {
    if (isDragging) {
      setTimeout(() => {
        isDragging = false;
        removeSelectCursor();
      }, 100);
    }
  });

  // Detecta quando há seleção ativa
  document.addEventListener('selectionchange', () => {
    const selection = window.getSelection()?.toString();
    if (selection && selection.length > 0 && isDragging) {
      applySelectCursor();
    }
  });
}
