import React from "react";
import { Form } from "react-bootstrap";

const InputForm = ({ type, placeholder, value, onChange }) => {
  return (
    <Form.Group>
      <Form.Control
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </Form.Group>
  );
};

export default InputForm;
