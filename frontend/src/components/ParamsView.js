import { Input, InputNumber, Layout, Tabs, Form, Button, Space } from "antd";
import React, { useEffect, useState } from "react";

const initialParams = {
  symbol: "",
  volume: "",
  expectedBuy: 0,
  stopLoss: 0,
  takeProfit: 0,
  active: false,
};

const styles = {
  input: { marginTop: 8 },
  inputNumber: { width: "100%", marginTop: 8, padding: "2px 10px" },
  inputPrefix: {
    display: "flex",
    alignItems: "center",
    height: 26,
    color: "#6e7583",
  },
  inputNumberPrefix: { color: "#6e7583" },
  buttonsGroup: {
    display: "flex",
    justifyContent: "center",
    marginTop: 16,
  },
};

const ParamsView = ({ params = initialParams, onChange }) => {
  const [tradeParams, setTradeParams] = useState(params);

  useEffect(() => {
    setTradeParams(params);
  }, [params]);

  const { symbol, volume, expectedBuy, stopLoss, takeProfit, active } =
    tradeParams;

  const handleStartStop = async () => {
    const { active, ...restParams } = tradeParams;
    if (
      !(
        (!expectedBuy && !stopLoss && !takeProfit) ||
        (expectedBuy && stopLoss && takeProfit)
      )
    ) {
      alert("Wrong parameters");
      return;
    }

    onChange(restParams);
  };

  return (
    <Layout className="mt-5">
      <Tabs
        defaultActiveKey="trade"
        items={[
          {
            key: "trade",
            label: "General",
            children: (
              <Form style={{ marginTop: -8 }}>
                <Input
                  prefix={<span style={styles.inputPrefix}>Symbol:</span>}
                  value={symbol}
                  onChange={(e) =>
                    setTradeParams({ ...tradeParams, symbol: e.target.value })
                  }
                  style={styles.input}
                />
                <Input
                  prefix={<span style={styles.inputPrefix}>Trade Volume:</span>}
                  value={volume}
                  onChange={(e) =>
                    setTradeParams({ ...tradeParams, volume: e.target.value })
                  }
                  style={styles.input}
                />
              </Form>
            ),
          },
          {
            key: "parameters",
            label: "Trade Parameters",
            children: (
              <Form style={{ marginTop: -8 }}>
                <InputNumber
                  prefix={
                    <span style={styles.inputNumberPrefix}>
                      Expected Buy Price:
                    </span>
                  }
                  value={expectedBuy}
                  onChange={(value) =>
                    setTradeParams({ ...tradeParams, expectedBuy: value })
                  }
                  style={styles.inputNumber}
                />
                <InputNumber
                  prefix={
                    <span style={styles.inputNumberPrefix}>
                      Take Profit (%):
                    </span>
                  }
                  value={takeProfit}
                  onChange={(value) =>
                    setTradeParams({ ...tradeParams, takeProfit: value })
                  }
                  style={styles.inputNumber}
                />
                <InputNumber
                  prefix={
                    <span style={styles.inputNumberPrefix}>Stop Loss (%):</span>
                  }
                  value={stopLoss}
                  onChange={(value) =>
                    setTradeParams({ ...tradeParams, stopLoss: value })
                  }
                  style={styles.inputNumber}
                />
                {/* <InputGroup className="mt-2">
                  <InputGroup.Text>Expected Buy Price:</InputGroup.Text>
                  <Form.Control
                    type="number"
                    value={expectedBuy}
                    onChange={(e) =>
                      setTradeParams({
                        ...tradeParams,
                        expectedBuy: e.target.value,
                      })
                    }
                    placeholder="Enter Expected Buy Price"
                  />
                </InputGroup>
                <InputGroup className="mt-2">
                  <InputGroup.Text>Take Profit (%):</InputGroup.Text>
                  <Form.Control
                    type="number"
                    value={takeProfit}
                    onChange={(e) =>
                      setTradeParams({
                        ...tradeParams,
                        takeProfit: e.target.value,
                      })
                    }
                    placeholder="Enter Take Profit percentage"
                  />
                </InputGroup>
                <InputGroup className="mt-2">
                  <InputGroup.Text>Stop Loss (%):</InputGroup.Text>
                  <Form.Control
                    type="number"
                    value={stopLoss}
                    onChange={(e) =>
                      setTradeParams({
                        ...tradeParams,
                        stopLoss: e.target.value,
                      })
                    }
                    placeholder="Enter Stop Loss percentage"
                  />
                </InputGroup> */}
              </Form>
            ),
          },
        ]}
      ></Tabs>
      <Space style={styles.buttonsGroup}>
        <Button type="primary" onClick={handleStartStop}>
          {active ? "Stop" : "Start"}
        </Button>
        <Button onClick={() => setTradeParams(initialParams)}>Clear</Button>
      </Space>
    </Layout>
  );
};

export default ParamsView;
