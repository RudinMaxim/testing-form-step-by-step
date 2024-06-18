import { Timer } from "../Timer/TimerViwe";
import style from './Quiz.module.scss';
import { EssayQuestion, MultipleChoiceQuestion, ProgressBar, ShortAnswerQuestion, SingleChoiceQuestion } from "./components";
import { Answer, AnswerType, Question, QuizData } from "./types";
import { useQuiz } from "./useQuiz";

interface QuizFormProps {
    quizData: QuizData;
    title: string;
}

const renderQuestion = (
    question: Question,
    handleAnswer: (answer: Answer) => void,
    currentQuestion: Question,
    userAnswers: Answer[]
) => {
    switch (question.type) {
        case AnswerType.SINGLE_CHOICE:
            return (
                <SingleChoiceQuestion
                    question={question}
                    handleAnswer={(answer) => handleAnswer({ questionId: currentQuestion.id, value: answer })}
                    userAnswers={userAnswers}
                />
            );
        case AnswerType.MULTIPLE_CHOICE:
            return (
                <MultipleChoiceQuestion
                    question={question}
                    handleAnswer={(answers) => handleAnswer({ questionId: currentQuestion.id, value: answers })}
                    userAnswers={userAnswers}
                />
            );
        case AnswerType.SHORT_ANSWER:
            return (
                <ShortAnswerQuestion
                    question={question}
                    handleAnswer={(answer) => handleAnswer({ questionId: currentQuestion.id, value: answer })}
                    userAnswers={userAnswers}
                />
            );
        case AnswerType.ESSAY:
            return (
                <EssayQuestion
                    question={question}
                    handleAnswer={(answer) => handleAnswer({ questionId: currentQuestion.id, value: answer })}
                    userAnswers={userAnswers}
                />
            );
        default:
            return null;
    }
};

export function QuizViwe({ quizData, title }: QuizFormProps) {
    const {
        currentQuestion,
        userAnswers,
        isSubmitted,
        goToQuestion,
        handleAnswer,
        goToNextQuestion,
        goToPreviousQuestion,
        currentQuestionIndex,
        visitedQuestionIndices,
        stopTimer, isTimerStopped
    } = useQuiz(quizData);


    if (isSubmitted) {
        <div>Тест завершен</div>
    }

    const isLastQuestion = currentQuestionIndex === quizData.questions.length - 1;

    return (
        <article className={style.quiz}>
            {
                isSubmitted ? (
                    <div>
                        <h2>Результаты</h2>
                        <p>Вы прошли тест</p>
                    </div>
                ) : (
                    <>

                        <div className={style.quiz__header}>
                            <h3>{title}</h3>
                            <Timer
                                durationInSeconds={quizData.duration ? quizData.duration * 60 : 0}
                                testCompleted={isSubmitted || isTimerStopped}
                                stopTimer={stopTimer}
                            />
                        </div>


                        <div className={style.quiz__body}>
                            <ProgressBar
                                quizData={quizData}
                                currentQuestionIndex={currentQuestionIndex}
                                visitedQuestionIndices={visitedQuestionIndices}
                                
                                goToQuestion={quizData.allowСhaoticNavigation ? goToQuestion : undefined}
                            />

                            <h2>{currentQuestion.title}</h2>

                            <div className={style.answer}>
                                {renderQuestion(currentQuestion, handleAnswer, currentQuestion, userAnswers)}
                            </div>

                        </div>
                        <div className={style.quiz__footer}>

                            {quizData.allowBackNavigation && currentQuestionIndex > 0 && (

                                <button
                                    disabled={currentQuestionIndex === 0 || !quizData.allowBackNavigation}
                                    onClick={goToPreviousQuestion}
                                >
                                    Предыдущий вопрос
                                </button>
                            )}

                            {isLastQuestion ? (
                                <button onClick={stopTimer}>Завершить</button>
                            ) : (
                                <button onClick={goToNextQuestion}>Следующий вопрос</button>
                            )}
                        </div>
                    </>
                )
            }


        </article>
    );
}
