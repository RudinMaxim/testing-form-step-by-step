import React, { useEffect, useState } from 'react';
import { Answer, Question } from '../types';

interface ShortAnswerQuestionProps {
    question: Question;
    handleAnswer: (answer: string | string[]) => void;
    userAnswers: Answer[];
}

function useShortAnswerQuestion(props: ShortAnswerQuestionProps) {
    const { question, handleAnswer, userAnswers } = props;

    const initialAnswer = userAnswers?.find((a) => a.questionId === question.id)?.value || '';
    const [answer, setAnswer] = useState(initialAnswer);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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
        handleInputChange,
    };
}

export function ShortAnswerQuestion(props: ShortAnswerQuestionProps) {
    const { answer, handleInputChange } = useShortAnswerQuestion(props);

    return (
        <div>
            <input type="text" value={answer} onChange={handleInputChange} />
        </div>
    );
}