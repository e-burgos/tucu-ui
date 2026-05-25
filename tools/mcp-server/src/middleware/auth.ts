import { Request, Response, NextFunction } from 'express';
import { timingSafeEqual } from 'crypto';

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const MCP_API_KEY = process.env.MCP_API_KEY;

  // No key configured = open access (dev mode)
  if (!MCP_API_KEY) {
    next();
    return;
  }

  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ error: 'Unauthorized — Bearer token required' });
    return;
  }

  const token = authHeader.slice(7);

  // Constant-time comparison to prevent timing attacks
  if (
    token.length !== MCP_API_KEY.length ||
    !timingSafeEqual(Buffer.from(token), Buffer.from(MCP_API_KEY))
  ) {
    res.status(403).json({ error: 'Forbidden — invalid token' });
    return;
  }

  next();
}
