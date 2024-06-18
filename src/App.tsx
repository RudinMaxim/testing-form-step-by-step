import './App.css'
import { mockQuizData } from './mockData'
import { QuizViwe } from './module'

function App() {

  return (
    <>
			<QuizViwe quizData={mockQuizData} title='Тестирование' />
    </>
  )
}

export default App
