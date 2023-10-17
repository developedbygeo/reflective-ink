import { Entry } from '@prisma/client';

export type EntryAnalysis = {
  summary?: string;
  subject?: string;
  mood?: string;
  negative?: string;
};

export type EntryAnalysisData = {
  name: string;
  value: string | boolean | undefined;
};

export type AugmentedEntry =
  | (Entry & {
      analysis: {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        entryId: string;
        mood: string;
        summary: string;
        subject: string;
        color: string;
        negative: boolean;
      } | null;
    } & {
      id: string;
      createdAt: Date;
      updatedAt: Date;
      userId: string;
      content: string;
    })
  | null;

export type QaEntry = {
  id: string;
  content: string;
  createdAt: Date;
};
