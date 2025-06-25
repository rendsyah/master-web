'use client';

import type React from 'react';
import UserHeader from './components/UserHeader';
import UserTable from './components/UserTable';

const UserView: React.FC = () => {
  return (
    <div className="grid grid-cols-12 space-y-6">
      <div className="col-span-12">
        <UserHeader />
      </div>
      <div className="col-span-12">
        <UserTable />
      </div>
    </div>
  );
};

export default UserView;
