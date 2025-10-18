import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import type { NotificationItem } from '../types';

// 定义类型
export interface User {
  id: string;
  name: string;
  isSubscribed: boolean;
  subscriptionType?: 'monthly' | 'yearly';
  subscriptionDate?: string;
  remainingRefreshes?: number;
}

export interface ContentItem {
  id: string;
  title: string;
  category: string;
  description?: string;   // 可选
  tags?: string[];        // 可选
  content: string;
  keywords: string[];
  isPremium?: boolean;    // 可选
}

// 向后兼容的接口
interface UserData extends User {}
export interface MetaphorContent {
  id: string;
  title: string;
  description?: string;
  tags?: string[];
  isPremium?: boolean;
}

export interface GoodDeedContent extends MetaphorContent {
  type: 'inspiration' | 'study' | 'exploration';
}

interface UpgradeContent extends MetaphorContent {}

interface AppContextType {
  // 新的数据结构
  user: User | null;
  updateUser: (user: User) => void;
  pinHaoRenContent: ContentItem[];
  zuoHaoShiContent: ContentItem[];
  haoShengJiContent: ContentItem[];
  addPinHaoRenContent: (content: ContentItem) => void;
  addZuoHaoShiContent: (content: ContentItem) => void;
  addHaoShengJiContent: (content: ContentItem) => void;
  
  // 向后兼容的字段和方法
  userData: UserData | null;
  updateUserData: (userData: UserData) => void;
  metaphorContents: MetaphorContent[];
  goodDeedContents: GoodDeedContent[];
  upgradeContents: UpgradeContent[];
  addMetaphorContent: (content: MetaphorContent) => void;
  addGoodDeedContent: (content: GoodDeedContent) => void;
  addUpgradeContent: (content: UpgradeContent) => void;
  
  // 通用功能
  searchHistory: string[];
  addSearchHistory: (term: string) => void;
  clearSearchHistory: () => void;
  isAuthenticated: boolean;
  setIsAuthenticated: (status: boolean) => void;
  
  // 新增通知相关功能
  notifications: NotificationItem[];
  addNotification: (notification: NotificationItem) => void;
  removeNotification: (id: string) => void;
  markNotificationAsRead: (id: string) => void;
}

// 创建上下文
const useAppContext = createContext<AppContextType | undefined>(undefined);

// 提供者组件
interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  // 用户数据 - 统一使用新的数据结构
  const [user, setUser] = useState<User | null>(null);
  
  // 内容数据 - 统一使用新的数据结构
  const [pinHaoRenContent, setPinHaoRenContent] = useState<ContentItem[]>([]);
  const [zuoHaoShiContent, setZuoHaoShiContent] = useState<ContentItem[]>([]);
  const [haoShengJiContent, setHaoShengJiContent] = useState<ContentItem[]>([]);
  
  // 搜索历史
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  
  // 认证状态
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // 从localStorage加载数据
  useEffect(() => {
    const loadData = () => {
      try {
        // 加载用户数据
        const savedUserData = localStorage.getItem('userData');
        if (savedUserData) {
          const userData = JSON.parse(savedUserData);
          setUser(userData); // 使用新的数据结构
        } else {
          // 设置默认用户数据
          setUser({
            id: 'user1',
            name: '测试用户',
            isSubscribed: false,
            remainingRefreshes: 10
          });
        }

        // 加载内容数据 - 兼容新旧数据格式
        const savedPinHaoRenContent = localStorage.getItem('pinHaoRenContent');
        const savedMetaphorContents = localStorage.getItem('metaphorContents');
        
        if (savedPinHaoRenContent) {
          setPinHaoRenContent(JSON.parse(savedPinHaoRenContent));
        } else if (savedMetaphorContents) {
          // 转换旧格式数据
          const oldContents = JSON.parse(savedMetaphorContents);
          const convertedContents = oldContents.map((item: any) => ({
            id: item.id,
            title: item.title,
            content: item.description || item.content,
            keywords: item.tags || item.keywords,
            category: item.category || '隐喻',
            isPremium: item.isPremium
          }));
          setPinHaoRenContent(convertedContents);
        } else {
          // 设置默认拼好人内容
          setPinHaoRenContent([
            {
              id: '1',
              title: '水滴石穿',
              content: '只要有恒心，铁杵磨成针。',
              keywords: ['坚持', '毅力', '成功'],
              category: '隐喻',
              isPremium: false
            },
            {
              id: '2',
              title: '守株待兔',
              content: '机会需要自己争取，不能守株待兔。',
              keywords: ['积极', '主动', '机会'],
              category: '隐喻',
              isPremium: false
            },
            {
              id: '3',
              title: '画蛇添足',
              content: '多此一举反而会弄巧成拙。',
              keywords: ['适度', '简洁', '完美'],
              category: '隐喻',
              isPremium: true
            }
          ]);
        }

        const savedZuoHaoShiContent = localStorage.getItem('zuoHaoShiContent');
        const savedGoodDeedContents = localStorage.getItem('goodDeedContents');
        
        if (savedZuoHaoShiContent) {
          setZuoHaoShiContent(JSON.parse(savedZuoHaoShiContent));
        } else if (savedGoodDeedContents) {
          // 转换旧格式数据
          const oldContents = JSON.parse(savedGoodDeedContents);
          const convertedContents = oldContents.map((item: any) => {
            let category = '心灵鸡汤';
            if (item.type === 'inspiration' || item.type === '心灵鸡汤') category = '心灵鸡汤';
            else if (item.type === 'study' || item.type === '学习搭子') category = '学习搭子';
            else if (item.type === 'exploration' || item.type === '了解拓展') category = '了解拓展';
            
            return {
              id: item.id,
              title: item.title,
              content: item.description || item.content,
              keywords: item.tags || item.keywords,
              category: item.category || category,
              isPremium: item.isPremium
            };
          });
          setZuoHaoShiContent(convertedContents);
        } else {
          // 设置默认做好事内容
          setZuoHaoShiContent([
            {
              id: '1',
              title: '日行一善',
              content: '每天做一件好事，让世界更美好。',
              keywords: ['善良', '日行一善', '正能量'],
              category: '心灵鸡汤',
              isPremium: false
            },
            {
              id: '2',
              title: '学习伙伴招募',
              content: '寻找志同道合的学习伙伴，一起进步。',
              keywords: ['学习', '伙伴', '进步'],
              category: '学习搭子',
              isPremium: false
            },
            {
              id: '3',
              title: '探索未知世界',
              content: '勇于探索新事物，拓宽自己的视野。',
              keywords: ['探索', '未知', '成长'],
              category: '了解拓展',
              isPremium: true
            }
          ]);
        }

        const savedHaoShengJiContent = localStorage.getItem('haoShengJiContent');
        const savedUpgradeContents = localStorage.getItem('upgradeContents');
        
        if (savedHaoShengJiContent) {
          setHaoShengJiContent(JSON.parse(savedHaoShengJiContent));
        } else if (savedUpgradeContents) {
          // 转换旧格式数据
          const oldContents = JSON.parse(savedUpgradeContents);
          const convertedContents = oldContents.map((item: any) => ({
            id: item.id,
            title: item.title,
            content: item.description || item.content,
            keywords: item.tags || item.keywords,
            category: item.category || '升级服务',
            isPremium: item.isPremium
          }));
          setHaoShengJiContent(convertedContents);
        } else {
          // 设置默认好升级内容
          setHaoShengJiContent([
            {
              id: '1',
              title: '月度会员服务',
              content: '每月49元，享受所有高级内容和无限刷新次数。',
              keywords: ['会员', '月度', '高级'],
              category: '升级服务',
              isPremium: true
            },
            {
              id: '2',
              title: '年度会员服务',
              content: '每年199元，更优惠的价格，享受全年高级服务。',
              keywords: ['会员', '年度', '优惠'],
              category: '升级服务',
              isPremium: true
            }
          ]);
        }

        // 加载搜索历史
        const savedSearchHistory = localStorage.getItem('searchHistory');
        if (savedSearchHistory) {
          setSearchHistory(JSON.parse(savedSearchHistory));
        }
      } catch (error) {
        console.error('加载数据失败:', error);
      }
    };

    loadData();
  }, []);

  // 保存数据到localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem('userData', JSON.stringify(user));
    }
  }, [user]);

  // 保存新的数据格式
  useEffect(() => {
    localStorage.setItem('pinHaoRenContent', JSON.stringify(pinHaoRenContent));
  }, [pinHaoRenContent]);

  useEffect(() => {
    localStorage.setItem('zuoHaoShiContent', JSON.stringify(zuoHaoShiContent));
  }, [zuoHaoShiContent]);

  useEffect(() => {
    localStorage.setItem('haoShengJiContent', JSON.stringify(haoShengJiContent));
  }, [haoShengJiContent]);
  
  // 同时保存旧格式以保持向后兼容
  useEffect(() => {
    const oldFormatContents = pinHaoRenContent.map(item => ({
      id: item.id,
      title: item.title,
      description: item.content,
      tags: item.keywords,
      isPremium: item.isPremium
    }));
    localStorage.setItem('metaphorContents', JSON.stringify(oldFormatContents));
  }, [pinHaoRenContent]);

  useEffect(() => {
    const oldFormatContents = zuoHaoShiContent.map(item => {
      const type: 'inspiration' | 'study' | 'exploration' =
        item.category === '心灵鸡汤' ? 'inspiration' :
        item.category === '学习搭子' ? 'study' :
        'exploration';
      
      return {
        id: item.id,
        title: item.title,
        description: item.content,
        tags: item.keywords,
        type,
        isPremium: item.isPremium
      };
    });
    localStorage.setItem('goodDeedContents', JSON.stringify(oldFormatContents));
  }, [zuoHaoShiContent]);

  useEffect(() => {
    const oldFormatContents = haoShengJiContent.map(item => ({
      id: item.id,
      title: item.title,
      description: item.content,
      tags: item.keywords,
      isPremium: item.isPremium
    }));
    localStorage.setItem('upgradeContents', JSON.stringify(oldFormatContents));
  }, [haoShengJiContent]);

  useEffect(() => {
    localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
  }, [searchHistory]);

  // 更新用户数据 - 新方法
  const updateUser = (newUser: User) => {
    setUser(newUser);
  };
  
  // 更新用户数据 - 向后兼容
  const updateUserData = (newUserData: UserData) => {
    setUser(newUserData);
  };

  // 添加拼好人内容 - 新方法
  const addPinHaoRenContent = (content: ContentItem) => {
    setPinHaoRenContent(prev => [...prev, content]);
  };

  // 添加做好事内容 - 新方法
  const addZuoHaoShiContent = (content: ContentItem) => {
    setZuoHaoShiContent(prev => [...prev, content]);
  };

  // 添加好升级内容 - 新方法
  const addHaoShengJiContent = (content: ContentItem) => {
    setHaoShengJiContent(prev => [...prev, content]);
  };
  
  // 添加拼好人内容 - 向后兼容
  const addMetaphorContent = (content: MetaphorContent) => {
    const newContent: ContentItem = {
      id: content.id,
      title: content.title,
      content: content.description ?? '',
      keywords: content.tags ?? [],
      category: '隐喻',
      isPremium: content.isPremium
    };
    setPinHaoRenContent(prev => [...prev, newContent]);
  };

  // 添加做好事内容 - 向后兼容
  const addGoodDeedContent = (content: GoodDeedContent) => {
    let category = '心灵鸡汤';
    if (content.type === 'inspiration') category = '心灵鸡汤';
    else if (content.type === 'study') category = '学习搭子';
    else if (content.type === 'exploration') category = '了解拓展';
    
    const newContent: ContentItem = {
      id: content.id,
      title: content.title,
      content: content.description ?? '',
      keywords: content.tags ?? [],
      category,
      isPremium: content.isPremium
    };
    setZuoHaoShiContent(prev => [...prev, newContent]);
  };

  // 添加好升级内容 - 向后兼容
  const addUpgradeContent = (content: UpgradeContent) => {
    const newContent: ContentItem = {
      id: content.id,
      title: content.title,
      content: content.description ?? '',
      keywords: content.tags ?? [],
      category: '升级服务',
      isPremium: content.isPremium
    };
    setHaoShengJiContent(prev => [...prev, newContent]);
  };

  // 添加搜索历史
  const addSearchHistory = (term: string) => {
    // 避免重复
    if (!searchHistory.includes(term)) {
      setSearchHistory(prev => [term, ...prev].slice(0, 10)); // 只保留最近10条
    }
  };

  const contextValue: AppContextType = {
    // 新的数据结构
    user,
    updateUser,
    pinHaoRenContent,
    zuoHaoShiContent,
    haoShengJiContent,
    addPinHaoRenContent,
    addZuoHaoShiContent,
    addHaoShengJiContent,
    
    // 向后兼容的字段和方法
    userData: user,
    updateUserData,
    metaphorContents: pinHaoRenContent.map(item => ({
      id: item.id,
      title: item.title,
      description: item.content,
      tags: item.keywords,
      isPremium: item.isPremium
    })),
    goodDeedContents: zuoHaoShiContent.map(item => {
      // 显式限定字面量类型，不让 TS 推断成 string
      const type: 'inspiration' | 'study' | 'exploration' =
        item.category === '心灵鸡汤' ? 'inspiration' :
        item.category === '学习搭子' ? 'study' :
        'exploration';   // 默认兜底，保证永远合法

      return {
        id: item.id,
        title: item.title,
        description: item.description,
        tags: item.tags,
        type,              // 现在类型完全匹配
        isPremium: item.isPremium,
      };
    }),
    upgradeContents: haoShengJiContent.map(item => ({
      id: item.id,
      title: item.title,
      description: item.content,
      tags: item.keywords,
      isPremium: item.isPremium
    })),
    addMetaphorContent,
    addGoodDeedContent,
    addUpgradeContent,
    
    // 通用功能
    searchHistory,
    addSearchHistory,
    clearSearchHistory: () => setSearchHistory([]),
    
    // 通知相关功能（空壳实现）
    notifications: [],
    addNotification: () => {},
    removeNotification: () => {},
    markNotificationAsRead: () => {},
    
    isAuthenticated,
    setIsAuthenticated,
  };

  return (
    <useAppContext.Provider value={contextValue}>
      {children}
    </useAppContext.Provider>
  );
};

// 自定义钩子
export const useContextValue = () => {
  const context = useContext(useAppContext);
  if (context === undefined) {
    throw new Error('useContextValue must be used within an AppProvider');
  }
  return context;
};