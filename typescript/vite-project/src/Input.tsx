import React from 'react';

type InputProps = {
  id?: string;
  label?: string;
  placeholder?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
};
console.log("AA")
const INPUT_STYLES = {
  container: { marginBottom: '10px' },
  label: { display: 'block', marginBottom: '5px' },
  input: { padding: '8px', fontSize: '16px' },
};

const props = (style: object) => ({ style });

const Input: React.FC<InputProps> = ({ id, label, onChange, placeholder }) => (
  <div {...props(INPUT_STYLES.container)}>
    <label {...props(INPUT_STYLES.label)} htmlFor={id}>
      {label}
    </label>
    <input
      {...props(INPUT_STYLES.input)}
      id={id}
      name={id}
      type="text"
      placeholder={placeholder} // Itt használjuk a placeholder prop-ot
      onChange={onChange}
    />
  </div>
);

export default Input;
