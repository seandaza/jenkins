import React from 'react';
import styled from 'styled-components';
import InputComponent from './inputComponent';
import Select from './select';
import TextArea from './text-area';

export const INPUT_TYPE = {
  INPUT: 'input',
  TEXT_AREA: 'text-area',
  SELECT: 'select',
};

export default function FormComponent({ formData, form, setForm, ...rest }) {
  const handleInputChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setForm((form) => ({
      ...form,
      [name]: value,
    }));
  };

  return (
    <FormContent {...rest}>
      {formData.map(
        (
          {
            label,
            name,
            placeholder,
            type = 'text',
            isRequired = false,
            component = INPUT_TYPE.INPUT,
            options = [],
            rows = 1,
            condition,
            warning = false,
          },
          index
        ) => {
          if (condition && !condition(form))
            return <React.Fragment key={`empty-${index}`} />;
          return (
            <div className="input" key={`input${index}`}>
              <div className="input-label">{label}</div>
              {component === INPUT_TYPE.INPUT && (
                <InputComponent
                  type={type}
                  name={name}
                  onChange={handleInputChange}
                  placeholder={placeholder}
                  required={isRequired}
                  value={form[name] ?? ''}
                  warning={warning}
                />
              )}
              {component === INPUT_TYPE.SELECT && (
                <Select
                  onChange={handleInputChange}
                  name={name}
                  value={form[name] ?? ''}
                  warning={warning}
                >
                  <option value="" disabled>
                    Seleccione una opción
                  </option>
                  {options.map((option, index) => (
                    <option value={option} key={`option-${index}`}>
                      {option}
                    </option>
                  ))}
                </Select>
              )}
              {component === INPUT_TYPE.TEXT_AREA && (
                <TextArea
                  name={name}
                  className="text-area"
                  rows={`${rows}`}
                  onChange={handleInputChange}
                  placeholder={placeholder}
                  value={form[name] ?? ''}
                  warning={warning}
                />
              )}
            </div>
          );
        }
      )}
    </FormContent>
  );
}

const FormContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  font-size: ${({ theme }) => theme.textTheme.fontSize.p};

  .input {
    width: 100%;

    .input-label {
      margin: 0.5em 0 0.5em 0;
      text-align: left;
    }
  }
  .text-area {
    resize: none;
  }
`;
