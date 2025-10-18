import React, { useState, useContext } from 'react';
import Link from 'next/link';
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

interface SubscriptionData {
  id: string;
  userId: string;
  userName: string;
  subscriptionType: 'monthly' | 'yearly';
  amount: number;
  startDate: string;
  endDate: string;
  status: 'active' | 'expired' | 'renewed';
}

const AdminDashboard: React.FC = () => {
  const router = useRouter();
  const appContext = useContextValue();
  
  // 确保应用上下文存在
  if (!appContext) {
    return <div>加载中...</div>;
  }
  
  const { pinHaoRenContent, zuoHaoShiContent, haoShengJiContent, addPinHaoRenContent, addZuoHaoShiContent, addHaoShengJiContent } = appContext;
  
  // 模拟数据
  const mockSubscriptionData: SubscriptionData[] = [
    { id: '1', userId: 'user1', userName: '用户A', subscriptionType: 'monthly', amount: 49, startDate: '2025-01-15', endDate: '2025-02-15', status: 'active' },
    { id: '2', userId: 'user2', userName: '用户B', subscriptionType: 'yearly', amount: 199, startDate: '2025-01-10', endDate: '2026-01-10', status: 'active' },
    { id: '3', userId: 'user3', userName: '用户C', subscriptionType: 'monthly', amount: 49, startDate: '2025-01-05', endDate: '2025-02-05', status: 'active' },
    { id: '4', userId: 'user4', userName: '用户D', subscriptionType: 'monthly', amount: 49, startDate: '2024-12-15', endDate: '2025-01-15', status: 'renewed' },
    { id: '5', userId: 'user5', userName: '用户E', subscriptionType: 'yearly', amount: 199, startDate: '2024-01-10', endDate: '2025-01-10', status: 'renewed' },
  ];

  // 状态管理
  const [activeTab, setActiveTab] = useState<'content' | 'stats' | 'subscriptions'>('content');
  const [contentType, setContentType] = useState<'metaphor' | 'goodDeed' | 'upgrade'>('metaphor');
  const [newContent, setNewContent] = useState({
    title: '',
    content: '',
    keywords: '',
    isPremium: false,
    category: '心灵鸡汤', // 仅对做好事内容有效
  });
  const [showSuccess, setShowSuccess] = useState(false);

  // 统计数据
  const stats = {
    totalSubscriptions: mockSubscriptionData.length,
    activeSubscriptions: mockSubscriptionData.filter(s => s.status === 'active').length,
    monthlyRevenue: mockSubscriptionData
      .filter(s => s.status === 'active' && s.subscriptionType === 'monthly')
      .reduce((sum, s) => sum + s.amount, 0),
    yearlyRevenue: mockSubscriptionData
      .filter(s => s.status === 'active' && s.subscriptionType === 'yearly')
      .reduce((sum, s) => sum + s.amount, 0),
    totalRevenue: mockSubscriptionData
      .filter(s => s.status === 'active')
      .reduce((sum, s) => sum + s.amount, 0),
  };

  // 处理内容添加
  const handleAddContent = () => {
    if (!newContent.title || !newContent.content || !newContent.keywords) {
      alert('请填写所有必填字段');
      return;
    }

    const content = {
      id: Date.now().toString(),
      title: newContent.title,
      content: newContent.content,
      keywords: newContent.keywords.split(',').map(keyword => keyword.trim()).filter(keyword => keyword),
      isPremium: newContent.isPremium
    };

    if (contentType === 'metaphor') {
      addPinHaoRenContent({ ...content, category: '隐喻' });
    } else if (contentType === 'goodDeed') {
      addZuoHaoShiContent({
        ...content,
        category: newContent.category as '心灵鸡汤' | '学习搭子' | '了解拓展',
      });
    } else if (contentType === 'upgrade') {
      addHaoShengJiContent({ ...content, category: '升级服务' });
    }

    // 重置表单
    setNewContent({
      title: '',
      content: '',
      keywords: '',
      isPremium: false,
      category: '心灵鸡汤',
    });

    // 显示成功提示
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  // 退出后台
  const handleLogout = () => {
    router.push('/');
  };

  return (
    <div>
      {/* 后台头部 */}
      <header className="admin-header">
        <div className="container header-content">
          <div>
            <h1>嘀嗒嘀嗒 - 创作者后台</h1>
          </div>
          <button onClick={handleLogout} className="btn btn-secondary">
            退出后台
          </button>
        </div>
      </header>

      {/* 后台导航 */}
      <nav className="admin-nav">
        <div className="container">
          <ul className="nav-links">
            <li>
              <button
                className={activeTab === 'content' ? 'active' : ''}
                onClick={() => setActiveTab('content')}
              >
                内容管理
              </button>
            </li>
            <li>
              <button
                className={activeTab === 'stats' ? 'active' : ''}
                onClick={() => setActiveTab('stats')}
              >
                数据统计
              </button>
            </li>
            <li>
              <button
                className={activeTab === 'subscriptions' ? 'active' : ''}
                onClick={() => setActiveTab('subscriptions')}
              >
                订阅管理
              </button>
            </li>
          </ul>
        </div>
      </nav>

      {/* 主要内容 */}
      <main className="admin-main">
        <div className="container">
          {/* 内容管理 */}
          {activeTab === 'content' && (
            <section className="mb-40">
              <h2 className="text-2xl mb-40">内容管理</h2>
              
              {/* 内容类型选择 */}
              <div className="content-type-tabs mb-40">
                <button
                  className={`tab ${contentType === 'metaphor' ? 'active' : ''}`}
                  onClick={() => setContentType('metaphor')}
                >
                  拼好人内容
                </button>
                <button
                  className={`tab ${contentType === 'goodDeed' ? 'active' : ''}`}
                  onClick={() => setContentType('goodDeed')}
                >
                  做好事内容
                </button>
                <button
                  className={`tab ${contentType === 'upgrade' ? 'active' : ''}`}
                  onClick={() => setContentType('upgrade')}
                >
                  好升级内容
                </button>
              </div>

              {/* 添加内容表单 */}
              <div className="card mb-40">
                <h3>添加新内容</h3>
                {showSuccess && (
                  <div className="success-message">内容添加成功！</div>
                )}
                
                <div className="form-group">
                  <label htmlFor="title">标题 *</label>
                  <input
                    type="text"
                    id="title"
                    value={newContent.title}
                    onChange={(e) => setNewContent({ ...newContent, title: e.target.value })}
                    placeholder="请输入标题"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="content">内容 *</label>
                  <textarea
                    id="content"
                    value={newContent.content}
                    onChange={(e) => setNewContent({ ...newContent, content: e.target.value })}
                    placeholder="请输入内容"
                    rows={6}
                    required
                  />
                </div>

                {contentType === 'goodDeed' && (
                  <div className="form-group">
                    <label htmlFor="category">内容类型 *</label>
                    <select
                      id="category"
                      value={newContent.category}
                      onChange={(e) => setNewContent({ ...newContent, category: e.target.value })}
                    >
                      <option value="心灵鸡汤">心灵鸡汤</option>
                      <option value="学习搭子">学习搭子</option>
                      <option value="了解拓展">了解拓展</option>
                    </select>
                  </div>
                )}

                <div className="form-group">
                  <label htmlFor="keywords">关键词 *</label>
                  <input
                    type="text"
                    id="keywords"
                    value={newContent.keywords}
                    onChange={(e) => setNewContent({ ...newContent, keywords: e.target.value })}
                    placeholder="请输入关键词，用逗号分隔"
                    required
                  />
                </div>

                <div className="form-group checkbox">
                  <input
                    type="checkbox"
                    id="isPremium"
                    checked={newContent.isPremium}
                    onChange={(e) => setNewContent({ ...newContent, isPremium: e.target.checked })}
                  />
                  <label htmlFor="isPremium">设为付费内容</label>
                </div>

                <button onClick={handleAddContent} className="btn btn-primary">
                  添加内容
                </button>
              </div>

              {/* 现有内容列表 */}
              <div>
                <h3 className="text-xl mb-40">现有内容</h3>
                <div className="content-list">
                  {(() => {
                    let contents: ContentItem[] = [];
                    if (contentType === 'metaphor') {
                      contents = pinHaoRenContent;
                    } else if (contentType === 'goodDeed') {
                      contents = zuoHaoShiContent;
                    } else if (contentType === 'upgrade') {
                      contents = haoShengJiContent;
                    }

                    if (!contents || contents.length === 0) {
                      return <p>暂无内容，请添加新内容。</p>;
                    }

                    return contents.map((content) => (
                      <div key={content.id} className="content-item admin">
                        <div className="content-header">
                          <h4>{content.title}</h4>
                          {content.isPremium && (
                            <span className="premium-badge">付费</span>
                          )}
                        </div>
                        <p>{content.content}</p>
                        <div className="content-tags">
                          {content.keywords.map((keyword, index) => (
                            <span key={index} className="tag">{keyword}</span>
                          ))}
                        </div>
                      </div>
                    ));
                  })()}
                </div>
              </div>
            </section>
          )}

          {/* 数据统计 */}
          {activeTab === 'stats' && (
            <section className="mb-40">
              <h2 className="text-2xl mb-40">数据统计</h2>
              
              <div className="stats-grid">
                <div className="stat-card">
                  <div className="stat-value">{stats.totalSubscriptions}</div>
                  <div className="stat-label">总订阅数</div>
                </div>
                <div className="stat-card">
                  <div className="stat-value">{stats.activeSubscriptions}</div>
                  <div className="stat-label">活跃订阅</div>
                </div>
                <div className="stat-card">
                  <div className="stat-value">¥{stats.monthlyRevenue}</div>
                  <div className="stat-label">月收入</div>
                </div>
                <div className="stat-card">
                  <div className="stat-value">¥{stats.yearlyRevenue}</div>
                  <div className="stat-label">年收入</div>
                </div>
                <div className="stat-card full-width">
                  <div className="stat-value">¥{stats.totalRevenue}</div>
                  <div className="stat-label">总收入</div>
                </div>
              </div>

              <div className="card mt-40">
                <h3>订阅趋势</h3>
                <div className="chart-placeholder">
                  <p>图表区域 - 在实际应用中，这里应该显示订阅趋势图表</p>
                </div>
              </div>
            </section>
          )}

          {/* 订阅管理 */}
          {activeTab === 'subscriptions' && (
            <section className="mb-40">
              <h2 className="text-2xl mb-40">订阅管理</h2>
              
              <div className="card">
                <table className="subscriptions-table">
                  <thead>
                    <tr>
                      <th>用户</th>
                      <th>订阅类型</th>
                      <th>金额</th>
                      <th>开始日期</th>
                      <th>结束日期</th>
                      <th>状态</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockSubscriptionData.map((subscription) => (
                      <tr key={subscription.id}>
                        <td>{subscription.userName}</td>
                        <td>{subscription.subscriptionType === 'monthly' ? '月度会员' : '年度会员'}</td>
                        <td>¥{subscription.amount}</td>
                        <td>{subscription.startDate}</td>
                        <td>{subscription.endDate}</td>
                        <td>
                          <span className={`status ${subscription.status}`}>
                            {subscription.status === 'active' ? '活跃' : 
                             subscription.status === 'expired' ? '已过期' : '已续费'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}
        </div>
      </main>

      {/* 页脚 */}
      <footer style={{ backgroundColor: '#333', color: 'white', padding: '20px 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontSize: '0.9rem', color: '#999' }}>
              © 2025 嘀嗒嘀嗒 创作者后台
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AdminDashboard;