export interface NotificationItem {
  id: string;
  title: string;
  message?: string;
  read?: boolean;
  // 其他可能需要的字段
  timestamp?: Date;
  type?: 'info' | 'success' | 'warning' | 'error';
}