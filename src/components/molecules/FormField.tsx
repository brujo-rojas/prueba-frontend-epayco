import React from 'react';
import { Input } from '../atoms/Input';
import { Textarea } from '../atoms/Textarea';
import { Typography } from '../atoms/Typography';

interface FormFieldProps {
  label: string;
  type?: 'text' | 'textarea';
  placeholder?: string;
  value?: string;
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onBlur?: (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  error?: string;
  required?: boolean;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  onBlur,
  error,
  required = false,
}) => {
  return (
    <div className="mb-4">
      <Typography variant="label" className="block mb-2">
        {label}
        {required && <span className="ml-1">*</span>}
      </Typography>

      {type === 'textarea' ? (
        <Textarea
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          error={error}
          required={required}
        />
      ) : (
        <Input
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          error={error}
          required={required}
        />
      )}
    </div>
  );
};
