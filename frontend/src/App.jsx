import React from "react";

import "react-toastify/dist/ReactToastify.css";
import InstituteForm from "./Pages/InstituteForm";
import InstitueLogin from "./Pages/InstitueLogin";
import AddInstructorForm from "./Pages/AddInstructor";
import AddCourseForm from "./Pages/AddCourseForm";
import AddModule from "./Pages/AddModuleForm";
import AddLecture from "./Pages/addLecture";
import QuizMakerForm from "./Pages/AddQuiz";
import AddQuestionForm from "./Pages/AddQuestionn";

function App() {
  return (
    <div>
      <InstituteForm />
      <InstitueLogin />
      <AddInstructorForm />
      <AddCourseForm />
      <AddModule />
      <AddLecture/>
      <QuizMakerForm/>
      <AddQuestionForm/>
    </div>
  );
}

export default App;
