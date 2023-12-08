import { Breadcrumb, Table } from "antd";
import { ReactNode } from "react";
import { Input } from "antd";

const { Search } = Input;

import classes from "./view-users.module.css";

interface ViewUsersProps {
  tableDataLoading: boolean;
  breadcrumbItems: { title: ReactNode }[];
  tableColumns: {
    title: string;
    dataIndex: string;
    key: string;
  }[];

  tableData?: {
    key: string;
    email: string;
    createdAt: string;
    lastSignInAt: string | null;
    firstName: string | null;
    lastName: string | null;
  }[];
  onSearch: (value: string) => void;
}

export const ViewUsers = (props: ViewUsersProps) => {
  const {
    breadcrumbItems,
    tableData,
    tableColumns,
    tableDataLoading,
    onSearch,
  } = props;

  return (
    <div className={classes.viewUsers}>
      <Breadcrumb items={breadcrumbItems} className={classes.breadcrumb} />
      <Search
        placeholder="Введите поисковый запрос..."
        onSearch={onSearch}
        style={{ width: 400 }}
        size="large"
        className={classes.search}
      />
      <Table
        dataSource={tableData}
        columns={tableColumns}
        loading={tableDataLoading}
      />
    </div>
  );
};
