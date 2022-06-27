import React from "react";

import InputText from "./InputText";

interface ListItemProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
}

function ListItem(props: ListItemProps) {
  const { label, value, onChange } = props;
  return <InputText isEditable label={label} value={value} onChange={onChange} />;
};

interface ListProps {
  items: string[];
  onChange: (items: string[]) => void;
}
function List(props: ListProps) {
  const { items, onChange } = props;

  return (
    <ul>
      {
        items.map((e, i) => {
          const handleChange = (val: string) => {
            onChange([...items.slice(0, i), val, ...items.slice(i + 1)]);
          };
          return <ListItem key={'item-' + i}
            label={(i + 1).toString()}
            value={e}
            onChange={handleChange}
          />;
        })
      }
    </ul>
  );
};

interface InputFormProps {
  items: string[];
  onChange: (items: string[]) => void;
}

export default function InputForm(props: InputFormProps) {

  const { items, onChange } = props;

  const handleClick_newRow: React.MouseEventHandler = evt => {
    evt.preventDefault();
    onChange([...items, '']);
  }

  return (
    <div>
      <button onClick={handleClick_newRow}>+</button>
      <List items={items} onChange={onChange} />
    </div>
  );
}