import { SideNavigationProps } from "@awsui/components-react/side-navigation";
import { Repository } from "../types";

export const REPOSITORIES: Repository[] = [
  { name: "readydoc-ui", description: "-", lastModified: "14 hours ago" },
  { name: "readydoc-api", description: "-", lastModified: "15 hours ago" },
  { name: "digitalform-api", description: "-", lastModified: "3 days ago" },
  { name: "digitalform-ui", description: "-", lastModified: "6 days ago" },
];

export const NAV_ITEMS: SideNavigationProps.Item[] = [
  {
    type: "expandable-link-group",
    text: "Source • CodeCommit",
    href: "#/codecommit",
    defaultExpanded: true,
    items: [
      { type: "link", text: "Getting started", href: "#/getting-started" },
      { type: "link", text: "Repositories", href: "#/repositories" },
      { type: "link", text: "Approval rule templates", href: "#/approval-rule-templates" },
    ],
  },
  { type: "expandable-link-group", text: "Artifacts • CodeArtifact", href: "#/codeartifact", items: [] },
  { type: "expandable-link-group", text: "Build • CodeBuild", href: "#/codebuild", items: [] },
  { type: "expandable-link-group", text: "Deploy • CodeDeploy", href: "#/codedeploy", items: [] },
  { type: "expandable-link-group", text: "Pipeline • CodePipeline", href: "#/codepipeline", items: [] },
  { type: "expandable-link-group", text: "Settings", href: "#/settings", items: [] },
  { type: "divider" },
  { type: "link", text: "Go to resource", href: "#/go-to-resource" },
  { type: "link", text: "Feedback", href: "#/feedback" },
];
