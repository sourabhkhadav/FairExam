import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Landing_Home from './components/Landing_Home'
import AuthForm from './components/AuthForm'
import ExaminerLayout from './components/ExaminerLayout'
import ExaminerDashboard from './components/ExaminerDashboard'
import CreateExam from './components/CreateExam'
import AddQuestions from './components/AddQuestions'
import ManageExams from './components/ManageExams'
import ViolationReports from './components/ViolationReports'
import ResultsPublishing from './components/ResultsPublishing'
import DraftConfigure from './components/DraftConfigure'
import EditExam from './components/EditExam'
import StudentViolations from './components/StudentViolations'
import Profile from './components/Profile'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing_Home />} />
        <Route path="/login" element={<AuthForm initialMode="login" />} />
        <Route path="/register" element={<AuthForm initialMode="register" />} />

        {/* Examiner Routes */}
        <Route element={<ExaminerLayout />}>
          <Route path="/dashboard" element={<ExaminerDashboard />} />
          <Route path="/create-exam" element={<CreateExam />} />
          <Route path="/add-questions" element={<AddQuestions />} />
          <Route path="/manage-exams" element={<ManageExams />} />
          <Route path="/violation-reports" element={<ViolationReports />} />
          <Route path="/results-publishing" element={<ResultsPublishing />} />
          <Route path="/configure-exam/:id" element={<DraftConfigure />} />
          <Route path="/edit-exam/:id" element={<EditExam />} />
          <Route path="/student-violations/:id" element={<StudentViolations />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
