interface TokenBucket {
  count: number;
  resetAt: number;
}

export class RateLimiter {
  private buckets: Map<string, TokenBucket> = new Map();

  constructor(
    private maxRequests = 100,
    private windowMs = 60_000
  ) {}

  isAllowed(clientId: string): boolean {
    const now = Date.now();
    const bucket = this.buckets.get(clientId);

    if (!bucket || now > bucket.resetAt) {
      this.buckets.set(clientId, { count: 1, resetAt: now + this.windowMs });
      return true;
    }

    if (bucket.count >= this.maxRequests) return false;

    bucket.count++;
    return true;
  }
}
