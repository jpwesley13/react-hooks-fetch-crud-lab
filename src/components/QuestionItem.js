import React from "react";

function QuestionItem({ question, onDelete, onAnswerChange }) {
  const { id, prompt, answers, correctIndex } = question;

  function handleDeleteClick() {
    fetch(`http://localhost:4000/questions/${question.id}`, {
      method: "DELETE",
    })
    .then(res => res.json())
    .then(() => onDelete(question))
  }

  function handleAnswerClick(e){
    fetch(`http://localhost:4000/questions/${question.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body:JSON.stringify({
        correctIndex: parseInt(e.target.value)
      })
    })
    .then(res => res.json())
    .then(data => onAnswerChange(data))
  }

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select defaultValue={correctIndex}
        onChange={handleAnswerClick}>{options}</select>
      </label>
      <button onClick={handleDeleteClick}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
