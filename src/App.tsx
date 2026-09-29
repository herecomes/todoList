import './App.css'
import { Header } from './components/Header.tsx'
import { Footer } from './components/Footer.tsx'
import { DateSelector } from './components/DateSelector.tsx'
import ErrorBoundary from './components/ErrorBoundary.tsx'
import { TasksProvider } from './context/TaskContext.tsx'
import { TaskStatsProvider } from './context/TaskStatsContext.tsx'
import { Weeks } from './components/Weeks.tsx'
import { DateProvider } from './context/DateContext.tsx'
import { useEffect, useState } from 'react'
import { TodoAddModal } from './components/TodoAddModal.tsx'
import { TodoEditModal } from './components/TodoEditModal.tsx'

function App() {
  const [isModalOpen, setIsModalOpen] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTaskId, setSelectedTaskId] = useState<number>();

  const handleOpenAddModal = (d: string) => {
    setSelectedDate(d);
    setIsModalOpen("addModal");
  }
  const handleOpenEditModal = (d:number) => {
    setSelectedTaskId(d);
    setIsModalOpen("editModal");
  }
  const handleCloseModal = () => {
    setIsModalOpen("");
  }
  const scrollWidth = window.innerWidth - document.documentElement.clientWidth;
  useEffect(() => {
    document.body.classList.toggle("overflow-hidden");
  }, [isModalOpen]);

  return (
    <TasksProvider>
      <TaskStatsProvider>
        <DateProvider>
          <ErrorBoundary>
            <div className="bg-black App flex flex-col min-h-screen w-full rounded-4xl border-1 border-hcblue shadow-[0_0_5px_rgba(42,60,173,1)] p-4 overflow-hidden">
              <Header className="pb-4 flex flex-row justify-between" />
              <div className="flex-grow text-white">
                <DateSelector />
                <Weeks handleOpenAddModal={handleOpenAddModal} handleOpenEditModal={handleOpenEditModal}/>
              </div>
              <Footer className="pt-4 flex flex-col justify-center items-center text-white" />
            </div>
            <div className={`modal justify-center items-center absolute inset-[0px] w-full h-full bg-black/60 ${isModalOpen ? "flex active" : "hidden"}`}>
              <TodoAddModal isModalOpen={isModalOpen} selectedDate={selectedDate} handleCloseModal={handleCloseModal}/>
              <TodoEditModal isModalOpen={isModalOpen} selectedTaskId={selectedTaskId} handleCloseModal={handleCloseModal}/>
            </div>
          </ErrorBoundary>
        </DateProvider>
      </TaskStatsProvider>
    </TasksProvider >
  )
}

export default App

// Хедер:
// Лого, меню юзерів, пошук задач, лічильник скільки задач було зроблено і скільки ще треба (під цим є полоска, яка заповнюється від виконання задач), зміна кольору сайту

// Боді:
// Береться цей місяць, розбивається на тижні. Кожен тиждень пишеться в ряд під місяцем і роком. Тобто йде під хедером місяць (при натисканні на нього з'являться вибір місяця) через кому, рік (при натисканні можна вибрати рік), під цим, 5 блоків (якщо 5 тижнів) з написом "тиждень 1". Який зараз тиждень, сайт сам розуміє і активує теперішній тиждень, але можна клацати на будь який тиждень. При активації тижня, з'являються дні, кожен день і тиждень показує скільки відсотків задач було виконано. День теж обирається автоматично, але можна перейти на інший. При активації дня, з'являються години, полоса годин і хвилин, на якій окремим кольором, який можна обрати, помічені задачі, якщо задача виконана, помічається зеленим кольором (зелений колір зарезервований) і галочкою, також ця задача йде у відсотки. Час не можна обрати один і той самий, тільки 1 задача, на 1 час. Зверху лист всіх задач, знизу цих задач є колір цієї задачі, в кінці є кнопка, додати задачу. Там пишеться опис, назва, час і можна обрати колір. При натисканні на існуючу задачу, обирається в шкалі часу ця задача і з'являється опис задачі кнопка ніби розширяється. В самому верху є кнопка видалити всі задачі цього дня/тижня/місяця. 

// popup
// each day, will have title of the task, like google calendar, after clicking on this task, will appear popup, with the info about the task, and functionality of deleting or toggling the task. To add the task, you need to click + icon in the day

// Футер:
// Посилання на мене в лінкедін, джині, вокрюа, гітхаб. Зміна кольору сайту.
// Копірайт