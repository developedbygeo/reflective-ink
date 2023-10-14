'use client';

import { useCallback, useEffect, useReducer, useState } from 'react';
import { debounce } from 'lodash';
import { Entry } from '@prisma/client';

import useEditorSubmit from '@/hooks/useEditorSubmit';
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

type EditorProps = {
  entry: Entry | null;
};

const Editor = ({ entry }: EditorProps) => {
  const [open, toggleOpen] = useReducer((open) => !open, false);
  const {
    isLoading,
    isSubmitted,
    value,
    setIsLoading,
    setIsSubmitted,
    setValue,
  } = useEditorSubmit();

  useEffect(() => {
    if (entry && entry.content) {
      setValue(entry.content);
    }
  }, [entry, entry?.content]);

  const ctaButtonText = isLoading ? 'Saving...' : 'Save';

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      debounce(() => {
        setValue(e.target.value);
      }, 1000)();
    },
    [],
  );

  const handleSave = async () => {
    if (entry && entry.id && value) {
      setIsLoading(true);
      const updated = await sendRequestForEntryUdate(
        entry.id,
        value.toString(),
      );
      setIsLoading(false);
    }
  };

  if (!entry) return null;

  return (
    <>
      <div className="w-full h-full">
        <Textarea onChange={handleChange} defaultValue={entry.content} />
      </div>
      <AlertDialog open={open} onOpenChange={toggleOpen}>
        <AlertDialogTrigger asChild>
          <Button>Update Entry</Button>
        </AlertDialogTrigger>
        <AlertDialogContent onMouseDown={toggleOpen}>
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
            <AlertDialogCancel onClick={toggleOpen}>Cancel</AlertDialogCancel>
            <Button
              onClick={handleSave}
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
    </>
  );
};

export default Editor;
