import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';

const Home: React.FC = () => {
  const router = useRouter();

  const handleAdminLogin = () => {
    // 这里应该添加实际的认证逻辑，现在只是模拟
    // 在实际应用中，应该有密码验证
    router.push('/后台');
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
          <button onClick={handleAdminLogin} className="btn btn-secondary">
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
              <Link href="/好升级">好升级</Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* 主要内容 */}
      <main className="main">
        <div className="container">
          {/* 英雄区域 */}
          <section className="mb-40">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="card text-center"
            >
              <h2 className="text-4xl mb-20">欢迎来到嘀嗒嘀嗒</h2>
              <p className="mb-20 text-lg">
                我们致力于提供高质量的内容，帮助您在各个方面提升自己。无论是个人成长、学习交流，还是心灵滋养，我们都能满足您的需求。
              </p>
              <div className="flex flex-wrap justify-center gap-20">
                <Link href="/拼好人" className="btn btn-primary">开始探索</Link>
                <Link href="/好升级" className="btn btn-premium">升级订阅</Link>
              </div>
            </motion.div>
          </section>

          {/* 功能介绍 */}
          <section className="mb-40">
            <h2 className="text-3xl text-center mb-40">我们的服务</h2>
            <div className="content-list">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Link href="/拼好人" className="content-item" style={{ textDecoration: 'none' }}>
                <div>
                  <h3>拼好人</h3>
                  <p>
                    通过独特的文字隐喻，帮助您理解和提升个人品质。每个文字背后都有深刻的人生哲理和实用的生活智慧。
                  </p>
                  <div className="content-tags">
                    <span className="tag">个人成长</span>
                    <span className="tag">品质提升</span>
                    <span className="tag">智慧分享</span>
                  </div>
                </div>
              </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <Link href="/做好事" className="content-item" style={{ textDecoration: 'none' }}>
                <div>
                  <h3>做好事</h3>
                  <p>
                    提供心灵鸡汤、学习搭子和知识拓展内容，nourish您的灵魂，连接志同道合的伙伴，拓展您的知识面。
                  </p>
                  <div className="content-tags">
                    <span className="tag">心灵滋养</span>
                    <span className="tag">学习交流</span>
                    <span className="tag">知识拓展</span>
                  </div>
                </div>
              </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <Link href="/好升级" className="content-item" style={{ textDecoration: 'none' }}>
                <div>
                  <span className="premium-badge">付费</span>
                  <h3>好升级</h3>
                  <p>
                    高级付费服务，提供专属内容、个性化指导和每月四次的精选内容汇总，助力您的全面成长。
                  </p>
                  <div className="content-tags">
                    <span className="tag">专属内容</span>
                    <span className="tag">个性化指导</span>
                    <span className="tag">精选汇总</span>
                  </div>
                </div>
              </Link>
              </motion.div>
            </div>
          </section>

          {/* 订阅计划 */}
          <section className="mb-40">
            <h2 className="text-3xl text-center mb-40">订阅计划</h2>
            <div className="subscription-plans">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="plan-card"
              >
                <h3>月度会员</h3>
                <div className="plan-price">¥49<span style={{ fontSize: '1rem', fontWeight: 'normal', color: '#666' }}>/月</span></div>
                <ul className="plan-features">
                  <li>无限制访问所有付费内容</li>
                  <li>每月4次精选内容汇总</li>
                  <li>可下载汇总内容</li>
                  <li>优先获取新内容</li>
                </ul>
                <Link href="/好升级" className="btn btn-primary" style={{ width: '100%', textAlign: 'center' }}>
                  选择月度会员
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="plan-card pro"
              >
                <h3>年度会员</h3>
                <div className="plan-price">¥199<span style={{ fontSize: '1rem', fontWeight: 'normal', color: '#666' }}>/年</span></div>
                <div className="text-success mb-20">节省58%，相当于¥16.6/月</div>
                <ul className="plan-features">
                  <li>包含所有月度会员权益</li>
                  <li>额外赠送2次/月汇总次数</li>
                  <li>专属定制内容推荐</li>
                  <li>创作者一对一咨询（1次/年）</li>
                </ul>
                <Link href="/好升级" className="btn btn-premium" style={{ width: '100%', textAlign: 'center' }}>
                  选择年度会员
                </Link>
              </motion.div>
            </div>
          </section>

          {/* 常见问题 */}
          <section className="mb-40">
            <h2 className="text-3xl text-center mb-40">常见问题</h2>
            <div className="content-list">
              <div className="content-item">
                <h3>如何开始使用？</h3>
                <p>只需注册账号，即可免费浏览部分内容。升级会员后，可访问所有付费内容。</p>
              </div>
              <div className="content-item">
                <h3>如何升级会员？</h3>
                <p>在"好升级"页面选择适合您的订阅计划，完成支付后即可立即享受会员权益。</p>
              </div>
              <div className="content-item">
                <h3>内容如何更新？</h3>
                <p>我们的内容会定期更新，会员可以优先获取最新内容和独家内容。</p>
              </div>
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

export default Home;