import React, { useEffect, useState } from 'react';
import { Answer, Question } from '../types';

interface EssayQuestionProps {
    question: Question;
    handleAnswer: (answer: string) => void;
    userAnswers: Answer[];
}

function useEssayQuestion(props: EssayQuestionProps) {
    const { question, handleAnswer, userAnswers } = props;

    const initialAnswer = userAnswers.find((a) => a.questionId === question.id)?.value.toString() || '';
    const [answer, setAnswer] = useState(initialAnswer);

    const handleTextareaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newAnswer = event.target.value;
        setAnswer(newAnswer);
        handleAnswer(newAnswer);
    };

    useEffect(() => {
		handleAnswer(answer || '');
    }, [answer]);


    return {
        question,
        answer,
        initialAnswer,
        handleTextareaChange,
    };
}

export function EssayQuestion(props: EssayQuestionProps) {
    const { answer, handleTextareaChange } = useEssayQuestion(props);


    return (
        <div>
			<textarea
				value={answer}
				onChange={handleTextareaChange}
				rows={6}
				placeholder='Введите ваш ответ здесь...'
				style={{ width: '100%', resize: 'vertical' }}
			/>
        </div>
    );
}

