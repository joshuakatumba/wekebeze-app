import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, TrendingUp, ArrowRight, Home } from "lucide-react";

interface QuizQuestion {
  question: string;
  options: string[];
  answer: number;
}

const quizData: Record<string, QuizQuestion[]> = {
  breast: [
    {
      question: "What is a common early sign of breast cancer?",
      options: ["Lump in the breast", "Headache", "Sore throat", "Back pain"],
      answer: 0,
    },
    {
      question: "How often should you perform a breast self-exam?",
      options: ["Once a year", "Monthly", "Weekly", "Only if I feel pain"],
      answer: 1,
    },
    {
      question: "Which of these is NOT a risk factor for breast cancer?",
      options: ["Family history", "Ageing", "Sugar intake", "Genetic mutations"],
      answer: 2,
    },
  ],
  cervical: [
    {
      question: "What is the primary cause of cervical cancer?",
      options: ["Poor hygiene", "HPV infection", "Stress", "Genetic inheritance"],
      answer: 1,
    },
    {
      question: "How can cervical cancer be prevented?",
      options: ["Daily exercise", "HPV vaccination", "Better diet", "None of the above"],
      answer: 1,
    },
  ],
};

interface QuizProps {
  cancerType: string;
  onComplete: (score: number, total: number) => void;
}

export default function Quiz({ cancerType, onComplete }: QuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const nav = useNavigate();

  const questions = quizData[cancerType] || [];
  const question = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const handleAnswer = (index: number) => {
    const isCorrect = index === question.answer;
    const newScore = isCorrect ? score + 1 : score;
    
    if (currentQuestion < questions.length - 1) {
      setScore(newScore);
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setScore(newScore);
      setShowResult(true);
      onComplete(newScore, questions.length);
    }
  };

  if (!questions.length) return (
    <div className="min-h-screen flex items-center justify-center p-8 text-center text-primary-500 font-medium">
      No quiz available for this topic yet. Check back soon!
    </div>
  );

  if (showResult) {
    const percentage = Math.round((score / questions.length) * 100);
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center p-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card max-w-md w-full p-10 text-center"
        >
          <div className="mb-6 inline-flex p-4 bg-teal-50 rounded-full">
            <CheckCircle2 className="w-12 h-12 text-teal-500" />
          </div>
          <h2 className="text-3xl font-extrabold text-primary-900 mb-2">Quiz Complete!</h2>
          <p className="text-primary-500 mb-8 font-medium">Great job finishing the assessment.</p>
          
          <div className="bg-primary-50 rounded-2xl p-6 mb-8">
            <div className="text-sm font-bold text-primary-400 uppercase tracking-wider mb-1">Your Score</div>
            <div className="text-5xl font-black text-primary-900">{percentage}%</div>
            <div className="text-sm text-primary-500 mt-2 font-medium">
              You got {score} out of {questions.length} correct
            </div>
          </div>

          <button
            onClick={() => nav("/home")}
            className="btn-primary w-full flex items-center justify-center gap-2"
          >
            <Home className="w-5 h-5" />
            Back to Dashboard
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg flex flex-col items-center pt-16 px-4">
      {/* Sticky Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1.5 bg-primary-100 z-50">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          className="h-full bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.3)] transition-all"
        />
      </div>

      <div className="w-full max-w-2xl">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 mb-10 justify-center sm:justify-start"
        >
          <div className="bg-rose-50 p-2 rounded-lg">
            <TrendingUp className="w-6 h-6 text-rose-500" />
          </div>
          <h2 className="text-xl font-extrabold text-primary-900 tracking-tight uppercase">
            Knowledge Check: <span className="text-rose-500">{cancerType}</span>
          </h2>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion}
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -20, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="glass-card p-8 sm:p-12 mb-8"
          >
            <span className="text-xs font-black text-rose-500 mb-4 block uppercase tracking-widest">
              Question {currentQuestion + 1} of {questions.length}
            </span>
            <h3 className="text-2xl font-bold text-primary-900 mb-8 leading-tight">
              {question.question}
            </h3>

            <div className="space-y-4">
              {question.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(index)}
                  className="w-full group flex items-center justify-between p-5 bg-white border border-primary-50 rounded-2xl hover:border-rose-200 hover:bg-rose-50 transition-all duration-200 text-left"
                >
                  <span className="font-semibold text-primary-700 group-hover:text-rose-600 transition-colors">
                    {option}
                  </span>
                  <ArrowRight className="w-5 h-5 text-primary-200 group-hover:text-rose-400 group-hover:translate-x-1 transition-all" />
                </button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        <p className="text-center text-primary-400 text-sm font-medium">
          Choose the answer you think is most correct.
        </p>
      </div>
    </div>
  );
}
