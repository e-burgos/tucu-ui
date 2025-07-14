/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router';

export function useScrollableSlider(defaultActivePath = '/') {
  const location = useLocation();
  const pathname = location.pathname;
  const sliderEl = useRef<HTMLDivElement>(null!);
  const sliderPrevBtn = useRef<HTMLButtonElement>(null!);
  const sliderNextBtn = useRef<HTMLButtonElement>(null!);
  function scrollToTheRight() {
    const offsetWidth = sliderEl.current.offsetWidth;
    sliderEl.current.scrollLeft += offsetWidth / 2;
    sliderPrevBtn.current.classList.remove('opacity-0', 'invisible');
  }
  function scrollToTheLeft() {
    const offsetWidth = sliderEl.current.offsetWidth;
    sliderEl.current.scrollLeft -= offsetWidth / 2;
    sliderNextBtn.current.classList.remove('opacity-0', 'invisible');
  }
  useEffect(() => {
    const filterBarEl = sliderEl.current;
    const prevBtn = sliderPrevBtn.current;
    const nextBtn = sliderNextBtn.current;
    initNextBtnVisibility();

    function initNextBtnVisibility() {
      const offsetWidth = filterBarEl.offsetWidth;
      const scrollWidth = filterBarEl.scrollWidth;
      // show next btn when scrollWidth is gather than offsetWidth
      if (scrollWidth > offsetWidth) {
        nextBtn?.classList.remove('opacity-0', 'invisible');
      } else {
        nextBtn?.classList.add('opacity-0', 'invisible');
      }
    }
    function visibleNextAndPrevBtnOnScroll() {
      const newScrollLeft = filterBarEl.scrollLeft,
        offsetWidth = filterBarEl.offsetWidth,
        scrollWidth = filterBarEl.scrollWidth;
      // reach to the right end
      if (scrollWidth - newScrollLeft === offsetWidth) {
        nextBtn?.classList.add('opacity-0', 'invisible');
        prevBtn?.classList.remove('opacity-0', 'invisible');
      } else {
        nextBtn?.classList.remove('opacity-0', 'invisible');
      }
      // reach to the left end
      if (newScrollLeft === 0) {
        prevBtn?.classList.add('opacity-0', 'invisible');
        nextBtn?.classList.remove('opacity-0', 'invisible');
      } else {
        prevBtn?.classList.remove('opacity-0', 'invisible');
      }
    }
    window.addEventListener('resize', initNextBtnVisibility);
    filterBarEl.addEventListener('scroll', visibleNextAndPrevBtnOnScroll);
    // clear event
    return () => {
      window.removeEventListener('resize', initNextBtnVisibility);
      filterBarEl.removeEventListener('scroll', visibleNextAndPrevBtnOnScroll);
    };
  }, []);
  // back to initial position for home
  useEffect(() => {
    if (pathname === defaultActivePath) {
      scrollToTheLeft();
    }
  }, [pathname, defaultActivePath]);
  return {
    sliderEl,
    sliderPrevBtn,
    sliderNextBtn,
    scrollToTheRight,
    scrollToTheLeft,
  };
}
