

import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([]);
  const [update, triggerUpdate] = useState(false)

  useEffect(()=>{
    fetch('http://localhost:4000/questions')
    .then((data)=> data.json())
    .then((questions)=> saveQuestions(questions))
  },[update])

  const saveQuestions = (questions) => {
    setQuestions([...questions])
  }

  const handleDeleteQuestion = (index) => {
    fetch(`http://localhost:4000/questions/${index}`,{
      method:'DELETE',
    })
    .then(handleTriggerUpdate())
  }

  const handlePatchQuestion = (index, option) => {
    fetch(`http://localhost:4000/questions/${index}`,{
      method:'PATCH',
      headers:{
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify({correctIndex: option})
      
    })
    .then(handleTriggerUpdate())
  }

  const handleTriggerUpdate = () => {
    triggerUpdate(() => !update)
  }

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? <QuestionForm onUpdate={handleTriggerUpdate}/> : <QuestionList questions={questions} onDelete={handleDeleteQuestion} onChange={handlePatchQuestion}/>}
    </main>
  );
}

export default App;