const React = require('react');
const { Body } = require('@react-email/body');
const { Html } = require('@react-email/html');
const { Container } = require('@react-email/container');
const { Tailwind } = require('@react-email/tailwind');
const { Img } = require('@react-email/img');
const { Head } = require('@react-email/head');
const { Heading } = require('@react-email/heading');
const { Section } = require('@react-email/section');
const { Preview } = require('@react-email/preview');
const { Button } = require('@react-email/button');

const Review = (props) => {
  const { userName, linkToReview } = props
  
  return (
    <Html>
      <Head />
      <Preview>Your opinion is important for us</Preview>
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
                  We hope this email finds you well. At RodarRent, 
                  we are constantly striving to provide exceptional car rental experiences 
                  to our valued customers. 
                </text>
                <br></br>
                <text>
                  Your recent rental with us is important to us, 
                  and we would greatly appreciate your feedback to help us 
                  improve our services further.
                </text>
                <br></br>
                <Container className="text-center p-2 shadow-md rounded-md bg-white">
                  ⭐⭐⭐⭐⭐
                </Container>
                <text>
                  Your opinion matters, and sharing your thoughts with us will not only assist us 
                  in maintaining our high standards but also allow us to enhance your future experiences with us. 
                  Taking just a few moments to share your feedback is a valuable contribution to our ongoing 
                  efforts to serve you better.
                </text>
                <br></br>
                <br></br>
                <Container className="mx-auto text-center">
                  <Button href={linkToReview}
                    className="rounded-md mx-auto px-3 py-5 bg-slate-400 text-white shadow-md"
                  >Leave your Review !!
                  </Button>
                </Container>
                <br></br>
                <text>
                  Feel free to include any additional comments or suggestions that 
                  you think would help us improve. 
                </text>
                <br></br>
                <text>
                  Thank you for choosing RodarRent for your recent car rental needs. 
                  We look forward to hearing from you and hope to have the pleasure of serving you again in the future.
                </text>
              </Container>
              <br></br>
              <text>Warm regards,</text>
              <br></br>
              <br></br>
              <text>Bruno Sarti</text>
              <br></br>
              <text className="text-sm">
                Review Manager Director for the Americas
              </text>
              <br></br>
              <text className="font-bold text-slate-500">Rodarrent</text>
            </Section>
            <Section>
              <Img
                src="https://res.cloudinary.com/daiztctac/image/upload/v1695325757/napext5ij9pvwx4eeqlj.png"
                className="mx-auto mt-10 w-[80%]"
              ></Img>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

module.exports = {Review};