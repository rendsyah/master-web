import type React from 'react';
import type { Metadata } from 'next';
import LoginView from '@/views/auth/login';

export const metadata: Metadata = {
  title: 'Login - Web Application',
  description: 'Authentication page of Web Application',
};

const LoginPage: React.FC = () => {
  return <LoginView />;
};

export default LoginPage;
