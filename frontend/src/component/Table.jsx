import React from 'react';
import { ChevronUp, ChevronDown, Database } from 'lucide-react';

export const Table = ({
  columns = [],
  data = [],
  sortKey,
  sortDirection = 'asc',
  onSort,
  onRowClick,
  emptyMessage = 'No telemetry records found.',
  isLoading = false,
  className = ''
}) => {
  return (
    <div
      className={`w-full overflow-hidden ${className}`}
      style={{
        background: 'var(--color-card)',
        border: '1px solid var(--color-border)',
        borderRadius: '10px',
        boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
      }}
    >
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          {/* Table Header */}
          <thead>
            <tr style={{ borderBottom: '1px solid var(--color-border)', background: 'var(--color-background)' }}>
              {columns.map((col) => {
                const isSorted = sortKey === col.key;
                const canSort = col.sortable && onSort;

                return (
                  <th
                    key={col.key || col.label}
                    className={`py-3 px-4 select-none font-semibold uppercase tracking-wider text-[11px] ${
                      col.align === 'center' ? 'text-center' : col.align === 'right' ? 'text-right' : 'text-left'
                    } ${canSort ? 'cursor-pointer transition-colors' : ''} ${col.headerClassName || ''}`}
                    style={{
                      color: isSorted ? 'var(--color-amber-dark)' : 'var(--color-text-muted)',
                    }}
                    onClick={() => canSort && onSort(col.key)}
                    onMouseEnter={(e) => { if (canSort) e.currentTarget.style.color = 'var(--color-amber-dark)'; }}
                    onMouseLeave={(e) => { if (canSort && !isSorted) e.currentTarget.style.color = 'var(--color-text-muted)'; }}
                  >
                    <div className={`inline-flex items-center gap-1.5 ${
                      col.align === 'center' ? 'justify-center' : col.align === 'right' ? 'justify-end' : 'justify-start'
                    }`}>
                      <span>{col.label}</span>
                      {canSort && (
                        <span>
                          {isSorted ? (
                            sortDirection === 'asc'
                              ? <ChevronUp className="w-3.5 h-3.5" style={{ color: 'var(--color-amber)' }} />
                              : <ChevronDown className="w-3.5 h-3.5" style={{ color: 'var(--color-amber)' }} />
                          ) : (
                            <ChevronDown className="w-3.5 h-3.5 opacity-30" />
                          )}
                        </span>
                      )}
                    </div>
                  </th>
                );
              })}
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={columns.length} className="py-12 text-center" style={{ color: 'var(--color-text-muted)' }}>
                  <div className="flex flex-col items-center justify-center gap-2">
                    <div
                      className="w-6 h-6 border-2 rounded-full animate-spin"
                      style={{ borderColor: 'rgba(245,166,35,0.15)', borderTopColor: 'var(--color-amber)' }}
                    />
                    <span className="text-xs uppercase tracking-wider font-medium">Loading data...</span>
                  </div>
                </td>
              </tr>
            ) : data.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="py-12 text-center" style={{ color: 'var(--color-text-muted)' }}>
                  <div className="flex flex-col items-center justify-center gap-2">
                    <Database className="w-8 h-8 stroke-[1.5]" style={{ color: 'var(--color-border-dark)' }} />
                    <span className="text-xs font-medium">{emptyMessage}</span>
                  </div>
                </td>
              </tr>
            ) : (
              data.map((row, rowIndex) => (
                <tr
                  key={row.id || rowIndex}
                  onClick={() => onRowClick?.(row)}
                  className="transition-colors duration-150"
                  style={{
                    borderBottom: rowIndex < data.length - 1 ? '1px solid var(--color-border)' : 'none',
                    background: rowIndex % 2 === 0 ? 'transparent' : 'var(--color-surface)',
                    cursor: onRowClick ? 'pointer' : 'default',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(245,166,35,0.04)'}
                  onMouseLeave={(e) => e.currentTarget.style.background = rowIndex % 2 === 0 ? 'transparent' : 'var(--color-surface)'}
                >
                  {columns.map((col) => (
                    <td
                      key={col.key || col.label}
                      className={`py-3 px-4 ${
                        col.align === 'center' ? 'text-center' : col.align === 'right' ? 'text-right' : 'text-left'
                      } ${col.cellClassName || ''}`}
                      style={{ color: 'var(--color-text)' }}
                    >
                      {col.render ? col.render(row[col.key], row, rowIndex) : row[col.key]}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
