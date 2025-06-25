import type React from 'react';
import Breadcrumbs from '@/components/ui/breadcrumbs/Breadcrumbs';
import ButtonPrimary from '@/components/ui/button/ButtonPrimary';

const UserHeader: React.FC = () => {
  return (
    <div className="flex justify-between items-end">
      <div>
        <span className="text-xl font-semibold block mb-2">User</span>
        <Breadcrumbs
          items={[
            { title: 'Setting', href: '#' },
            { title: 'User', href: '/setting/user' },
          ]}
        />
      </div>

      <div>
        <ButtonPrimary className="w-full">Add New User</ButtonPrimary>
      </div>
    </div>
  );
};

export default UserHeader;
