import { Box, Flex, Text } from "@chakra-ui/layout";
import { Img } from "@chakra-ui/react";

const GradientLayout = ({
  color,
  children,
  image,
  subititle,
  title,
  description,
  roundImage,
}) => {
  return (
    <Box
      height="100%"
      overflow="auto"
      bgGradient={`linear(${color}.500 0%, ${color}.600 15%, ${color}.700 40%, rgba(0, 0, 0, 0.95) 75%)`}
    >
      <Flex bg={`${color}.600`} padding="40px" mb="20px" align="end">
        <Box padding="20px">
          <Img
            boxSize="160px"
            boxShadow="2xl"
            src={image}
            borderRadius={roundImage ? "100%" : "3px"}
          />
        </Box>
        <Box padding="20px" lineHeight="40px" color="white">
          <Text fontSize="x-small" fontWeight="bold" casing="uppercase">
            {subititle}
          </Text>
          <Text fontSize="6xl">{title}</Text>
          <Text fontSize="x-small">
            {description}
          </Text>
        </Box>
      </Flex>
      {children}
    </Box>
  );
};

export default GradientLayout;
