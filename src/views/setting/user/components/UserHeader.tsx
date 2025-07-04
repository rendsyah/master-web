import type React from 'react';
import { useGlobal } from '@/contexts/global.context';
import { usePermission } from '@/contexts/permission.context';
import Breadcrumbs from '@/components/ui/breadcrumbs/Breadcrumbs';
import ButtonPrimary from '@/components/ui/button/ButtonPrimary';

const UserHeader: React.FC = () => {
  const { handleModal } = useGlobal();
  const { hasPermission } = usePermission();

  return (
    <div className="flex justify-between items-end">
      <div>
        <span className="text-xl font-semibold block mb-2">Setup User</span>
        <Breadcrumbs
          items={[
            { title: 'Setting', href: '#' },
            { title: 'User', href: '#' },
          ]}
        />
      </div>

      {hasPermission('create') && (
        <div>
          <ButtonPrimary className="hidden sm:block" onClick={handleModal}>
            Add New User
          </ButtonPrimary>
        </div>
      )}
    </div>
  );
};

export default UserHeader;
