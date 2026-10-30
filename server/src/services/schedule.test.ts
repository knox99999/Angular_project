import { describe, expect, it } from 'vitest';
import { adherence } from './schedule';

describe('adherence', () => {
  it('keeps skipped and missed doses in due denominator and ignores future doses', () => {
    const result = adherence([
      { status: 'taken', scheduledAt: new Date('2026-10-28T08:00:00Z') },
      { status: 'skipped', scheduledAt: new Date('2026-10-28T12:00:00Z') },
      { status: 'missed', scheduledAt: new Date('2026-10-28T16:00:00Z') },
      { status: 'scheduled', scheduledAt: new Date('2026-10-29T08:00:00Z') }
    ], new Date('2026-10-28T20:00:00Z'));
    expect(result.due).toBe(3); expect(result.taken).toBe(1); expect(result.percentage).toBe(33);
  });
  it('returns unavailable when no dose is due', () => {
    expect(adherence([{ status: 'scheduled', scheduledAt: new Date('2026-10-29T08:00:00Z') }], new Date('2026-10-28T20:00:00Z')).percentage).toBeNull();
  });
});
