import z from 'zod';
import { OpenAI } from 'langchain/llms/openai';
import { PromptTemplate } from 'langchain/prompts';
import { StructuredOutputParser } from 'langchain/output_parsers';
import { Document } from 'langchain/document';
import { loadQARefineChain } from 'langchain/chains';
import { OpenAIEmbeddings } from 'langchain/embeddings/openai';
import { MemoryVectorStore } from 'langchain/vectorstores/memory';

import { AugmentedEntry, QaEntry } from '@/types/data';

const promptParser = StructuredOutputParser.fromZodSchema(
  z.object({
    mood: z
      .string()
      .describe(
        'The mood of the person who wrote the journal entry. The possible moods are: joyful, sad, angry, anxious, relieved, neutral, content, frustrated, excited, hopeful.',
      ),
    summary: z.string().describe('Quick summary of the entire entry.'),
    subject: z.string().describe('the subject of the journal entry.'),
    negative: z
      .boolean()
      .describe(
        'Is the journal entry negative? (i.e does it contain negative emotions?)',
      ),
    color: z
      .string()
      .describe(
        'A hexadecimal color code that represents the mood of the entry. Example #0101fe for blue representing happiness.',
      ),
  }),
);

const getPrompt = async (content: string) => {
  const formatInstructions = promptParser.getFormatInstructions();

  const prompt = new PromptTemplate({
    template: `Analyze the following journal entry. Follow the instructions and format your response to match the format instructions, no matter what! \n{format_instructions}\n{entry}`,
    inputVariables: ['entry'],
    partialVariables: { format_instructions: formatInstructions },
  });

  const input = await prompt.format({
    entry: content,
  });

  console.log(input);
  return input;
};

export const analyze = async (content: string) => {
  const input = await getPrompt(content);
  const model = new OpenAI({ temperature: 0, modelName: 'gpt-3.5-turbo' });
  const result = await model.call(input);

  try {
    return promptParser.parse(result);
  } catch (err) {
    console.log(err);
  }
};

// a qaModal which takes in a question and a list of entries, creates a vector db in memory and returns the answer to the question (by grouping the entries into relevant and irrelevant entries)

export const qaModel = async (question: string, entries: QaEntry[]) => {
  const documents = entries.map(
    (entry) =>
      new Document({
        pageContent: entry.content,
        metadata: { source: entry.id, date: entry.createdAt },
      }),
  );

  const model = new OpenAI({ temperature: 0, modelName: 'gpt-3.5-turbo' });

  // https://js.langchain.com/docs/modules/chains/document/refine
  // https://js.langchain.com/docs/modules/chains/document/refine#refine
  const qaRefineChain = loadQARefineChain(model);

  // https://js.langchain.com/docs/api/embeddings_openai/classes/OpenAIEmbeddings
  // embeddings are basically a group of vectors that represent some text.
  // we are essentially using the hosted embeddings from OpenAI
  const embeddings = new OpenAIEmbeddings();
  const vectorStore = await MemoryVectorStore.fromDocuments(
    documents,
    embeddings,
  );

  // relevantDocs - based on the question, we know what entries we need to answer it.
  const relevantDocs = await vectorStore.similaritySearch(question);

  const response = await qaRefineChain.call({
    input_documents: relevantDocs,
    question,
    instructions:
      'Please provide your answer in a friendly, empathic manner with a conversational tone.',
  });

  return response.output_text;
};
