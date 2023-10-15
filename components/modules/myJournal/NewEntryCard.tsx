'use client';

import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';

import { Button } from '@/components/UI/Button';
import { Label } from '@/components/UI/Label';
import { Card, CardContent, CardFooter } from '@/components/UI/Card';
import { Textarea } from '@/components/UI/Textarea';
import { sendRequestForNewEntry } from '@/utils/api';
import { NewJournalEntryData } from '@/types/forms';
import InputError from '@/components/UI/InputError';
import { useState } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/UI/Accordion';

const NewEntryCard = () => {
  const [expanded, setExpanded] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm<NewJournalEntryData>();

  // TODO add loading state here
  const handleNewEntry: SubmitHandler<NewJournalEntryData> = async (data) => {
    const journalData = await sendRequestForNewEntry(data.content);
    router.push(`my-journal/${journalData.id}`);
  };

  const handleReset = () => {
    resetField('content');
  };

  return (
    <Accordion type="single" collapsible className="w-full col-span-3">
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
                  className="w-full"
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
              <Button size="lg" onClick={handleSubmit(handleNewEntry)}>
                Add
              </Button>
            </CardFooter>
          </Card>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default NewEntryCard;
