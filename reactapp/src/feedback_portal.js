import { HashRouter, Routes, Route } from "react-router-dom";
import Viewfeedback from "./view_feedback";
import Reviewheader from "./review_header";
import Addfeedback from "./add_feedback";

const Fbportal = () => {
  return (
    <HashRouter>
      <Reviewheader />
      <Routes>
       <Route exact path="/" element={<Viewfeedback />} />
        <Route exact path="/Addfeedback" element={<Addfeedback />} />
      </Routes>
    </HashRouter>
  );
};

export default Fbportal;
