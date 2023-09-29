const React = require('react');
const { Body } = require('@react-email/body');
const { Html } = require('@react-email/html');
const { Container } = require('@react-email/container');
const { Tailwind } = require('@react-email/tailwind');
const { Img } = require('@react-email/img');
const { Head } = require('@react-email/head');
const { Section } = require('@react-email/section');
const { Preview } = require('@react-email/preview');

export function ResetPassword (props) {
  const {userName, text} = props
  return (
    <Html>
      <Head />
      <Preview>Password reset</Preview>
      <Tailwind>
        <Body className="bg-white my-auto mx-auto font-sans">
          <Container className="border border-solid border-gray-700 rounded my-[40px] mx-auto p-[20px] w-[800px]">
            <Section className="my-2">
              <Img
                src="https://res.cloudinary.com/daiztctac/image/upload/v1695162535/orub7adtcasfrs2jtpil.png"
                className="w-[200px] mx-auto"
              ></Img>
            </Section>
            <Section className="text-center">
              <text className="text-left text-lg font-medium">Hi, {userName}.</text>
              <br></br>
              <text className="text-center text-md">
                This is an auto generated email, this is your new password for
                RodarRent,
              </text>
              <br></br>
              <text className="text-center text-md">
                we strongly suggest you change this password as soon as
                possible.
              </text>
              <br></br>
              <Container className="p-4 bg-gray-200 rounded-sm my-4 text-center">
                {text}
              </Container>
              <Section className="text-center text-md mx-auto">
                <text className="text-center text-md mx-auto">
                  If you didn't ask for a new password then please ignore this
                  email.
                </text>
              </Section>
              <br></br>
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
};
