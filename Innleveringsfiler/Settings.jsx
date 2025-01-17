import React, {useState} from 'react';
import { FormControl, InputLabel, MenuItem, Select, Typography, Box} from '@mui/material';

function Settings({ setThemeMode }) {
    const [theme, setTheme] = useState('system');

    const handleThemeChange = (event) => {
        const newTheme = event.target.value;
        setTheme(newTheme);
        setThemeMode(newTheme); // update theme mode in app.jsx
    };

    return (
        <Box sx={{ padding: '20px' }}>
            <Typography variant="h4" gutterBottom>
                Settings
            </Typography>
            <Typography variant="h6" gutterBottom>
                Choose Theme
            </Typography>
            <FormControl fullWidth variant="outlined">
                <InputLabel id="theme-selector-label">Theme</InputLabel>
                <Select
                    labelId="theme-selector-label"
                    id="theme-selector"
                    value={theme}
                    onChange={handleThemeChange}
                    label="Theme"
                >
                    <MenuItem value="system">System</MenuItem>
                    <MenuItem value="light">Light</MenuItem>
                    <MenuItem value="dark">Dark</MenuItem>
                </Select>
            </FormControl>
        </Box>
    );
}

export default Settings;
