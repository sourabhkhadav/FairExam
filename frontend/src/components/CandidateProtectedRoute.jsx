import { Navigate } from 'react-router-dom';

const CandidateProtectedRoute = ({ children }) => {
    const candidate = localStorage.getItem('candidate');
    const examData = localStorage.getItem('examData');

    if (!candidate || !examData) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default CandidateProtectedRoute;
