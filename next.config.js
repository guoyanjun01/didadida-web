/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,       // 静态模式下必须关闭图片优化
  },
}

module.exports = nextConfig