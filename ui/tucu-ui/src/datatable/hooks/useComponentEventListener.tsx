'use client';

import { useState, useEffect, useCallback } from 'react';

/**
 * useComponentEventListener
 * @category libs/datatable
 * @subcategory Hooks
 *
 * @param {string} id - The id of the component.
 * @returns {Object} The object with the width, height, position, element, and scroll.
 *
 * @template TData - The type of the data in the table.
 */

export const useComponentEventListener = (id: string) => {
  const [element, setElement] = useState<HTMLElement | null>(null);
  const [position, setPosition] = useState(element?.getBoundingClientRect());
  const [scroll, setScroll] = useState({
    x: element?.scrollLeft,
    y: element?.scrollTop,
  });
  const [width, setWidth] = useState(
    element?.offsetWidth || element?.clientWidth || position?.width
  );
  const [height, setHeight] = useState(
    element?.offsetHeight || element?.clientHeight || position?.height
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
    const el = document.getElementById(id);
    if (el && el !== element) setElement(el);
  }, [id, element]);

  return { width, height, position, element, scroll };
};

export default useComponentEventListener;
