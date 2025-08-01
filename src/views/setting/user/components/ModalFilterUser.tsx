import type React from 'react';
import type { Filter } from '@/types/commons.types';
import { STATUS_OPTIONS } from '@/libs/constants/options.const';
import Modal from '@/components/ui/modal/Modal';
import ButtonPrimary from '@/components/ui/button/ButtonPrimary';
import ButtonSecondary from '@/components/ui/button/ButtonSecondary';
import Select from '@/components/ui/form/Select';
import DatePicker from '@/components/ui/form/DatePicker';

type ModalFilterUserProps = {
  filter: Filter;
  onChangeStartDate: (value: string) => void;
  onChangeEndDate: (value: string) => void;
  onChangeStatus: (value: string) => void;
  onSubmitFilter: () => void;
  onResetFilter: () => void;
};

const ModalFilterUser: React.FC<ModalFilterUserProps> = ({
  filter,
  onChangeStartDate,
  onChangeEndDate,
  onChangeStatus,
  onSubmitFilter,
  onResetFilter,
}) => {
  return (
    <Modal
      name="filter"
      title="Filter User"
      action={
        <div className="flex gap-4">
          <ButtonSecondary onClick={onResetFilter}>Reset</ButtonSecondary>
          <ButtonPrimary onClick={onSubmitFilter}>Submit</ButtonPrimary>
        </div>
      }
    >
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12 sm:col-span-6">
          <DatePicker
            id="startDate"
            label="Start Date"
            value={filter.startDate}
            onChange={onChangeStartDate}
            placeholder="Choose Start Date"
          />
        </div>
        <div className="col-span-12 sm:col-span-6">
          <DatePicker
            id="endDate"
            label="End Date"
            value={filter.endDate}
            minDate={filter.startDate}
            onChange={onChangeEndDate}
            placeholder="Choose End Date"
          />
        </div>
        <div className="col-span-12">
          <Select
            id="status"
            label="Status"
            placeholder="Choose Status"
            value={filter.status}
            onChange={(value) => onChangeStatus(value as string)}
            options={STATUS_OPTIONS}
          />
        </div>
      </div>
    </Modal>
  );
};

export default ModalFilterUser;
