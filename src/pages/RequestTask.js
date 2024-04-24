import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import SendIcon from '@mui/icons-material/Send'
import { useContext, useState } from 'react'
import { Stack, FormControlLabel, FormLabel, Radio, RadioGroup, Rating, Snackbar, Alert } from '@mui/material'
import { TaskContext } from '../context/TaskContext'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DemoItem } from '@mui/x-date-pickers/internals/demo';
import dayjs from 'dayjs'

function RequestTask() {
    const [name, setName] = useState('')
    const [detail, setDetail] = useState('')
    const [nameError, setNameError] = useState(false)
    const [detailError, setDetailError] = useState(false)
    const [mode, setMode] = useState('easy')
    const [rating, setRating] = useState(5)
    const [openSnackBar, setOpenSnackBar] = useState(false)
    const [startDate, setStartDate] = useState(dayjs())
    const [endDate, setEndDate] = useState(dayjs())

    const { createTask } = useContext(TaskContext)

    const handleSubmit = (e) => {

        e.preventDefault()

        // Nếu giá trị name rỗng thì set thông tin lỗi
        if (name === '') {
            setNameError(true)
        }

        // Nếu giá trị detail rỗng thì set thông tin lỗi
        if (detail === '') {
            setDetailError(true)
        }

        if (name && detail) {
            createTask(
                {   
                    name, 
                    detail, 
                    startDate: dayjs(startDate).format('YYYY/MM/DD'), 
                    endDate: dayjs(endDate).format('YYYY/MM/DD'), 
                    mode, 
                    rating, 
                    status: 'Open'
                }
            )
            
            setOpenSnackBar(true)
        }

        // reset giá trị name và detail sau khi đăng ký thành công
        setName('')
        setDetail('')
    }

    const handleClose = () => {
        setOpenSnackBar(false)
    }

    return (
        <Container>
            <Typography variant='h3' align='center' gutterBottom>
                Add a new task
            </Typography>
            <form noValidate autoComplete='off' onSubmit={handleSubmit}>
                <Box pb={2}>
                    <TextField 
                        label='Name' 
                        variant='standard' 
                        fullWidth required
                        onChange={(e) => setName(e.target.value)}
                        error={nameError}
                        value={name}
                    />

                    <TextField 
                        label='Details' 
                        variant='standard' 
                        fullWidth
                        multiline
                        rows={3}
                        onChange={(e) => setDetail(e.target.value)}
                        error={detailError}
                        value={detail}
                    />

                    <Stack mt={5} spacing={5}>
                        <DemoItem label="">
                            <DatePicker
                            label="Start date"
                            value={startDate}
                            onChange={(newValue) => setStartDate(newValue)}
                            format='YYYY-MM-DD'
                            />
                        </DemoItem>

                        <DemoItem label="">
                            <DatePicker
                            label="End date"
                            value={endDate}
                            onChange={(newValue) => setEndDate(newValue)}
                            format='YYYY-MM-DD'
                            />
                        </DemoItem>
                    </Stack>

                    <Box mt={5}>
                        <FormLabel>Chọn độ khó của task</FormLabel>
                        <RadioGroup 
                            row 
                            value={mode}
                            name='radio-button-group'
                            onChange={(e) => setMode(e.target.value)}
                        >
                            <FormControlLabel
                                value='easy' 
                                control={<Radio />} 
                                label='Easy' 
                            />
                            <FormControlLabel 
                                value='normal' 
                                control={<Radio />} 
                                label='Normal' 
                            />
                            <FormControlLabel 
                                value='hard' 
                                control={<Radio />} 
                                label='Hard' 
                            />
                        </RadioGroup>
                    </Box>

                    <Rating 
                        value={rating}
                        onChange={(e) => setRating(Number(e.target.value))}
                    />
                </Box>

            <Button 
                    type='submit' 
                    variant='contained'
                    startIcon={<SendIcon />}
                >
                    Submit
                </Button>
            </form>

            <Snackbar
                open={openSnackBar}
                autoHideDuration={2000}
                onClose={handleClose}
            >
                <Alert
                    severity='success'
                >
                    Created new task successfully
                </Alert>
            </Snackbar>
        </Container>
    )
}

export default RequestTask