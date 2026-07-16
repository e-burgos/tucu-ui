import React, { Suspense, useState, useEffect, useRef } from 'react';
import { Skeleton } from '../../index';

interface LazyComponentSectionProps {
  id: string;
  component: React.LazyExoticComponent<
    React.ComponentType<Record<string, never>>
  >;
  fallback?: React.ReactNode;
}

/**
 * Component that lazy loads a section component when it enters the viewport
 */
export const LazyComponentSection: React.FC<LazyComponentSectionProps> = ({
  id,
  component: LazyComponent,
  fallback,
}) => {
  const [shouldLoad, setShouldLoad] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const currentRef = sectionRef.current;
    if (!currentRef || shouldLoad) return;

    // Check if this section matches the current hash
    const checkHashMatch = () => {
      const hash = window.location.hash.slice(1);
      if (hash === id) {
        setShouldLoad(true);
        return true;
      }
      return false;
    };

    // Check if element is near viewport
    const checkProximity = () => {
      const rect = currentRef.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      // Load if element is within 800px of viewport (above or below)
      const isNear = rect.top < viewportHeight + 800 && rect.bottom > -800;
      if (isNear) {
        setShouldLoad(true);
        return true;
      }
      return false;
    };

    // Handle forced load from TOC click
    const handleForceLoad = (event: CustomEvent) => {
      if (event.detail?.sectionId === id) {
        setShouldLoad(true);
        // Dispatch event to notify that section is ready for scroll
        window.dispatchEvent(
          new CustomEvent('sectionReadyForScroll', {
            detail: { sectionId: id },
          })
        );
      }
    };

    // Check hash match immediately
    if (checkHashMatch()) {
      return;
    }

    // Check proximity immediately
    if (checkProximity()) {
      return;
    }

    // Listen for forced load events (from TOC clicks)
    window.addEventListener(
      'forceLoadSection',
      handleForceLoad as EventListener
    );

    // Listen for hash changes
    const handleHashChange = () => {
      if (checkHashMatch() || checkProximity()) {
        return;
      }
    };

    // Listen for scroll events to catch fast scrolling
    const handleScroll = () => {
      if (checkProximity()) {
        window.removeEventListener('scroll', handleScroll);
        window.removeEventListener('hashchange', handleHashChange);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Create observer with larger rootMargin for faster scrolling
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShouldLoad(true);
            // Disconnect observer once loaded
            if (observerRef.current && currentRef) {
              observerRef.current.unobserve(currentRef);
            }
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('hashchange', handleHashChange);
          }
        });
      },
      {
        rootMargin: '800px', // Increased to load much earlier
        threshold: 0,
      }
    );

    observerRef.current.observe(currentRef);

    return () => {
      window.removeEventListener(
        'forceLoadSection',
        handleForceLoad as EventListener
      );
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('scroll', handleScroll);
      if (observerRef.current && currentRef) {
        observerRef.current.unobserve(currentRef);
      }
      observerRef.current = null;
    };
  }, [shouldLoad, id]);

  const DefaultFallback = (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <Skeleton className="h-10 w-64 mx-auto" />
        <Skeleton className="h-6 w-96 mx-auto" />
      </div>
      <div className="space-y-4">
        <Skeleton className="h-64 w-full" />
        <Skeleton className="h-64 w-full" />
      </div>
    </div>
  );

  return (
    <section
      id={id}
      ref={sectionRef}
      className="space-y-8 scroll-mt-[120px] min-h-[400px]"
    >
      {shouldLoad ? (
        <Suspense fallback={fallback || DefaultFallback}>
          <LazyComponent />
        </Suspense>
      ) : (
        <div className="space-y-8">
          <div className="text-center space-y-4">
            <Skeleton className="h-10 w-64 mx-auto" />
            <Skeleton className="h-6 w-96 mx-auto" />
          </div>
          <div className="space-y-4">
            <Skeleton className="h-64 w-full" />
            <Skeleton className="h-64 w-full" />
          </div>
        </div>
      )}
    </section>
  );
};

export default LazyComponentSection;
