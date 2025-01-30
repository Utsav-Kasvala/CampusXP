// routes/Routers.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';  
import Home from '../pages/Home';
import Login from '../pages/Login';
import Signup from '../pages/Register';
import ProtectedRoute from './ProtectedRoute';
import StudentDashboard from '../components/StudentDashboard';
import ProfessorDashboard from '../components/ProfessorDashboard';
import JoinClassroom from '../pages/JoinClassroom'; // Import the JoinClassroom component
import JoinedClassrooms from '../pages/JoinedClassrooms'; // Import the JoinedClassrooms component
import Assignments from '../pages/Assignments';
import CreateClassroom from '../components/CreateClassroom';
import CreatedClasses from '../components/CreatedClassroom';
import SubjectDetail from '../pages/SubjectByProfessor';
import TimeTable from '../components/TimeTable';
import Attendance from '../components/Attendance'
import ShowAttendance from '../components/ShowAttendance'
import CreateAssignment from '../components/CreateAssignmentByProfessor';
import ViewAssignments from '../components/ViewAssignmentForProfessor';
import EvaluateAssignment from '../components/EvaluateAssignment';
import LeaderBoard from '../pages/LeaderBoard';
import StudentProfile from '../components/StudentProfile';
import QuizCreationPage from '../components/QuizCreation';
import Joincall from '.././pages/Joincall';
import Conferencecall from '.././pages/Conferencecall';
import Createcall from '.././pages/Createcall';
import ProfProfile from '../components/ProfProfile';
import ForgotPassword from '../components/ForgotPasswordReqForm';
import ResetPassword from '../components/ResetForgotPassword';
import ShowQuizzes from '../pages/ShowQuiz';
import ClassroomQuizzes from '../pages/Quizpage'
import QuizAttemptPage from '../pages/AttemptQuiz'

const Routers = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Signup />} />
            <Route path="/studentdashboard" element={<ProtectedRoute allowedRoles={['student']}><StudentDashboard /></ProtectedRoute>} />
            <Route path="/professordashboard" element={<ProtectedRoute allowedRoles={['professor']}><ProfessorDashboard /></ProtectedRoute>} />
            <Route path="/join-classroom" element={<JoinClassroom />} /> {/* Add the new route */}
            <Route path="/classrooms" component={JoinedClassrooms} />
            <Route path="/professor/classrooms" element={<CreatedClasses/>} />
            <Route path="/professor/subject/:subjectName" element={<SubjectDetail/>} />
            <Route path="/professor/create-class" element={<CreateClassroom />} /> {/* Route to CreateClassroom */}
            <Route path="/subject/:classroomId" element={<Assignments/>}/> {/* Route for subject details */}
            <Route path="/joined-classrooms" element={<ProtectedRoute allowedRoles={['student']}><JoinedClassrooms /></ProtectedRoute>} /> {/* New route */}
            <Route path="/timeTable" element={<TimeTable/>}/>
            <Route path="/studentProfile" element={<StudentProfile/>}/>
            <Route path="/profProfile" element={<ProfProfile/>}/>
            <Route path="/leaderboard" element={<LeaderBoard/>}/>
            <Route path="/joincall" element={<Joincall/>}/>
            <Route path="/conferencecall/:callid" element={<Conferencecall/>}/>
            <Route path="/leaderboard" element={<LeaderBoard/>}/>
            <Route path="/professor/create-quiz/:joinCode" element={<QuizCreationPage />} />
            <Route path="/professor/assignments/:joinCode" element={<ViewAssignments/>} />
            <Route path="/professor/create-assignment/:joinCode" element={<CreateAssignment />} />
            <Route path="/professor/attendance/:joinCode" element={<ShowAttendance />} />
            <Route path="/professor/attendance/:joinCode/:attendanceId" element={<Attendance />} />
            <Route path="/assignments/:assignmentId/evaluate" element={<EvaluateAssignment />} />
            <Route path="/forgot-password" element={<ForgotPassword/>}/>
            <Route path="/reset-password/:token" element={<ResetPassword/>}/>
            <Route path="/quizzes" element={<ShowQuizzes/>}/>
            <Route path="/quizzes/:joinCode" element={< ClassroomQuizzes/>} />
            <Route path="/attempt-quiz/:quizId" element={<QuizAttemptPage />} />
        </Routes>
    );
};

export default Routers;
