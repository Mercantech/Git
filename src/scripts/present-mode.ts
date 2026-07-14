type Slide = { elements: HTMLElement[] };

const STORAGE_KEY = 'git-intro-present-mode';

function buildSlides(): Slide[] {
  const content = document.querySelector<HTMLElement>('main .content');
  if (!content) return [];

  const slides: Slide[] = [];
  let intro: HTMLElement[] = [];

  const flushIntro = () => {
    if (intro.length === 0) return;
    slides.push({ elements: [...intro] });
    intro = [];
  };

  for (const el of content.children) {
    if (!(el instanceof HTMLElement)) continue;
    if (el.matches('.breadcrumb, h1, .lead')) {
      intro.push(el);
      continue;
    }
    if (el.matches('.landing-hero, .section, .landing-cta')) {
      flushIntro();
      slides.push({ elements: [el] });
    }
  }

  flushIntro();
  return slides;
}

function allSlideElements(slides: Slide[]): HTMLElement[] {
  return slides.flatMap((s) => s.elements);
}

class PresentMode {
  private slides: Slide[] = [];
  private index = 0;
  private active = false;

  private toggleBtn = document.querySelector<HTMLButtonElement>('[data-present-toggle]');
  private controls = document.querySelector<HTMLElement>('[data-present-controls]');
  private counter = document.querySelector<HTMLElement>('[data-present-counter]');
  private prevBtn = document.querySelector<HTMLButtonElement>('[data-present-prev]');
  private nextBtn = document.querySelector<HTMLButtonElement>('[data-present-next]');
  private exitBtn = document.querySelector<HTMLButtonElement>('[data-present-exit]');
  private fullscreenBtn = document.querySelector<HTMLButtonElement>('[data-present-fullscreen]');

  init() {
    this.slides = buildSlides();
    if (this.slides.length === 0) {
      this.toggleBtn?.remove();
      return;
    }

    this.toggleBtn?.addEventListener('click', () => this.setActive(!this.active));
    this.prevBtn?.addEventListener('click', () => this.prev());
    this.nextBtn?.addEventListener('click', () => this.next());
    this.exitBtn?.addEventListener('click', () => this.setActive(false));
    this.fullscreenBtn?.addEventListener('click', () => this.toggleFullscreen());

    document.addEventListener('keydown', (e) => this.onKeydown(e));

    document.querySelectorAll<HTMLAnchorElement>('.site-nav a, .site-logo').forEach((link) => {
      link.addEventListener('click', () => {
        if (this.active) sessionStorage.setItem(STORAGE_KEY, 'true');
      });
    });

    const params = new URLSearchParams(window.location.search);
    if (params.get('present') === '1' || sessionStorage.getItem(STORAGE_KEY) === 'true') {
      this.setActive(true);
    }
  }

  private setActive(on: boolean) {
    this.active = on;
    document.body.classList.toggle('present-mode', on);

    if (this.controls) {
      this.controls.hidden = !on;
    }

    if (this.toggleBtn) {
      this.toggleBtn.setAttribute('aria-pressed', String(on));
      this.toggleBtn.textContent = on ? 'Afslut' : 'Præsentation';
    }

    if (on) {
      sessionStorage.setItem(STORAGE_KEY, 'true');
      this.showSlide(this.index);
    } else {
      sessionStorage.removeItem(STORAGE_KEY);
      this.showAll();
      if (document.fullscreenElement) {
        document.exitFullscreen().catch(() => {});
      }
    }
  }

  private showAll() {
    for (const el of allSlideElements(this.slides)) {
      el.classList.remove('present-slide-hidden', 'present-slide-active');
    }
  }

  private showSlide(i: number) {
    this.index = Math.max(0, Math.min(i, this.slides.length - 1));

    this.slides.forEach((slide, idx) => {
      const isActive = idx === this.index;
      for (const el of slide.elements) {
        el.classList.toggle('present-slide-hidden', !isActive);
        el.classList.toggle('present-slide-active', isActive);
      }
    });

    if (this.counter) {
      this.counter.textContent = `${this.index + 1} / ${this.slides.length}`;
    }

    if (this.prevBtn) this.prevBtn.disabled = this.index === 0;
    if (this.nextBtn) this.nextBtn.disabled = this.index === this.slides.length - 1;

    const firstEl = this.slides[this.index]?.elements[0];
    firstEl?.scrollIntoView({ block: 'start' });
  }

  private prev() {
    if (!this.active || this.index === 0) return;
    this.showSlide(this.index - 1);
  }

  private next() {
    if (!this.active || this.index === this.slides.length - 1) return;
    this.showSlide(this.index + 1);
  }

  private onKeydown(e: KeyboardEvent) {
    if (!this.active) return;

    const target = e.target;
    if (
      target instanceof HTMLElement &&
      target.closest('input, textarea, select, button, a, [contenteditable="true"]')
    ) {
      return;
    }

    switch (e.key) {
      case 'ArrowRight':
      case 'ArrowDown':
      case 'PageDown':
      case ' ':
        e.preventDefault();
        this.next();
        break;
      case 'ArrowLeft':
      case 'ArrowUp':
      case 'PageUp':
        e.preventDefault();
        this.prev();
        break;
      case 'Escape':
        e.preventDefault();
        this.setActive(false);
        break;
      case 'f':
      case 'F':
        if (!e.ctrlKey && !e.metaKey && !e.altKey) {
          e.preventDefault();
          this.toggleFullscreen();
        }
        break;
      case 'Home':
        e.preventDefault();
        this.showSlide(0);
        break;
      case 'End':
        e.preventDefault();
        this.showSlide(this.slides.length - 1);
        break;
    }
  }

  private toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  }
}

const present = new PresentMode();
present.init();
