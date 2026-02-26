import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Landing_Home from './components/Landing_Home'
import AuthForm from './components/AuthForm'
import ProtectedRoute from './components/ProtectedRoute'
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
import Examiner_ManageCandidates from './components/Examiner_ManageCandidates'

// Candidate Pages
import CandidateLogin from './pages/Login'
import Instructions from './pages/Instructions'
import Exam from './pages/Exam'

function App() {
  return (
    <BrowserRouter>
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#0F172A',
            color: '#fff',
            borderRadius: '12px',
            padding: '14px 20px',
            fontSize: '14px',
            fontWeight: '500',
          },
          success: {
            iconTheme: { primary: '#22C55E', secondary: '#fff' },
          },
          error: {
            iconTheme: { primary: '#EF4444', secondary: '#fff' },
          },
        }}
      />
      <Routes>
        <Route path="/" element={<Landing_Home />} />
        <Route path="/login" element={<AuthForm initialMode="login" />} />
        <Route path="/register" element={<AuthForm initialMode="register" />} />

        {/* Candidate Routes */}
        <Route path="/candidate-login" element={<CandidateLogin />} />
        <Route path="/instructions" element={<Instructions />} />
        <Route path="/exam" element={<Exam />} />

        {/* Examiner Routes */}
        <Route element={<ProtectedRoute><Examiner_Layout /></ProtectedRoute>}>
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
          <Route path="/manage-candidates/:id" element={<Examiner_ManageCandidates />} />
        </Route>

        {/* 404 Route */}
        <Route path="*" element={
          <div className="flex flex-col items-center justify-center min-h-screen bg-[#F8FAFC]">
            <h1 className="text-6xl font-bold text-[#0F172A]">404</h1>
            <p className="text-xl text-[#0F172A]/70 mt-4">Page Not Found</p>
            <Link to="/" className="mt-8 px-6 py-3 bg-[#0F172A] text-white rounded-xl hover:bg-[#1E293B] transition-all">
              Go Home
            </Link>
          </div>
        } />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
