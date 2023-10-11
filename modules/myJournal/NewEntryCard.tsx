'use client'

import { useRouter } from 'next/navigation'
import { SubmitHandler, useForm } from 'react-hook-form'

import { Button } from '@/components/UI/Button'
import { Label } from '@/components/UI/Label'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/UI/Card'
import { Textarea } from '@/components/UI/Textarea'
import { createNewJournalEntry } from '@/utils/api'
import { NewJournalEntryData } from '@/types/forms'
import InputError from '@/components/UI/InputError'

const NewEntryCard = () => {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm<NewJournalEntryData>()

  const handleNewEntry: SubmitHandler<NewJournalEntryData> = async (data) => {
    const journalData = await createNewJournalEntry(data.content)
    router.replace(`my-journal/${journalData.id}`)
  }

  const handleReset = () => {
    resetField('content')
  }

  console.log(errors.content)

  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Add a new entry</CardTitle>
        <CardDescription className="font-light">
          Remember, you have to write something first
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="relative" onSubmit={handleSubmit(handleNewEntry)}>
          <Label htmlFor="new-entry">What is on your mind?</Label>
          <Textarea
            {...register('content', { required: 'This field is required' })}
            className="w-full"
            id="new-entry"
            placeholder="I am all ears..."
          />
          {errors.content && (
            <InputError
              className="absolute -bottom-2"
              errorMessage={errors.content.message}
            />
          )}
        </form>
      </CardContent>
      <CardFooter className="flex justify-between mt-8">
        <Button onClick={handleReset} variant="outline">
          Cancel
        </Button>
        <Button onClick={handleSubmit(handleNewEntry)}>Deploy</Button>
      </CardFooter>
    </Card>
  )
}

export default NewEntryCard
