import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Landing_Home from './components/Landing_Home'
import AuthForm from './components/AuthForm'
import Examiner_Layout from './components/Examiner_Layout'
import Examiner_Dashboard from './components/Examiner_Dashboard'
import Examiner_CreateExam from './components/Examiner_CreateExam'
import Examiner_AddQuestions from './components/Examiner_AddQuestions'
import Examiner_ManageExams from './components/Examiner_ManageExams'
import Examiner_ViolationReports from './components/Examiner_ViolationReports'
import Examiner_ResultsPublishing from './components/Examiner_ResultsPublishing'
import Examiner_DraftConfigure from './components/Examiner_DraftConfigure'
import Examiner_EditExam from './components/Examiner_EditExam'
import Examiner_StudentViolations from './components/Examiner_StudentViolations'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing_Home />} />
        <Route path="/login" element={<AuthForm initialMode="login" />} />
        <Route path="/register" element={<AuthForm initialMode="register" />} />

        {/* Examiner Routes */}
        <Route element={<Examiner_Layout />}>
          <Route path="/dashboard" element={<Examiner_Dashboard />} />
          <Route path="/create-exam" element={<Examiner_CreateExam />} />
          <Route path="/add-questions" element={<Examiner_AddQuestions />} />
          <Route path="/manage-exams" element={<Examiner_ManageExams />} />
          <Route path="/violation-reports" element={<Examiner_ViolationReports />} />
          <Route path="/results-publishing" element={<Examiner_ResultsPublishing />} />
          <Route path="/configure-exam/:id" element={<Examiner_DraftConfigure />} />
          <Route path="/edit-exam/:id" element={<Examiner_EditExam />} />
          <Route path="/student-violations/:id" element={<Examiner_StudentViolations />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
