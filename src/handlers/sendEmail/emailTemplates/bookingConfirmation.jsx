const { Body } = require("@react-email/body");
const { Html } = require("@react-email/html");
const { Container } = require("@react-email/container");
const { Tailwind } = require("@react-email/tailwind");
const { Img } = require("@react-email/img");
const { Head } = require("@react-email/head");
const { Heading } = require("@react-email/heading");
const { Section } = require("@react-email/section");
const { Preview } = require("@react-email/preview");
const { Column } = require("@react-email/column");
const { Row } = require("@react-email/row");
const { Button } = require("@react-email/button");
const React = require("react");

const BookingConfirmation = (props) => {
  const {
    bookingId,
    startDate,
    finishDate,
    pickUpLocation,
    returnLocation,
    vehicle,
    customer,
  } = props;
  const formattedStartDate = new Date(startDate).toLocaleDateString();
  const formattedFinishDate = new Date(finishDate).toLocaleDateString();
  
  return (
    <Html>
      <Head></Head>
      <Preview>Your booking has been confirmed 🏁🚗</Preview>
      <Tailwind>
        <Body className="bg-white my-auto mx-auto font-sans">
          <Container className="border border-solid border-gray-300 rounded my-[40px] mx-auto p-[20px]">
            <Section className="my-2">
              <Img
                src="https://res.cloudinary.com/daiztctac/image/upload/v1695162535/orub7adtcasfrs2jtpil.png"
                className="w-[200px] mx-auto"
              ></Img>
            </Section>
            <Section className="my-2">
              <Heading className="text-2xl pt-4">Booking Confirmation</Heading>
              <Container className="text-justify leading-7 px-4">
                <Container className="p-2 bg-gray-300 rounded-md my-2 text-center w-[40ch]">
                  <text className="text-sm text-black">Booking code: </text>
                  <br></br>
                  <text>{bookingId}</text>
                </Container>
                <Row className="w-[600px] bg-white rounded-2xl shadow-lg mt-4 px-3 py-2">
                  <Column className="w-[50%]">
                    <Img
                      src="https://res.cloudinary.com/daiztctac/image/upload/v1694023585/mjjohf5x89gjx1e5vedp.webp"
                      className="w-[300px] mr-10 align-bottom"
                    ></Img>
                  </Column>
                  <Column className="w-[50%]">
                    <Container className="mt-3">
                      <text className="text-xl font-bold">
                        {vehicle.brand} - {vehicle.model}
                      </text>
                      <br></br>
                      <text>Type: {vehicle.type}</text>
                      <br></br>
                      <text>Transmission: {vehicle.transmission}</text>
                      <br></br>
                      <text>Fuel type: {vehicle.fuel}</text>
                      <br></br>
                      <br></br>
                    </Container>
                  </Column>
                </Row>
                <Row className="mt-8 ml-6">
                  <Column className="w-[50%]">
                    <text className="font-bold">Pick Up: </text>
                    <text className="ml-10">{formattedStartDate}</text>
                    <br></br>
                    <text>{pickUpLocation.alias}</text>
                    <br></br>
                    <text>{pickUpLocation.address}</text>
                    <br></br>
                    <text>City: {pickUpLocation.city}</text>
                    <br></br>
                    <br></br>
                    <text className="font-bold">Return: </text>
                    <text className="ml-10">{formattedFinishDate}</text>
                    <br></br>
                    <text>{returnLocation.alias}</text>
                    <br></br>
                    <text>{returnLocation.address}</text>
                    <br></br>
                    <text>City: {returnLocation.city}</text>
                    <br></br>
                  </Column>
                  <Column className="w-[50%]">
                    <text>First Name: {customer.name}</text>
                    <br></br>
                    <text>Last Name: {customer.lastName}</text>
                    <br></br>
                    <text>ID: {customer.personalId}</text>
                    <br></br>
                    <text>Email: {customer.email}</text>
                    <br></br>
                    <br></br>
                    <text className="text-sm font-semibold">
                      Do you want to edit this reservation?
                    </text>
                    <br></br>
                    <Button
                      href={`http://127.0.0.1:5173/customer/${customer.id}`}
                      className="p-2 w-[150px] rounded bg-blue-400 text-center text-white font-semibold my-3"
                    >
                      My Profile
                    </Button>
                  </Column>
                </Row>
              </Container>
              <br></br>
              <hr></hr>
              <br></br>
              <text>Safe travels,</text>
              <br></br>
              <br></br>
              <text>Bruno Sarti</text>
              <br></br>
              <text className="text-sm">Chief Booking Mailing Officer</text>
              <br></br>
              <text className="font-bold text-slate-500">Rodarrent</text>
            </Section>
            <Row className="w-full h-[80px] bg-slate-700 mt-10"></Row>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

module.exports = { BookingConfirmation };
