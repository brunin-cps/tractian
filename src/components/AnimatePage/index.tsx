// import "./style.scss";
// import { motion } from "framer-motion";
import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from 'framer-motion';
import { Home, Users, Assets, Companies, Workorders, Units } from '../../pages/exports';

const AnimatedPage = () => {
  const location = useLocation();

  return (
    <AnimatePresence>
      <Routes key={location.pathname} location={location}>
        <Route path='/' element={<Home />} />
        <Route path='/users' element={<Users />} />
        <Route path='/assets' element={<Assets />} />
        <Route path='/units' element={<Units />} />
        <Route path='/companies' element={<Companies />} />
        <Route path='/workorders' element={<Workorders />} />
      </Routes>
    </AnimatePresence>
  )


}
export default AnimatedPage;
