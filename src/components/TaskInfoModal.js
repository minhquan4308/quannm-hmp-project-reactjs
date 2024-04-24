import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { FormControlLabel, FormLabel, Radio, RadioGroup, Stack, TextField } from '@mui/material';
import { DemoItem } from '@mui/x-date-pickers/internals/demo';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useContext, useState } from 'react'
import { TaskContext } from '../context/TaskContext';
import SendIcon from '@mui/icons-material/Send'
import dayjs from 'dayjs';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function TaskInfoModal({ task }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [name, setName] = useState(task.name)
  const [detail, setDetail] = useState(task.detail)
  const [nameError, setNameError] = useState(false)
  const [detailError, setDetailError] = useState(false)
  const [startDate, setStartDate] = useState(dayjs(task.startDate))
  const [endDate, setEndDate] = useState(dayjs(task.endDate))
  const [status, setStatus] = useState(task.status)

  const { updateTask } = useContext(TaskContext)

    const handleSubmit = (e) => {

        e.preventDefault()

        // Nếu tên và chi tiết task không rỗng thì thực hiện update task
        if (name && detail) {
          updateTask(
                {   
                  name, 
                  detail, 
                  startDate: dayjs(startDate).format('YYYY/MM/DD'), 
                  endDate: dayjs(endDate).format('YYYY/MM/DD'), 
                  mode: task.mode, 
                  rating: task.rating, 
                  status
                }, 
                task.id
            )

            handleClose()
        }

        if (name === '') {
            setNameError(true)
        }

        if (name === '') {
            setDetailError(true)
        }
    }

  return (
    <div>
      <Button onClick={handleOpen}>Edit Task</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
      <Box sx={style}>
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
                    <FormLabel>Status</FormLabel>
                    <RadioGroup 
                        row 
                        value={status}
                        name='radio-button-group'
                        onChange={(e) => setStatus(e.target.value)}
                    >
                        <FormControlLabel
                            value='Open' 
                            control={<Radio />} 
                            label='Open' 
                        />
                        <FormControlLabel
                            value='InProgress' 
                            control={<Radio />} 
                            label='InProgress' 
                        />
                        <FormControlLabel 
                            value='Closed' 
                            control={<Radio />} 
                            label='Closed' 
                        />
                    </RadioGroup>
                </Box>

          </Box>

          <Button 
            type='submit' 
            variant='contained'
            startIcon={<SendIcon />}
          >
            Submit
          </Button>
        </form>
      </Box>
      </Modal>
    </div>
  );
}

export default TaskInfoModal
