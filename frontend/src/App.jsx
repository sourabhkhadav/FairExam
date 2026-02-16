import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
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
import Profile from './components/Profile'
import Examiner_ExamResultDetails from './components/Examiner_ExamResultDetails'

// Candidate Pages
import CandidateLogin from './pages/Login'
import Instructions from './pages/Instructions'
import Exam from './pages/Exam'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing_Home />} />
        <Route path="/login" element={<AuthForm initialMode="login" />} />
        <Route path="/register" element={<AuthForm initialMode="register" />} />

        {/* Candidate Routes */}
        <Route path="/candidate-login" element={<CandidateLogin />} />
        <Route path="/instructions" element={<Instructions />} />
        <Route path="/exam" element={<Exam />} />

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
          <Route path="/profile" element={<Profile />} />
          <Route path="/exam-results/:id" element={<Examiner_ExamResultDetails />} />
        </Route>

        {/* 404 Route */}
        <Route path="*" element={
          <div className="flex flex-col items-center justify-center min-h-screen bg-[#F8FAFC]">
            <h1 className="text-6xl font-bold text-[#4F46E5]">404</h1>
            <p className="text-xl text-[#0F172A]/70 mt-4">Page Not Found</p>
            <Link to="/" className="mt-8 px-6 py-3 bg-[#4F46E5] text-white rounded-xl hover:bg-[#4338CA] transition-all">
              Go Home
            </Link>
          </div>
        } />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
