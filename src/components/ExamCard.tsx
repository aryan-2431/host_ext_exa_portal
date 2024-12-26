import { Edit2, Trash2, Copy, FileText } from 'lucide-react';
import { Exam } from '../types/exam';
import toast from 'react-hot-toast';

interface ExamCardProps {
  exam: Exam;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onFrameQuestions: (id: string) => void;
}

export function ExamCard({ exam, onEdit, onDelete, onFrameQuestions }: ExamCardProps) {
  const handleCopyCode = () => {
    navigator.clipboard.writeText(exam.code);
    toast.success('Code copied to clipboard!');
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold mb-2">{exam.name}</h3>
      <div className="space-y-2 text-gray-600 mb-4">
        <p>Total Marks: {exam.totalMarks}</p>
        <p>Questions: {exam.numberOfQuestions}</p>
        <p>Join Code: <span className="font-mono bg-gray-100 px-2 py-1 rounded">{exam.code}</span></p>
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => onEdit(exam.id)}
          className="flex items-center gap-1 px-3 py-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
        >
          <Edit2 className="w-4 h-4" />
          Edit
        </button>
        <button
          onClick={() => onDelete(exam.id)}
          className="flex items-center gap-1 px-3 py-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
        >
          <Trash2 className="w-4 h-4" />
          Delete
        </button>
        <button
          onClick={handleCopyCode}
          className="flex items-center gap-1 px-3 py-1.5 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
        >
          <Copy className="w-4 h-4" />
          Copy Code
        </button>
        <button
          onClick={() => onFrameQuestions(exam.id)}
          className="flex items-center gap-1 px-3 py-1.5 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
        >
          <FileText className="w-4 h-4" />
          Frame Questions
        </button>
      </div>
    </div>
  );
}