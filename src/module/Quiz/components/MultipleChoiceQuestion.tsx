import { useState } from 'react';
import { Answer, Question } from '../types';

interface MultipleChoiceQuestionProps {
    question: Question;
    handleAnswer: (answers: string[]) => void;
    userAnswers: Answer[];
}

function useMultipleChoiceQuestion(props: MultipleChoiceQuestionProps) {
    const { question, handleAnswer, userAnswers } = props;

    const initialSelectedOptions = userAnswers?.find((a) => a.questionId === question.id)?.value as string[] || [];
    const [selectedOptions, setSelectedOptions] = useState<string[]>(initialSelectedOptions);


    const handleOptionChange = (option: string) => {
        const newSelectedOptions = selectedOptions.includes(option)
            ? selectedOptions.filter((o) => o !== option)
            : [...selectedOptions, option];
        setSelectedOptions(newSelectedOptions);
        handleAnswer(newSelectedOptions);
    };

    return {
        question,
        selectedOptions,
        handleOptionChange,
    };
}

export function MultipleChoiceQuestion(props: MultipleChoiceQuestionProps) {
    const { question, selectedOptions, handleOptionChange } =
        useMultipleChoiceQuestion(props);

    return (
        <div>
            {question.options?.map((option, index) => (
                <div key={`MultipleChoiceQuestion__${option}`}>
                    <input
                        type="checkbox"
                        id={`option-${index}`}
                        value={option}
                        checked={selectedOptions.includes(option)}
                        onChange={() => handleOptionChange(option)}
                    />
                    <label htmlFor={`option-${index}`}>{option}</label>
                </div>
            ))}
        </div>
    );
}
