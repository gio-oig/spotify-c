import NextImage from "next/image";

import { Box, Flex } from "@chakra-ui/layout";
import { Button, Input } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { FC, SyntheticEvent, useState } from "react";
import { auth } from "../lib/mutations";

export type AuthMode = "signin" | "signup";

type AuthFormProps = {
  mode: AuthMode;
};

const AuthForm: FC<AuthFormProps> = ({ mode }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    setIsLoading(true);

    await auth(mode, { email, password });
    setIsLoading(false);
    router.push("/");
  };

  return (
    <Box height="100vh" width="100vw" bg="black" color="white">
      <Flex height="100px" justifyContent="center" alignItems="center">
        <NextImage src="/logo.svg" width={120} height={60} />
      </Flex>
      <Flex
        height="calc(100vh - 100px)"
        justifyContent="center"
        alignItems="center"
      >
        <Box padding="50px" bg="gray.900" borderRadius="6px">
          <form onSubmit={onSubmit}>
            <Input
              placeholder="Email"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              placeholder="Password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit" variant="auth" isLoading={isLoading}>
              {mode}
            </Button>
          </form>
        </Box>
      </Flex>
    </Box>
  );
};

export default AuthForm;
