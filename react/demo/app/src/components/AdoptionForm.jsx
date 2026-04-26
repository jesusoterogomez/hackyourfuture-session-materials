// 6. Develop a Form Component
// Create a new component called Form

import { useState } from "react";
import "./AdoptionForm.css";

// Use the useState hook to manage the state of form input fields

// Implement a function to handle form submission, you may want to use onSubmit in combination with a <button type="submit">

// Render a form, input fields for each form field and the mentioned submit button

export function AdoptionForm() {
  const defaultState = {
    name: "",
    petName: "",
    checked: true,
  };

  const [formState, setFormState] = useState(defaultState);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const updateField = (fieldName, fieldValue) => {
    // Set the form state to a new object with the previous state and the new field value
    setFormState({
      // Make a copy of the existing state with the spread operator
      ...formState,
      // [key]: value
      // fx. petName: "something"
      // assign the new field value to overwrite the existing value
      [fieldName]: fieldValue,
    });
  };

  const handleSubmit = (event) => {
    // Prevent the default form submission behavior
    // This is to prevent the page from reloading when the form is submitted
    event.preventDefault();

    // Log the form state to the console
    console.log(formState);

    // Reset the form state to the default state
    setFormState(defaultState);

    // Show a success message
    setShowSuccessMessage(true);

    // Hide the success message after 2 seconds
    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 2000);
  };

  const handleCheckbox = (event) => {
    // value
    updateField("checked", event.target.checked);
  };

  return (
    <form className="adoption-form" onSubmit={handleSubmit}>
      <div className="adoption-form-field">
        <label>Which pet are you interested in?</label>
        <input
          placeholder="Pet name"
          value={formState.petName}
          onChange={(event) => updateField("petName", event.target.value)}
        />

        <label>
          Are you sure?
          <input
            placeholder="Are you sure?"
            type="checkbox"
            checked={formState.checked}
            onChange={handleCheckbox}
            // onChange=()
            // value={formState.petName}
            // onChange={(event) => updateField("petName", event.target.value)}
          />
        </label>
      </div>
      <div className="adoption-form-field">
        <label>What's your name?</label>

        <input
          placeholder="Type your name"
          value={formState.name}
          onChange={(event) => updateField("name", event.target.value)}
        />
        {formState.name.length < 3 && (
          <p className="field-error">Name must be at least 3 characters long</p>
        )}
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        <button type="submit">Submit!</button>
        {showSuccessMessage && <p>Thank you for your interest!</p>}
      </div>
    </form>
  );
}
