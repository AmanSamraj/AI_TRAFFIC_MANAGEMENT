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
    <div className={`w-full overflow-hidden rounded-xl border border-slate-800 bg-slate-900/90 shadow-lg ${className}`}>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          {/* Table Header */}
          <thead>
            <tr className="border-b border-slate-800 bg-slate-950/60 text-slate-400 font-semibold uppercase tracking-wider">
              {columns.map((col) => {
                const isSorted = sortKey === col.key;
                const canSort = col.sortable && onSort;

                return (
                  <th
                    key={col.key || col.label}
                    className={`py-3.5 px-4 select-none ${col.align === 'center' ? 'text-center' : col.align === 'right' ? 'text-right' : 'text-left'} ${
                      canSort ? 'cursor-pointer hover:text-cyan-400 hover:bg-slate-850/40 transition-colors' : ''
                    } ${col.headerClassName || ''}`}
                    onClick={() => canSort && onSort(col.key)}
                  >
                    <div className={`inline-flex items-center gap-1.5 ${col.align === 'center' ? 'justify-center' : col.align === 'right' ? 'justify-end' : 'justify-start'}`}>
                      <span>{col.label}</span>
                      {canSort && (
                        <span className="text-slate-500">
                          {isSorted ? (
                            sortDirection === 'asc' ? (
                              <ChevronUp className="w-3.5 h-3.5 text-cyan-400" />
                            ) : (
                              <ChevronDown className="w-3.5 h-3.5 text-cyan-400" />
                            )
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
          <tbody className="divide-y divide-slate-800/60">
            {isLoading ? (
              <tr>
                <td colSpan={columns.length} className="py-12 text-center text-slate-400">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <div className="w-6 h-6 border-2 border-cyan-500/20 border-t-cyan-400 rounded-full animate-spin" />
                    <span className="text-xs uppercase tracking-wider text-slate-500 font-medium">
                      Loading data...
                    </span>
                  </div>
                </td>
              </tr>
            ) : data.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="py-12 text-center text-slate-400">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <Database className="w-8 h-8 text-slate-600 stroke-[1.5]" />
                    <span className="text-xs font-medium text-slate-400">{emptyMessage}</span>
                  </div>
                </td>
              </tr>
            ) : (
              data.map((row, rowIndex) => (
                <tr
                  key={row.id || rowIndex}
                  onClick={() => onRowClick?.(row)}
                  className={`transition-colors duration-150 ${
                    rowIndex % 2 === 0 ? 'bg-transparent' : 'bg-slate-950/20'
                  } ${
                    onRowClick ? 'cursor-pointer hover:bg-slate-800/60' : 'hover:bg-slate-800/30'
                  }`}
                >
                  {columns.map((col) => (
                    <td
                      key={col.key || col.label}
                      className={`py-3 px-4 text-slate-200 ${col.align === 'center' ? 'text-center' : col.align === 'right' ? 'text-right' : 'text-left'} ${col.cellClassName || ''}`}
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
