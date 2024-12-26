import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { StudentProfile } from '../components/StudentProfile';
import { Student } from '../types/auth';
import { students } from '../data/students';

const featuredExams = [
  {
    id: '1',
    title: 'Web Development Fundamentals',
    image: 'src/images/image2.jpeg',
    description: 'Test your knowledge in HTML, CSS, and JavaScript basics.'
  },
  {
    id: '2',
    title: 'Cybersecurity Essentials',
    image: 'src/images/image1.jpeg',
    description: 'Evaluate your understanding of basic security concepts.'
  },
  {
    id: '3',
    title: 'Data Science Introduction',
    image: 'src/images/image3.jpeg',
    description: 'Check your knowledge in statistics and Python programming.'
  },
  {
    id: '4',
    title: 'Cloud Computing Basics',
    image: 'src/images/image5.jpeg',
    description: 'Test your understanding of cloud services and deployment models.'
  },
  {
    id: '5',
    title: 'Network Security',
    image: 'src/images/image6.jpeg',
    description: 'Assess your skills in networking and security concepts.'
  },
  {
    id: '6',
    title: 'Machine Learning',
    image: 'src/images/image4.jpeg',
    description: 'Evaluate your machine learning skills.'
  }
];

export function StudentDashboard() {
  const location = useLocation();
  const navigate = useNavigate();
  const [examCode, setExamCode] = useState('');
  const [meetLink, setMeetLink] = useState('');
  const student = location.state?.student as Student;

  if (!student) {
    navigate('/login');
    return null;
  }

  const handleUpdateProfile = (data: Partial<Student>) => {
    const updatedStudent = { ...student, ...data };
    const index = students.findIndex(s => s.id === student.id);
    if (index !== -1) {
      students[index] = updatedStudent;
    }
  };

  const handleJoinExam = () => {
    if (!examCode.trim()) return;
    // Implement exam joining logic
  };

  const handleJoinMeeting = () => {
    if (!meetLink.trim()) return;
    window.open(meetLink, '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header userInitial={student.name[0]} />
      
      <main className="flex-grow container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Column - Profile */}
          <div className="md:col-span-1">
            <StudentProfile student={student} onUpdateProfile={handleUpdateProfile} />
          </div>

          {/* Right Column - Exam Controls and Featured Exams */}
          <div className="md:col-span-2 space-y-8">
            {/* Exam Controls */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold mb-4">Join Examination</h3>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter exam code"
                    value={examCode}
                    onChange={(e) => setExamCode(e.target.value)}
                    className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:border-[#d041f4]"
                  />
                  <button
                    onClick={handleJoinExam}
                    className="px-4 py-2 bg-[#d041f4] text-white rounded-lg hover:bg-[#b835d8] transition-colors"
                  >
                    Join
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold mb-4">Join Meeting</h3>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter Google Meet link/code"
                    value={meetLink}
                    onChange={(e) => setMeetLink(e.target.value)}
                    className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:border-[#d041f4]"
                  />
                  <button
                    onClick={handleJoinMeeting}
                    className="px-4 py-2 bg-[#d041f4] text-white rounded-lg hover:bg-[#b835d8] transition-colors"
                  >
                    Join
                  </button>
                </div>
              </div>
            </div>

            {/* Featured Exams */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {featuredExams.map((exam) => (
                <div key={exam.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <img
                    src={exam.image}
                    alt={exam.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-lg font-semibold mb-2">{exam.title}</h3>
                    <p className="text-gray-600 mb-4">{exam.description}</p>
                    <button
                      className={`w-full py-2 px-4 rounded-lg transition-colors ${
                        student.college
                          ? 'bg-[#d041f4] text-white hover:bg-[#b835d8]'
                          : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                      }`}
                      disabled={!student.college}
                    >
                      {student.college ? 'Attempt Now' : 'Complete Profile First'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}