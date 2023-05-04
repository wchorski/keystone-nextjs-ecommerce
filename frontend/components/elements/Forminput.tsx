// cred - https://github.com/safak/youtube/blob/react-form/src/components/FormInput.jsx

import { useState } from "react";
import styled from "styled-components";

export const FormInput = (props:any) => {
  const { label, errorMessage, onChange, id, hint, ...inputProps } = props;

  const [focused, setFocused] = useState(false);

  const handleFocus = (e: React.FormEvent) => {
    setFocused(true);
  };

  if(inputProps.type === 'textarea') return (
    <StyledInputLabel htmlFor={inputProps.name}>
      <span className="label">{label}</span>
      <textarea {...inputProps} onChange={onChange} onBlur={handleFocus} focused={focused.toString()}/>
    </StyledInputLabel>
  )

  if(inputProps.type === 'select') return (
    <StyledInputLabel htmlFor={inputProps.name}>
      {label}
      <select 
        {...inputProps}
        // onChange={handleChange}
        onChange={onChange}
      >
        <option key={0} value={''}> -- Select a {label} -- </option>
        {inputProps.options.map((opt: any, i:number) => (
          <option key={i+1} value={opt.value}> {opt.label} </option>
        ))}
      </select>
    </StyledInputLabel>
  )

  return (
    <StyledInputLabel className="formInput" htmlFor={inputProps.name}>
      <span className="label"> {label} </span>
      <input
        {...inputProps}
        onChange={onChange}
        onBlur={handleFocus}
        onFocus={() =>
          inputProps.name === "confirmPassword" && setFocused(true)
        }
        focused={focused.toString()}
      />
      <span className="tooltip error">{errorMessage}</span>
      <span className="tooltip hint">{hint}</span>
    </StyledInputLabel>
  )
};

const StyledInputLabel = styled.label`
  font-size: 1rem;
  color: gray;
  margin-bottom: 0;
  position: relative;

  .formInput{
    display: flex;
    flex-direction: column;
    width: 280px;
  }

  input{
    padding: 15px;
    margin: 10px 0px;
    border-radius: 5px;
    border: 1px solid gray;
  }

  /* input, select {
    max-width: 20rem;
  } */
  
  span.label{
    background-color: var(--c-3);
    color: var(--c-txt-rev);
    border-radius: 3px;
    font-size: .8rem;
    padding: 0 8px;
    position: absolute;
    left: 1%;
    top: 0;
    /* top: 50%; */
    transform: translateY(-20%)
    
  }

  span.tooltip {
    font-size: 12px;
    padding: 3px;
    display: block;
    transition: all .3s;

    max-height: 0;
    overflow: hidden;
    
    &.error{
      color: red;
      /* display: none; */
    }

    &.hint{
      color: #858585;
    }
  }

  input:invalid[focused="true"]{
    border: 1px solid red;
  }

  input:invalid[focused="true"] ~ span{
    /* display: block; */
    max-height: 30px;
  }

  textarea{
    min-height: 10em;
    padding: 1.5em;
  }

  input[type="datetime-local"]{
    cursor: pointer;
  }
`
