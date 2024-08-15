import { Route, Routes } from "react-router-dom";
import Modify from "./components/Modify";
import Blog from "../src/components/Blog"; 

const MainApp = () => {
  return (
    <Routes>
      <Route path="/" element={<Blog />} />
      <Route path="/new" element={<Modify isEditing={false} />} />
      <Route path="/edit/:id" element={<Modify isEditing={true} />} />
    </Routes>
  );
};

export default MainApp;
