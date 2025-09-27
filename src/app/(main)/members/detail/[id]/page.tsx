"use client";

import { MemberTransactionTimeline } from "@/components/containers/MemberTransactionTimeline";
import { useGetProfileById } from "@/features/profiles/profileHooks";
import { Span } from "@chakra-ui/react";
import { useParams } from "next/navigation";

const MembersDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data } = useGetProfileById(id);

  return (
    <div>
      <MemberTransactionTimeline
        timelines={
          data?.transactions.map((d) => ({
            amount: d.amount,
            date: d.created_at,
            type: d.type,
            title: (
              <>
                {d.type === "deposit" ? "Setor" : "Tarik"}{" "}
                <Span color="fg.info">
                  {d.amount.toLocaleString("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  })}
                </Span>
                {d.description && (
                  <>
                    {" "}
                    untuk <Span color="fg.info">{d.description}</Span>
                  </>
                )}
              </>
            ),
            id: d.id,
            description: d.description,
          })) || []
        }
      />
    </div>
  );
};

export default MembersDetailPage;
