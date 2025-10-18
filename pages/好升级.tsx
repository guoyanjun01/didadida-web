import React, { useState, useContext } from 'react';
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

const HaoShengJi: React.FC = () => {
  const router = useRouter();
  const appContext = useContextValue();
  
  // 确保应用上下文存在
  if (!appContext) {
    return <div>加载中...</div>;
  }
  
  const { user, updateUser, haoShengJiContent } = appContext;
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'yearly'>('monthly');
  const [showSummary, setShowSummary] = useState(false);
  const [summaryContent, setSummaryContent] = useState('');
  const [remainingRefreshes, setRemainingRefreshes] = useState(user?.remainingRefreshes || 4); // 每月4次刷新机会
  const [isSubscribing, setIsSubscribing] = useState(false);

  // 模拟的升级服务内容
  const upgradeContents: ContentItem[] = [
    {
      id: '1',
      title: '个人成长加速指南',
      content: '深入探讨个人成长的核心要素，提供系统化的成长路径和实用工具，帮助您快速提升自我。',
      keywords: ['个人成长', '自我提升', '效率'],
      category: '升级服务',
    },
    {
      id: '2',
      title: '高效学习方法论',
      content: '揭示学习的科学原理和高效方法，让您的学习事半功倍，轻松掌握新知识和技能。',
      keywords: ['学习方法', '效率', '技能提升'],
      category: '升级服务',
    },
    {
      id: '3',
      title: '情绪管理与心理健康',
      content: '学习如何管理情绪，保持心理健康，培养积极心态，应对生活中的各种挑战。',
      keywords: ['心理健康', '情绪管理', '心态调整'],
      category: '升级服务',
    },
    {
      id: '4',
      title: '职业发展规划',
      content: '制定科学的职业发展规划，掌握职业成长的关键要素，实现职场突破和晋升。',
      keywords: ['职业发展', '职场成长', '规划'],
      category: '升级服务',
    },
  ];

  // 模拟生成汇总内容
  const generateSummary = () => {
    if (remainingRefreshes <= 0) {
      alert('本月刷新次数已用完，请下月再试。');
      return;
    }

    // 模拟生成一些汇总内容
    const summaries = [
      '本月精选内容：\n1. 心灵成长：学会接纳不完美的自己\n2. 学习方法：费曼学习法的实践应用\n3. 人际关系：有效沟通的5个关键技巧\n4. 效率提升：番茄工作法的进阶使用\n\n总结：本月的内容强调了自我接纳的重要性，以及如何通过科学的方法提升学习和工作效率。',
      '本月精选内容：\n1. 个人成长：设定有效的目标\n2. 心态调整：积极心理学的实践\n3. 时间管理：重要不紧急事务的处理\n4. 学习技巧：如何深度阅读\n\n总结：本月内容聚焦于如何通过科学的方法提升个人效能，从目标设定到时间管理，全方位帮助您成长。',
      '本月精选内容：\n1. 情绪管理：识别和应对负面情绪\n2. 人际关系：建立健康的边界\n3. 学习策略：如何构建知识体系\n4. 生活方式：建立健康的日常习惯\n\n总结：本月内容关注身心平衡和全面发展，帮助您在各个方面都能取得进步。',
    ];

    // 随机选择一个汇总内容
    const randomSummary = summaries[Math.floor(Math.random() * summaries.length)];
    setSummaryContent(randomSummary);
    setShowSummary(true);
    const newRemainingRefreshes = remainingRefreshes - 1;
    setRemainingRefreshes(newRemainingRefreshes);
    
    // 更新全局状态中的剩余刷新次数
    if (user) {
      updateUser({
        ...user,
        remainingRefreshes: newRemainingRefreshes
      });
    }
  };

  // 下载汇总内容
  const downloadSummary = () => {
    if (!summaryContent) return;

    const blob = new Blob([summaryContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `嘀嗒嘀嗒月度汇总_${new Date().toISOString().slice(0, 7)}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // 处理订阅
  const handleSubscribe = () => {
    setIsSubscribing(true);
    // 模拟订阅过程
    setTimeout(() => {
      // 在实际应用中，这里应该有支付接口调用
      const newUserData = {
      subscriptionType: selectedPlan,
      subscriptionDate: new Date().toISOString(),
      remainingRefreshes: 4
    };
      
      // 如果用户已存在，则更新，否则创建新用户
      if (user) {
        updateUser({ ...user, ...newUserData, isSubscribed: true });
      } else {
        // 创建新用户并订阅
        const newUser = {
          id: `user_${Date.now()}`,
          name: '用户',
          email: `user_${Date.now()}@example.com`,
          ...newUserData,
          isSubscribed: true // ✅ 补上缺的必填项
        };
        updateUser(newUser);
      }
      
      setIsSubscribing(false);
      alert('订阅成功！');
    }, 1500);
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
              <Link href="/做好事">做好事</Link>
            </li>
            <li>
              <Link href="/好升级" className="active">好升级</Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* 主要内容 */}
      <main className="main">
        <div className="container">
          <section className="mb-40">
            <h2 className="text-3xl mb-40">好升级</h2>
            <p className="mb-40">
              升级会员，解锁更多专属内容和高级功能，享受每月4次的精选内容汇总服务。
            </p>

            {user && user.subscriptionType ? (
              // 已订阅状态
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="mb-40"
              >
                <div className="card success">
                  <h3>您已是会员</h3>
                  <p>
                    感谢您的订阅！您当前的会员类型是：
                    <strong>{user?.subscriptionType === 'monthly' ? '月度会员' : '年度会员'}</strong>
                  </p>
                  <p>订阅日期：{new Date(user?.subscriptionDate || Date.now()).toLocaleDateString()}</p>
                </div>

                {/* 汇总生成 */}
                <div className="card mb-40">
                  <h3>月度内容汇总</h3>
                  <p className="mb-20">
                    每月可刷新4次，当前剩余：<span className="text-primary font-bold">{remainingRefreshes}</span> 次
                  </p>
                  <button onClick={generateSummary} className="btn btn-primary mb-20">
                    生成汇总内容
                  </button>

                  {showSummary && summaryContent && (
                    <div className="summary-content mb-20">
                      <pre>{summaryContent}</pre>
                      <button onClick={downloadSummary} className="btn btn-secondary download-btn">
                        下载汇总
                      </button>
                    </div>
                  )}
                </div>

                {/* 升级服务内容 */}
                <div className="mb-40">
                  <h3 className="text-2xl mb-40">升级服务内容</h3>
                  <div className="content-list">
                    {upgradeContents.map((content) => (
                      <motion.div
                        key={content.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="content-item"
                      >
                        <h3>{content.title}</h3>
                    <p>{content.content}</p>
                    <div className="content-tags">
                      {content.keywords.map((keyword, index) => (
                        <span key={index} className="tag">{keyword}</span>
                      ))}
                    </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ) : (
              // 未订阅状态
              <div className="mb-40">
                {/* 订阅计划 */}
                <h3 className="text-2xl mb-40">选择订阅计划</h3>
                <div className="subscription-plans mb-40">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className={`plan-card ${selectedPlan === 'monthly' ? 'selected' : ''}`}
                    onClick={() => setSelectedPlan('monthly')}
                  >
                    <h3>月度会员</h3>
                    <div className="plan-price">¥49<span style={{ fontSize: '1rem', fontWeight: 'normal', color: '#666' }}>/月</span></div>
                    <ul className="plan-features">
                      <li>无限制访问所有付费内容</li>
                      <li>每月4次精选内容汇总</li>
                      <li>可下载汇总内容</li>
                      <li>优先获取新内容</li>
                    </ul>
                    <div className="radio-select">
                      <input
                        type="radio"
                        id="monthly"
                        name="plan"
                        checked={selectedPlan === 'monthly'}
                        onChange={() => setSelectedPlan('monthly')}
                      />
                      <label htmlFor="monthly">选择</label>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className={`plan-card pro ${selectedPlan === 'yearly' ? 'selected' : ''}`}
                    onClick={() => setSelectedPlan('yearly')}
                  >
                    <div className="recommended">推荐</div>
                    <h3>年度会员</h3>
                    <div className="plan-price">¥199<span style={{ fontSize: '1rem', fontWeight: 'normal', color: '#666' }}>/年</span></div>
                    <div className="text-success mb-20">节省58%，相当于¥16.6/月</div>
                    <ul className="plan-features">
                      <li>包含所有月度会员权益</li>
                      <li>额外赠送2次/月汇总次数</li>
                      <li>专属定制内容推荐</li>
                      <li>创作者一对一咨询（1次/年）</li>
                    </ul>
                    <div className="radio-select">
                      <input
                        type="radio"
                        id="yearly"
                        name="plan"
                        checked={selectedPlan === 'yearly'}
                        onChange={() => setSelectedPlan('yearly')}
                      />
                      <label htmlFor="yearly">选择</label>
                    </div>
                  </motion.div>
                </div>

                {/* 订阅按钮 */}
                <div className="text-center mb-40">
                  <button 
                    onClick={handleSubscribe} 
                    className="btn btn-premium" 
                    disabled={isSubscribing}
                  >
                    {isSubscribing ? '处理中...' : `立即订阅 ${selectedPlan === 'monthly' ? '¥49/月' : '¥199/年'}`}
                  </button>
                </div>

                {/* 会员权益 */}
                <div className="mb-40">
                  <h3 className="text-2xl mb-40">会员专享权益</h3>
                  <div className="benefits-list">
                    <div className="benefit-item">
                      <div className="benefit-icon">📚</div>
                      <div className="benefit-content">
                        <h4>所有付费内容</h4>
                        <p>无限制访问"拼好人"和"做好事"中的所有付费内容</p>
                      </div>
                    </div>
                    <div className="benefit-item">
                      <div className="benefit-icon">📋</div>
                      <div className="benefit-content">
                        <h4>月度内容汇总</h4>
                        <p>每月4次精选内容汇总，可下载保存</p>
                      </div>
                    </div>
                    <div className="benefit-item">
                      <div className="benefit-icon">🚀</div>
                      <div className="benefit-content">
                        <h4>优先获取新内容</h4>
                        <p>新内容上线时，会员优先72小时获取</p>
                      </div>
                    </div>
                    <div className="benefit-item">
                      <div className="benefit-icon">💎</div>
                      <div className="benefit-content">
                        <h4>专属升级服务</h4>
                        <p>访问"好升级"专区的所有高级内容</p>
                      </div>
                    </div>
                    {selectedPlan === 'yearly' && (
                      <div className="benefit-item">
                        <div className="benefit-icon">🎁</div>
                        <div className="benefit-content">
                          <h4>额外权益</h4>
                          <p>年度会员额外赠送2次/月汇总次数和创作者咨询</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
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

export default HaoShengJi;