import React, { useState } from "react";
import Table, { TableProps } from "@awsui/components-react/table";
import Header from "@awsui/components-react/header";
import Button from "@awsui/components-react/button";
import ButtonDropdown from "@awsui/components-react/button-dropdown";
import SpaceBetween from "@awsui/components-react/space-between";
import Box from "@awsui/components-react/box";
import TextFilter from "@awsui/components-react/text-filter";
import Pagination from "@awsui/components-react/pagination";
import Link from "@awsui/components-react/link";
import { Repository } from "../types";

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

export default RepositoriesTable;
