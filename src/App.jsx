import styles from "./App.module.css";
import { Routes, Route } from "react-router-dom";
import Accept from './pages/Accept/Accept'
import Home from './pages/Home/Home'
import NotFound from './pages/NotFound/NotFound'

function App() {
  return (
    <div className={styles.app}>
      <Routes>
        <Route path="/heartfelt" element={<Home />} />
        <Route path="/heartfelt/accept" element={<Accept />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App
