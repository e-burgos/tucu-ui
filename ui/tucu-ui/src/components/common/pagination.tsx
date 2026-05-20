import { ChevronLeft, ChevronRight } from 'lucide-react';
import cn from 'classnames';

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  windowSize?: number;
  className?: string;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  windowSize = 2,
  className,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages: (number | 'ellipsis')[] = [];

  // Always show first page
  pages.push(1);

  const start = Math.max(2, currentPage - windowSize);
  const end = Math.min(totalPages - 1, currentPage + windowSize);

  if (start > 2) pages.push('ellipsis');
  for (let i = start; i <= end; i++) pages.push(i);
  if (end < totalPages - 1) pages.push('ellipsis');

  // Always show last page
  if (totalPages > 1) pages.push(totalPages);

  return (
    <div
      data-tucu="pagination"
      className={cn('flex items-center gap-1', className)}
    >
      <button
        type="button"
        data-tucu="pagination-btn"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        className="rounded-lg p-1.5 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>

      {pages.map((page, i) =>
        page === 'ellipsis' ? (
          <span
            key={`ellipsis-${i}`}
            data-tucu="pagination-ellipsis"
            className="px-1 text-gray-500 dark:text-gray-400"
          >
            ...
          </span>
        ) : (
          <button
            key={page}
            type="button"
            data-tucu="pagination-page"
            data-active={page === currentPage}
            onClick={() => onPageChange(page)}
            className={cn(
              'h-8 min-w-8 rounded-lg px-2 text-sm font-medium transition-colors',
              page === currentPage
                ? 'bg-brand text-white'
                : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100'
            )}
          >
            {page}
          </button>
        )
      )}

      <button
        type="button"
        data-tucu="pagination-btn"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className="rounded-lg p-1.5 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
}

export default Pagination;
