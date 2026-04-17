import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';

const Home: React.FC = () => {
  const router = useRouter();
  const [userId, setUserId] = useState("");
  const [hasAccess, setHasAccess] = useState(false);

  useEffect(() => {
    let id = localStorage.getItem("userId");
    if (!id) {
      id = Date.now().toString();
      localStorage.setItem("userId", id);
    }
    setUserId(id);
  }, []);

  useEffect(() => {
    if (!userId) return;

    fetch(`/api/check-access?userId=${userId}`)
      .then(res => res.json())
      .then(data => {
        setHasAccess(data.hasAccess);
      });
  }, [userId]);

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
            <div className="card-grid">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="card"
              >
                <h3>拼好人</h3>
                <p>探索个人成长的核心要素，培养良好的品德和心态。通过精选内容，帮助您成为更好的自己。</p>
                <Link href="/拼好人" className="btn btn-primary mt-10">开始探索</Link>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="card"
              >
                <h3>做好事</h3>
                <p>发现生活中的美好，学习积极的心态和行为。通过心灵鸡汤、学习搭子等内容，丰富您的精神世界。</p>
                <Link href="/做好事" className="btn btn-primary mt-10">开始探索</Link>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="card"
              >
                <h3>好升级</h3>
                <p>解锁高级内容和专属功能，享受更优质的成长体验。通过订阅会员，获得更多个性化的服务。</p>
                <Link href="/好升级" className="btn btn-premium mt-10">升级订阅</Link>
              </motion.div>
            </div>
          </section>

          {/* 特色内容 */}
          <section className="mb-40">
            <h2 className="text-3xl text-center mb-40">特色内容</h2>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="card"
            >
              <h3>为什么选择嘀嗒嘀嗒？</h3>
              <ul style={{ listStyle: 'none', margin: '20px 0' }}>
                <li style={{ padding: '10px 0', display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ color: 'var(--success-color)', fontSize: '1.5rem' }}>✓</span>
                  <span>高质量的精选内容，由专业团队精心制作</span>
                </li>
                <li style={{ padding: '10px 0', display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ color: 'var(--success-color)', fontSize: '1.5rem' }}>✓</span>
                  <span>个性化的学习路径，根据您的需求定制</span>
                </li>
                <li style={{ padding: '10px 0', display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ color: 'var(--success-color)', fontSize: '1.5rem' }}>✓</span>
                  <span>活跃的社区氛围，与志同道合的朋友一起成长</span>
                </li>
                <li style={{ padding: '10px 0', display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ color: 'var(--success-color)', fontSize: '1.5rem' }}>✓</span>
                  <span>持续更新的内容库，保持新鲜和活力</span>
                </li>
              </ul>
              <div className="text-center mt-20">
                <Link href="/好升级" className="btn btn-premium">立即体验</Link>
              </div>
            </motion.div>
          </section>
        </div>
      </main>

      {/* 页脚 */}
      <footer style={{ 
        background: '#f8f9fa', 
        padding: '30px 0', 
        marginTop: '40px',
        borderTop: '1px solid #e9ecef'
      }}>
        <div className="container">
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            textAlign: 'center'
          }}>
            <h3>嘀嗒嘀嗒</h3>
            <p style={{ margin: '10px 0' }}>
              解决我们不存在问题的绝佳解决方案
            </p>
            <div style={{ 
              margin: '20px 0', 
              display: 'flex', 
              gap: '20px'
            }}>
              <Link href="/" style={{ color: '#495057', textDecoration: 'none' }}>首页</Link>
              <Link href="/拼好人" style={{ color: '#495057', textDecoration: 'none' }}>拼好人</Link>
              <Link href="/做好事" style={{ color: '#495057', textDecoration: 'none' }}>做好事</Link>
              <Link href="/好升级" style={{ color: '#495057', textDecoration: 'none' }}>好升级</Link>
            </div>
            <p style={{ 
              marginTop: '20px', 
              color: '#6c757d', 
              fontSize: '14px'
            }}>
              © 2025 嘀嗒嘀嗒 版权所有
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
