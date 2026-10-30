import { DoseRecord, Medicine } from '../models';

export async function ensureOccurrences(userId: string, from: Date, to: Date) {
  const meds = await Medicine.find({ user: userId, status: 'active', startDate: { $lte: to }, $or: [{ endDate: null }, { endDate: { $gte: from } }] });
  for (const med of meds) {
    const begin = new Date(Math.max(from.getTime(), med.startDate.getTime()));
    const stop = new Date(Math.min(to.getTime(), med.endDate?.getTime() ?? to.getTime()));
    for (let day = new Date(begin); day <= stop; day.setDate(day.getDate() + 1)) {
      for (const time of med.times) {
        const [h, m] = time.split(':').map(Number); const scheduledAt = new Date(day); scheduledAt.setHours(h, m, 0, 0);
        if (scheduledAt < from || scheduledAt > to) continue;
        const occurrenceId = `${med.id}:${scheduledAt.toISOString()}`;
        await DoseRecord.updateOne({ user: userId, occurrenceId }, { $setOnInsert: { user: userId, medicine: med._id, occurrenceId, scheduledAt, status: 'scheduled', audit: [{ action: 'scheduled', at: new Date() }] } }, { upsert: true });
      }
    }
  }
}
export function adherence(records: Array<{ status: string; scheduledAt: Date }>, asOf = new Date()) {
  const due = records.filter(x => new Date(x.scheduledAt) <= asOf);
  return { due: due.length, taken: due.filter(x => x.status === 'taken').length, percentage: due.length ? Math.round(due.filter(x => x.status === 'taken').length / due.length * 100) : null, rule: 'Taken doses divided by doses due; skipped and missed doses remain in the denominator; future doses are excluded.' };
}
