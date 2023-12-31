'use client';

import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { sendQaQuestion } from '@/utils/api';
import { CommonProps } from '@/types/UI';

import Answer from '@/components/modules/Answer';

import { Input } from '@/components/UI/input';
import { Button } from '@/components/UI/Button';
import InputError from '@/components/UI/InputError';
import Spinner from '@/components/UI/Spinner';

type QuestionForm = {
  question: string;
};

const Question = ({ className }: CommonProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<undefined | string>(undefined);
  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm<QuestionForm>();

  const ctaText = isLoading ? 'Loading...' : 'Ask away';

  const handleQuestion: SubmitHandler<QuestionForm> = async ({ question }) => {
    setIsLoading(true);
    const answer = await sendQaQuestion(question);
    setIsLoading(false);
    setResponse(answer);
  };

  return (
    <div className={className}>
      <form
        onSubmit={handleSubmit(handleQuestion)}
        className="flex flex-col lg:flex-row items-center gap-4"
      >
        <div className="w-full relative">
          <Input
            {...register('question', { required: 'This field is required' })}
            className="h-full min-h-[5rem] lg:min-h-0 py-3"
            type="text"
            placeholder="What is on your mind?"
          />
          {errors.question && (
            <InputError
              className="absolute -bottom-8"
              errorMessage={errors.question.message}
            />
          )}
        </div>
        <Button
          disabled={isLoading}
          className="whitespace-nowrap w-full lg:w-auto flex items-center justify-center gap-3"
          size="lg"
          type="submit"
        >
          {isLoading && (
            <Spinner className="h-6 w-auto fill-white" aria-hidden="true" />
          )}
          <span className="block">{ctaText}</span>
        </Button>
      </form>
      <Answer answer={response} />
    </div>
  );
};

Question.propTypes = {};

export default Question;
