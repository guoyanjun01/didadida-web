import type { NextApiRequest, NextApiResponse } from "next";

let paidUsers: string[] = [];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { userId } = req.query;

  const id = Array.isArray(userId) ? userId[0] : userId;

  const hasAccess = paidUsers.includes(id || "");

  res.status(200).json({ hasAccess });
}