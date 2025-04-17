import { useCallback } from 'react';

type NotificationType = 'success' | 'error' | 'info' | 'warning';

interface NotificationOptions {
  title: string;
  message: string;
  type: NotificationType;
  duration?: number;
}

export const useNotification = () => {
  const showNotification = useCallback(({ title, message, type, duration = 3000 }: NotificationOptions) => {
    const notification = document.createElement('div');
    notification.className = `fixed bottom-4 right-4 p-4 rounded-lg shadow-lg z-50 ${
      type === 'success' ? 'bg-green-500 text-white' :
      type === 'error' ? 'bg-red-500 text-white' :
      type === 'warning' ? 'bg-yellow-500 text-white' :
      'bg-blue-500 text-white'
    }`;
    
    const titleElement = document.createElement('div');
    titleElement.className = 'font-bold mb-1';
    titleElement.textContent = title;
    
    const messageElement = document.createElement('div');
    messageElement.className = 'text-sm';
    messageElement.textContent = message;
    
    notification.appendChild(titleElement);
    notification.appendChild(messageElement);
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.remove();
    }, duration);
  }, []);

  return { showNotification };
}; 