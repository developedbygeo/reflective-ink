import { OpenAI } from 'langchain/llms/openai';
import { StructuredOutputParser } from 'langchain/output_parsers';
import { PromptTemplate } from 'langchain/prompts';
import z from 'zod';

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
