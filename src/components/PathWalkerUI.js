import React, { useState } from "react";
import { Input, Button, Row, Col, Layout, Card, Alert } from "antd";
import followPath from "../utils/followPath";

const { TextArea } = Input;
const { Content } = Layout;

const PathWalkerUI = () => {
  const [inputArray, setInputArray] = useState([]);
  const [result, setResult] = useState({ letters: "", path: "" });

  const handleInputChange = (e) => {
    setInputArray([]);
    const inputValue = e.target.value;
    const lines = inputValue.split("\n");
    const parsedArray = lines.map((line) => line.split(""));
    setInputArray(parsedArray);
  };

  const handleCalculate = () => {
    const map = inputArray.map((row) => row.join("")).join("\n");
    const pathResult = followPath(map);
    setResult(pathResult);
  };

  return (
    <Layout>
      <Content>
        <Row gutter={[0, 16]}>
          <Col
            span={12}
            style={{
              minHeight: "100vh",
              backgroundColor: "white",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div style={{ padding: "16px", width: "90%", textAlign: "center" }}>
              <img
                src="https://softwaresauna.com/wp-content/uploads/2022/09/software-sauna-logo-2.svg"
                alt="Software Sauna Logo"
                style={{ height: "60px", margin: "0 auto" }}
              />
              <h2 style={{ color: "black", paddingLeft: "16px" }}>
                Enter Your Path
              </h2>
              <TextArea
                rows={10}
                style={{ width: "100%" }}
                onChange={handleInputChange}
                placeholder="Enter your path (use spaces for empty cells)"
              />
              <Button
                type="primary"
                onClick={handleCalculate}
                style={{
                  width: "30%",
                  margin: "16px auto 0 auto",
                  display: "block",
                  backgroundColor: "#e55d00",
                }}
              >
                Submit
              </Button>
            </div>
          </Col>
          <Col
            span={12}
            style={{
              minHeight: "100vh",
              backgroundColor: "#e55d00",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                color: "white",
                padding: "16px",
                textAlign: "center",
                width: "90%",
              }}
            >
              <img
                src="https://softwaresauna.com/wp-content/uploads/2022/09/software-sauna-logo-match-white.svg"
                alt="Software Sauna Logo"
                style={{ height: "60px", margin: "0 auto" }}
              />
              <h2 style={{ color: "white" }}>Results</h2>
              {result.error && (
                <Alert type="error" banner message={result.error} />
              )}
              <Card
                title="Collected Letters"
                style={{ width: "100%", margin: "16px 0" }}
              >
                {result.letters}
              </Card>
              <Card title="Path" style={{ width: "100%", margin: "16px 0" }}>
                {result.pathData}
              </Card>
            </div>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default PathWalkerUI;
