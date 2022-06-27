import React, { useState } from "react";
import style from './InputText.css';

interface InputTextProps {
  className?: string;
  isEditable: boolean;
  label?: string;
  value: string;
  onChange?: (value: string) => void;
}

export default function InputText(props: InputTextProps) {
  const [value, setValue] = useState<string>(props.value);

  let { isEditable, className, label, onChange } = props;

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = evt => {
    const { value } = evt.target;
    setValue(value);
    onChange?.(value);
  };


  className = className || 'input-text';

  return (
    <div className={`${className}-wrapper`}>
      {
        label ? <span className={`${className}-label`}>{label}</span> : null
      }
      {
        isEditable ? (
          <input
            className={`${style.inputText} ${style.inputTextEdit} ${className} ${className}--edit`}
            type={'text'}
            value={value}
            onChange={handleChange}
          />
        ) : (
          <div
            className={`${style.inputText} ${style.inputTextView} ${className} ${className}--view`}>
            {value}
          </div>
        )
      }
    </div>
  );
}