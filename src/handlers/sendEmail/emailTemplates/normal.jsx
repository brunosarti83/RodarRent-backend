const React = require('react');
const { Body } = require('@react-email/body');
const { Html } = require('@react-email/html');
const { Container } = require('@react-email/container');
const { Tailwind } = require('@react-email/tailwind');
const { Img } = require('@react-email/img');
const { Head } = require('@react-email/head');
const { Section } = require('@react-email/section');
const { Preview } = require('@react-email/preview');
const { Heading } = require('@react-email/heading');


export function Normal (props) {
  const {userName, text,subject} = props
  return (
    <Html>
      <Head />
      <Preview>{text}</Preview>
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
              <Heading className="text-xl pt-4">{subject} - {userName}</Heading>
            </Section>
            <Section className="text-left">
              <text className="text-left text-md">
                {text}
              </text>
              <br></br>
            </Section>
            <br></br>
            <br></br>
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
};
