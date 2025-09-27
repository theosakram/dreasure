import { Icon, Timeline } from "@chakra-ui/react";
import dayjs from "dayjs";
import { ReactNode } from "react";
import { LuMinus, LuPlus } from "react-icons/lu";

type TimelineEvent = {
  title: ReactNode;
  date: string;
  amount: number;
  id: string | number;
  type: "deposit" | "withdrawal";
};

type MemberTransactionTimelineProps = {
  timelines: TimelineEvent[];
};

export const MemberTransactionTimeline = ({
  timelines,
}: MemberTransactionTimelineProps) => {
  return (
    <Timeline.Root maxW="400px">
      {timelines.map((e) => (
        <Timeline.Item key={e.id}>
          <Timeline.Connector>
            <Timeline.Separator />
            <Timeline.Indicator
              bg={e.type === "deposit" ? "teal.solid" : "red.solid"}
              color={e.type === "deposit" ? "teal.contrast" : "red.contrast"}
            >
              <Icon fontSize="xs">
                {e.type === "deposit" ? <LuPlus /> : <LuMinus />}
              </Icon>
            </Timeline.Indicator>
          </Timeline.Connector>
          <Timeline.Content>
            <Timeline.Title>{e.title}</Timeline.Title>
            <Timeline.Description>
              {dayjs(e.date).format("DD/MM/YYYY HH:mm")}
            </Timeline.Description>
          </Timeline.Content>
        </Timeline.Item>
      ))}
    </Timeline.Root>
  );
};
