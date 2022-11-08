import React, { useState, useEffect } from 'react';
import { formValidators } from "../utilities/validators";
import Input from '../components/input';
import Button from '../components/button';
import styled from 'styled-components';

export default function Form(props) {
  
  const { formData, onSubmit } = props;
  const [ form, setForm ] = useState({ visitTime: 'opt1' });
  const [ errors, setErrors ] = useState({});
  const [ validating, setValidating] = useState(false);

  const handleInputChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setForm({
      ...form,
      [name] : value
    });
  };

  const validateForm = () => {
    const newError = {};

    formData.forEach( field => {
        const value = form[field.id] 
        if ( (value ?? '') === '' ) newError[field.id] = "El campo es obligatorio."
        else if ( !formValidators[field.validator](value) ) newError[field.id] = "El campo no tiene un formato válido."
        else newError[field.id] = null;
      }
    );
    
    setErrors(newError);
  };


  const checkHasError = () => {
    var formHasError = false;
    Object.entries(errors).forEach( err => {
      if ( err[1] ) {
        formHasError = true;
      };
    });
    return formHasError;
  };

  const getMsgError = () => {
    return (
      <React.Fragment>
      { validating &&
        <ErrorMsg>
          Formulario invalido.
        </ErrorMsg>
      }
      </React.Fragment>
    )
  };

  const handleSubmit = () => {
    setValidating(true);
    //console.log('incompform | error ', form, errors);
    if ( !checkHasError() ) {
      onSubmit(form);
    };
  };

  useEffect( () => {
    validateForm();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form] );

  return (
    <FormContent>
      {formData.map( (item, i)=>
        <div
            key={`input${i}`} >
          <Label>{item.label}</Label>
          <Input
            className='margin-bottom' 
            name={item.id}
            type={item.type}
            id={item.id}
            onChange={handleInputChange}
            warning={validating && errors[item.id]}
            placeholder={item.placeholder} required />
        </div>
      )}
      {getMsgError()}

      <Button solid onClick={()=>handleSubmit()} >
        Enviar
      </Button>
    </FormContent>
  )
};

const ErrorMsg = styled.p`
  text-align: center;
  color: red; 
`;

const Label = styled.label`
  font-weight: 600;
  font-size: 0.7em;
  margin-top: 0.3em;
  margin-bottom: 0.8em;
  text-align: left;
`;

const FormContent = styled.div`
  width: 55%;
  margin: auto;
  display: grid;
  grid-template-columns: 100%;
  position: relative;
  @media (max-width: 720px) {
    width: 86%;
  };
`;
