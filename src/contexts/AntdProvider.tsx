import React from "react";
import { ConfigProvider, theme } from "antd";
import { useTheme } from "./ThemeContext";

const { defaultAlgorithm, darkAlgorithm } = theme;

// Define a vibrant primary color
const primaryColor = "#238636"; // GitHub green

interface AntdProviderProps {
  children: React.ReactNode;
}

export const AntdProvider: React.FC<AntdProviderProps> = ({ children }) => {
  const { isDarkTheme } = useTheme();

  return (
    <ConfigProvider
      theme={{
        algorithm: isDarkTheme ? darkAlgorithm : defaultAlgorithm,
        token: {
          colorPrimary: primaryColor,
        },
        components: {
          Layout: {
            bodyBg: isDarkTheme ? "#000000" : "#f5f5f5",
            headerBg: isDarkTheme ? "#141414" : "#24292F",
            footerBg: isDarkTheme ? "#141414" : "#f0f2f5",
          },
          Button: {
            colorPrimaryHover: isDarkTheme ? "#2EA043" : "#2EA043",
          },
          Progress: {
            colorInfo: primaryColor,
          },
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
};

export default AntdProvider;
