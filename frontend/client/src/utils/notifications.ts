/**
 * Sistema de notificaciones para reemplazar alerts nativos
 */

type NotificationType = 'success' | 'error' | 'warning' | 'info';

interface Notification {
  id: string;
  message: string;
  type: NotificationType;
  duration?: number;
}

class NotificationService {
  private notifications: Notification[] = [];
  private listeners: Array<(notifications: Notification[]) => void> = [];

  private generateId(): string {
    return `notification-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  private notifyListeners(): void {
    this.listeners.forEach(listener => listener([...this.notifications]));
  }

  subscribe(listener: (notifications: Notification[]) => void): () => void {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  show(message: string, type: NotificationType = 'info', duration: number = 5000): string {
    const id = this.generateId();
    const notification: Notification = { id, message, type, duration };
    
    this.notifications.push(notification);
    this.notifyListeners();

    // Auto-remover después de la duración especificada
    if (duration > 0) {
      setTimeout(() => {
        this.remove(id);
      }, duration);
    }

    return id;
  }

  remove(id: string): void {
    this.notifications = this.notifications.filter(n => n.id !== id);
    this.notifyListeners();
  }

  clear(): void {
    this.notifications = [];
    this.notifyListeners();
  }

  getNotifications(): Notification[] {
    return [...this.notifications];
  }

  // Métodos de conveniencia
  success(message: string, duration?: number): string {
    return this.show(message, 'success', duration);
  }

  error(message: string, duration?: number): string {
    return this.show(message, 'error', duration || 7000);
  }

  warning(message: string, duration?: number): string {
    return this.show(message, 'warning', duration);
  }

  info(message: string, duration?: number): string {
    return this.show(message, 'info', duration);
  }
}

export const notificationService = new NotificationService();

// Hook para usar notificaciones en React
export const useNotifications = () => {
  const show = (message: string, type: NotificationType = 'info', duration?: number) => {
    return notificationService.show(message, type, duration);
  };

  return {
    show,
    success: (message: string, duration?: number) => notificationService.success(message, duration),
    error: (message: string, duration?: number) => notificationService.error(message, duration),
    warning: (message: string, duration?: number) => notificationService.warning(message, duration),
    info: (message: string, duration?: number) => notificationService.info(message, duration),
  };
};

