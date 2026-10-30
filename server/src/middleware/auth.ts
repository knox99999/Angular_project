import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
declare global { namespace Express { interface Request { userId?: string } } }
export function requireAuth(req: Request, res: Response, next: NextFunction) {
  const token = req.cookies?.meditrack || (req.headers.authorization?.startsWith('Bearer ') ? req.headers.authorization.slice(7) : undefined);
  if (!token) return res.status(401).json({ error: 'Authentication required.' });
  try { const payload = jwt.verify(token, process.env.JWT_SECRET!) as { sub: string }; req.userId = payload.sub; next(); }
  catch { return res.status(401).json({ error: 'Session expired. Please sign in again.' }); }
}
