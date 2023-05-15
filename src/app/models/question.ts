export type Question = {
  id: number;
  question: string;
  options: Array<{ id: number; name: string; alias: string }>;
};
