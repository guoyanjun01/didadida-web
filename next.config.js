/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',          // 关键：启用静态导出
  images: {
    unoptimized: true,       // 静态模式下必须关闭图片优化
  },
}

module.exports = nextConfig