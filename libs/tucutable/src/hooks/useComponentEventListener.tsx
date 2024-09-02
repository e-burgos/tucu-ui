import { useState, useEffect, useCallback } from 'react';

const useComponentEventListener = (id: string) => {
  const el = document.getElementById(id);
  const [element, setElement] = useState<HTMLElement | null>(null);
  const [position, setPosition] = useState(element?.getBoundingClientRect());
  const [scroll, setScroll] = useState({
    x: element?.scrollLeft,
    y: element?.scrollTop,
  });
  const [width, setWidth] = useState(
    element?.offsetWidth || element?.clientWidth || position?.width,
  );
  const [height, setHeight] = useState(
    element?.offsetHeight || element?.clientHeight || position?.height,
  );

  const handleResize = useCallback(() => {
    setWidth(element?.offsetWidth || element?.clientWidth);
    setHeight(element?.offsetHeight || element?.clientHeight);
  }, [element]);

  const handleScroll = useCallback(() => {
    setPosition(element?.getBoundingClientRect());
    setScroll({ x: element?.scrollLeft, y: element?.scrollTop });
  }, [element]);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleResize, handleScroll, scroll, element]);

  useEffect(() => {
    if (el) setElement(el);
  }, [element, id, el]);

  return { width, height, position, element, scroll };
};

export default useComponentEventListener;
