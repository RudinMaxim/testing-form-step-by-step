/**
 * Enumeration of different types of answers that can be provided for a quiz question.
 * - `SINGLE_CHOICE`: A question with a single correct answer option.
 * - `MULTIPLE_CHOICE`: A question with multiple correct answer options.
 * - `SHORT_ANSWER`: A question that requires a short text-based answer.
 * - `ESSAY`: A question that requires a longer, essay-style answer.
 */
export enum AnswerType {
	SINGLE_CHOICE = 'single_choice',
	MULTIPLE_CHOICE = 'multiple_choice',
	SHORT_ANSWER = 'short_answer',
	ESSAY = 'essay',
}

export interface Answer {
	questionId: number;
	value: string | string[];
}

export interface Question {
	id: number;
	title: string;
	type: AnswerType;
	options?: string[];
	correctAnswer?: string | string[];
}

export interface QuizData {
	title: string;
	duration?: number;
	allowBackNavigation?: boolean;
	allowСhaoticNavigation?: boolean;
	showAnswerValidation: boolean;
	questions: Question[];
}
