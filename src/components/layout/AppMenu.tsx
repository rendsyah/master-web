import type React from 'react';
import type { Menu } from '@/types/commons.types';
import Link from 'next/link';
import { useCallback, useState } from 'react';
import { usePathname } from 'next/navigation';
import { useSidebar } from '@/contexts/sidebar.context';
import { cn } from '@/libs/utils/cn.utils';
import AppIcon from './AppIcon';
import ChevronDownIcon from '../icons/ChevronDown';

const MenuItem = ({
  menu,
  index,
  openChildIndex,
  setOpenChildIndex,
}: {
  menu: Menu;
  index: number;
  openChildIndex: number | null;
  setOpenChildIndex: (index: number | null) => void;
}) => {
  const { isExpanded, isMobileOpen } = useSidebar();

  const pathname = usePathname();
  const hasChild = menu.child && menu.child.length > 0;
  const hasMatchedChild = openChildIndex === index;

  const isActive = useCallback((path: string) => pathname === path, [pathname]);

  const toggleChild = () => {
    setOpenChildIndex(hasMatchedChild ? null : index);
  };

  const activeLinkClass = isActive(menu.path) ? 'text-white/90' : 'text-gray-400';

  return (
    <li>
      {/* HEADER */}
      <div className="flex items-center justify-between w-full">
        {hasChild ? (
          <button
            type="button"
            onClick={toggleChild}
            className={cn(
              'rounded-lg hover:text-white/90 w-full',
              activeLinkClass,
              isExpanded || isMobileOpen
                ? 'flex items-center justify-between px-3 py-3'
                : 'flex justify-center px-2 py-3',
            )}
          >
            <span
              className={cn(
                'text-sm',
                isExpanded || isMobileOpen
                  ? 'flex items-center gap-3'
                  : 'flex justify-center w-full',
              )}
            >
              <span className="w-5 h-5">
                <AppIcon name={menu.icon} />
              </span>

              {(isExpanded || isMobileOpen) && (
                <span className="whitespace-nowrap">{menu.name}</span>
              )}
            </span>
            {(isExpanded || isMobileOpen) && (
              <ChevronDownIcon
                className={`transition-transform duration-200 w-5 h-5 ${cn(hasMatchedChild && 'rotate-180')}`}
              />
            )}
          </button>
        ) : (
          <Link
            href={menu.path}
            className={cn(
              'text-sm rounded-lg hover:text-white/90 w-full',
              activeLinkClass,
              isExpanded || isMobileOpen
                ? 'flex items-center gap-3 px-3 py-1'
                : 'flex justify-center px-2 py-3',
            )}
          >
            {menu.level === 1 && (
              <span className="w-5 h-5">
                <AppIcon name={menu.icon} />
              </span>
            )}
            {(isExpanded || isMobileOpen) && <span className="whitespace-nowrap">{menu.name}</span>}
          </Link>
        )}
      </div>

      {/* EXPAND CHILD */}
      {(isExpanded || isMobileOpen) && hasChild && hasMatchedChild && (
        <div className="ml-5 pl-3 mt-1">
          <AppMenu menus={menu.child} />
        </div>
      )}
    </li>
  );
};

const AppMenu: React.FC<{ menus: Menu[] }> = ({ menus }) => {
  const [openChildIndex, setOpenChildIndex] = useState<number | null>(null);

  return (
    <ul className="space-y-2">
      {menus.map((menu, index) => (
        <MenuItem
          key={menu.name}
          menu={menu}
          index={index}
          openChildIndex={openChildIndex}
          setOpenChildIndex={setOpenChildIndex}
        />
      ))}
    </ul>
  );
};

export default AppMenu;
