import { Send } from "./Send";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { resetCart } from "../redux/store";
import axios from "../axiosInstance";
import { Audio } from "react-loader-spinner";

export const Mail = () => {
  const dispatch = useDispatch();
  const orderid = localStorage.getItem("orderid")
  const [order, setOrder] = useState({});
  const [orderLoaded, setOrderLoaded] = useState(false); 

  useEffect(() => {
    const getOrder = async () => {
      try {
        const res = await axios.get("/orders/"+ orderid);
        setOrder(res.data);
        setOrderLoaded(true); 
        dispatch(resetCart());
        localStorage.removeItem('orderid');
      } catch (err) {
      }
    };
    getOrder();
  }, []);

  return (
    <div className="vh-100 d-flex align-items-center justify-content-center">
      <Audio
        height={130}
        width={130}
        radius={11}
        color="#FB75C7"
        ariaLabel="loading"
      />
      <div className="d-none">{orderLoaded && <Send order={order} />}</div>
    </div>
  );
};
