import { Center, ProgressCircle } from "@chakra-ui/react";

type LoaderProps = {
  h?: string;
  w?: string;
};

export const Loader = ({ h, w }: LoaderProps) => {
  return (
    <Center w="100%" h="100%">
      <ProgressCircle.Root h={h} w={w} value={null} size="sm">
        <ProgressCircle.Circle css={{ "--thickness": "3px" }}>
          <ProgressCircle.Track />
          <ProgressCircle.Range stroke="orange" />
        </ProgressCircle.Circle>
      </ProgressCircle.Root>
    </Center>
  );
};
