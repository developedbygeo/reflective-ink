'use client';

import { useCallback, useEffect, useReducer, useState } from 'react';
import { debounce } from 'lodash';
import { Entry } from '@prisma/client';
import { SubmitHandler, useForm } from 'react-hook-form';

import { sendRequestForEntryUdate } from '@/utils/api';

import { Textarea } from '@/components/UI/Textarea';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
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

type EditorProps = {
  entry: Entry | null;
};

type EditorForm = {
  content: string;
};

const Editor = ({ entry }: EditorProps) => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    resetField,
    setError,
    watch,
    trigger,
    formState: { errors },
  } = useForm<EditorForm>();

  const ctaButtonText = isLoading ? 'Saving...' : 'Save';

  const handleSave: SubmitHandler<EditorForm> = async ({ content }) => {
    if (entry && entry.id) {
      setIsLoading(true);
      const updated = await sendRequestForEntryUdate(
        entry.id,
        content.toString(),
      );
      setIsLoading(false);
    }
  };

  if (!entry) return null;

  return (
    <form>
      <div className="w-full h-full">
        <fieldset onBlur={() => trigger('content')} className="relative">
          <Textarea
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
      </div>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogTrigger asChild>
          <Button disabled={Boolean(errors.content?.message)} className="mt-12">
            Update Entry
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
            <Button size="lg" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button
              size="lg"
              onClick={handleSubmit(handleSave)}
              className="flex items-center justify-start gap-1"
            >
              {isLoading && (
                <Spinner
                  className="mr-2 w-5 h-5 fill-white"
                  aria-hidden="true"
                />
              )}
              <span>{ctaButtonText}</span>
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </form>
  );
};

export default Editor;
