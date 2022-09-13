import { Box } from "@chakra-ui/layout";

const CardWrapper = ({ children }) => {
  return (
    <Box bg="gray.900" p="15px" borderRadius="5px">
      {children}
    </Box>
  );
};

export default CardWrapper;
