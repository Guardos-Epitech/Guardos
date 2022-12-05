import React from 'react';
import Button from '@mui/material/Button';
import { NavigateTo } from "../../utils/NavigateTo"
import { useNavigate } from "react-router-dom";


const HomePage = () => {
    let navigate = useNavigate(); 
    return (
        <div>
            <span>HomePage</span>
            <Button variant="contained" onClick={() => NavigateTo("/", navigate)}>Home Page</Button>
            <Button variant="contained" onClick={() => NavigateTo("/filter", navigate)}>Filter Page</Button>
            <Button variant="contained" onClick={() => NavigateTo("/menu", navigate)}>Menu Page</Button>
        </div>
    )
}

export default HomePage;