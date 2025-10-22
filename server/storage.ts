import { type Poll } from "@shared/schema";

export interface IStorage {
  getPolls(): Promise<Poll[]>;
}

export class MemStorage implements IStorage {
  private polls: Map<string, Poll>;

  constructor() {
    this.polls = new Map();
  }

  async getPolls(): Promise<Poll[]> {
    return Array.from(this.polls.values());
  }
}

export const storage = new MemStorage();
