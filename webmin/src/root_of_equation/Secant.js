import React,{Component} from "react";
import { Layout, Menu, Breadcrumb } from 'antd';
import "../App.css";
import {Link} from "react-router-dom"
import { Input } from 'antd';
import { Typography } from 'antd';
import axios from 'axios';
import { parse } from 'mathjs';
import { Button ,Cascader} from 'antd';
import { Table} from 'antd';

const { Title } = Typography;
const { Text } = Typography;
const {Footer, Sider } = Layout;
const { SubMenu } = Menu;

export default class Secant extends Component
{
  constructor(props)
    {
        super(props);
        this.state={
            proptions:[],
            Eq:null,
            Xinitial:null,
            Xinitialminus1:null,
            result:null,
            dataTable:[]
        }
    }

    componentDidMount()
    {
        // axios.get('http://localhost:8080/show_Secant.php')//Docker//
        axios.get('http://localhost:8080/Secant.php')
        .then(res=>{
            console.log(res.data);
            let item =[];
            let optionsArr = [];
            res.data.map(dataMap=>{
                let optionsObj = {};
                if(dataMap._type==="Secant")
                {
                    item = item.concat(dataMap._name);
                    optionsObj.value = dataMap._name;
                    optionsObj.label = dataMap._name;
                    optionsArr.push(optionsObj);
                    console.log(optionsObj);
                }
            })
            this.setState({
                options:optionsArr
            })
        })
    }

    Equet = (EqForSloveFuntion,xvalueforSlove) => {
   
      const NodeEqua = parse(EqForSloveFuntion); 
      const Equa = NodeEqua.compile();     
      let scope = {
          x:xvalueforSlove
      }
      return Equa.eval(scope);
       
  }
  
  err = (xmold, xmnew) => {
      var er = ((Math.abs((xmnew - xmold) / xmnew)) * 100) ;
      return er;
  }
  
  getValue = () => {
      const {Eq,Xinitial,Xinitialminus1} = this.state;
      var xi_inmain = parseFloat(Xinitial);
      var xi_minus1_inmain = parseFloat(Xinitialminus1);
      var xi_plus1;
      var fpx_inmainValue;
      let tableArrData = [];
      var errorValue = 1;
      var fixerrorValue = 0.0001;
      var i=0;
      while(errorValue>=fixerrorValue)
      {
        xi_plus1=xi_inmain-((this.Equet(Eq,xi_inmain)*(xi_minus1_inmain-xi_inmain))/(this.Equet(Eq,xi_minus1_inmain)-this.Equet(Eq,xi_inmain)));
        errorValue=this.err(xi_plus1,xi_inmain);


          let tableObjData = {};
          tableObjData.index = i;
          tableObjData.xi_plus1 = xi_plus1;
          tableObjData.errorValue = errorValue;
          tableArrData.push(tableObjData);
          console.log("Secant XiVALUE = ", xi_plus1);
          console.log("This is errorvalue = ", errorValue);
          console.log("This is fixvalueerror = ", fixerrorValue);
          xi_inmain=xi_plus1;
          i++;
      }
      this.setState({
        dataTable:tableArrData,
        result:xi_plus1
      })
  }
  EquationSecant = () =>{
    const formData = new FormData();
    formData.append("_name",this.state.Eq);
    formData.append("_type","Secant");
    formData.append("_diff","");
    const config = {
      headers: {
          "content-type": "multipart/form-data"
          }
      };
      axios.post('http://localhost:8080/add.php',formData,config)
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
        title: 'X',
        dataIndex: 'xi_plus1',
        key: 'xi_plus1',
      },
      {
        title: 'Error',
        dataIndex: 'errorValue',
        key: 'errorValue',
      },
    ];
    if(this.state.result!==null)
    {
      return <div>
        <h5>This is Result of Secant : {this.state.result}</h5><br/>
        <Table dataSource={this.state.dataTable} columns={columns} rowKey="Index" style={{marginLeft:"5%" , marginRight:"5%" }} size="middle"/>
      </div>

    }
  }

    onChange = (value) => {
      console.log(value[0]);
      this.setState({
        Eq:value[0]
      })
    }
    
    // Just show the latest item.
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
              <Breadcrumb.Item><Title><Text type="danger">Secant</Text></Title></Breadcrumb.Item>

              </Breadcrumb>
              
              <div className="site-layout-background" style={{ padding: 24, minHeight: 500 }}>
              <div className="box" style={{ padding: 24, minHeight: 500 }}>
              <Cascader
                options={this.state.options}
                expandTrigger="hover"
                displayRender={this.displayRender}
                onChange={this.onChange}
                style={{width:"13em" , marginLeft:"7%" , marginRight:"5%" , marginBottom:"0.5%"}}
                
              /> 
              <Input placeholder="Input Equations" style={{width:"13em" , marginLeft:"7%" , marginRight:"5%" , marginBottom:"0.5%"}} onChange={e=>this.setState({Eq:e.target.value})}/>
                

              <br /><br />
              <Input placeholder="Input X1" style={{width:"20em" , marginLeft:"1%" , marginRight:"5%" , marginBottom:"0.5%"}} onChange={e=>this.setState({Xinitial:e.target.value})}/>
                <br /><br />
                <Input placeholder="Input X2" style={{width:"20em" , marginLeft:"1%" , marginRight:"5%" , marginTop:"0.5%"}} onChange={e=>this.setState({Xinitialminus1:e.target.value})}/>
                          <p>
                          <br /><br />
                          <Button onClick={this.getValue}>Submit</Button>
                          </p>
                <br /><br />
                  {this.showResult()}
              </div>
              </div>
            <Footer style={{ textAlign: 'right' }}><Link to="/Home"><Button>home</Button></Link></Footer>
          </Layout>
        </Layout>
      );
    }
  }
      

