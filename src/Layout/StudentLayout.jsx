import { ThemeProvider } from "@mui/material";

import theme from "./../utils/theme";
import StudentDash from "../pages/Student/StudentDash/StudentDash";

const StudentLayout = () => {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <StudentDash></StudentDash>
      </ThemeProvider>
    </div>
  );
};

export default StudentLayout;
