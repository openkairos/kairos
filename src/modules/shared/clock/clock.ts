export type Clock = () => Date;

export const systemClock: Clock = () => new Date();

export const frozenClock =
  (fixedDate: Date): Clock =>
  () =>
    fixedDate;
