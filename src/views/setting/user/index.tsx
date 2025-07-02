'use client';

import type React from 'react';
import UserHeader from './components/UserHeader';
import UserTable from './components/UserTable';
import dynamic from 'next/dynamic';

const ModalAddUser = dynamic(() => import('./components/ModalAddUser'), { ssr: false });

const UserView: React.FC = () => {
  return (
    <div className="grid grid-cols-12 space-y-6">
      <div className="col-span-12">
        <UserHeader />
      </div>
      <div className="col-span-12">
        <UserTable />
      </div>
      <ModalAddUser />
    </div>
  );
};

export default UserView;
