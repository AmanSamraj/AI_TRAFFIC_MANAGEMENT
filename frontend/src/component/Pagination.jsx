import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const Pagination = ({
  currentPage = 1,
  totalPages = 1,
  totalItems,
  pageSize = 10,
  pageSizeOptions = [10, 20, 50, 100],
  onPageChange,
  onPageSizeChange,
  className = ''
}) => {
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push('...');
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      for (let i = start; i <= end; i++) {
        if (!pages.includes(i)) pages.push(i);
      }
      if (currentPage < totalPages - 2) pages.push('...');
      if (!pages.includes(totalPages)) pages.push(totalPages);
    }
    return pages;
  };

  const startItem = totalItems ? (currentPage - 1) * pageSize + 1 : null;
  const endItem = totalItems ? Math.min(currentPage * pageSize, totalItems) : null;

  const btnBase = {
    background: 'var(--color-card)',
    border: '1px solid var(--color-border)',
    color: 'var(--color-text-secondary)',
    cursor: 'pointer',
    borderRadius: '6px',
  };

  return (
    <div className={`flex flex-wrap items-center justify-between gap-4 py-3 px-1 text-xs ${className}`} style={{ color: 'var(--color-text-muted)' }}>
      {/* Items range display */}
      <div className="flex items-center gap-3">
        {totalItems != null && (
          <span>
            Showing <strong style={{ color: 'var(--color-text)' }}>{startItem}</strong> to{' '}
            <strong style={{ color: 'var(--color-text)' }}>{endItem}</strong> of{' '}
            <strong style={{ color: 'var(--color-text)' }}>{totalItems}</strong> entries
          </span>
        )}

        {onPageSizeChange && (
          <div className="flex items-center gap-1.5 ml-2">
            <span>Rows:</span>
            <select
              value={pageSize}
              onChange={(e) => onPageSizeChange(Number(e.target.value))}
              className="px-2 py-1 text-xs rounded-md cursor-pointer focus:outline-none"
              style={{
                background: 'var(--color-card)',
                border: '1px solid var(--color-border)',
                color: 'var(--color-text)',
              }}
              onFocus={(e) => e.currentTarget.style.borderColor = 'var(--color-amber)'}
              onBlur={(e) => e.currentTarget.style.borderColor = 'var(--color-border)'}
            >
              {pageSizeOptions.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center gap-1">
        <button
          type="button"
          disabled={currentPage <= 1}
          onClick={() => onPageChange?.(currentPage - 1)}
          className="p-1.5 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          style={btnBase}
          onMouseEnter={(e) => { if (currentPage > 1) e.currentTarget.style.borderColor = 'var(--color-border-dark)'; }}
          onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--color-border)'}
          aria-label="Previous page"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {getPageNumbers().map((page, idx) => {
          if (page === '...') {
            return (
              <span key={`ellipsis-${idx}`} className="px-2 py-1" style={{ color: 'var(--color-text-muted)' }}>
                ...
              </span>
            );
          }

          const isCurrent = page === currentPage;

          return (
            <button
              key={page}
              type="button"
              onClick={() => onPageChange?.(page)}
              className="min-w-[32px] h-8 text-xs font-medium transition-colors cursor-pointer"
              style={{
                ...(isCurrent
                  ? {
                      background: 'var(--color-amber)',
                      color: 'var(--color-charcoal)',
                      border: '1px solid var(--color-amber)',
                      fontWeight: 700,
                      borderRadius: '6px',
                    }
                  : btnBase
                ),
              }}
              onMouseEnter={(e) => {
                if (!isCurrent) e.currentTarget.style.borderColor = 'var(--color-border-dark)';
              }}
              onMouseLeave={(e) => {
                if (!isCurrent) e.currentTarget.style.borderColor = 'var(--color-border)';
              }}
            >
              {page}
            </button>
          );
        })}

        <button
          type="button"
          disabled={currentPage >= totalPages}
          onClick={() => onPageChange?.(currentPage + 1)}
          className="p-1.5 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          style={btnBase}
          onMouseEnter={(e) => { if (currentPage < totalPages) e.currentTarget.style.borderColor = 'var(--color-border-dark)'; }}
          onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--color-border)'}
          aria-label="Next page"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
