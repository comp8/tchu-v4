import React, { useCallback, useState } from "react";
import StyledButton from "./StyledButton";
import style from './SearchBar.css';
import Config from "../../config";

interface SearchBarProps {
  value: string;
  onChange?: (value: string) => void;
  onEnterKey?: (value: string) => void;
}
export default function SearchBar(props: SearchBarProps) {

  const [value, setValue] = useState<string>(props.value);

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (evt) => {
    if (evt.key === 'Enter') {
      console.log('Enter');
      evt.preventDefault();
      props.onEnterKey?.(value);
    }
  };
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (evt) => {
    // evt.preventDefault();
    setValue(evt.target.value);
    props.onChange?.(evt.target.value);
  };

  const handleClickBtnX = () => {
    setValue('');
    props.onChange?.('');
  };

  return (
    <div className={style.wrapper}>
      <label className={style.label}><span className={'icon-search'}></span></label>
      <input className={style.searchBar}
        type={'text'}
        value={value}
        placeholder={'Search (Name or ID)'}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      <StyledButton
        borderColor={'transparent'}
        foreColor={Config.style.defaultTheme["color-theme"]}
        backColor={Config.style.defaultTheme["color-back-1"]}
        onClick={handleClickBtnX}
      >
        {
          <div className={style.btnX}>
            {
              <span style={{ opacity: value ? 1 : 0.01 }} className='icon-cancel'></span>
            }
          </div>
        }
      </StyledButton>
    </div>
  );
}
