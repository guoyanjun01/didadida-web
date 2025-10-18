import React, { useState, useEffect, useContext } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { useContextValue } from '../contexts';

interface ContentItem {
  id: string;
  title: string;
  content: string;
  keywords: string[];
  category: string;
  isPremium?: boolean;
}

const ZuoHaoShi: React.FC = () => {
  const router = useRouter();
  const appContext = useContextValue();
  
  // 确保应用上下文存在
  if (!appContext) {
    return <div>加载中...</div>;
  }
  
  const { user, zuoHaoShiContent, searchHistory, addSearchHistory, clearSearchHistory } = appContext;
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredContents, setFilteredContents] = useState<ContentItem[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [activeTab, setActiveTab] = useState<'all' | '心灵鸡汤' | '学习搭子' | '了解拓展'>('all');
  const [freeContentCount, setFreeContentCount] = useState(0);

  // 模拟从上下文中获取的做好事内容
  const mockContents: ContentItem[] = [
    {
      id: '1',
      title: '每一天都是新的开始',
      content: '无论昨天如何，今天都是一个新的开始。不要让过去的失败或成功影响你的现在。每一天都有无限的可能性，关键是你如何选择度过。',
      keywords: ['心灵鸡汤', '积极心态', '新开始'],
      category: '心灵鸡汤',
    },
    {
      id: '2',
      title: '专注于过程而非结果',
      content: '很多时候，我们过于关注结果而忽略了过程的美好。其实，真正的成长和收获来自于过程中的每一步。享受过程，结果自然会到来。',
      keywords: ['心灵鸡汤', '成长', '心态'],
      category: '心灵鸡汤',
    },
    {
      id: '3',
      title: '与人为善，与己为善',
      content: '对他人友善不仅仅是一种美德，也是对自己最好的回馈。你的善意会像种子一样，在未来的某个时刻绽放出美丽的花朵。',
      keywords: ['心灵鸡汤', '友善', '人际关系'],
      category: '心灵鸡汤',
    },
    {
      id: '4',
      title: '如何高效学习新技能',
      content: '学习新技能需要遵循一定的方法：设定明确的目标，分解学习任务，每天坚持练习，及时反馈和调整，寻找志同道合的学习伙伴一起进步。',
      keywords: ['学习方法', '技能提升', '效率'],
      category: '学习搭子',
      isPremium: true,
    },
    {
      id: '5',
      title: '找到适合你的学习搭子',
      content: '一个好的学习搭子可以大大提高学习效率。理想的学习搭子应该有相似的学习目标，互补的知识结构，和你相处愉快，并且能够互相督促和鼓励。',
      keywords: ['学习伙伴', '团队学习', '效率'],
      category: '学习搭子',
      isPremium: true,
    },
    {
      id: '6',
      title: '探索未知的自己',
      content: '我们每个人都有无限的潜力和可能性。勇于尝试新事物，挑战自己的舒适区，你会发现一个全新的自己。',
      keywords: ['自我探索', '个人成长', '挑战'],
      category: '了解拓展',
      isPremium: true,
    },
    {
      id: '7',
      title: '拓展你的兴趣爱好',
      content: '广泛的兴趣爱好不仅能丰富你的生活，还能拓展你的视野和思维方式。不要局限于自己熟悉的领域，勇敢地探索新的兴趣。',
      keywords: ['兴趣爱好', '生活方式', '视野拓展'],
      category: '了解拓展',
      isPremium: true,
    },
  ];

  useEffect(() => {
    // 优先使用上下文数据，如果没有则使用模拟数据
    const contents = zuoHaoShiContent && zuoHaoShiContent.length > 0 ? zuoHaoShiContent : mockContents;
    setFilteredContents(contents);
    // 计算免费内容数量
    const count = contents.filter(content => !content.isPremium).length;
    setFreeContentCount(count);
  }, [zuoHaoShiContent]);

  useEffect(() => {
    filterContent();
  }, [searchTerm, activeTab, zuoHaoShiContent]);

  const filterContent = () => {
    const contents = zuoHaoShiContent && zuoHaoShiContent.length > 0 ? zuoHaoShiContent : mockContents;
    let filtered = contents;

    // 按类型筛选
    if (activeTab !== 'all') {
      filtered = filtered.filter(content => content.category === activeTab);
    }

    // 按搜索词筛选
    if (searchTerm.trim()) {
      filtered = filtered.filter(content => 
        content.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        content.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        content.keywords.some(keyword => keyword.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    setFilteredContents(filtered);
  };

  const handleSearch = () => {
    if (searchTerm.trim()) {
      addSearchHistory(searchTerm.trim());
    }
  };

  const handleHistoryItemClick = (term: string) => {
    setSearchTerm(term);
    setShowHistory(false);
    // 从历史中选择时也添加到搜索历史
    if (term.trim()) {
      addSearchHistory(term.trim());
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };



  const isPremiumContent = (content: ContentItem) => {
    // 检查内容是否为付费内容且用户未订阅
    return content.isPremium && (!user || !user.subscriptionType);
  };

  return (
    <div>
      {/* 头部区域 */}
      <header className="header">
        <div className="container header-content">
          <div>
            <h1>嘀嗒嘀嗒</h1>
            <p>解决我们不存在问题的绝佳解决方案</p>
          </div>
          <button onClick={() => router.push('/后台')} className="btn btn-secondary">
            创作者入口
          </button>
        </div>
      </header>

      {/* 导航栏 */}
      <nav className="nav">
        <div className="container">
          <ul className="nav-links">
            <li>
              <Link href="/">首页</Link>
            </li>
            <li>
              <Link href="/拼好人">拼好人</Link>
            </li>
            <li>
              <Link href="/做好事" className="active">做好事</Link>
            </li>
            <li>
              <Link href="/好升级">好升级</Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* 主要内容 */}
      <main className="main">
        <div className="container">
          <section className="mb-40">
            <h2 className="text-3xl mb-40">做好事</h2>
            <p className="mb-40">
              核心内容区域，包含心灵鸡汤、学习搭子和了解拓展。
              免费阅读前{freeContentCount}篇内容，升级会员后可解锁所有付费内容。
            </p>

            {/* 搜索框 */}
            <div className="search-container mb-40">
              <div className="relative">
                <input
                  type="text"
                  placeholder="搜索内容或关键词..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="search-input"
                />
                <button onClick={handleSearch} className="btn btn-primary search-btn">
                  搜索
                </button>
                {searchTerm && (
                  <button 
                    onClick={() => {
                      setSearchTerm('');
                      setShowHistory(false);
                    }}
                    className="clear-search"
                  >
                    ✕
                  </button>
                )}
              </div>
              
              {/* 搜索历史 */}
              {showHistory && searchHistory.length > 0 && (
                <div className="search-history">
                  <div className="history-header">
                    <span>搜索历史</span>
                    <button onClick={() => setShowHistory(false)}>✕</button>
                  </div>
                  <ul>
                    {searchHistory.slice(0, 5).map((term, index) => (
                      <li key={index} onClick={() => handleHistoryItemClick(term)}>
                        {term}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {/* 显示/隐藏历史按钮 */}
              {searchHistory.length > 0 && !showHistory && (
                <button 
                  onClick={() => setShowHistory(true)}
                  className="history-toggle"
                >
                  显示搜索历史
                </button>
              )}
            </div>

            {/* 标签页 */}
            <div className="tabs mb-40">
              <button
                className={`tab ${activeTab === 'all' ? 'active' : ''}`}
                onClick={() => setActiveTab('all')}
              >
                全部
              </button>
              <button
                className={`tab ${activeTab === '心灵鸡汤' ? 'active' : ''}`}
                onClick={() => setActiveTab('心灵鸡汤')}
              >
                心灵鸡汤
              </button>
              <button
                className={`tab ${activeTab === '学习搭子' ? 'active' : ''}`}
                onClick={() => setActiveTab('学习搭子')}
              >
                学习搭子
              </button>
              <button
                className={`tab ${activeTab === '了解拓展' ? 'active' : ''}`}
                onClick={() => setActiveTab('了解拓展')}
              >
                了解拓展
              </button>
            </div>

            {/* 内容列表 */}
            <div className="content-list">
              {filteredContents.length > 0 ? (
                filteredContents.map((content) => (
                  <motion.div
                    key={content.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className={`content-item ${isPremiumContent(content) ? 'premium' : ''}`}
                  >
                    <span className="content-type">{content.category}</span>
                    {isPremiumContent(content) && (
                      <span className="premium-badge">付费</span>
                    )}
                    <h3>{content.title}</h3>
                    <p>
                      {isPremiumContent(content) ? 
                        '此内容仅对会员开放。升级会员后可查看完整内容。' : 
                        content.content
                      }
                    </p>
                    <div className="content-tags">
                      {content.keywords.map((keyword, index) => (
                        <span key={index} className="tag">{keyword}</span>
                      ))}
                    </div>
                    {isPremiumContent(content) && (
                      <Link href="/好升级" className="btn btn-primary mt-20">升级会员</Link>
                    )}
                  </motion.div>
                ))
              ) : (
                <div className="no-results">
                  <p>没有找到相关内容，请尝试其他关键词或切换分类。</p>
                </div>
              )}
            </div>
          </section>
        </div>
      </main>

      {/* 页脚 */}
      <footer style={{ backgroundColor: '#333', color: 'white', padding: '40px 0' }}>
        <div className="container">
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '20px' }}>嘀嗒嘀嗒</h3>
            <p style={{ marginBottom: '20px', color: '#ccc' }}>
              解决我们不存在问题的绝佳解决方案
            </p>
            <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
              <Link href="/" style={{ color: '#ccc', textDecoration: 'none' }}>首页</Link>
              <Link href="/拼好人" style={{ color: '#ccc', textDecoration: 'none' }}>拼好人</Link>
              <Link href="/做好事" style={{ color: '#ccc', textDecoration: 'none' }}>做好事</Link>
              <Link href="/好升级" style={{ color: '#ccc', textDecoration: 'none' }}>好升级</Link>
            </div>
            <p style={{ fontSize: '0.9rem', color: '#999' }}>
              © 2025 嘀嗒嘀嗒 版权所有
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ZuoHaoShi;