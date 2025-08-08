import { Col, Row } from "antd";
import { SearchOutlined } from "@ant-design/icons";

const linkStyle = {
  textDecoration: "none",
  color: "white",
  fontWeight: "500",
  transition: "color 0.3s",
};
const inputSteyle = {
  flex: 1,
  padding: "10px 16px",
  border: "none",
  fontSize: "14px",
  outline: "none",
  backgroundColor: "#FFFFFF",
};

export default function Header() {
  return (
      <div style={{ padding: "10px" }}>
        <Row wrap={false} gutter={16} align="middle" justify="space-between">
          <Col flex="none">
            <a style={linkStyle} href="#">
              Home
            </a>
          </Col>
          <Col flex="none">
            <a style={linkStyle} href="#">
              Genre
            </a>
          </Col>
          <Col flex="none">
            <a style={linkStyle} href="#">
              Country
            </a>
          </Col>
          <Col flex="none">
            <div
              style={{
                display: "flex",
                borderRadius: "20px",
                overflow: "hidden",
                width: "400px",
                backgroundColor: "#FFFFFF",
                border: "1px solid #333",
              }}
            >
              <input
                type="text"
                placeholder="Search movies......."
                style={inputSteyle}
              />
              <button
                style={{
                  padding: "8px 16px",
                  border: "1px solid #FFFFFF",
                  backgroundColor: "#FFFFFF",
                  color: "#000000",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
              >
                <SearchOutlined />
              </button>
            </div>
          </Col>
          <Col flex="none">
            <a style={linkStyle} href="#">
              Movies
            </a>
          </Col>
          <Col flex="none">
            <a style={linkStyle} href="#">
              Series
            </a>
          </Col>
          <Col flex="none">
            <a style={linkStyle} href="#">
              Animation
            </a>
          </Col>
          <Col flex="none">
            <a style={linkStyle} href="#">
              Login/SignUp
            </a>
          </Col>
        </Row>
      </div>
  );
}
