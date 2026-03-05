"use client";

import { useState, use } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ChevronLeft, CheckCircle2, XCircle, Trophy, ArrowRight, RotateCcw } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

const mockQuizData = {
  id: "q1",
  title: "Foundations of Aqidah",
  questions: [
    {
      id: 1,
      text: "What is the meaning of 'Tawhid al-Uluhiyyah'?",
      options: [
        "Oneness of Allah in His Lordship",
        "Oneness of Allah in Worship",
        "Oneness of Allah in His Names and Attributes",
        "Belief in all the Prophets"
      ],
      correct: 1,
      explanation: "Tawhid al-Uluhiyyah refers to the belief that Allah alone is worthy of all acts of worship."
    },
    {
      id: 2,
      text: "How many pillars of Iman (Faith) are there?",
      options: ["Five", "Six", "Seven", "Ten"],
      correct: 1,
      explanation: "There are six pillars: belief in Allah, His Angels, His Books, His Messengers, the Last Day, and Divine Decree."
    }
  ]
};

export default function QuizExecutionPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const question = mockQuizData.questions[currentQuestion];
  const progress = ((currentQuestion + 1) / mockQuizData.questions.length) * 100;

  const handleOptionSelect = (index: number) => {
    if (isAnswered) return;
    setSelectedOption(index);
  };

  const handleAnswerSubmit = () => {
    if (selectedOption === null || isAnswered) return;
    setIsAnswered(true);
    if (selectedOption === question.correct) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < mockQuizData.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setShowResult(true);
    }
  };

  if (showResult) {
    return (
      <div className="max-w-md mx-auto py-10 space-y-8 animate-in zoom-in-95 duration-500">
        <Card className="glass-card text-center p-8 space-y-6">
          <div className="w-20 h-20 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto ring-4 ring-yellow-500/10">
            <Trophy className="w-10 h-10 text-yellow-500" />
          </div>
          <div className="space-y-2">
            <h1 className="text-3xl font-headline font-bold">Quiz Complete!</h1>
            <p className="text-muted-foreground">You've finished the {mockQuizData.title} assessment.</p>
          </div>
          <div className="text-5xl font-bold text-primary">
            {Math.round((score / mockQuizData.questions.length) * 100)}%
          </div>
          <p className="text-sm font-medium">
            You scored {score} out of {mockQuizData.questions.length} questions.
          </p>
          <div className="grid gap-3 pt-4">
            <Button asChild className="h-12 w-full">
              <Link href="/quiz">Explore More Quizzes</Link>
            </Button>
            <Button variant="outline" className="h-12 w-full gap-2" onClick={() => window.location.reload()}>
              <RotateCcw className="w-4 h-4" /> Try Again
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20 max-w-2xl mx-auto">
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button asChild variant="ghost" size="icon">
            <Link href="/quiz"><ChevronLeft className="w-6 h-6" /></Link>
          </Button>
          <h1 className="text-lg font-headline font-bold">Question {currentQuestion + 1} of {mockQuizData.questions.length}</h1>
        </div>
        <Badge variant="secondary" className="bg-primary/10 text-primary">{Math.round(progress)}%</Badge>
      </header>

      <Progress value={progress} className="h-2 bg-secondary/50" />

      <Card className="glass-card border-none shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl font-headline leading-relaxed">{question.text}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-3">
            {question.options.map((option, index) => {
              const isSelected = selectedOption === index;
              const isCorrect = isAnswered && index === question.correct;
              const isWrong = isAnswered && isSelected && index !== question.correct;

              return (
                <button
                  key={index}
                  onClick={() => handleOptionSelect(index)}
                  disabled={isAnswered}
                  className={`w-full p-4 rounded-xl text-left font-medium transition-all flex items-center justify-between group ${
                    isSelected ? "ring-2 ring-primary bg-primary/5" : "bg-secondary/20 hover:bg-secondary/40"
                  } ${isCorrect ? "bg-green-500/10 ring-2 ring-green-500 text-green-600" : ""} ${
                    isWrong ? "bg-destructive/10 ring-2 ring-destructive text-destructive" : ""
                  }`}
                >
                  <span>{option}</span>
                  {isCorrect && <CheckCircle2 className="w-5 h-5 text-green-600" />}
                  {isWrong && <XCircle className="w-5 h-5 text-destructive" />}
                </button>
              );
            })}
          </div>

          {isAnswered && (
            <div className="mt-6 p-4 rounded-xl bg-accent/5 border border-accent/20 animate-in slide-in-from-top-2">
              <p className="text-xs font-bold uppercase tracking-widest text-accent mb-2">Scholarly Explanation</p>
              <p className="text-sm text-muted-foreground italic leading-relaxed">{question.explanation}</p>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="flex justify-end pt-4">
        {!isAnswered ? (
          <Button 
            onClick={handleAnswerSubmit} 
            disabled={selectedOption === null}
            className="h-12 px-10 gap-2"
          >
            Check Answer <ArrowRight className="w-4 h-4" />
          </Button>
        ) : (
          <Button 
            onClick={handleNext} 
            className="h-12 px-10 gap-2"
          >
            {currentQuestion === mockQuizData.questions.length - 1 ? "Finish Quiz" : "Next Question"} <ArrowRight className="w-4 h-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
