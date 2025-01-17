import React from 'react';
import { Card, CardContent, Typography, Tooltip, Box, List, Stack, Grid2} from '@mui/material';

// Sample data for the week
const weekData = [
    {
        day: 'Monday',
        events: [
            { name: 'Morning Run', start: '07:00', stop: '08:00' },
            { name: 'Work Meeting', start: '09:30', stop: '11:00' },
        ],
    },
    {
        day: 'Tuesday',
        events: [
            { name: 'Yoga Session', start: '06:00', stop: '07:00' },
            { name: 'Lunch with Sarah', start: '12:00', stop: '13:00' },
        ],
    },
    {
        day: 'Wednesday',
        events: [
            { name: 'Team Standup', start: '09:00', stop: '09:30' },
            { name: 'Dinner Party', start: '19:00', stop: '22:00' },
        ],
    },
    {
        day: 'Thursday',
        events: [
            { name: 'Client Presentation', start: '10:00', stop: '11:30' },
        ],
    },
    {
        day: 'Friday',
        events: [
            { name: 'Weekly Review', start: '15:00', stop: '16:00' },
        ],
    },
    {
        day: 'Saturday',
        events: [],
    },
    {
        day: 'Sunday',
        events: [
            { name: 'Family Brunch', start: '10:00', stop: '12:00' },
        ],
    },
];

function Calendar() {
    return (
        <Box sx={{ padding: '20px' }}>
            <Typography variant="h4" gutterBottom>
                Weekly Calendar
            </Typography>
            <Grid2 container spacing={3}>
                {weekData.map((day) => (
                    <Stack spacing={2} direction="column" key={day.day}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6" gutterBottom>
                                    {day.day}
                                </Typography>
                                {day.events.length > 0 ? (
                                    day.events.map((event, index) => (
                                        <Tooltip
                                            key={index}
                                            title={`${event.start} - ${event.stop})`}
                                            arrow
                                        >
                                            <Typography
                                                variant="body1"
                                                sx={{
                                                    marginBottom: '8px',
                                                    cursor: 'pointer',
                                                }}
                                            >
                                                {event.name}
                                            </Typography>
                                        </Tooltip>
                                    ))
                                ) : (
                                    <Typography variant="body2" color="textSecondary">
                                        No events
                                    </Typography>
                                )}
                            </CardContent>
                        </Card>
                    </Stack>
                ))}
            </Grid2>
        </Box>
    );
}

export default Calendar;
