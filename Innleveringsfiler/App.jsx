import { React } from 'react'
import { useState } from 'react'
import { useNavigate, Routes, Route } from 'react-router-dom';
import Calendar from './Calendar';
import HealthStats from './HealthStats';
import PerformanceStats from './PerformanceStats';
import Badges from './Badges';
import PersonalRecords from './PersonalRecords';
import Goals from './Goals';
import Settings from './Settings';

import {Container, Card, CardContent, Divider, Drawer, List, ListItem, ListItemIcon, ListItemText, Popover, IconButton,
    Typography, Grid2, Avatar} from '@mui/material';

import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';

// Importing icons
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';
import CalendarToday from '@mui/icons-material/CalendarToday';
import {
    EmojiEvents,
    Favorite,
    Flag,
    History,
    MonitorHeart,
    MilitaryTech,
    Logout,
    SupportAgent,
    ThumbUp,
}
    from "@mui/icons-material";

// Importing charts
import {Bar, BarChart, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, AreaChart,
    Area} from 'recharts';

function App() {

    //
    const [themeMode, setThemeMode] = useState('system');

    const theme = createTheme({palette: {mode: themeMode === 'system' ? window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light' : themeMode,},});

    // Getting date and time
    const currentDate = new Date();
    const dayNames = ['Monday', 'Tuesday', 'Wednessday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const curDay = dayNames[currentDate.getDay()];
    const curDate = currentDate.toLocaleDateString(); // no locale as JVM manages this

    // Getting the state of the sidebar
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    // Setting the state of the sidebar
    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    // Personal card menu element
    const [anchorEl, setAnchorEl] = useState(null); // Tracks the menu's anchor element

    const handleAvatarClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };

    const isPopoverOpen = Boolean(anchorEl);

    // Hardcoded 24hrs walking pattern
    const stepsData = [ // for card graph
        {hour: '00:00', steps: 0 }, {hour: '01:00', steps: 0 }, {hour: '02:00', steps: 0 }, {hour: '03:00', steps: 0 },
        {hour: '04:00', steps: 0 }, {hour: '05:00', steps: 0 }, {hour: '06:00', steps: 100 }, {hour: '07:00', steps: 300 },
        {hour: '08:00', steps: 600 }, {hour: '09:00', steps: 900 }, {hour: '10:00', steps: 1000 }, {hour: '11:00', steps: 1500 },
        {hour: '12:00', steps: 2300 }, {hour: '13:00', steps: 3200 }, {hour: '14:00', steps: 4300 }, {hour: '15:00', steps: 5600 },
        {hour: '16:00', steps: 7200 }, {hour: '17:00', steps: 8100 }, {hour: '18:00', steps: 8900 }, {hour: '19:00', steps: 9234 },
        {hour: '20:00', steps: 9634 }, {hour: '21:00', steps: 9832 }, {hour: '22:00', steps: 9950 }, {hour: '23:00', steps: 10000 },
    ];

    const kcalburn = [ // for card graph
        {hour: '01:00', kcal: 104}, {hour: '02:00', kcal: 104}, {hour: '03:00', kcal: 104}, {hour: '04:00', kcal: 104},
        {hour: '05:00', kcal: 104}, {hour: '06:00', kcal: 150}, {hour: '07:00', kcal: 200}, {hour: '08:00', kcal: 300},
        {hour: '09:00', kcal: 300}, {hour: '10:00', kcal: 300}, {hour: '11:00', kcal: 50}, {hour: '12:00', kcal: 100},
        {hour: '13:00', kcal: 89}, {hour: '14:00', kcal: 78}, {hour: '15:00', kcal: 67}, {hour: '16:00', kcal: 56},
        {hour: '17:00', kcal: 42}, {hour: '18:00', kcal: 101}, {hour: '19:00', kcal: 150}, {hour: '20:00', kcal: 70},
        {hour: '21:00', kcal: 104}, {hour: '22:00', kcal: 50}, {hour: '23:00', kcal: 30}
    ]

    const sleepData = [ // for Card graph
        { hour: '00:00', deep: 20, light: 40, awake: 10, rem: 30 },
        { hour: '01:00', deep: 25, light: 35, awake: 5, rem: 35 },
        { hour: '02:00', deep: 30, light: 30, awake: 5, rem: 35 },
        { hour: '03:00', deep: 35, light: 25, awake: 10, rem: 30 },
        { hour: '04:00', deep: 40, light: 20, awake: 5, rem: 35 },
        { hour: '05:00', deep: 20, light: 35, awake: 15, rem: 30 },
        { hour: '06:00', deep: 10, light: 40, awake: 20, rem: 30 },
    ];

    const hrvData = [ // for Card graph
        { time: '00:00', hrv: 60 },
        { time: '01:00', hrv: 58 },
        { time: '02:00', hrv: 62 },
        { time: '03:00', hrv: 59 },
        { time: '04:00', hrv: 65 },
        { time: '05:00', hrv: 63 },
        { time: '06:00', hrv: 67 },
        { time: '07:00', hrv: 64 },
        { time: '08:00', hrv: 70 },
        { time: '09:00', hrv: 68 },
        { time: '10:00', hrv: 72 },
    ]

    const navigate = useNavigate();

            return (
                <ThemeProvider theme={theme}>
                    <CssBaseline/>
                <div>
                    {/* App bar or header */}
                    <header
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            padding: '12px',
                            backgroundColor: '#1976d2',
                            color: '#fff'
                        }}
                    >
                        {/*Sidebar toggle button*/}
                        <IconButton onClick={toggleSidebar} style={{color: '#fff'}}>
                            <MenuIcon/>
                        </IconButton>

                        {/* App title */}
                        <Typography variant="h6" style={{marginLeft: '10px', flexGrow: 1}}>
                            Garmin Connect
                        </Typography>

                        {/* Profile avatar */}
                        <IconButton onClick={handleAvatarClick}>
                            <Avatar alt="John Doe" src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiyAHWaxu_f-n3ceNGRDvmAI79W2EB_Tbf58tSgiYvwCwsIp2XwdLEPT4Ysc6V3u4_NgAKQxiVmjSK8w6epJKzi8C6pYV1W9Pl_5IQ4biyhZTBrRCa7YhcnPsKdLvnSTudttPWHaas4O2E/s1600/Michael_Westen_Smiley.png"/>
                        </IconButton>
                    </header>

                    {/* Popover for Avatar Menu */}
                    <Popover
                        open={isPopoverOpen}
                        anchorEl={anchorEl}
                        onClose={handlePopoverClose}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        >
                        <List style={{ width: '200px' }}>
                            <ListItem button>
                                <ListItemIcon>
                                    <HomeIcon/>
                                </ListItemIcon>
                                <ListItemText primary="Show profile"/>
                            </ListItem>

                            <ListItem button>
                                <ListItemIcon>
                                    <History />
                                </ListItemIcon>
                                <ListItemText primary="Activity log" />
                            </ListItem>
                            <Divider />
                            <ListItem button>
                                <ListItemIcon>
                                    <SupportAgent />
                                </ListItemIcon>
                                <ListItemText primary="Support" />
                            </ListItem>

                            <ListItem button>
                                <ListItemIcon>
                                    <ThumbUp />
                                </ListItemIcon>
                                <ListItemText primary="Status" />
                            </ListItem>

                            <ListItem button>
                                <ListItemIcon>
                                    <Logout />
                                </ListItemIcon>
                                <ListItemText primary="Log out" />
                            </ListItem>

                        </List>

                    </Popover>




                    {/* Sidebar drawer */}
                    <Drawer anchor="left" open={isSidebarOpen} onClose={toggleSidebar}>
                        <List>
                            {/* HOME ROUTE */}
                            <ListItem button onClick={() => {navigate("/"); toggleSidebar(); }}>
                                <ListItemIcon>
                                    <HomeIcon/>
                                </ListItemIcon>
                                <ListItemText primary="Home"/>
                            </ListItem>

                            {/* CALENDAR ROUTE */}
                            <ListItem button onClick={() => {navigate("/calendar"); toggleSidebar(); }}>
                                <ListItemIcon>
                                    <CalendarToday/>
                                </ListItemIcon>
                                <ListItemText primary="Calendar"/>
                            </ListItem>

                            <ListItem button onClick={() => {navigate("/HealthStats"); toggleSidebar();}}>
                                <ListItemIcon>
                                    <Favorite/>
                                </ListItemIcon>
                                <ListItemText primary="Health stats"/>
                            </ListItem>

                            <ListItem button onClick={() => {navigate("/PerformanceStats"); toggleSidebar();}}>
                                <ListItemIcon>
                                    <MonitorHeart/>
                                </ListItemIcon>
                                <ListItemText primary="Performance stats"/>
                            </ListItem>

                            <Divider/>

                            <ListItem button onClick={() => {navigate("/Badges"); toggleSidebar();}}>
                                <ListItemIcon>
                                    <MilitaryTech/>
                                </ListItemIcon>
                                <ListItemText primary="Badges"/>
                            </ListItem>

                            <ListItem button onClick={() => {navigate("/PersonalRecords"); toggleSidebar();}}>
                                <ListItemIcon>
                                    <EmojiEvents/>
                                </ListItemIcon>
                                <ListItemText primary="Personal records"/>
                            </ListItem>

                            <ListItem button onClick={() => {navigate("/Goals"); toggleSidebar();}}>
                                <ListItemIcon>
                                    <Flag/>
                                </ListItemIcon>
                                <ListItemText primary="Goals"/>
                            </ListItem>

                            <Divider/>

                            <ListItem button onClick={() => {navigate("/Settings"); toggleSidebar();}}>
                                <ListItemIcon>
                                    <SettingsIcon/>
                                </ListItemIcon>
                                <ListItemText primary="Settings"/>
                            </ListItem>

                        </List>
                    </Drawer>



                    <Container style={{marginTop: '20px'}}>
                        <Routes>
                            <Route path="/" element={
                                <div>

                        <Typography variant="h4" gutterBottom>
                            {`${curDay}, ${curDate}`}
                        </Typography>
                        <Grid2 container spacing={3}>
                            {/* Metric card */}
                            <Grid2 item xs={12} sm={6} md={4}>
                                <Card sx={{ padding: '16px' }}>
                                    <CardContent>
                                        <Typography variant="h6">Steps</Typography>
                                        <Typography variant="h4" color="primary">
                                            10345
                                        </Typography>
                                        <Typography variant="body2">steps today</Typography>
                                        <ResponsiveContainer width={200} height={200}>
                                            <LineChart type="monotone" data={stepsData}>
                                                <CartesianGrid strokeDasharray="3 3"/>
                                                <XAxis dataKey="hour"/>
                                                <YAxis />
                                                <Tooltip />
                                                <Line type="monotone" dot={false} dataKey="steps" stroke="#8884d8"/>
                                            </LineChart>
                                        </ResponsiveContainer>
                                    </CardContent>
                                </Card>
                            </Grid2>
                            {/* Metric Card 2*/}
                            <Grid2 item xs={12} sm={6} md={4}>
                                <Card>
                                    <CardContent>
                                        <Typography variant="h6">Calories</Typography>
                                        <Typography variant="h4" color="primary">
                                            2450
                                        </Typography>
                                        <Typography variant="body2">kcal burned</Typography>
                                        <ResponsiveContainer width={200} height={200}>
                                            <LineChart type="monotone" data={kcalburn}>
                                                <CartesianGrid strokeDasharray="3 3"/>
                                                <XAxis dataKey="hour"/>
                                                <YAxis />
                                                <Tooltip />
                                                <Line type="monotone" dot={false} dataKey="kcal" stroke="#8884d8"/>
                                            </LineChart>
                                        </ResponsiveContainer>
                                    </CardContent>
                                </Card>
                            </Grid2>
                            {/* Add more cards as needed */}
                            <Card>
                                <CardContent>
                                    <Typography variant="h6">Heart Rate Variability</Typography>
                                    <Typography variant="h4" color="primary">
                                        62
                                    </Typography>
                                    <Typography variant="body2">last night</Typography>
                                    <ResponsiveContainer width={200} height={200}>
                                        <AreaChart data={hrvData}>
                                            <defs>
                                                <linearGradient id="colorHrv" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="5%" stopColor="red" stopOpacity={0.8} />
                                                    <stop offset="95%" stopColor="blue" stopOpacity={0} />
                                                </linearGradient>
                                            </defs>
                                            <CartesianGrid strokeDasharray="3 3"/>
                                            <XAxis dataKey="time"/>
                                            <YAxis domain={[50, 80]}/>
                                            <Tooltip />
                                            <Area
                                                type="monotone"
                                                dataKey="hrv"
                                                stroke="transparent"
                                                fillOpacity={0.5}
                                                fill="purple"
                                            />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardContent>
                                    <Typography variant="h6">Sleep Score</Typography>
                                    <Typography variant="h4" color="primary">
                                        6h 47m
                                    </Typography>
                                    <Typography variant="body2">You slept well</Typography>
                                    <ResponsiveContainer width={200} height={200}>
                                        <BarChart data={sleepData}>
                                            <CartesianGrid strokeDasharray="3 3"/>
                                            <XAxis dataKey="hour"/>
                                            <YAxis />
                                            <Tooltip />
                                            <Legend/>
                                            <Bar dataKey="deep" stackId="a" fill="#1E88E5" name="Deep Sleep" />
                                            <Bar dataKey="light" stackId="a" fill="#64B5F6" name="Light Sleep" />
                                            <Bar dataKey="rem" stackId="a" fill="#2962FF" name="REM Sleep" />
                                            <Bar dataKey="awake" stackId="a" fill="#880E4F" name="Awake" />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </CardContent>
                            </Card>
                        </Grid2>
                                </div>
                                    }
                                    />
                                    <Route path="/Calendar" element={<Calendar />} />
                                    <Route path="/HealthStats" element={<HealthStats />} />
                                    <Route path="/PerformanceStats" element={<PerformanceStats />} />
                                    <Route path="/Badges" element={<Badges />} />
                                    <Route path="/PersonalRecords" element={<PersonalRecords />} />
                                    <Route path="/Goals" element={<Goals />} />
                                    <Route path="/Settings" element={<Settings setThemeMode={setThemeMode}/>} />
                                </Routes>
                    </Container>
                </div>
                </ThemeProvider>
            );
        }

export default App;
