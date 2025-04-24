
import { ThemeProvider } from '@mui/material';
import StaffSidebar from '../pages/Staff/StaffSidebar/StaffSidebar';
import theme from '../utils/theme';

const StaffLayout = () => {
    return (
        
        <div>
            <ThemeProvider theme={theme}>
        <StaffSidebar></StaffSidebar>
      </ThemeProvider>
        </div>
    );
};

export default StaffLayout;