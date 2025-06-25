import { useQuery } from '@tanstack/react-query';
import { useMemo, useState } from 'react';
import debounce from 'lodash.debounce';
import { Meta, Sort } from '@/types/commons.types';
import { HttpStatus } from '@/libs/constants/httpStatus.const';
import { useInternal } from './useInternal';

type UsePaginateFetchProps = {
  key: string;
  endpoint: string;
  extraQuery?: Record<string, string | number>;
};

export const usePaginatedFetch = <T>(props: UsePaginateFetchProps) => {
  const { key, endpoint, extraQuery } = props;

  const internalAPI = useInternal();

  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [sort, setSort] = useState<Sort>({ column: '', order: '' });
  const [meta, setMeta] = useState<Meta>({
    page: 1,
    limit: 10,
    totalData: 0,
    totalPage: 0,
  });

  const debouncedSetSearch = useMemo(
    () =>
      debounce((val: string) => {
        setDebouncedSearch(val);
        setMeta((prev) => ({ ...prev, page: 1 }));
      }, 500),
    [],
  );

  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    debouncedSetSearch(e.target.value);
  };

  const onSort = (column: string) => {
    setSort((prev) => ({
      column,
      order: prev.column === column && prev.order === 'ASC' ? 'DESC' : 'ASC',
    }));
  };

  const queryKey = [
    key,
    meta.page,
    meta.limit,
    debouncedSearch,
    sort.column,
    sort.order,
    ...(extraQuery ? Object.values(extraQuery) : []),
  ];

  const { data, error, isLoading, isFetching, refetch } = useQuery({
    queryKey,
    queryFn: async () => {
      const query = {
        page: meta.page,
        limit: meta.limit,
        search: debouncedSearch || undefined,
        orderBy: sort.column || undefined,
        sort: sort.order || undefined,
        ...extraQuery,
      };

      const res = await internalAPI(endpoint, query);
      const json = await res.json();

      if (res.status !== HttpStatus.OK) throw new Error('Failed to fetch data.');

      setMeta({
        page: json.data.meta.page,
        limit: json.data.meta.totalPerPage,
        totalData: json.data.meta.totalData,
        totalPage: json.data.meta.totalPage,
      });

      return json.data.items as T[];
    },
    placeholderData: (prev) => prev,
  });

  return {
    isLoading,
    isFetching,
    data: data ?? [],
    error: error?.message ?? '',
    search,
    sort,
    meta,
    setMeta,
    onSearch,
    onSort,
    onRetry: () => refetch(),
  };
};
