import type React from 'react';
import type { Meta } from '@/types/commons.types';
import { useMemo } from 'react';
import { cn } from '@/libs/utils/cn.utils';
import ChevronRightIcon from '@/components/icons/ChevronRight';
import ChevronLeftIcon from '@/components/icons/ChevronLeft';
import EllipsisHorizontalIcon from '@/components/icons/EllipsisHorizontal';

type PaginationProps = {
  meta: Meta;
  onPageChange: (page: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({ meta, onPageChange }) => {
  const { page, limit, totalData, totalPage } = meta;

  const start = useMemo(() => {
    if (totalData === 0) return 0;
    return (page - 1) * limit + 1;
  }, [page, limit, totalData]);

  const end = useMemo(() => {
    if (totalData === 0) return 0;
    return Math.min(page * limit, totalData);
  }, [page, limit, totalData]);

  const generatePages = () => {
    const pages = [];
    const maxVisible = 4;
    const half = Math.floor(maxVisible / 2);

    let startPage = Math.max(1, page - half);
    let endPage = Math.min(totalPage, page + half);

    if (endPage - startPage + 1 < maxVisible) {
      if (startPage === 1) {
        endPage = Math.min(startPage + maxVisible - 1, totalPage);
      } else if (endPage === totalPage) {
        startPage = Math.max(1, totalPage - maxVisible + 1);
      }
    }

    if (startPage > 1) {
      pages.push(1);
      if (startPage > 2) pages.push(<EllipsisHorizontalIcon className="w-5 h-5" />);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    if (endPage < totalPage) {
      if (endPage < totalPage - 1) pages.push(<EllipsisHorizontalIcon className="w-5 h-5" />);
      pages.push(totalPage);
    }

    return pages;
  };

  const pages = generatePages();

  return (
    <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-4">
      <span className="text-xs md:text-sm">
        Showing {start} to {end} of {totalData} results
      </span>
      {totalData > 0 && (
        <div className="flex items-center gap-2">
          <button onClick={() => onPageChange(page - 1)} disabled={page === 1}>
            <ChevronLeftIcon className="w-4 h-4" />
          </button>

          {pages.map((p, idx) =>
            typeof p === 'number' ? (
              <button
                key={idx}
                onClick={() => onPageChange(p)}
                className={`min-w-8 min-h-8 px-2 text-sm text-white/90 text-center rounded-full ${cn(
                  p === page ? 'bg-primary' : 'border border-secondary/[16%]',
                )}`}
              >
                {p}
              </button>
            ) : (
              <span key={idx} className="px-2 py-1 text-white/90 text-sm">
                {p}
              </span>
            ),
          )}

          <button onClick={() => onPageChange(page + 1)} disabled={page === totalPage}>
            <ChevronRightIcon className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};

export default Pagination;
