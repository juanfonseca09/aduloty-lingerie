import { useSelector } from "react-redux";
import { Send } from "./Send";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { resetCart } from "../redux/store";
import { Global } from "../Global";
import axios from "axios";

export const Mail = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [order, setOrder] = useState({});
  const [orderLoaded, setOrderLoaded] = useState(false); 

  useEffect(() => {
    const getOrder = async () => {
      try {
        const res = await axios({
          method: "get",
          url: Global.url + "orders/" + cart.orderId,
          withCredentials: false,
        });
        setOrder(res.data);
        setOrderLoaded(true); 
        dispatch(resetCart());
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
