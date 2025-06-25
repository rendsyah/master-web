import { toast, ToasterProps } from 'sonner';

const Notification = (
  text: string,
  type: 'success' | 'error' = 'success',
  position: ToasterProps['position'] = 'top-center',
) => {
  const styles = {
    success: {
      background: '#1f2937',
      color: '#d1fae5',
      border: '1px solid #10b981',
    },
    error: {
      background: '#1f2937',
      color: '#fecaca',
      border: '1px solid #f87171',
    },
  };

  toast[type](text, {
    position,
    style: styles[type],
  });
};

export default Notification;
