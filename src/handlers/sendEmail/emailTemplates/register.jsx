const { Body } = require("@react-email/body");
const { Html } = require("@react-email/html");
const { Container } = require("@react-email/container");
const { Tailwind } = require("@react-email/tailwind");
const { Img } = require("@react-email/img");
const { Head } = require("@react-email/head");
const { Heading } = require("@react-email/heading");
const { Section } = require("@react-email/section");
const { Preview } = require("@react-email/preview");
const React = require("react");

export function Register(props) {
  const { userName } = props;
  return (
    <Html>
      <Head></Head>
      <Preview>Welcome to Rodarrent, your go-to destination for hassle-free car rentals!</Preview>
      <Tailwind>
        <Body className="bg-white my-auto mx-auto font-sans">
          <Container className="border border-solid border-gray-700 rounded my-[40px] mx-auto p-[20px] w-[800px]">
            <Section className="my-2">
              <Img
                src="https://res.cloudinary.com/daiztctac/image/upload/v1695162535/orub7adtcasfrs2jtpil.png"
                className="w-[200px] mx-auto"
              ></Img>
            </Section>
            <Section className="my-2">
              <Heading className="text-xl pt-4">Dear {userName},</Heading>
              <Container className="text-justify leading-7 px-4">
                <text>
                  Welcome to Rodarrent, your go-to destination for hassle-free
                  car rentals!
                </text>
                <br></br>
                <text>
                  We're excited to have you on board and look forward to
                  providing you with a seamless and enjoyable car rental
                  experience.
                </text>
                <br></br>
                <br></br>
                <text>With Rodarrent, you'll enjoy:</text>
                <br></br>
                <text>🚘 A wide selection of vehicles.</text>
                <br></br>
                <text>🚘 Easy and convenient booking.</text>
                <br></br>
                <text>🚘 Competitive pricing.</text>
                <br></br>
                <text>🚘 24/7 customer support.</text>
                <br></br>
                <br></br>
                <text>
                  To get started, log in to your Rodarrent account and find the
                  perfect vehicle for your needs. If you have any questions or
                  need assistance, our customer support team is here to help at
                </text>
                <br></br>
                <text className="font-bold">rodarrentadm@outlook.com </text>
                <text> or </text>
                <text className="font-bold"> +54 9 11 4357559</text>
                <br></br>
                <br></br>
                <text>
                  Thank you for choosing Rodarrent. We can't wait to serve you
                  on your upcoming journeys!
                </text>
              </Container>
              <br></br>
              <text>Safe travels,</text>
              <br></br>
              <br></br>
              <text>Bruno Sarti</text>
              <br></br>
              <text className="text-sm">
                Welcoming Sub-Executive Director Junior
              </text>
              <br></br>
              <text className="font-bold text-slate-500">Rodarrent</text>
            </Section>
            <Section>
              <Img
                src="https://res.cloudinary.com/daiztctac/image/upload/v1695164132/hlymodjqbjwl8tv2hfyz.png"
                className="w-full"
              ></Img>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
