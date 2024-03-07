import { BrowserRouter,Route, Routes } from "react-router-dom"
import GenerateCURP from "../Pages/generateCURP"


function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<GenerateCURP/>} />
            </Routes>
        </BrowserRouter>
    )
}

export default App;