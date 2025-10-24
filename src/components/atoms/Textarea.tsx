import React, { forwardRef, useState, useEffect } from "react";

interface TextareaProps {
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
  error?: string;
  required?: boolean;
  name?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ placeholder, value, onChange, onBlur, error, required = false, name, ...props }, ref) => {
    const [charCount, setCharCount] = useState(0);
    
    // Sync charCount with value prop
    useEffect(() => {
      setCharCount(value?.length || 0);
    }, [value]);
    
    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setCharCount(e.target.value.length);
      onChange?.(e);
    };
    
    return (
      <div>
        <textarea
          ref={ref}
          placeholder={placeholder}
          onChange={handleChange}
          onBlur={onBlur}
          required={required}
          rows={3}
          name={name}
          className={`w-full p-2 border rounded-md resize-none bg-white cursor-text ${
            error ? "border-red-500" : "border-stone-300"
          } focus:outline-none focus:ring-2 focus:ring-stone-400 focus:border-transparent`}
          {...props}
        />
        <div className="flex justify-between items-center mt-1">
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <p className="text-xs ml-auto text-stone-400">
            {charCount} characters
          </p>
        </div>
      </div>
    );
  }
);
