'use client';

import type React from 'react';
import { usePathname } from 'next/navigation';
import { createSafeContext } from '@/libs/utils/createSafeContext';

export type PermissionProps = {
  [path: string]: {
    create: boolean;
    update: boolean;
    delete: boolean;
  };
};

const [PermissionContext, usePermissionCtx] = createSafeContext<PermissionProps>('Permission');

const PermissionProvider: React.FC<{
  value: PermissionProps;
  children: React.ReactNode;
}> = ({ value, children }) => {
  return <PermissionContext.Provider value={value}>{children}</PermissionContext.Provider>;
};

const usePermission = () => {
  const permissions = usePermissionCtx();
  const pathname = usePathname();

  const allPermissions = permissions;
  const currentPermission = permissions[pathname];

  const hasPermission = (action: keyof PermissionProps[string]) => {
    return currentPermission?.[action] ?? false;
  };

  const hasAllowed = !!currentPermission;

  return {
    allPermissions,
    currentPermission,
    hasAllowed,
    hasPermission,
  };
};

export { usePermission, PermissionProvider };
