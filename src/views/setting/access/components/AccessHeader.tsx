import type React from 'react';
import { usePermission } from '@/contexts/permission.context';
import Breadcrumbs from '@/components/ui/breadcrumbs/Breadcrumbs';
import ButtonPrimary from '@/components/ui/button/ButtonPrimary';

const AccessHeader: React.FC = () => {
  const { hasPermission } = usePermission();

  return (
    <div className="flex justify-between items-end">
      <div>
        <span className="text-xl font-semibold block mb-2">Setup Access</span>
        <Breadcrumbs
          items={[
            { title: 'Setting', href: '#' },
            { title: 'Access', href: '#' },
          ]}
        />
      </div>

      {hasPermission('create') && (
        <div>
          <ButtonPrimary className="hidden sm:block">Add New Access</ButtonPrimary>
        </div>
      )}
    </div>
  );
};

export default AccessHeader;
