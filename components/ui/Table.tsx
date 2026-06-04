interface TableProps {
  headers: string[];
  children: React.ReactNode;
  emptyMessage?: string;
}

export default function Table({ headers, children, emptyMessage = 'Không có dữ liệu' }: TableProps) {
  return (
    <div className="w-full overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
      <table className="w-full">
        <thead>
          <tr className="bg-gradient-to-r from-indigo-600 to-indigo-500">
            {headers.map((header, index) => (
              <th
                key={index}
                className="px-4 py-3.5 text-left text-sm font-semibold text-white first:rounded-tl-xl last:rounded-tr-xl"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {children}
        </tbody>
      </table>
    </div>
  );
}

export function TableRow({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) {
  return (
    <tr 
      className={`transition-colors hover:bg-indigo-50/50 ${onClick ? 'cursor-pointer' : ''}`}
      onClick={onClick}
    >
      {children}
    </tr>
  );
}

export function TableCell({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <td className={`px-4 py-3.5 text-sm text-slate-700 ${className}`}>
      {children}
    </td>
  );
}
