/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useRef, useState, useEffect } from 'react';
import cn from 'classnames';
import Button from '../buttons';

export interface RevealContentTypes {
  defaultHeight: number;
  className?: string;
}

export function RevealContent({
  children,
  defaultHeight,
  className,
}: React.PropsWithChildren<RevealContentTypes>) {
  const [showContent, setShowContent] = useState(false);
  const revealEl = useRef<HTMLDivElement>(null!);
  const revealChildEl = useRef<HTMLDivElement>(null!);
  function handleRevealContent() {
    if (revealEl.current.scrollHeight > defaultHeight) {
      // set timeout need to show btn feedback
      setTimeout(() => {
        setShowContent(!showContent);
      }, 500);
    }
  }
  useEffect(() => {
    if (revealChildEl.current.clientHeight <= defaultHeight) {
      setShowContent(true);
    }
  }, [setShowContent, defaultHeight]);
  return (
    <div
      className={cn(
        'relative border border-gray-200 dark:border-gray-700 rounded-lg p-4',
        className
      )}
    >
      <div
        ref={revealEl}
        style={{ height: !showContent ? `${defaultHeight}px` : 'auto' }}
        className={cn(
          'transition-all duration-300',
          !showContent && 'overflow-hidden'
        )}
      >
        <div ref={revealChildEl}>{children}</div>
      </div>

      <div className="before:content-[' '] relative from-white pt-3 before:absolute before:-top-8 before:block before:h-8 before:w-full before:bg-linear-to-t dark:from-light-dark">
        <Button
          size="mini"
          shape="rounded"
          // variant="ghost"
          onClick={() => handleRevealContent()}
        >
          {showContent ? 'Show Less' : 'Show More'}
        </Button>
      </div>
    </div>
  );
}

export default RevealContent;
