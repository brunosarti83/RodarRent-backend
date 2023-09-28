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

const BookingCancelation = (props) => {
  const {
    bookingId,
    startDate,
    finishDate,
    pickUpLocation,
    returnLocation,
    customer,
  } = props;
  const formattedStartDate = new Date(startDate).toLocaleDateString();
  const formattedFinishDate = new Date(finishDate).toLocaleDateString();
  return (
    <Html>
      <Head></Head>
      <Preview>
        Hi,👋 this is a booking cancelation confirmation from RodarRent🚗
      </Preview>
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
              <Heading className="text-2xl pt-4">Booking Cancelation</Heading>
              <Container className="text-justify leading-7 px-4">
                <Container className="p-2 bg-rose-200 rounded-md my-2 text-center w-[40ch] mb-4">
                  <text className="text-sm text-black">Booking code :</text>
                  <br></br>
                  <text>{bookingId}</text>
                </Container>
                <Row className="w-full text-justify">
                  <text>
                    The following reservation has been canceled by you. If it
                    was not your intention to cancel this reservation please
                    contact us and we will be happy to help you.
                  </text>
                </Row>
                <Row className="mt-8 ml-6">
                  <Column className="w-[50%]">
                    <text className="font-bold">Pick Up :</text>
                    <text className="ml-10">{formattedStartDate}</text>
                    <br></br>
                    <text>{pickUpLocation.alias}</text>
                    <br></br>
                    <text>{pickUpLocation.address}</text>
                    <br></br>
                    <text>City: {pickUpLocation.city}</text>
                    <br></br>
                    <br></br>
                    <text className="font-bold">Return :</text>
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
                    <text>ID:{customer.personalId}</text>
                    <br></br>
                    <text>Email: {customer.email}</text>
                    <br></br>
                    <br></br>
                    <text className="text-sm font-semibold">
                      Do you want to keep this reservation?
                    </text>
                    <br></br>
                    <Container className="text-md font-semibold font-sans text-slate-500">
                      <text>rodarrentadm@outlook.com</text>
                      <br></br>
                      <text>+54 9 11 4357559</text>
                    </Container>
                  </Column>
                </Row>
              </Container>
              <br></br>
              <hr></hr>
              <br></br>
              <text>Greetings,</text>
              <br></br>
              <br></br>
              <text>Bruno Sarti</text>
              <br></br>
              <text className="text-sm">
                CEO - Cancelations Empowered Operator
              </text>
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

module.exports = { BookingCancelation };
