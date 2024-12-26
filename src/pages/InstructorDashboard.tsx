import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Header } from '../components/Header';
import { ExamForm } from '../components/ExamForm';
import { ExamCard } from '../components/ExamCard';
import { QuestionForm } from '../components/QuestionForm';
import { Exam, ExamFormData, Question } from '../types/exam';

export function InstructorDashboard() {
  const location = useLocation();
  const instructor = location.state?.instructor;
  const [exams, setExams] = useState<Exam[]>([]);
  const [selectedExam, setSelectedExam] = useState<string | null>(null);

  const generateExamCode = () => {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
  };

  const handleCreateExam = (formData: ExamFormData) => {
    const newExam: Exam = {
      id: Date.now().toString(),
      code: generateExamCode(),
      name: formData.name,
      totalMarks: parseInt(formData.totalMarks, 10),
      numberOfQuestions: parseInt(formData.numberOfQuestions, 10),
      meetLink: formData.meetLink
    };
    setExams(prev => [...prev, newExam]);
    toast.success('Examination created successfully!');
  };

  const handleEditExam = (id: string) => {
    // Implement edit functionality
    toast.success('Examination updated successfully!');
  };

  const handleDeleteExam = (id: string) => {
    setExams(prev => prev.filter(exam => exam.id !== id));
    toast.success('Examination deleted successfully!');
  };

  const handleFrameQuestions = (id: string) => {
    setSelectedExam(id);
  };

  const handleSubmitQuestion = (question: Question) => {
    setExams(prev => prev.map(exam => {
      if (exam.id === question.examId) {
        return {
          ...exam,
          questions: [...(exam.questions || []), question]
        };
      }
      return exam;
    }));
    toast.success('Question added successfully!');
  };

  const handleFinishQuestions = () => {
    setSelectedExam(null);
    toast.success('All questions uploaded successfully!');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header userInitial={instructor?.firstName?.[0] || 'I'} />
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <ExamForm onSubmit={handleCreateExam} />
          </div>
          <div className="space-y-6">
            {selectedExam ? (
              <QuestionForm
                examId={selectedExam}
                onSubmitQuestion={handleSubmitQuestion}
                onFinish={handleFinishQuestions}
              />
            ) : (
              exams.map(exam => (
                <ExamCard
                  key={exam.id}
                  exam={exam}
                  onEdit={handleEditExam}
                  onDelete={handleDeleteExam}
                  onFrameQuestions={handleFrameQuestions}
                />
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  );
}