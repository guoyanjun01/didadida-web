export default function handler(req, res) {
  if (req.method === 'POST') {
    const { userId } = req.body;
    // 这里可以添加实际的开通会员逻辑
    console.log('开通会员:', userId);
    res.status(200).json({ message: '会员开通成功' });
  } else {
    res.status(405).json({ message: '方法不允许' });
  }
}