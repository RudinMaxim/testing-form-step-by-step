import { QuizData } from "../types";

interface ProgressBarProps {
    quizData: QuizData;
    currentQuestionIndex: number;
    visitedQuestionIndices: number[];
	goToQuestion: (index: number) => void & undefined;
}

export function ProgressBar({
    quizData,
    currentQuestionIndex,
    visitedQuestionIndices,
    goToQuestion,
}: ProgressBarProps) {
    return (
        <div style={{ display: 'flex' }}>
            {quizData?.questions.map((_, index) => (
                <div
                    key={`ProgressBar__${index}`}
                    style={{
                        flex: 1,
                        height: '8px',
                        marginRight: '5px',
                        backgroundColor:
                            index === currentQuestionIndex
                                ? 'red'
                                : visitedQuestionIndices.includes(index)
                                    ? 'black'
                                    : 'gray',
                        cursor: 'pointer',
                    }}
                    onClick={() => goToQuestion(index)}
                />
            ))}
        </div>
    );
}
