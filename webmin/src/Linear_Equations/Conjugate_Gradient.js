import React,{Component} from "react";
import { Layout, Menu, Breadcrumb } from 'antd';
import "../App.css";
import {Link} from "react-router-dom"
import { Button } from 'antd';
import { Typography } from 'antd';

const { Title } = Typography;
const { Text } = Typography;
const { Footer, Sider } = Layout;
const { SubMenu } = Menu;

export default class Conjugate_Gradient extends Component{

    state = {
      collapsed: false,
    };
    onCollapse = collapsed => {
        console.log(collapsed);
        this.setState({ collapsed });
      };

      render() {
        return (
          <Layout style={{ minHeight: '100vh' }}>
            <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
              <div className="logo" />
              <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
              <SubMenu
                  key="sub1"
                  title={
                    <span>
                      <span>Root of Equations</span>
                    </span>
                  }
                >
                  <Menu.Item key="1"><Link to="/Bisection"/>Bisection</Menu.Item>
                  <Menu.Item key="2"><Link to="/False_Position"/>False Position</Menu.Item>
                  <Menu.Item key="3"><Link to="/One_Point"/>One Point</Menu.Item>
                  <Menu.Item key="4"><Link to="/Newton_Raphson"/>Newton Raphson</Menu.Item>
                  <Menu.Item key="5"><Link to="/Secant"/>Secant</Menu.Item>
                </SubMenu>
                <SubMenu
                  key="sub2"
                  title={
                    <span>
                      
                      <span>Linear Equations</span>
                    </span>
                  }
                >
                <Menu.Item key="6"><Link to="/Cramer"/>Cramer</Menu.Item>
                  <Menu.Item key="7"><Link to="/Guass_Elimination"/>Guass Elimination</Menu.Item>
                  <Menu.Item key="8"><Link to="/Guass_Jordan"/>Guass Jordan</Menu.Item>
                  <Menu.Item key="9"><Link to="/Guass_Seidel"/>Guass Seidel</Menu.Item>
                  <Menu.Item key="10"><Link to="/LU_Decomposition"/>LU Decomposition</Menu.Item>
                  <Menu.Item key="11"><Link to="/Jacobi"/>Jacobi</Menu.Item>
                  <Menu.Item key="12"><Link to="/Cholrsky"/>Cholrsky</Menu.Item>
                  <Menu.Item key="13"><Link to="/Conjugate_Gradient"/>Conjugate Gradient</Menu.Item>
                </SubMenu>
                <SubMenu
                  key="sub3"
                  title={
                    <span>
                      
                      <span>Interpolation</span>
                    </span>
                  }
                >
                  <Menu.Item key="14"><Link to="/Linear_Interpolation"/>Linear Interpolation</Menu.Item>
                  <Menu.Item key="15"><Link to="/Quadratic_Interpolation"/>Quadratic Interpolation</Menu.Item>
                  <Menu.Item key="16"><Link to="/Polynomial_Interpolation"/>Polynomial Interpolation</Menu.Item>
                </SubMenu>
                <SubMenu
                  key="sub4"
                  title={
                    <span>
                      
                      <span>Regession</span>
                    </span>
                  }
                >
                  <Menu.Item key="17"><Link to="/Linear_Regession"/>Linear Interpolation</Menu.Item>
                  <Menu.Item key="18"><Link to="/Quadratic_Regession"/>Quadratic Interpolation</Menu.Item>
                  <Menu.Item key="19"><Link to="/Polynomial_Regession"/>Polynomial Interpolation</Menu.Item>
                </SubMenu>
              </Menu>
            </Sider>
            <Layout className="site-layout">
            
                <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item><Title><Text type="danger">Conjugate Gradient</Text></Title></Breadcrumb.Item>
 
                </Breadcrumb>
                <div className="site-layout-background" style={{ padding: 24, minHeight: 600 }}>
                  test.
                </div>
             
              <Footer style={{ textAlign: 'right' }}><Button>Home</Button></Footer>
            </Layout>
          </Layout>
        );
      }
    }