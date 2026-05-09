// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useState } from "react";
import AppLayout from "@awsui/components-react/app-layout";
import SideNavigation, { SideNavigationProps } from "@awsui/components-react/side-navigation";
import BreadcrumbGroup from "@awsui/components-react/breadcrumb-group";
import Table, { TableProps } from "@awsui/components-react/table";
import Header from "@awsui/components-react/header";
import Button from "@awsui/components-react/button";
import ButtonDropdown from "@awsui/components-react/button-dropdown";
import SpaceBetween from "@awsui/components-react/space-between";
import Box from "@awsui/components-react/box";
import TextFilter from "@awsui/components-react/text-filter";
import Pagination from "@awsui/components-react/pagination";
import Link from "@awsui/components-react/link";

// ---- Types ----

interface Repository {
  name: string;
  description: string;
  lastModified: string;
}

// ---- Static data ----

const REPOSITORIES: Repository[] = [
  { name: "readydoc-ui", description: "-", lastModified: "14 hours ago" },
  { name: "readydoc-api", description: "-", lastModified: "15 hours ago" },
  { name: "digitalform-api", description: "-", lastModified: "3 days ago" },
  { name: "digitalform-ui", description: "-", lastModified: "6 days ago" },
];

const NAV_ITEMS: SideNavigationProps.Item[] = [
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

// ---- ServiceNavigation ----

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

// ---- RepositoriesTable ----

interface RepositoriesTableProps {
  items: Repository[];
  selectedItems: Repository[];
  filterText: string;
  showCloneColumn: boolean;
  onSelectionChange: (items: Repository[]) => void;
  onFilterChange: (text: string) => void;
  onCloneUrlSelect: () => void;
}

function RepositoriesTable({
  items,
  selectedItems,
  filterText,
  showCloneColumn,
  onSelectionChange,
  onFilterChange,
  onCloneUrlSelect,
}: RepositoriesTableProps) {
  const hasSelection = selectedItems.length === 1;
  const [sortingColumn, setSortingColumn] = useState<TableProps.SortingColumn<Repository> | undefined>(undefined);
  const [sortingDescending, setSortingDescending] = useState(false);

  const baseColumns: TableProps.ColumnDefinition<Repository>[] = [
    {
      id: "name",
      header: "Name",
      cell: (item) => <Link href={`#/${item.name}`}>{item.name}</Link>,
      sortingField: "name",
      width: 300,
    },
    {
      id: "description",
      header: "Description",
      cell: (item) => item.description,
      width: 300,
    },
    {
      id: "lastModified",
      header: "Last modified",
      cell: (item) => item.lastModified,
    },
  ];

  const cloneUrlColumn: TableProps.ColumnDefinition<Repository> = {
    id: "cloneUrl",
    header: "Clone URL",
    cell: (item) => (
      <SpaceBetween direction="horizontal" size="xs">
        <Link href={`https://git-codecommit.us-east-1.amazonaws.com/v1/repos/${item.name}`} external>
          HTTPS
        </Link>
        <Link href={`ssh://git-codecommit.us-east-1.amazonaws.com/v1/repos/${item.name}`} external>
          SSH
        </Link>
        <Link href={`codecommit::us-east-1://${item.name}`} external>
          HTTPS (GRC)
        </Link>
      </SpaceBetween>
    ),
  };

  const columnDefinitions = showCloneColumn ? [...baseColumns, cloneUrlColumn] : baseColumns;

  return (
    <Table
      columnDefinitions={columnDefinitions}
      items={items}
      selectionType="single"
      selectedItems={selectedItems}
      onSelectionChange={({ detail }) => onSelectionChange(detail.selectedItems)}
      sortingColumn={sortingColumn}
      sortingDescending={sortingDescending}
      onSortingChange={({ detail }) => {
        setSortingColumn(detail.sortingColumn);
        setSortingDescending(detail.isDescending ?? false);
      }}
      header={
        <Header
          variant="h2"
          info={<Link variant="info">Info</Link>}
          actions={
            <SpaceBetween direction="horizontal" size="xs">
              <Button iconName="refresh" ariaLabel="Refresh" />
              <ButtonDropdown
                disabled={!hasSelection}
                items={[
                  { id: "create-rule", text: "Create notification rule" },
                  { id: "view-rules", text: "View notification rules" },
                ]}
              >
                Notify
              </ButtonDropdown>
              <ButtonDropdown
                disabled={!hasSelection}
                items={[
                  { id: "clone-https", text: "Clone HTTPS" },
                  { id: "clone-ssh", text: "Clone SSH" },
                  { id: "clone-https-grc", text: "Clone HTTPS (GRC)" },
                  { id: "connection-steps", text: "Connection steps" },
                ]}
                onItemClick={onCloneUrlSelect}
              >
                Clone URL
              </ButtonDropdown>
              <Button disabled={!hasSelection}>View repository</Button>
              <Button disabled={!hasSelection}>Delete repository</Button>
              <Button variant="primary">Create repository</Button>
            </SpaceBetween>
          }
        >
          Repositories
        </Header>
      }
      filter={
        <TextFilter
          filteringText={filterText}
          filteringPlaceholder="Find repository"
          filteringAriaLabel="Filter repositories"
          onChange={({ detail }) => onFilterChange(detail.filteringText)}
        />
      }
      pagination={<Pagination currentPageIndex={1} pagesCount={1} />}
      empty={
        <Box textAlign="center" color="inherit">
          <b>No repositories</b>
          <Box padding={{ bottom: "s" }} variant="p" color="inherit">
            No repositories match your search.
          </Box>
        </Box>
      }
    />
  );
}

// ---- App ----

function App() {
  const [navigationOpen, setNavigationOpen] = useState(true);
  const [activeHref, setActiveHref] = useState("#/repositories");
  const [selectedItems, setSelectedItems] = useState<Repository[]>([]);
  const [filterText, setFilterText] = useState("");
  const [showCloneColumn, setShowCloneColumn] = useState(false);

  const filteredItems = REPOSITORIES.filter((repo) =>
    repo.name.toLowerCase().includes(filterText.toLowerCase())
  );

  return (
    <AppLayout
      navigationOpen={navigationOpen}
      onNavigationChange={({ detail }) => setNavigationOpen(detail.open)}
      toolsHide
      navigation={
        <ServiceNavigation
          activeHref={activeHref}
          onFollow={(e) => {
            e.preventDefault();
            setActiveHref(e.detail.href);
          }}
        />
      }
      breadcrumbs={
        <BreadcrumbGroup
          items={[
            { text: "Developer Tools", href: "#" },
            { text: "CodeCommit", href: "#/codecommit" },
            { text: "Repositories", href: "#/repositories" },
          ]}
          ariaLabel="Breadcrumbs"
        />
      }
      ariaLabels={{
        navigation: "Developer Tools",
        navigationClose: "Close navigation",
        navigationToggle: "Open navigation",
        notifications: "Notifications",
        tools: "Help panel",
        toolsClose: "Close help panel",
        toolsToggle: "Open help panel",
      }}
      content={
        <RepositoriesTable
          items={filteredItems}
          selectedItems={selectedItems}
          filterText={filterText}
          showCloneColumn={showCloneColumn}
          onSelectionChange={setSelectedItems}
          onFilterChange={setFilterText}
          onCloneUrlSelect={() => setShowCloneColumn(true)}
        />
      }
    />
  );
}

export default App;
