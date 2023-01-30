
import 'bootstrap/dist/css/bootstrap.min.css'
import "./App.scss"
import { BrowserRouter as Router } from "react-router-dom"
import AnimatedPage from './components/AnimatePage';


function App() {
  return (
    <Router>
      <AnimatedPage />
    </Router>
  )
}


export default App;
