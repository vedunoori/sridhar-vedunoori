// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useState } from "react";
import AppLayout from "@awsui/components-react/app-layout";
import BreadcrumbGroup from "@awsui/components-react/breadcrumb-group";
import { Repository } from "./types";
import { REPOSITORIES } from "./constants/navigation";
import ServiceNavigation from "./components/ServiceNavigation";
import RepositoriesTable from "./components/RepositoriesTable";

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
