// 6. Develop a Form Component
// Create a new component called Form

import { useState } from "react";

// Use the useState hook to manage the state of form input fields

// Implement a function to handle form submission, you may want to use onSubmit in combination with a <button type="submit">

// Render a form, input fields for each form field and the mentioned submit button

export function AdoptionForm() {
  const defaultState = {
    name: "",
    petName: "",
    petAge: 5,
  };

  const [formState, setFormState] = useState(defaultState);

  const updateField = (fieldName, fieldValue) => {
    // Do some stuff
    setFormState({
      ...formState,
      // [key]: value
      // fx. petName: "something"
      [fieldName]: fieldValue,
    });
  };

  return (
    <form
      onSubmit={() => {
        console.log(formState);
        setFormState(defaultState);
      }}
    >
      <label>Which pet?</label>
      <input
        name="pet-name"
        placeholder="Pet name"
        value={formState.petName}
        onChange={(event) => updateField("petName", event.target.value)}
      />
      <br />
      <label>What's your name?</label>
      <input
        placeholder="type your name"
        value={formState.name}
        onChange={(event) => updateField("name", event.target.value)}
      />
      <br />
      <button type="submit">Submit!</button>
    </form>
  );
}
