import React, { useState, useEffect } from "react";
import { Container, Col, Form, Button, Card } from "react-bootstrap";
function Otp() {
  const [otp, setOTP] = useState(["", "", "", "", "", ""]);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(5);
  // const [countdown, setCountdown] = useState(10); // 3 minutes in seconds
  // const [resendClicked, setResendClicked] = useState(false);

  const resendOTP = () => {
    setMinutes(0);
    setSeconds(5);
  };

  useEffect(
    () => {
      const interval = setInterval(() => {
        // decrease seconds if greater than 0
        if (seconds > 0) setSeconds(seconds - 1);
        // when seconds reach 0, decrease minutes if greater than 0
        if (seconds === 0) {
          if (minutes === 0) {
            // stop the countdown when both minutes and seconds are 0
            clearInterval(interval);
          } else {
            // reset seconds to 59 and decrease minutes by 1
            setSeconds(59);
            setMinutes(minutes - 1);
          }
        }
      }, 1000);

      // rerun this effect whenever second changes
      return () => clearInterval(interval);
    },
    [seconds],
    [minutes]
  );

  const handleOTPChange = (index, value) => {
    const newOTP = [...otp];
    newOTP[index] = value;
    setOTP(newOTP);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add logic to handle OTP submission
  };

  return (
    <Container
      style={{ marginTop: "200px" }}
      className=" text-center d-flex justify-content-center align-items-center "
    >
      <Col>
        {" "}
        {/* Increase the width of the card */}
        <Card style={{ width: "400px", height: "310px", margin: "auto" }}>
          <Card.Body>
            <Card.Title className="text-center mb-4">
              <h2>
                <strong>Two Step Verification</strong>
              </h2>
            </Card.Title>
            <Card.Subtitle className="text-center mb-4">
              <p>Enter 6 digit OTP sent to the registered email id</p>
            </Card.Subtitle>
            <Form onSubmit={handleSubmit}>
              <div className="d-flex justify-content-center mb-4 ">
                {otp.map((digit, index) => (
                  <Form.Control
                    key={index}
                    type="text"
                    maxLength={1}
                    value={digit}
                    className="outline"
                    onChange={(e) => handleOTPChange(index, e.target.value)}
                    style={{
                      width: "40px",
                      height: "40px",
                      margin: "4px", // Add margin-right to all boxes except the last one
                      //   marginLeft: index === 0 ? "1px" : "0", // Add margin-left to the first box
                      textAlign: "center",
                    }}
                  />
                ))}
              </div>
              <div className="text-center ">
                <Button
                  style={{
                    backgroundColor: "#000000",
                    transition: "background-color 0.3s",
                  }}
                  onMouseEnter={(e) =>
                    (e.target.style.backgroundColor = "#121481")
                  }
                  onMouseLeave={(e) =>
                    (e.target.style.backgroundColor = "#000000")
                  }
                  variant="dark"
                  type="submit"
                >
                  Submit
                </Button>
              </div>
            </Form>
            <div style={{ marginTop: "20px" }}>
              <p
                style={{
                  color: "#121481",
                  fontWeight: "bold",
                }}
              >
                Time Remaining:
                <span>
                  {" "}
                  {minutes < 10 ? `0${minutes}` : minutes}:{" "}
                  {seconds < 10 ? `0${seconds}` : seconds}
                </span>
                <button
                  href="#"
                  disabled={seconds > 0 || minutes > 0}
                  style={{
                    color: seconds > 0 || minutes > 0 ? "#FFFFFF" : "#FF5630",
                    background: "black",
                  }}
                  onClick={resendOTP}
                >
                  Resend OTP
                </button>
              </p>
            </div>
          </Card.Body>
        </Card>
      </Col>
    </Container>
  );
}

export default Otp;