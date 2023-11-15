import { useSelector } from "react-redux";
import { Send } from "./Send";
import { useEffect, useState } from "react";
import axios from "../axiosInstance";

export const Mail = () => {
  const cart = useSelector((state) => state.cart);
  const [order, setOrder] = useState({});
  const [orderLoaded, setOrderLoaded] = useState(false); 

  useEffect(() => {
    const getOrder = async () => {
      try {
        const res = await axios.get("/orders/"+ cart.orderId);
        setOrder(res.data);
        setOrderLoaded(true); 
      } catch (err) {
      }
    };
    getOrder();
  }, [cart.orderId]);

  return (
    <div className="d-none">
      {orderLoaded && <Send order={order} />}
    </div>
  );
};
