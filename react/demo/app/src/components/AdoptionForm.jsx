import { useState } from "react";
import "./AdoptionForm.css";

// Use the useState hook to manage the state of form input fields

// Implement a function to handle form submission, you may want to use onSubmit in combination with a <button type="submit">

// Render a form, input fields for each form field and the mentioned submit button

export function AdoptionForm() {
  const defaultState = {
    name: "",
    petName: "",
  };

  // To control the form inputs.
  const [formState, setFormState] = useState(defaultState);

  // For API related states
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  // To show a message when form is submitted
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

  const handleSubmit = async (event) => {
    // Set the loading state to true
    // We will use this to prevent the user from submitting the form multiple times
    setIsLoading(true);

    // Prevent the default form submission behavior
    // This is to prevent the page from reloading when the form is submitted
    event.preventDefault();

    // Send the form values to the API
    const response = await fetch("http://localhost:8787/requests", {
      method: "POST", // POST request to the /requests endpoint to create a new request
      headers: { "Content-Type": "application/json" }, // Set the content type to JSON
      body: JSON.stringify(formState), // We send the form state as a JSON object
    });

    // Parse the response body as JSON (also returns a Promise)
    const data = await response.json();

    //  We handle the response from the API
    if (response.ok) {
      // Reset the form state to the default state
      setFormState(defaultState);

      // Show a success message
      setShowSuccessMessage(true);

      // Hide the success message after 2 seconds
      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 2000);
    } else {
      // If the response is not successful, we display an error message
      // 👀 Here we don't clear the form state to keep the user's input so they can retry

      setApiError(data.error);

      // We change the loading state to false to allow the user to submit the form again
      setIsLoading(false);
    }
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
        {/*
         * We prevent the user from submitting while the API request is being processed
         *
         * This may happen very fast because the API is too fast
         * but it's a good practice to show a loading state for slower requests
         * and to prevent the double-submissions :)
         */}
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Submitting..." : "Submit"}
        </button>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        {/* If the form was submitted successfully */}
        {showSuccessMessage && <p>✅ Thank you for your interest!</p>}

        {/* If the form was submitted with an error, we show an error message */}
        {apiError && <p>⚠️ {apiError}</p>}
      </div>
    </form>
  );
}
