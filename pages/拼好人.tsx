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

const PinHaoRen: React.FC = () => {
  const router = useRouter();
  const appContext = useContextValue();
  
  // 确保应用上下文存在
  if (!appContext) {
    return <div>加载中...</div>;
  }
  
  const { user, pinHaoRenContent, searchHistory, addSearchHistory, clearSearchHistory } = appContext;
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredContents, setFilteredContents] = useState<ContentItem[]>([]);
  const [showHistory, setShowHistory] = useState(false);

  // 模拟从上下文中获取的内容
  const mockContents: ContentItem[] = [
    {
      id: '1',
      title: '坚韧',
      content: '坚韧不是永不跌倒，而是跌倒七次，站起来八次。生活中的困难如同磨刀石，每一次挫折都是让我们变得更加锋利的机会。坚韧是一种内在的力量，它让我们在面对逆境时不轻易放弃，而是选择坚持到底。',
      keywords: ['个人成长', '心态调整', '坚持'],
      category: '拼好人',
    },
    {
      id: '2',
      title: '谦逊',
      content: '谦逊不是自我贬低，而是对自己有清醒的认识。真正强大的人往往懂得谦逊，因为他们明白山外有山，人外有人。谦逊让我们保持开放的心态，不断学习和进步。',
      keywords: ['人际关系', '自我认知', '成长'],
      category: '拼好人',
    },
    {
      id: '3',
      title: '诚信',
      content: '诚信是人际交往中最宝贵的财富。就像一张信用卡，需要长期积累信用。一旦失信，就会像信用卡被透支一样，很难再恢复。诚信是一种品格，更是一种责任。',
      keywords: ['道德品质', '人际关系', '信任'],
      category: '拼好人',
    },
    {
      id: '4',
      title: '包容',
      content: '包容是一种美德，也是一种智慧。就像大海能容纳百川，真正包容的人能够理解和接纳不同的观点和行为方式。包容不是妥协，而是尊重差异，求同存异。',
      keywords: ['人际关系', '心态调整', '尊重'],
      category: '拼好人',
      isPremium: true,
    },
    {
      id: '5',
      title: '感恩',
      content: '感恩是一种生活态度，它让我们学会珍惜当下所拥有的一切。就像阳光一样，感恩能够照亮我们的生活，让我们看到生活中的美好。学会感恩，才能真正体验到生活的幸福。',
      keywords: ['心态调整', '幸福感', '生活态度'],
      category: '拼好人',
      isPremium: true,
    },
  ];

  useEffect(() => {
    // 优先使用上下文数据，如果没有则使用模拟数据
    const contents = pinHaoRenContent && pinHaoRenContent.length > 0 ? pinHaoRenContent : mockContents;
    setFilteredContents(contents);
  }, [pinHaoRenContent]);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      const contents = pinHaoRenContent && pinHaoRenContent.length > 0 ? pinHaoRenContent : mockContents;
      setFilteredContents(contents);
    } else {
      const contents = pinHaoRenContent && pinHaoRenContent.length > 0 ? pinHaoRenContent : mockContents;
      const filtered = contents.filter(content => 
        content.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        content.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        content.keywords.some(keyword => keyword.toLowerCase().includes(searchTerm.toLowerCase()))
      );
      setFilteredContents(filtered);
    }
  }, [searchTerm, pinHaoRenContent]);

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

  const handleAdminLogin = () => {
    // 这里应该添加实际的认证逻辑，现在只是模拟
    router.push('/后台');
  };

  const isPremiumContent = (content: ContentItem) => {
    // 检查内容是否为付费内容且用户未订阅
    return content.isPremium && (!user || !user.subscriptionType);
  };

  const handleClearHistory = () => {
    if (clearSearchHistory) {
      clearSearchHistory();
    }
    setShowHistory(false);
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
              <Link href="/拼好人" className="active">拼好人</Link>
            </li>
            <li>
              <Link href="/做好事">做好事</Link>
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
            <h2 className="text-3xl mb-40">拼好人</h2>
            <p className="mb-40">
              探索文字背后的深层含义，每个文字都蕴含着深刻的人生哲理和实用的生活智慧。
              免费浏览部分内容，升级会员后可解锁所有付费内容。
            </p>

            {/* 搜索框 */}
            <div className="search-container mb-40">
              <div className="relative">
                <input
                  type="text"
                  placeholder="搜索文字或关键词..."
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
                  <p>没有找到相关内容,请尝试其他关键词。</p>
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

export default PinHaoRen;