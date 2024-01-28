import { socialIcons } from "@/shared/data";
import { trans } from "@mongez/localization";
import Image from "next/image";
import Link from "next/link";
import { PropertyAgent } from "../../utils/types";
import PropertyAgentFrom from "./PropertyAgentFrom";

type AgentInformationSectionProps = {
  agent: PropertyAgent;
  propertyId: number;
};

export default function AgentInformationSection({
  agent,
  propertyId,
}: AgentInformationSectionProps) {
  return (
    <div className="flex flex-col gap-12 lg:w-1/2">
      <div className="border-primary-whiteLight w-full overflow-hidden rounded-lg border border-solid bg-[#FBFBFB] sm:min-w-[400px]">
        <div className="bg-primary-main bg-opacity-[0.02] p-[26px] font-medium">
          <p className="opacity-100">{trans("agentInformation")}</p>
        </div>
        <div className="flex flex-col items-start gap-12 p-7">
          <div className="flex items-center gap-3">
            <Image
              src={agent.image?.url || "/assets/images/avatar.png"}
              alt="agent image"
              width={62}
              height={62}
              className="rounded-full"
            />
            <p className="text-xs font-semibold sm:text-base">{agent?.name}</p>
          </div>
          {agent?.social && (
            <div className="space-y-6">
              <div className="font-medium capitalize">{trans("followUs")}</div>
              <div className="flex items-center gap-4">
                {Object.entries(agent?.social || {}).map(
                  (entry: [string, string], index) => {
                    const [key, value] = entry;
                    const Icon = socialIcons[key];

                    return (
                      <Link
                        key={index}
                        href={value}
                        className="text-primary-main transition-colors hover:text-primary-white">
                        <Icon className="h-8 w-8" />
                      </Link>
                    );
                  }
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      <PropertyAgentFrom propertyId={propertyId} />
    </div>
  );
}
