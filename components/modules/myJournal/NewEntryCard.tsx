'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';

import { sendRequestForNewEntry } from '@/utils/api';
import classnameJoin from '@/utils/ui';
import { NewJournalEntryData } from '@/types/forms';
import { CommonProps } from '@/types/UI';

import { Button } from '@/components/UI/Button';
import { Label } from '@/components/UI/Label';
import { Card, CardContent, CardFooter } from '@/components/UI/Card';
import { Textarea } from '@/components/UI/Textarea';
import InputError from '@/components/UI/InputError';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/UI/Accordion';
import Spinner from '@/components/UI/Spinner';

const NewEntryCard = ({ className }: CommonProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm<NewJournalEntryData>();

  const ctaButtonText = isLoading ? 'Updating...' : 'Update';

  // TODO add loading state here
  const handleNewEntry: SubmitHandler<NewJournalEntryData> = async (data) => {
    setIsLoading(true);
    const journalData = await sendRequestForNewEntry(data.content);
    setIsLoading(false);
    router.push(`my-journal/${journalData.id}`);
  };

  const handleReset = () => {
    resetField('content');
  };

  return (
    <Accordion
      type="single"
      collapsible
      className={classnameJoin('w-full col-span-3', className)}
    >
      <AccordionItem value="item-1">
        <AccordionTrigger>Ready to add an entry?</AccordionTrigger>
        <AccordionContent>
          <Card className="col-span-2">
            <CardContent>
              <form
                className="relative"
                onSubmit={handleSubmit(handleNewEntry)}
              >
                <Label htmlFor="new-entry">What is on your mind?</Label>
                <Textarea
                  {...register('content', {
                    required: 'This field is required',
                  })}
                  className="w-full h-40 resize-none"
                  id="new-entry"
                  placeholder="..."
                />
                {errors.content && (
                  <InputError
                    className="absolute -bottom-2"
                    errorMessage={errors.content.message}
                  />
                )}
              </form>
            </CardContent>
            <CardFooter className="flex justify-start gap-6 mt-8">
              <Button onClick={handleReset} variant="outline">
                Cancel
              </Button>
              <Button
                className="flex items-center justify-center gap-3"
                disabled={isLoading}
                size="lg"
                onClick={handleSubmit(handleNewEntry)}
              >
                {isLoading && (
                  <Spinner className="w-5 h-5 fill-white" aria-hidden="true" />
                )}
                <span>{ctaButtonText}</span>
              </Button>
            </CardFooter>
          </Card>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default NewEntryCard;
