// API服务文件 - 统一管理所有API调用
import axios from 'axios';

// 创建axios实例，设置基础URL为Cloudflare Pages Functions
const api = axios.create({
  baseURL: 'https://tickdida-backend.pages.dev/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// 请求拦截器
api.interceptors.request.use(
  config => {
    // 可以在这里添加认证token等
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// 响应拦截器
api.interceptors.response.use(
  response => {
    return response.data;
  },
  error => {
    console.error('API请求错误:', error);
    return Promise.reject(error);
  }
);

// 支付宝相关API
export const alipayAPI = {
  // 创建支付订单
  createPayment: async (orderData: {
    userId: string;
    subscriptionType: 'monthly' | 'yearly';
    amount: number;
  }) => {
    return api.post('/alipay/pay', orderData);
  },
  
  // 查询支付状态
  queryPayment: async (orderId: string) => {
    return api.get(`/alipay/query?orderId=${orderId}`);
  }
};

// 导出axios实例，以便在需要时直接使用
export default api;