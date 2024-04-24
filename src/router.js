import { Routes, Route } from 'react-router-dom'
import RequestTask from './pages/RequestTask'
import Error404 from './pages/Error404'
import Home from './pages/Home'
import ListTask from './pages/ListTask'
import ThongKeTask from './pages/ThongKeTask'

function MyRouter() {
    return (
        <Routes>
            <Route path='/' element={<Home />} exact></Route>
            <Route path='/request-task' element={<RequestTask />}></Route>
            <Route path='/list-task' element={<ListTask />}></Route>
            <Route path='/thongke-task' element={<ThongKeTask />}></Route>
            <Route element={<Error404 />}></Route>
        </Routes>
    )
}

export default MyRouter