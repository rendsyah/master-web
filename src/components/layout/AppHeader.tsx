import type React from 'react';
import type { User } from '@/types/commons.types';
import { useState } from 'react';
import { useSidebar } from '@/contexts/sidebar.context';
import { cn } from '@/libs/utils/cn.utils';
import AppUser from './AppUser';
import EllipsisHorizontalIcon from '../icons/EllipsisHorizontal';
import Bars3Icon from '../icons/Bars3';
import Bars3CenterLeftIcon from '../icons/Bars3CenterLeft';
import XMarkIcon from '../icons/XMark';
import BellIcon from '../icons/Bell';

const AppHeader: React.FC<{ user: User }> = ({ user }) => {
  const { isMobileOpen, isExpanded, toggleSidebar, toggleMobileSidebar } = useSidebar();

  const [isUserOpen, setIsUserOpen] = useState(false);

  const toggleApplicationMenu = () => {
    setIsUserOpen(!isUserOpen);
  };

  const handleToggle = () => {
    if (window.innerWidth >= 1024) {
      toggleSidebar();
    } else {
      toggleMobileSidebar();
    }
  };

  return (
    <header className="sticky top-0 w-full border-b border-secondary/[4%] bg-ui-900 z-50">
      <div className="flex flex-col items-center justify-between grow lg:flex-row lg:px-6">
        {/* LEFT SIDE */}
        <div className="flex items-center justify-between w-full lg:justify-normal gap-2 sm:gap-4 px-5 lg:px-0 py-5 lg:py-4">
          <button
            className="items-center justify-center lg:flex z-50"
            onClick={handleToggle}
            aria-label="Toggle Sidebar"
          >
            {isMobileOpen ? (
              <XMarkIcon className="h-6 w-6" />
            ) : (
              <div>
                {isExpanded ? (
                  <Bars3CenterLeftIcon className="h-6 w-6" />
                ) : (
                  <Bars3Icon className="h-6 w-6" />
                )}
              </div>
            )}
          </button>

          <button
            onClick={toggleApplicationMenu}
            className="flex items-center justify-center lg:hidden z-50"
          >
            <EllipsisHorizontalIcon className="h-6 w-6" />
          </button>
        </div>

        {/* RIGHT SIDE */}
        <div
          className={cn(
            isUserOpen ? 'flex' : 'hidden',
            'items-center justify-between w-full gap-4 px-5 py-4 lg:flex lg:justify-end lg:px-0',
          )}
        >
          {/* NOTIFICATION */}
          <button>
            <BellIcon className="w-6 h-6" />
          </button>

          {/* USER */}
          <AppUser user={user} />
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
