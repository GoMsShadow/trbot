import { useEffect, useState } from "react";
import "./App.css";
import ParamsView from "./components/ParamsView";
import { apiGetParams, apiSetParams } from "./api";

import { ConfigProvider, theme, Layout } from "antd";
import PriceTracker from "./components/PriceTracker";
import OrderList from "./components/OrderList";
const { Content, Sider } = Layout;

const initialParams = {
  symbol: "",
  volume: "",
  expectedBuy: 0,
  stopLoss: 0,
  takeProfit: 0,
  active: false,
};

const styles = {
  sider: {
    background: "none",
    padding: "0 20px 20px",
  },
};
function App() {
  const [tradeParams, setTradeParams] = useState(initialParams);

  useEffect(() => {
    const getParams = async () => {
      try {
        const { data } = await apiGetParams();
        setTradeParams(data);
      } catch (error) {
        console.error(error);
      }
    };

    getParams();
  }, []);

  const onChangeParams = async (params) => {
    try {
      const { data } = await apiSetParams(params);
      setTradeParams({ ...params, active: data.status });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
        components: { Layout: { bodyBg: "#16171a" } },
      }}
    >
      <Layout className="root-container">
        <Content>
          <ParamsView params={tradeParams} onChange={onChangeParams} />
          <OrderList />
        </Content>
        <Sider width={380} style={styles.sider}>
          <PriceTracker />
        </Sider>
      </Layout>
    </ConfigProvider>
  );
}

export default App;
