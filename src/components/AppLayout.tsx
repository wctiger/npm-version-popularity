import React from "react";
import { Layout, Typography, Button } from "antd";
import { GithubOutlined } from "@ant-design/icons";
import ThemeToggle from "./ThemeToggle";

const { Header, Content, Footer } = Layout;
const { Link } = Typography;

interface AppLayoutProps {
  children: React.ReactNode;
  onLogoClick: () => void;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children, onLogoClick }) => {
  return (
    <Layout style={{ width: "100%", minHeight: "100vh" }}>
      <Header className="app-header">
        <Link
          className="app-logo"
          onClick={onLogoClick}
          style={{ color: "white", cursor: "pointer" }}
        >
          NPM Version Popularity
        </Link>
        <ThemeToggle />
      </Header>
      <Content className="app-content">
        <div className="app-container">{children}</div>
      </Content>
      <Footer className="app-footer">
        <div className="footer-content">
          <span>NPM Version Popularity ©{new Date().getFullYear()}</span>
          <Button
            type="link"
            href="https://github.com/wctiger/npm-version-popularity"
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontSize: "14px" }}
            icon={<GithubOutlined />}
            aria-label="View on GitHub"
          >
            View on GitHub
          </Button>
        </div>
      </Footer>
    </Layout>
  );
};

export default AppLayout;
