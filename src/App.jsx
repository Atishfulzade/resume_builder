import { Route, Routes, Outlet } from "react-router-dom";
import ResumeTemplate from "./pages/Home";
import MyTemplate from "./pages/ResumePage";
import AboutUs from "./pages/AboutUs";
import Navbar from "./component/Navbar";
import TempNav from "./pages/TempNav";
import PersonalInfo from "./subpages/PersonalInfo";
import Education from "./subpages/Education";
import Work from "./subpages/Work";
import KeySkill from "./subpages/KeySkill";
import PdfPreview from "./pages/Preview";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<ResumeTemplate />} />
        <Route path="/template" element={<TempNav />}>
          <Route path="personal_info" element={<PersonalInfo />} />
          <Route path="education" element={<Education />} />
          <Route path="work" element={<Work />} />
          <Route path="skill" element={<KeySkill />} />
        </Route>
        <Route path="/mytemplate" element={<MyTemplate />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/preview" element={<PdfPreview />} />
      </Routes>
    </>
  );
}

export default App;
