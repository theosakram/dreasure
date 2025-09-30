import { ProgressCircle } from "@chakra-ui/react";

type LoaderProps = {
  h?: string;
  w?: string;
};

export const Loader = ({ h, w }: LoaderProps) => {
  return (
    <ProgressCircle.Root h={h} w={w} value={null} size="sm">
      <ProgressCircle.Circle>
        <ProgressCircle.Track />
        <ProgressCircle.Range />
      </ProgressCircle.Circle>
    </ProgressCircle.Root>
  );
};
