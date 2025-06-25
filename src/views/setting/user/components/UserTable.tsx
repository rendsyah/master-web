import type React from 'react';
import { cn } from '@/libs/utils/cn.utils';
import { Table, TableBody, TableCell, TableHeader, TableRow } from '@/components/ui/table/Table';
import SearchIcon from '@/components/icons/Search';
import EllipsisHorizontalIcon from '@/components/icons/EllipsisHorizontal';
import ButtonSecondary from '@/components/ui/button/ButtonSecondary';
import Input from '@/components/ui/form/Input';
import Pagination from '@/components/ui/table/Pagination';
import useUser from '../user.hook';

const UserTable: React.FC = () => {
  const {
    isLoading,
    isFetching,
    data: user,
    error,
    sort,
    meta,
    setMeta,
    onSearch,
    onSort,
    onRetry,
  } = useUser();

  const tableStatus =
    isLoading || (error && isFetching) ? (
      'Loading...'
    ) : error ? (
      <div className="flex items-center gap-2">
        <span>{error}</span>
        <button onClick={onRetry} className="text-red-500 underline">
          Try again
        </button>
      </div>
    ) : user.length === 0 ? (
      'No users found.'
    ) : null;

  return (
    <div className="widget-dark p-6 flex flex-col gap-4">
      <div className="flex flex-col md:flex-row justify-between md:items-center">
        <div className="hidden md:block">
          <span className="text-lg font-semibold">List Data User</span>
        </div>
        <div className="flex flex-col md:flex-row items-center gap-4">
          <div className="w-full sm:min-w-[300px]">
            <Input
              className="bg-ui-800 py-3 border-none"
              placeholder="Search..."
              icon={<SearchIcon className="w-5 h-5" />}
              iconPosition="left"
              onChange={onSearch}
            />
          </div>
          <ButtonSecondary className="w-full lg:w-40">Filter</ButtonSecondary>
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableCell
              isHeader
              sortable
              sortKey="fullname"
              currentSortColumn={sort.column}
              currentSortOrder={sort.order}
              className="text-start"
              onSort={onSort}
            >
              Name
            </TableCell>
            <TableCell
              isHeader
              sortable
              sortKey="access_name"
              currentSortColumn={sort.column}
              currentSortOrder={sort.order}
              className="text-start"
              onSort={onSort}
            >
              Access
            </TableCell>
            <TableCell
              isHeader
              sortable
              sortKey="email"
              currentSortColumn={sort.column}
              currentSortOrder={sort.order}
              className="text-start"
              onSort={onSort}
            >
              Email
            </TableCell>
            <TableCell
              isHeader
              sortable
              sortKey="phone"
              currentSortColumn={sort.column}
              currentSortOrder={sort.order}
              className="text-start"
              onSort={onSort}
            >
              Phone
            </TableCell>
            <TableCell
              isHeader
              sortable
              sortKey="status"
              currentSortColumn={sort.column}
              currentSortOrder={sort.order}
              className="text-center"
              onSort={onSort}
            >
              Status
            </TableCell>
            <TableCell isHeader className="text-center">
              Action
            </TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tableStatus ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center text-sm text-white/90">
                {tableStatus}
              </TableCell>
            </TableRow>
          ) : (
            user.map((list, index) => (
              <TableRow key={index}>
                <TableCell className="text-start">{list.fullname}</TableCell>
                <TableCell className="text-start">{list.access_name}</TableCell>
                <TableCell className="text-start">{list.email}</TableCell>
                <TableCell className="text-start">{list.phone}</TableCell>
                <TableCell
                  className={cn(
                    'text-center',
                    list.status === 1 ? 'text-green-500' : 'text-red-500',
                  )}
                >
                  {list.status_text}
                </TableCell>
                <TableCell className="text-center">
                  <div className="flex justify-center cursor-pointer">
                    <EllipsisHorizontalIcon className="w-5 h-5" />
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
      <Pagination meta={meta} onPageChange={(page) => setMeta((prev) => ({ ...prev, page }))} />
    </div>
  );
};

export default UserTable;
