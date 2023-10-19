'use client';

import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { sendRequestForEntryUdate } from '@/utils/api';

import { Textarea } from '@/components/UI/Textarea';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/UI/AlertDialog';
import Spinner from '@/components/UI/Spinner';
import { Button } from '@/components/UI/Button';
import InputError from '@/components/UI/InputError';
import Analysis from './Analysis';
import { AugmentedEntry, EntryAnalysis } from '@/types/data';
import { CommonProps } from '@/types/UI';

type EditorProps = CommonProps & {
  entry: AugmentedEntry;
};

type EditorForm = {
  content: string;
};

const Editor = ({ entry }: EditorProps) => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [analysis, setAnalysis] = useState(entry?.analysis);
  const analysisData = [
    { name: 'Summary', value: analysis?.summary },
    { name: 'Subject', value: analysis?.subject },
    { name: 'Mood', value: analysis?.mood },
    { name: 'Negative', value: analysis?.negative },
  ];
  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm<EditorForm>();

  const ctaButtonText = isLoading ? 'Updating...' : 'Update';

  const handleSave: SubmitHandler<EditorForm> = async ({ content }) => {
    if (entry && entry.id) {
      setIsLoading(true);
      const data = await sendRequestForEntryUdate(entry.id, content.toString());
      setAnalysis(data?.analysis);
      setIsLoading(false);
    }
  };
  if (!entry) return null;

  return (
    <div className="grid grid-cols-12 mx-4 lg:container gap-4">
      <h1 className="col-span-12 lg:col-span-10 row-start-1 lg:col-start-2 text-xl">
        Entry - {entry?.id}
      </h1>
      <Analysis
        className="border-l mt-6 col-span-12 lg:col-start-10 border-black/10"
        sentimentColor={entry?.analysis?.color}
        analysis={analysisData}
      />
      <form className="lg:col-start-2 col-span-12 lg:col-span-7 row-start-2 self-start mt-6">
        <fieldset onBlur={() => trigger('content')} className="relative">
          <Textarea
            cols={30}
            rows={10}
            className="resize-none overflow-y-auto"
            {...register('content', { required: 'This field is required' })}
            defaultValue={entry.content}
          />
          {errors.content && (
            <InputError
              className="absolute -bottom-8"
              errorMessage={errors.content.message}
            />
          )}
        </fieldset>
        <AlertDialog open={open} onOpenChange={setOpen}>
          <AlertDialogTrigger asChild>
            <Button
              size="lg"
              disabled={Boolean(errors.content?.message)}
              className="mt-12 w-full lg:w-fit flex justify-center lg:justify-start items-center gap-2"
            >
              {isLoading && (
                <Spinner className="w-5 h-5 fill-white" aria-hidden="true" />
              )}
              <span>{ctaButtonText}</span>
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent onMouseDown={() => setOpen(false)}>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Do you want to update this entry?
              </AlertDialogTitle>
              <AlertDialogDescription>
                Proceeding with this action will update the entry&apos; content.
                Are you sure you want to proceed?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <Button
                size="lg"
                variant="outline"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              <Button
                size="lg"
                onClick={handleSubmit(handleSave)}
                className="flex items-center justify-start gap-1"
              >
                <span>Save</span>
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </form>
    </div>
  );
};

export default Editor;
