import {
  Breadcrumb,
  Button,
  Checkbox,
  Form,
  Input,
  Spin,
  Typography,
} from "antd";
import { ReactNode } from "react";

import classes from "./view-users-id.module.css";

type updateUserData = {
  firstName: string;
  lastName: string;
  isAdmin: boolean;
  isSuperAdmin: boolean;
  isManager: boolean;
};

interface ViewUsersIdProps {
  loading: boolean;
  breadcrumbItems: { title: ReactNode }[];
  isSuperAdmin: boolean;
  isAdmin: boolean;

  data?: {
    key: string;
    email: string;
    createdAt: string;
    lastSignInAt: string | null;
    firstName: string | null;
    isSuperAdmin: boolean;
    isAdmin: boolean;
    isManager: boolean;
    lastName: string | null;
  } | null;

  onFinish: (data: updateUserData) => void;
}

export const ViewUsersId = (props: ViewUsersIdProps) => {
  const { breadcrumbItems, isSuperAdmin, isAdmin, data, loading, onFinish } =
    props;

  const [form] = Form.useForm();

  return (
    <div className={classes.viewUsersById}>
      <Breadcrumb items={breadcrumbItems} className={classes.breadcrumb} />
      <Typography.Title
        level={3}
        style={{ margin: "1em 0", textAlign: "center" }}
      >
        Редактирование информации о пользователе {data?.email}
      </Typography.Title>
      {loading && (
        <div className={classes.spin}>
          <Spin tip="Loading" size="large"></Spin>
        </div>
      )}
      {data && !loading && (
        <Form
          form={form}
          onFinish={onFinish}
          autoComplete="off"
          className={classes.form}
          initialValues={data}
        >
          <Form.Item label="Имя" name="firstName">
            <Input placeholder="Имя" />
          </Form.Item>
          <Form.Item label="Фамилия" name="lastName">
            <Input placeholder="Фамилия" />
          </Form.Item>
          {isSuperAdmin && (
            <Form.Item label="Роль суперпользователя" name="isSuperAdmin">
              <Checkbox
                defaultChecked={data.isSuperAdmin}
                onChange={(e) =>
                  form.setFieldsValue({ isSuperAdmin: e.target.checked })
                }
              />
            </Form.Item>
          )}
          {isSuperAdmin && (
            <Form.Item label="Роль админа" name="isAdmin">
              <Checkbox
                defaultChecked={data.isAdmin}
                onChange={(e) =>
                  form.setFieldsValue({ isAdmin: e.target.checked })
                }
              />
            </Form.Item>
          )}
          {(isAdmin || isSuperAdmin) && (
            <Form.Item label="Роль менеджера" name="isManager">
              <Checkbox
                defaultChecked={data.isManager}
                onChange={(e) =>
                  form.setFieldsValue({ isManager: e.target.checked })
                }
              />
            </Form.Item>
          )}
          <Form.Item>
            <Button htmlType="submit" type="primary">
              Сохранить
            </Button>
          </Form.Item>
        </Form>
      )}
    </div>
  );
};
