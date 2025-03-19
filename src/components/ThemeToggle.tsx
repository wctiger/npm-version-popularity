import { useState } from "react";
import { Button, Dropdown, Space } from "antd";
import {
  SunOutlined,
  MoonOutlined,
  SettingOutlined,
  DownOutlined,
} from "@ant-design/icons";
import { useTheme } from "../contexts/ThemeContext";

const ThemeToggle: React.FC = () => {
  const { themeMode, setThemeMode } = useTheme();
  const [open, setOpen] = useState(false);

  const items = [
    {
      key: "light",
      label: (
        <Space>
          <SunOutlined />
          Light
        </Space>
      ),
    },
    {
      key: "dark",
      label: (
        <Space>
          <MoonOutlined />
          Dark
        </Space>
      ),
    },
    {
      key: "system",
      label: (
        <Space>
          <SettingOutlined />
          System
        </Space>
      ),
    },
  ];

  const handleMenuClick = ({ key }: { key: string }) => {
    setThemeMode(key as "light" | "dark" | "system");
    setOpen(false);
  };

  const themeIcons = {
    light: <SunOutlined />,
    dark: <MoonOutlined />,
    system: <SettingOutlined />,
  };

  const themeLabels = {
    light: "Light",
    dark: "Dark",
    system: "System",
  };

  return (
    <Dropdown
      menu={{
        items,
        onClick: handleMenuClick,
        selectable: true,
        selectedKeys: [themeMode],
      }}
      trigger={["click"]}
      onOpenChange={setOpen}
      open={open}
    >
      <Button>
        <Space>
          {themeIcons[themeMode]}
          {themeLabels[themeMode]}
          <DownOutlined />
        </Space>
      </Button>
    </Dropdown>
  );
};

export default ThemeToggle;
