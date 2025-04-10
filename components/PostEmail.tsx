import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Row,
  Section,
  Text,
} from "@react-email/components";
import { Tailwind } from "@react-email/tailwind";
import * as React from "react";

type EmailProps = {
  links?: string;
};

export const PostEmail = ({ links }: EmailProps) => {
  return (
    <Html>
      <Head />
      <Tailwind
        config={{
          theme: {
            extend: {
              spacing: {
                0: "0px",
                20: "20px",
                45: "45px",
              },
            },
          },
        }}
      >
        <Body className="bg-gray-100 text-base font-sans py-10">
          <Img
            src={`https://res.cloudinary.com/dek61sfoh/image/upload/v1705564118/misc/bjtwdlwiwarrjvgjybct.png`}
            width="150"
            height="150"
            alt="AppreciateYa"
            className="mx-auto my-20"
          />
          <Container className="bg-white p-45 rounded-sm">
            <Heading className="text-center my-0 leading-8">
              You have received a new kudos
            </Heading>

            <Section>
              <Row>
                <Text className="text-base text-center">
                  You've received kudos from a coworker! This is a shout-out to
                  your hard work and the positive difference you make in our
                  team. Keep up the great work.
                </Text>
              </Row>
            </Section>

            <Section className="text-center">
              <Button
                className="bg-pink-500 text-white rounded-lg py-3 px-[18px]"
                href={links}
              >
                See your kudos
              </Button>
            </Section>

            <Section className="text-center pt-20">
              <Link
                href="https://appreciate-ya.vercel.app"
                className="text-gray-700 font-bold"
              >
                appreciate-ya.vercel.app
              </Link>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default PostEmail;
