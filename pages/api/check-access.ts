let paidUsers: string[] = [];

export default function handler(req, res) {
  const { userId } = req.query;

  const hasAccess = paidUsers.includes(userId);

  res.status(200).json({ hasAccess });
}