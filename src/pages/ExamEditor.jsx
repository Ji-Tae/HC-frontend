import React, { useState } from 'react';

const ExamEditor = () => {
  const [question, setQuestion] = useState({
    exam_id: '',
    sort_number: '',
    questionNumber: '',
    question: '',
    explanations: [{ text: '', image: null }],
    choices: [
      { option: '1', text: '', image: null },
      { option: '2', text: '', image: null },
      { option: '3', text: '', image: null },
      { option: '4', text: '', image: null },
    ],
    answer: '',
    solve: '',
  });

  const getChoiceNumber = (index) => {
    const choiceNumbers = ['①', '②', '③', '④'];
    return choiceNumbers[index];
  };

  const handleSortNumberChange = (e) => {
    const value = e.target.value;
    setQuestion((prevQuestion) => ({
      ...prevQuestion,
      sort_number: value,
    }));
  };

  const handleQuestionNumberChange = (e) => {
    const value = e.target.value;
    setQuestion((prevQuestion) => ({
      ...prevQuestion,
      questionNumber: value,
    }));
  };

  const handleQuestionChange = (e) => {
    const value = e.target.value;
    setQuestion((prevQuestion) => ({
      ...prevQuestion,
      question: value,
    }));
  };

  const handleExplanationChange = (e, explanationIndex) => {
    const { name, value } = e.target;
    setQuestion((prevQuestion) => {
      const updatedExplanations = prevQuestion.explanations.map((explanation, idx) =>
        idx === explanationIndex ? { ...explanation, [name]: value } : explanation,
      );
      return { ...prevQuestion, explanations: updatedExplanations };
    });
  };

  const handleExplanationImageChange = (e, explanationIndex) => {
    const file = e.target.files[0];
    setQuestion((prevQuestion) => {
      const updatedExplanations = prevQuestion.explanations.map((explanation, idx) =>
        idx === explanationIndex ? { ...explanation, image: file } : explanation,
      );
      return { ...prevQuestion, explanations: updatedExplanations };
    });
  };

  const handleExplanationImageRemove = (explanationIndex) => {
    setQuestion((prevQuestion) => {
      const updatedExplanations = prevQuestion.explanations.map((explanation, idx) =>
        idx === explanationIndex ? { ...explanation, image: null } : explanation,
      );
      return { ...prevQuestion, explanations: updatedExplanations };
    });
  };

  const handleOptionTextChange = (e, optionIndex) => {
    const { value } = e.target;
    setQuestion((prevQuestion) => {
      const updatedChoices = prevQuestion.choices.map((option, idx) =>
        idx === optionIndex ? { ...option, text: value } : option,
      );
      return { ...prevQuestion, choices: updatedChoices };
    });
  };

  const handleOptionImageChange = (e, optionIndex) => {
    const file = e.target.files[0];
    setQuestion((prevQuestion) => {
      const updatedChoices = prevQuestion.choices.map((option, idx) =>
        idx === optionIndex ? { ...option, image: file } : option,
      );
      return { ...prevQuestion, choices: updatedChoices };
    });
  };

  const handleOptionImageRemove = (optionIndex) => {
    setQuestion((prevQuestion) => {
      const updatedChoices = prevQuestion.choices.map((option, idx) =>
        idx === optionIndex ? { ...option, image: null } : option,
      );
      return { ...prevQuestion, choices: updatedChoices };
    });
  };

  const handleAnswerChange = (e) => {
    const value = e.target.value;
    setQuestion((prevQuestion) => ({
      ...prevQuestion,
      answer: value,
    }));
  };

  const handleSolveChange = (e) => {
    const value = e.target.value;
    setQuestion((prevQuestion) => ({
      ...prevQuestion,
      solve: value,
    }));
  };

  const handleAddExplanation = () => {
    setQuestion((prevQuestion) => ({
      ...prevQuestion,
      explanations: [...prevQuestion.explanations, { solve: '', image: null }],
    }));
  };

  const handleRemoveExplanation = (explanationIndex) => {
    setQuestion((prevQuestion) => {
      const updatedExplanations = prevQuestion.explanations.filter((_, idx) => idx !== explanationIndex);
      return { ...prevQuestion, explanations: updatedExplanations };
    });
  };

  return (
    <div>
      <h1>Exam Editor</h1>
      <div>
        <label>Sort Number:</label>
        <input type='text' value={question.sort_number} onChange={handleSortNumberChange} />
      </div>
      <div>
        <label>Question Number:</label>
        <input type='text' value={question.questionNumber} onChange={handleQuestionNumberChange} />
      </div>
      <div>
        <label>Question:</label>
        <textarea value={question.question} onChange={handleQuestionChange} />
      </div>
      <div>
        <p>Explanations:</p>
        {question.explanations.map((explanation, explanationIndex) => (
          <div key={explanationIndex}>
            <textarea
              name='text'
              value={explanation.text}
              onChange={(e) => handleExplanationChange(e, explanationIndex)}
            />
            <label>Explanation Image:</label>
            <input type='file' onChange={(e) => handleExplanationImageChange(e, explanationIndex)} />
            {explanation.image && (
              <div>
                <button onClick={() => handleExplanationImageRemove(explanationIndex)}>Remove Image</button>
              </div>
            )}
            <button onClick={() => handleRemoveExplanation(explanationIndex)}>Remove Explanation</button>
          </div>
        ))}
        <button onClick={handleAddExplanation}>Add Explanation</button>
      </div>
      <div>
        <p>Options:</p>
        {question.choices.map((option, optionIndex) => (
          <div key={optionIndex}>
            <textarea name='text' value={option.text} onChange={(e) => handleOptionTextChange(e, optionIndex)} />
            <label>Option Image:</label>
            <input type='file' onChange={(e) => handleOptionImageChange(e, optionIndex)} />
            {option.image && (
              <div>
                <button onClick={() => handleOptionImageRemove(optionIndex)}>Remove Image</button>
              </div>
            )}
          </div>
        ))}
      </div>
      <div>
        <label>Answer:</label>
        <input value={question.answer} onChange={handleAnswerChange} />
      </div>
      <div>
        <label>Solve:</label>
        <textarea value={question.solve} onChange={handleSolveChange} />
      </div>
      <div>
        <h2>Preview:</h2>
        <p>Question Number: {question.questionNumber}</p>
        <p>Question: {question.question}</p>
        {question.explanations.map((explanation, explanationIndex) => (
          <div key={explanationIndex}>
            <p>Explanations:{explanation.text}</p>
            {explanation.image && (
              <div>
                <img src={URL.createObjectURL(explanation.image)} alt='Explanation Image' />
              </div>
            )}
          </div>
        ))}
        <p>Options:</p>
        {question.choices.map((option, optionIndex) => (
          <div key={optionIndex}>
            <p>
              {getChoiceNumber(optionIndex)} {option.text}
            </p>
            {option.image && (
              <div>
                <img src={URL.createObjectURL(option.image)} alt='Option Image' />
              </div>
            )}
          </div>
        ))}
        <p>Answer: {question.answer}</p>
        <p>Solve: {question.solve}</p>
      </div>
    </div>
  );
};

export default ExamEditor;
