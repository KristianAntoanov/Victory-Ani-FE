import { useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';

const REVEAL_SELECTOR = [
  ':scope > section',
  ':scope > article',
  ':scope > div > section',
  'section article',
  'section .card',
].join(', ');

export default function ScrollRevealManager() {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    const root = document.querySelector<HTMLElement>('#main-content');

    if (!root) return undefined;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reducedMotion || !('IntersectionObserver' in window)) {
      root.querySelectorAll<HTMLElement>(REVEAL_SELECTOR).forEach((element) => {
        element.classList.add('reveal', 'is-visible');
      });
      return undefined;
    }

    let revealIndex = 0;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const element = entry.target as HTMLElement;

          if (entry.isIntersecting) {
            element.classList.add('is-visible');
            element.dataset.revealPosition = 'visible';
            return;
          }

          element.classList.remove('is-visible');
          element.dataset.revealPosition = entry.boundingClientRect.top < 0 ? 'above' : 'below';
        });
      },
      {
        rootMargin: '0px 0px -7% 0px',
        threshold: [0, 0.08],
      },
    );

    const prepareElement = (element: HTMLElement) => {
      if (element.dataset.revealReady === 'true') {
        observer.observe(element);
        return;
      }

      element.dataset.revealReady = 'true';
      element.classList.add('reveal');
      element.style.setProperty('--reveal-delay', `${Math.min(revealIndex % 4, 3) * 55}ms`);
      revealIndex += 1;

      const bounds = element.getBoundingClientRect();
      const isOnScreen = bounds.bottom > 0 && bounds.top < window.innerHeight;

      if (isOnScreen) {
        element.classList.add('is-visible');
        element.dataset.revealPosition = 'visible';
      } else {
        element.dataset.revealPosition = bounds.top < 0 ? 'above' : 'below';
      }

      observer.observe(element);
    };

    const prepareTree = (scope: ParentNode) => {
      scope.querySelectorAll<HTMLElement>(REVEAL_SELECTOR).forEach(prepareElement);
    };

    prepareTree(root);

    const mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (!(node instanceof HTMLElement)) return;
          if (node.matches(REVEAL_SELECTOR)) prepareElement(node);
          prepareTree(node);
        });
      });
    });

    mutationObserver.observe(root, { childList: true, subtree: true });

    return () => {
      mutationObserver.disconnect();
      observer.disconnect();
    };
  }, [pathname]);

  return null;
}
