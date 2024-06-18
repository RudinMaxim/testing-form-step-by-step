import { useEffect, useState } from 'react';
import { Answer, AnswerType, QuizData } from './types';

const saveAnswerToLocalStorage = (answer: Answer) => {
	const storedAnswers = JSON.parse(localStorage.getItem('userAnswers') || '[]');
	const updatedAnswers = [...storedAnswers];
	const existingAnswerIndex = updatedAnswers.findIndex(
		(a) => a.questionId === answer.questionId
	);
	if (existingAnswerIndex !== -1) {
		updatedAnswers[existingAnswerIndex] = answer;
	} else {
		updatedAnswers.push(answer);
	}
	localStorage.setItem('userAnswers', JSON.stringify(updatedAnswers));
};

const clearLocalStorage = () => {
	localStorage.removeItem('userAnswers');
};

export function useQuiz(quizData: QuizData) {
	const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
	const [userAnswers, setUserAnswers] = useState<Answer[]>([]);
	const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
	const [visitedQuestionIndices, setVisitedQuestionIndices] = useState<
		number[]
	>([]);
	const [isTimerStopped, setIsTimerStopped] = useState<boolean>(false);

	const stopTimer = () => {
		setIsTimerStopped(true);
		setIsSubmitted(true);
	};

	const isAnswerValid = (answer: Answer): boolean => {
		const question = quizData.questions.find((q) => q.id === answer.questionId);

		if (!question) {
			return false;
		}

		switch (question.type) {
			case AnswerType.SINGLE_CHOICE:
				return question.options?.includes(answer.value as string) || false;
			case AnswerType.MULTIPLE_CHOICE:
				return (
					Array.isArray(answer.value) &&
					answer.value.every((option) => question.options?.includes(option))
				);
			case AnswerType.SHORT_ANSWER:
			case AnswerType.ESSAY:
				return typeof answer.value === 'string';
			default:
				return false;
		}
	};

	const isAnswerCorrect = (answer: Answer): boolean => {
		const question = quizData.questions?.find(
			(q) => q.id === answer.questionId
		);

		if (!question || !question.correctAnswer) {
			return false;
		}

		if (
			question.type === AnswerType.SINGLE_CHOICE ||
			question.type === AnswerType.SHORT_ANSWER
		) {
			return answer.value === question.correctAnswer;
		} else if (question.type === AnswerType.MULTIPLE_CHOICE) {
			const correctAnswerSet = new Set(question.correctAnswer as string[]);
			const answerSet = new Set(answer.value as string[]);
			return (
				correctAnswerSet.size === answerSet.size &&
				Array.from(correctAnswerSet).every((option) => answerSet.has(option))
			);
		}

		return false;
	};

	const handleAnswer = (answer: Answer) => {
		if (isAnswerValid(answer)) {
			setUserAnswers((prevAnswers) => {
				const updatedAnswers = [...prevAnswers];
				const existingAnswerIndex = updatedAnswers.findIndex(
					(a) => a.questionId === answer.questionId
				);
				if (existingAnswerIndex !== -1) {
					updatedAnswers[existingAnswerIndex] = answer;
				} else {
					updatedAnswers.push(answer);
				}
				return updatedAnswers;
			});
			saveAnswerToLocalStorage(answer);
		} else {
			// console.log('Невалидный ответ');
		}
	};

	const goToQuestion = (index: number) => {
		setCurrentQuestionIndex(index);
	};

	const goToNextQuestion = () => {
		if (currentQuestionIndex < quizData.questions.length - 1) {
			setCurrentQuestionIndex(currentQuestionIndex + 1);
		}
	};

	const goToPreviousQuestion = () => {
		if (currentQuestionIndex > 0) {
			setCurrentQuestionIndex(currentQuestionIndex - 1);
		}
	};

	useEffect(() => {
		if (currentQuestionIndex) {
			setVisitedQuestionIndices((prevIndices) => [
				...prevIndices,
				currentQuestionIndex,
			]);
		}
	}, [currentQuestionIndex]);

	useEffect(() => {
		const storedAnswers = JSON.parse(
			localStorage.getItem('userAnswers') || '[]'
		);
		setUserAnswers(storedAnswers);
	}, []);

	useEffect(() => {
		if (isSubmitted) {
			clearLocalStorage();
		}
	}, [isSubmitted]);

	return {
		currentQuestion: quizData.questions[currentQuestionIndex],
		isSubmitted,
		handleAnswer,
		goToQuestion,
		goToNextQuestion,
		goToPreviousQuestion,
		currentQuestionIndex,
		visitedQuestionIndices,
		stopTimer,
		userAnswers,
		isTimerStopped,
		isAnswerCorrect,
	};
}
