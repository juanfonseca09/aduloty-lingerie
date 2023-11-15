import React, { useEffect } from 'react';
import { useDispatch } from "react-redux";
import { resetCart } from "../redux/store";
import { useNavigate } from 'react-router-dom';

export const Reset = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(()=>{
        dispatch(resetCart());
        navigate('/inicio');
    },[])
  return (
    <div className='d-none'>Reset</div>
  )
}
