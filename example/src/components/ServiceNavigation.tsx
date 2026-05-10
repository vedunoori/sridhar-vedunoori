import React from "react";
import SideNavigation, { SideNavigationProps } from "@awsui/components-react/side-navigation";
import Box from "@awsui/components-react/box";
import { NAV_ITEMS } from "../constants/navigation";

interface ServiceNavigationProps {
  activeHref: string;
  onFollow: (e: CustomEvent<SideNavigationProps.FollowDetail>) => void;
}

function ServiceNavigation({ activeHref, onFollow }: ServiceNavigationProps) {
  return (
    <>
      <Box padding={{ top: "s", horizontal: "l" }}>
        <Box variant="small" color="text-body-secondary">
          Developer Tools
        </Box>
        <Box variant="h3" padding={{ bottom: "s" }}>
          CodeCommit
        </Box>
      </Box>
      <SideNavigation activeHref={activeHref} onFollow={onFollow} items={NAV_ITEMS} />
    </>
  );
}

export default ServiceNavigation;
