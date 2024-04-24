import { Avatar, Card, CardContent, CardHeader, Checkbox, IconButton, Tooltip, Typography } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete'
import Favorite from '@mui/icons-material/Favorite'
import FavoriteBorder from '@mui/icons-material/FavoriteBorder'
import ThumbDownIcon from '@mui/icons-material/ThumbDown'
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined'
import { useContext } from "react";
import { TaskContext } from "../context/TaskContext";
import TaskInfoModal from "./TaskInfoModal";

function TaskInfoCard({ task }) {
    const { deleteTask } = useContext(TaskContext);

    const stringAvatar = (mode) => {
        return {
            children: `${mode.charAt(0)}`
        }
    }

    return (
        <Card>
            <Avatar
                {...stringAvatar(task.mode)}
                sx={{bgcolor: 'green'}} 
            />
            <CardHeader
                title={task.name}
                action={
                    <Tooltip title='Delete Customer' placement="bottom-end">
                        <IconButton onClick={() => {deleteTask(task.id)}}>
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>
                }
            />
            <CardContent>
                <Typography paragraph align="justify">
                    {task.detail}
                </Typography>
                <Typography paragraph align="justify">
                    {task.status}
                </Typography>
                <TaskInfoModal task={task} />
                <Checkbox 
                    icon={<FavoriteBorder />}
                    checkedIcon={<Favorite sx={{ color: 'red'}} />}
                />
                <Checkbox 
                    icon={<ThumbDownOutlinedIcon />}
                    checkedIcon={<ThumbDownIcon sx={{ color: 'blue'}} />}
                />
            </CardContent>
        </Card>
    )
}

export default TaskInfoCard