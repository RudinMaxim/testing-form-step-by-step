import { useEffect, useState } from 'react';
import { Answer, Question } from '../types';

interface SingleChoiceQuestionProps {
    question: Question;
    handleAnswer: (answer: string) => void;
    userAnswers: Answer[];
}

function useSingleChoiceQuestion(props: SingleChoiceQuestionProps
) {
    const { question, handleAnswer, userAnswers } = props;

    const initialAnswer =
        userAnswers
            .find((a) => a.questionId === question.id)
            ?.value.toString();

    const [answer, setAnswer] = useState(initialAnswer);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => setAnswer(event.target.value);

    useEffect(() => {
		handleAnswer(answer || '');
    }, [answer]);

    return {
        question,
        handleInputChange,
        answer: answer ? answer : initialAnswer,
    };
}

export function SingleChoiceQuestion(props: SingleChoiceQuestionProps) {
    const { question, handleInputChange, answer } = useSingleChoiceQuestion(props);

    return (
        <div>
            {question.options?.map((option, index) => (
                <div key={`SingleChoiceQuestion__${question.title}-${index}`}>


                    <input
                        type="radio"
                        id={`option-${index}`}
                        name={`question-${question.title}`}
                        value={option}
                        checked={answer?.toLowerCase() == option.toLowerCase()}
                        onChange={handleInputChange}
                    />
                    <label htmlFor={`option-${index}`}>{option}</label>
                </div>
            ))}
        </div>
    );
}
