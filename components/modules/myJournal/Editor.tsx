'use client';

import { useCallback, useState } from 'react';
import { debounce } from 'lodash';

import { Textarea } from '@/components/UI/Textarea';
import { Entry } from '@prisma/client';

type EditorProps = {
  entry: Entry | null;
};

const Editor = ({ entry }: EditorProps) => {
  const content = (entry && entry.content) || null;
  const [value, setValue] = useState<string | null>(content);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      debounce(() => {
        setValue(e.target.value);
      }, 1000)();
    },
    [],
  );

  if (!entry) return null;

  return (
    <div className="w-full h-full">
      <Textarea onChange={handleChange} defaultValue={entry.content} />
    </div>
  );
};

export default Editor;
