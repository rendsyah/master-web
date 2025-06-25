import * as yup from 'yup';
import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoginApi } from '@/actions/auth';
import { useGlobal } from '@/contexts/global.context';
import { HttpStatus } from '@/libs/constants/httpStatus.const';
import type { LoginForm, LoginRequest } from '@/types/login.types';

const loginSchema = yup.object({
  user: yup.string().required('Username is required'),
  password: yup.string().required('Password is required'),
});

const useLogin = () => {
  const { device, openFeedbackModal } = useGlobal();

  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<LoginForm>({
    resolver: yupResolver(loginSchema),
  });

  const handleShow = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit: SubmitHandler<LoginForm> = async (data) => {
    const request: LoginRequest = {
      user: data.user,
      password: data.password,
      device: {
        firebase_id: '',
        device_browser: device.browserName,
        device_browser_version: device.browserVersion,
        device_imei: '',
        device_model: device.deviceModel,
        device_type: device.deviceType,
        device_vendor: device.deviceVendor,
        device_os: device.osName,
        device_os_version: device.osVersion,
        device_platform: 'Web',
        user_agent: device.userAgent,
        app_version: '1.0.0',
      },
    };

    const response = await LoginApi(request);

    if (response.status >= HttpStatus.BAD_REQUEST) {
      openFeedbackModal({
        type: 'error',
        message: response.message,
      });
    }
  };

  return {
    form,
    showPassword,
    handleShow,
    onSubmit,
  };
};

export default useLogin;
