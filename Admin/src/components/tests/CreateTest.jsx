import React from 'react';
import TestDetailsForm from './TestDetailsForm';
import AddQuestions from './AddQuestions';

const CreateTest = ({ activeSubTab, setActiveSubTab }) => {
  return (
    <div className="space-y-4 scrollbar-hidden">
      {activeSubTab === 'details' && <TestDetailsForm setActiveSubTab={setActiveSubTab} />}
      {activeSubTab === 'questions' && <AddQuestions />}
    </div>
  );
};

export default CreateTest;
