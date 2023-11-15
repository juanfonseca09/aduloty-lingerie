import { useSelector } from "react-redux";
import { Send } from "./Send";
import { useEffect, useState } from "react";
import axios from "../axiosInstance";
import { Audio } from "react-loader-spinner";

export const Mail = () => {
  const cart = useSelector((state) => state.cart);
  const [order, setOrder] = useState({});
  const [orderLoaded, setOrderLoaded] = useState(false);

  useEffect(() => {
    const getOrder = async () => {
      try {
        const res = await axios.get("/orders/" + cart.orderId);
        setOrder(res.data);
        setOrderLoaded(true);
      } catch (err) {}
    };
    getOrder();
  }, [cart.orderId]);

  return (
    <>
      <div className="vh-100">
        <Audio
          height={80}
          width={80}
          radius={9}
          color="#FB75C7"
          ariaLabel="loading"
          wrapperStyle={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        />
      </div>
      <div className="d-none">{orderLoaded && <Send order={order} />}</div>
    </>
  );
};
