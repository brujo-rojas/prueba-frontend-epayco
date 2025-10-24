import React from 'react';
import { useForm } from 'react-hook-form';
import { FormField } from '../molecules/FormField';
import { Button } from '../atoms/Button';
import { Typography } from '../atoms/Typography';
import { AddItemFormData, Item } from '../../types';
import { useAddItem } from '../../hooks/useAddItem';
import { useFormValidation } from '../../hooks/useFormValidation';

interface AddItemFormProps {
  onItemAdded?: (item: Item) => void;
}

export const AddItemForm: React.FC<AddItemFormProps> = ({ onItemAdded }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddItemFormData>();
  const { mutate: addItem, isLoading } = useAddItem();
  const { validateAll } = useFormValidation();

  const onSubmit = (data: AddItemFormData) => {
    const validationErrors = validateAll(data);
    if (Object.keys(validationErrors).length === 0) {
      addItem(data, {
        onSuccess: (newItem: Item) => {
          reset();
          onItemAdded?.(newItem);
        },
      });
    }
  };

  return (
    <div className="border p-6">
      <Typography variant="h1" className="mb-6">
        Add New Item
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          label="Title"
          type="text"
          placeholder="Enter item title"
          error={errors.title?.message as string}
          required
          {...register('title', {
            required: 'Title is required',
            minLength: {
              value: 3,
              message: 'Title must be at least 3 characters',
            },
          })}
        />

        <FormField
          label="Content"
          type="textarea"
          placeholder="Enter item content"
          error={errors.body?.message as string}
          required
          {...register('body', {
            required: 'Content is required',
            minLength: {
              value: 10,
              message: 'Content must be at least 10 characters',
            },
          })}
        />

        <div className="flex justify-end space-x-4">
          <Button type="button" onClick={() => reset()} disabled={isLoading}>
            Clear
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Saving...' : 'Save Item'}
          </Button>
        </div>
      </form>
    </div>
  );
};
