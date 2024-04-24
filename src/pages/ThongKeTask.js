import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TaskContext } from '../context/TaskContext';
import { useContext, useEffect, useState } from 'react';
import moment from 'moment';
import { Box, Container, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function ThongKeTask() {
    const { tasksThongKe } = useContext(TaskContext)
   
    const [tkMode, setTkMode] = useState('all')


    const [thongke, setThongKe] = useState({})

    useEffect(() => {
        setThongKe(() => {
            let overdue = 0;
            let inProgress = 0;
            let notStart = 0;
    
            if (tkMode === 'all') {
                overdue = tasksThongKe.filter(task => 
                    (moment(task.endDate, 'YYYY/MM/DD').isBefore(moment())
                    &&
                    task.status !== 'Closed')
                    ).length
    
                inProgress = tasksThongKe.filter(task => 
                    (task.status === 'InProgress')
                    ).length
    
                notStart = tasksThongKe.filter(task => 
                    (task.status === 'Open')
                    ).length
            }
    
            if (tkMode === 'week') {
                overdue = tasksThongKe.filter(task => 
                    (moment(task.endDate, 'YYYY/MM/DD').isBefore(moment())
                    &&
                    task.status !== 'Closed')
                    ).length
    
                inProgress = tasksThongKe.filter(task => 
                    (task.status === 'InProgress')
                    ).length
    
                notStart = tasksThongKe.filter(task => 
                    (task.status === 'Open')
                    ).length
            }
    
            if (tkMode === 'month') {
                overdue = tasksThongKe.filter(task => 
                    (moment(task.endDate, 'YYYY/MM/DD').isBefore(moment())
                    &&
                    task.status !== 'Closed')
                    ).length
    
                inProgress = tasksThongKe.filter(task => 
                    (task.status === 'InProgress')
                    ).length
    
                notStart = tasksThongKe.filter(task => 
                    (task.status === 'Open')
                    ).length
            }
            return {
                overdue,
                inProgress,
                notStart
            }
        })
    }, [tkMode])
    
  return (
    <Container>
        <Box mt={5}>
            <FormLabel>Chọn thời gian thống kê task</FormLabel>
            <RadioGroup 
                row 
                value={tkMode}
                name='radio-button-group'
                onChange={(e) => setTkMode(e.target.value)}
            >
                <FormControlLabel
                    value='all' 
                    control={<Radio />} 
                    label='All' 
                />
                <FormControlLabel 
                    value='week' 
                    control={<Radio />} 
                    label='By Week' 
                />
                <FormControlLabel 
                    value='month' 
                    control={<Radio />} 
                    label='By Month' 
                />
            </RadioGroup>
        </Box>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="right">Over Due</StyledTableCell>
            <StyledTableCell align="right">In Progress</StyledTableCell>
            <StyledTableCell align="right">Not Start</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            <StyledTableRow>
              <StyledTableCell align="right">{thongke.overdue}</StyledTableCell>
              <StyledTableCell align="right">{thongke.inProgress}</StyledTableCell>
              <StyledTableCell align="right">{thongke.notStart}</StyledTableCell>
            </StyledTableRow>
        </TableBody>
      </Table>
    </TableContainer>
    </Container>
  );
}

export default ThongKeTask
