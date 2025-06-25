import type React from 'react';
import type { Metadata } from 'next';
import DashboardView from '@/views/dashboard';

export const metadata: Metadata = {
  title: 'Dashboard - Web Application',
  description: 'Dashboard page of Web Application',
};

const DashboardPage: React.FC = () => {
  return <DashboardView />;
};

export default DashboardPage;
