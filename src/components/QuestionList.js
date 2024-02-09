import React, {useState, useEffect} from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {

  const [questions, setQuestions] =useState([]);

  useEffect(() => {
    fetch(`http://localhost:4000/questions`)
    .then(res => res.json())
    .then(data => setQuestions(data))
  }, [])

  function handleAddQuestion(newQ){
    setQuestions([...questions, newQ])
  }

  function handleUpdate(newAnswer) {
    const updatedQuestions = questions.map(question => {
      if(question.id === newAnswer.id) {
        return newAnswer
      } else {
        return question
      }
    })
    setQuestions(updatedQuestions)
  }

  function handleDelete(deadQ){
    const updatedQs = questions.filter(question => question.id !== deadQ.id);
    setQuestions(updatedQs)
  }

  const questionsShown = questions.map(question => (
    <QuestionItem
    key={question.id}
    question={question}
    onDelete={handleDelete} 
    onAnswerChange={handleUpdate}
    />
  ))
  
  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{questionsShown}</ul>
    </section>
  );
}

export default QuestionList;
