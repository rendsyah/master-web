import type React from 'react';
import { catchServerComponent } from '@/libs/utils/catch.utils';
import { externalAPI } from '@/libs/interceptors/api-ext.interceptor';
import { Routes } from '@/libs/constants/routes.const';
import AdminLayout from '@/components/layout/AppAdmin';

const AdminLayoutPage: React.FC<{ children: React.ReactNode }> = async ({ children }) => {
  try {
    const fetchMenu = externalAPI.get(Routes.AUTH_MENU);
    const fetchPermission = externalAPI.get(Routes.AUTH_PERMISSION);
    const fetchUser = externalAPI.get(Routes.USER);

    const [menu, permission, user] = await Promise.all([fetchMenu, fetchPermission, fetchUser]);

    const dataMenu = menu.data.data;
    const dataPermission = permission.data.data;
    const dataUser = user.data.data;

    return (
      <AdminLayout menus={dataMenu} permission={dataPermission} user={dataUser}>
        {children}
      </AdminLayout>
    );
  } catch (error) {
    catchServerComponent(error);
  }
};

export default AdminLayoutPage;
