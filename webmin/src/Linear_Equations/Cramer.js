import React,{Component} from "react";
import { Layout, Menu, Breadcrumb } from 'antd';
import "../App.css";
import {Link} from "react-router-dom"
import { Input } from 'antd';
import { Typography } from 'antd';
import axios from 'axios';
//import { parse } from 'mathjs';
import { Button ,Cascader} from 'antd';
import { Table} from 'antd';

const { Title } = Typography;
const { Text } = Typography;
const {Footer, Sider } = Layout;
const { SubMenu } = Menu;

export default class Cramer extends Component{
 
  state = {
    collapsed: false,
  };

  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  constructor(props)
  {
      super(props);
      this.state={
          options:[],
          Eq :null,
          xlValue:null,
          xrValue :null,
          result :null

      }
    }

   
  LinearCramer = () =>{
    const formData = new FormData();
    formData.append("_name",this.state.Eq);
    formData.append("_type","Cramer");
    formData.append("_diff","");
    const config = {
      headers: {
          "content-type": "multipart/form-data"
          }
      };
   
    axios.post('http://localhost/numer/Webnumer/webmin/src/add.php',formData,config)
    .then(res=>{
      console.log(res);
    })
    .catch(err=>{
       throw err 
    })
  }
  showResult=()=>{
    const columns = [
      {
        title: 'No',
        dataIndex: 'index',
        key: 'index',
      },
      {
        title: 'XL',
        dataIndex: 'xl',
        key: 'xl',
      },
      {
        title: 'XR',
        dataIndex: 'xr',
        key: 'xr',
      },
      {
        title: 'XM',
        dataIndex: 'xm',
        key: 'xm',
      },
      {
        title: 'Error',
        dataIndex: 'errorvalue',
        key: 'errorvalue',
      },
    ];
    if(this.state.result!==null)
    {
      return <div>
        <h4>This is Result of  : {this.state.result}</h4><br/>
        <Table dataSource={this.state.dataTable} columns={columns} rowKey="Index" style={{marginLeft:"5%" , marginRight:"5%" , background:"lightblue" }} size="middle"/>
      </div>

    }
  }
onChange = (value) => {
  console.log(value[0]);
  this.setState({
    Eq:value[0]
  })
}
displayRender = (label) => {
  return label[label.length - 1];
}

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
                <Breadcrumb.Item><Title><Text type="danger">Cramer</Text></Title></Breadcrumb.Item>
 
                </Breadcrumb>
                <div className="site-layout-background" style={{ padding: 24, minHeight: 500 }}>
                <Cascader
                  options={this.state.options}
                  expandTrigger="hover"
                  displayRender={this.displayRender}
                  onChange={this.onChange}
                  style={{width:"13em" , marginLeft:"7%" , marginRight:"5%" , marginBottom:"0.5%"}}
                />
                <Input placeholder="Input Equations" style={{width:"13em" , marginLeft:"7%" , marginRight:"5%" , marginBottom:"0.5%"}} onChange={e=>this.setState({Eq:e.target.value})}/>
                  

                  <Input placeholder="xl" style={{width:300}} onChange={e=>this.setState({xlValue:e.target.value})}/> 
                  <br /><br />
                            <Input placeholder="xr" style={{width:300}} onChange={e=>this.setState({xrValue:e.target.value})}/>
                            <p>
                            <br /><br />
                            <Button onClick={this.getValue}>Submit</Button>
                            </p>
                  <br /><br />
          {this.showResult()}
                </div>
                
              <Footer style={{ textAlign: 'right' }}><Link to="/Home"><Button>home</Button></Link></Footer>
            </Layout>
          </Layout>
        );
      }
    }