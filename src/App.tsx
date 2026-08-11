import './App.css'
import { Header } from './components/Header.tsx'
import ErrorBoundary from './components/ErrorBoundary.tsx'

function App() {
  return (
    <ErrorBoundary>
      <Header></Header>
    </ErrorBoundary>
  )
}

export default App
