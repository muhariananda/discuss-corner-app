import { useState } from 'react';

function useInputHTML(defaultValue = '') {
  const [value, setValue] = useState(defaultValue);

  const onValueChangeHandler = (event) => {
    const { innerHTML } = event.target;
    setValue(innerHTML);
  };

  return [value, onValueChangeHandler];
}

export default useInputHTML;
