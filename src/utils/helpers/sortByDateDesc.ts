import dayjs from "dayjs";

export const sortByDateDesc = <T extends { date: string }>(items: T[]): T[] =>
  [...items].sort((a, b) => dayjs(b.date).diff(dayjs(a.date)));
