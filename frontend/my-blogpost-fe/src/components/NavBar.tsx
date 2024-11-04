import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import '@fontsource/roboto/500.css';


export default function NavBar() {
    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="fixed" style={{backgroundColor: 'pink', color: 'Black'}}>
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        My Blog Posts
                    </Typography>
                </Toolbar>
            </AppBar>
        </Box>
    );
}