import { useMemo, useState } from "react";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import { EmptyState } from "../common/StatePanel";

const PAGE_SIZE = 8;

export default function DataTable({ columns, rows, searchable = true }) {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    if (!query.trim()) return rows;
    const q = query.toLowerCase();
    return rows.filter((row) =>
      columns.some((col) => String(row[col.key] ?? "").toLowerCase().includes(q))
    );
  }, [rows, columns, query]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const pageRows = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  return (
    <div className="table-wrap">
      {searchable && (
        <div className="table-toolbar">
          <div className="search-input">
            <Search size={15} color="var(--text-muted)" />
            <input
              placeholder="Search records..."
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setPage(1);
              }}
            />
          </div>
          <span style={{ fontSize: 12.5, color: "var(--text-muted)" }}>
            {filtered.length.toLocaleString()} of {rows.length.toLocaleString()} records
          </span>
        </div>
      )}

      {filtered.length === 0 ? (
        <EmptyState title="No matching records" message="Try a different search term." />
      ) : (
        <>
          <table className="data-table">
            <thead>
              <tr>
                {columns.map((col) => (
                  <th key={col.key}>{col.label}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {pageRows.map((row, i) => (
                <tr key={i}>
                  {columns.map((col) => (
                    <td key={col.key}>{row[col.key]}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>

          <div className="table-pagination">
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <div className="pagination-btns">
              <button disabled={currentPage === 1} onClick={() => setPage((p) => p - 1)}>
                <ChevronLeft size={14} />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .slice(Math.max(0, currentPage - 3), currentPage + 2)
                .map((p) => (
                  <button key={p} className={p === currentPage ? "active" : ""} onClick={() => setPage(p)}>
                    {p}
                  </button>
                ))}
              <button disabled={currentPage === totalPages} onClick={() => setPage((p) => p + 1)}>
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
