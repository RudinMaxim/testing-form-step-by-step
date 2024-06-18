import { AnswerType, QuizData } from './module/Quiz/types';

export const mockQuizData: QuizData = {
	title: 'Моковый тест',
	duration: 60,
	allowBackNavigation: false,
	allowСhaoticNavigation: false,
	showAnswerValidation: false,
	questions: [
		{
			id: 1,
			title: 'Вопрос с одним вариантом ответа?',
			type: AnswerType.SINGLE_CHOICE,
			options: ['Вариант 1', 'Вариант 2', 'Вариант 3'],
		},
		{
			id: 2,
			title: 'Вопрос с множественным выбором?',
			type: AnswerType.MULTIPLE_CHOICE,
			options: ['Вариант 1', 'Вариант 2', 'Вариант 3', 'Вариант 4'],
		},
		{
			id: 3,
			title: 'Вопрос с коротким ответом?',
			type: AnswerType.SHORT_ANSWER,
		},
		{
			id: 4,
			title: 'Вопрос с развернутым ответом?',
			type: AnswerType.ESSAY,
		},
	],
};
