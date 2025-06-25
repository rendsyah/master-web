'use client';

import type React from 'react';
import type { Menu, Permission, User } from '@/types/commons.types';
import { useEffect, useMemo } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useSidebar } from '@/contexts/sidebar.context';
import { useNetwork } from '@/contexts/network.context';
import AppHeader from './AppHeader';
import AppSidebar from './AppSidebar';
import AppBackdrop from './AppBackdrop';
import Notification from '../ui/notification/Notification';
import LoadingIcon from '../icons/Loading';

const AppAdminLayout: React.FC<{
  menus: Menu[];
  permission: Permission[];
  user: User;
  children: React.ReactNode;
}> = ({ menus, permission, user, children }) => {
  const { isOnline, isConnection } = useNetwork();
  const { isExpanded, isMobileOpen } = useSidebar();

  const pathname = usePathname();
  const router = useRouter();

  const isAllowed = useMemo(() => {
    return permission.some((item) => item.path === pathname);
  }, [permission, pathname]);

  const mainContentMargin = useMemo(() => {
    if (isMobileOpen) return 'ml-0';
    return isExpanded ? 'lg:ml-[240px]' : 'lg:ml-[90px]';
  }, [isExpanded, isMobileOpen]);

  useEffect(() => {
    if (!isAllowed) {
      router.replace('/forbidden');
    }
  }, [isAllowed, router]);

  useEffect(() => {
    const wasOnline = isConnection.current;

    if (wasOnline !== null && wasOnline !== isOnline) {
      Notification(
        isOnline ? 'Connected to internet' : 'Please check your internet connection!',
        isOnline ? 'success' : 'error',
      );
    }

    isConnection.current = isOnline;
  }, [isOnline, isConnection]);

  return (
    <div className="min-h-screen xl:flex">
      {/* SIDEBAR & BACKDROP */}
      <AppSidebar menus={menus} />
      <AppBackdrop />
      {/* MAIN CONTENT */}
      <div className={`flex-1 ${mainContentMargin}`}>
        {/* HEADER */}
        <AppHeader user={user} />
        {/* PAGE CONTENT */}
        <div className="p-4 md:p-6 mx-auto max-w-(--breakpoint-2xl)">
          {isAllowed ? (
            children
          ) : (
            <div className="flex flex-col items-center justify-center gap-2">
              <LoadingIcon className="w-6 h-6" />
              <p className="text-xl">Checking Permission...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AppAdminLayout;
