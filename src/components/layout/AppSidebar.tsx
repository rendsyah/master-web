import type React from 'react';
import type { Menu } from '@/types/commons.types';
import Image from 'next/image';
import { useSidebar } from '@/contexts/sidebar.context';
import { LogoImage } from '@/libs/constants/assets.const';
import { cn } from '@/libs/utils/cn.utils';
import AppMenu from './AppMenu';
import EllipsisHorizontalIcon from '../icons/EllipsisHorizontal';

const AppSidebar: React.FC<{ menus: Menu[] }> = ({ menus }) => {
  const { isExpanded, isMobileOpen } = useSidebar();

  const expandedClasses = isMobileOpen || isExpanded ? 'w-[240px]' : 'w-[90px]';
  const mobileOpenClasses = isMobileOpen ? 'translate-x-0' : '-translate-x-full';

  const asideClasess = cn(expandedClasses, mobileOpenClasses);

  return (
    <aside
      className={`fixed left-0 top-0 h-screen flex flex-col bg-ui-900 lg:bg-ui-800 mt-16 pt-4 lg:pt-0 lg:mt-0 px-4 z-50 lg:translate-x-0 ${asideClasess}`}
    >
      {/* LOGO */}
      <div className={`py-5.5 lg:flex ${cn(!isExpanded ? 'lg:justify-center' : 'justify-start')}`}>
        <div className="flex text-lg gap-4">
          <Image src={LogoImage} alt="Logo" width={26} height={26} />
          {(isExpanded || isMobileOpen) && <p className="text-lg font-semibold">Web Application</p>}
        </div>
      </div>

      {/* MENU */}
      <div className="flex flex-col overflow-y-auto no-scrollbar">
        <nav>
          <h2
            className={`flex mb-4 text-sm uppercase ${cn(!isExpanded ? 'lg:justify-center' : 'justify-start')}`}
          >
            {isExpanded || isMobileOpen ? 'Menu' : <EllipsisHorizontalIcon className="h-6 w-6" />}
          </h2>
          <AppMenu menus={menus} />
        </nav>
      </div>
    </aside>
  );
};

export default AppSidebar;
