import * as yup from 'yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useGlobal } from '@/contexts/global.context';
import type { UserForm } from '@/types/user.types';

const addUserSchema = yup.object({
  access_id: yup.number().required('Access is required'),
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required'),
  fullname: yup.string().required('Fullname is required'),
  email: yup.string().email('Email is invalid').required('Email is required'),
  phone: yup.string().required('Phone is required'),
});

const useAddUser = () => {
  const { handleModal } = useGlobal();

  const form = useForm<UserForm>({
    resolver: yupResolver(addUserSchema),
  });

  const onSubmit: SubmitHandler<UserForm> = async (data) => {
    console.log(data);
  };

  const onCancel = () => {
    form.reset();
    handleModal();
  };

  return {
    form,
    onSubmit,
    onCancel,
  };
};

export default useAddUser;
