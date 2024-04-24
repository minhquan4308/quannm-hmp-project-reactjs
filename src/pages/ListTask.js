import { Box, Container, FormControl, Grid, InputLabel, List, ListItem, ListItemIcon, ListItemText, MenuItem, Select, Stack, Switch, TextField, Typography } from "@mui/material"
import { useContext, useEffect, useState } from "react"
import TaskInfoCard from "../components/TaskInfoCard"
import { TaskContext } from "../context/TaskContext"
import GridViewIcon from '@mui/icons-material/GridView';
import TaskInfoSummary from "../components/TaskInfoSummary";


function ListTask() {
    
    const { tasks, findTaskByMultiCondition } = useContext(TaskContext)

    const [modeView, setModeView] = useState('grid')

    const [searchName, setSearchName] = useState('')

    const [taskStatus, setTaskStatus] = useState('All')

    // Nếu state các điều kiện search thay đổi thì thực hiện filter task theo điều kiện
    useEffect(() => {
        if(searchName || taskStatus) {
            findTaskByMultiCondition(searchName, taskStatus)
        }
    }, [searchName, taskStatus])    

    return (
        <Container>
            <Typography variant="h3" gutterBottom align="center">
                List Task
            </Typography>
            <Box>
                <List>
                    <ListItem>
                        <ListItemIcon>
                            <GridViewIcon />
                        </ListItemIcon>
                        <Switch onChange={(e) => setModeView(modeView === 'grid' ? 'summary' : 'grid')} />
                        <ListItemText primary='Switch View'/>
                    </ListItem>
                </List>
            </Box>

            {modeView === 'grid' &&
                <Box>
                    <Stack direction='row' spacing={5}>
                        <TextField 
                            id="outlined-basic" 
                            label="Search by Task Name" 
                            variant="outlined"
                            value={searchName}
                            onChange={(e) => setSearchName(e.target.value)}
                        />
                        <FormControl sx={{width: '200px'}}>
                            <InputLabel id="demo-simple-select-label">Filter by Status</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={taskStatus}
                                label="Filter by Status"
                                onChange={(e) => setTaskStatus(e.target.value)}
                            >
                                <MenuItem value={'All'}>All</MenuItem>
                                <MenuItem value={'Open'}>Open</MenuItem>
                                <MenuItem value={'Closed'}>Closed</MenuItem>
                            </Select>
                        </FormControl>
                    </Stack>

                    <Grid container p={5} spacing={5}>

                        {tasks.map((task) => (
                            <Grid 
                                item
                                xs={4}
                                key={task.id}
                            >
                                <TaskInfoCard task={task} />
                            </Grid>
                        )
                        )}
                    </Grid>
                </Box>
            }

            {modeView === 'summary' && 
                <TaskInfoSummary tasks={tasks}/>
            }
        </Container>
    )
}

export default ListTask