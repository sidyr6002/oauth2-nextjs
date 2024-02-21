import React from "react";
import {
    Html,
    Head,
    Preview,
    Body,
    Container,
    Heading,
    Text,
    Section,
} from "@react-email/components";
import { Tailwind } from "@react-email/tailwind";

interface TwoFactorTokenTemplateProps {
    token: string;
}
const TwoFactorTokenTemplate = ({ token }: TwoFactorTokenTemplateProps) => {
    return (
        <Html>
            <Head />
            <Preview>Two Factor Auth Code</Preview>
            <Body>
                <Tailwind>
                    <Container className="bg-white flex flex-col items-center px-auto py-4">
                        <Heading className="text-center">
                            Two Factor Token
                        </Heading>
                        <Section className="flex items-center justify-center fit-content bg-gray-400/30 rounded-md">
                            <Text className="text-3xl tracking-widest mx-auto text-center w-full">
                                {token}
                            </Text>
                        </Section>
                    </Container>
                </Tailwind>
            </Body>
        </Html>
    );
};

export default TwoFactorTokenTemplate;
