import { z } from "zod";

export const pollSchema = z.object({
  id: z.string(),
  title: z.string(),
  choices: z.array(z.string()),
  votes: z.record(z.string(), z.string()),
  voters: z.array(z.object({
    id: z.string(),
    name: z.string(),
    hasVoted: z.boolean(),
  })),
  createdAt: z.number(),
  status: z.enum(['setup', 'voting', 'closed']),
});

export const insertPollSchema = z.object({
  title: z.string().min(1, "Poll title is required"),
  choices: z.array(z.string().min(1)).min(2, "At least 2 choices required"),
});

export const voteSchema = z.object({
  pollId: z.string(),
  voterId: z.string(),
  voterName: z.string(),
  choiceIndex: z.number(),
});

export type Poll = z.infer<typeof pollSchema>;
export type InsertPoll = z.infer<typeof insertPollSchema>;
export type Vote = z.infer<typeof voteSchema>;
