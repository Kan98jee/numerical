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

export default class Newton_Raphson extends Component
{
  constructor(props)
    {
        super(props);
        this.state={
            options:[],
            diffs:[],
            Eq:null,
            EqDiff:null,
            Xinitial:null,
            result:null,
            dataTable:[]
        }
    }

    componentDidMount()
    {
        // axios.get('http://localhost:8080/show_NewtonRaphson.php')//Docker//
        axios.get('http://localhost:8080/Newton_Raphson.php')
        .then(res=>{
            console.log(res.data);
            let item =[];
            let optionsArr = [];
            let optionsDiffArr = [];
            res.data.map(dataMap=>{
              let optionsObj = {};
              let optionsDiff = {};
                if(dataMap._type=="Newton_Raphson")
                {
                    item = item.concat(dataMap._name);
                    optionsObj.value = dataMap._name;
                    optionsObj.label = dataMap._name;
                    optionsDiff.value = dataMap._diff;
                    optionsDiff.label = dataMap._diff;
                    optionsArr.push(optionsObj);
                    optionsDiffArr.push(optionsDiff);
                    console.log(optionsObj);
                    console.log(optionsDiff);
                }
            })
            this.setState({
                options:optionsArr,
                diffs:optionsDiffArr
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
      var er = ((Math.abs((xmnew - xmold) / xmnew)) * 100) / 100;
      return er;
  }
  
  getValue = () => {
  
      const {Eq,EqDiff,Xinitial} = this.state;
      console.log(Xinitial);
      var xi_inmain  = parseFloat(Xinitial); 
      let tableArrData = [];
      // var table = document.getElementById("InformationTable").getElementsByTagName('tbody')[0];
  
      var xiplus1_inmain;
      var fxi;
      var fxpi;
      var fixerrorValue = 0.0001;
      var errorValue = 1;
      var i=0;
  
  while(errorValue>=fixerrorValue)
  {
      fxi=this.Equet(Eq,xi_inmain);
      fxpi=this.Equet(EqDiff,xi_inmain);
      xiplus1_inmain=xi_inmain-(fxi/fxpi);
      errorValue = this.err(xiplus1_inmain,xi_inmain);

      let tableObjData = {};
      tableObjData.index = i;
      tableObjData.xi_inmain = xi_inmain;
      tableObjData.errorValue = errorValue;
      tableArrData.push(tableObjData);
      console.log(xi_inmain,fxi,fxpi);
      console.log("XMVALUE = ", xiplus1_inmain);
      console.log("This is errorvalue = ", errorValue);
      console.log("This is fixvalueerror = ", fixerrorValue);
      xi_inmain=xiplus1_inmain;
      i++;
      }
      this.setState({
        dataTable:tableArrData,
        result:xiplus1_inmain
      })
      this.EquationNewton()
  }   

  EquationNewton = () =>{
    const formData = new FormData();
    formData.append("_name",this.state.Eq);
    formData.append("_type","Newton_Raphson");
    formData.append("_diff",this.state.EqDiff);
    const config = {
      headers: {
          "content-type": "multipart/form-data"
          }
      };
      // axios.post('http://localhost:8080/add_equation.php',formData,config)
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
        dataIndex: 'xi_inmain',
        key: 'xi_inmain',
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
        <h5>This is Result of Newton Raphson is : {this.state.result}</h5><br/>
        <Table dataSource={this.state.dataTable} columns={columns} rowKey="Index" style={{marginLeft:"5%" , marginRight:"5%"  }} size="middle"/>
      </div>

    }
  }

    onChange = (value) => {// Function
      console.log(value[0]);
      this.setState({
        Eq:value[0]
      })
    }
    displayRender = (label) => {
      return label[label.length - 1];
    }
    onChange2 = (value) => {//Funtion Diff
      console.log(value[0]);
      this.setState({
        EqDiff:value[0]
      })
    }
    displayRender2 = (label) => {
      return label[label.length - 1];
    }

    onChangeSwitch1 = (checked) => {
      console.log(checked)
      this.setState({
        SwitchOpen:checked
      })
    }

    onChangeSwitch = (checked) => {
      console.log(checked)
      this.setState({
        SwitchOpen:checked
      })
    }
    showInput = () =>{
      if(this.state.SwitchOpen){
        return <Input placeholder="Input Equations" style={{width:"13em" , marginLeft:"7%" , marginRight:"5%" , marginBottom:"0.5%"}} onChange={e=>this.setState({Eq:e.target.value})}/>
      }
      else{
        return <p><Cascader
        options={this.state.options}
        expandTrigger="hover"
        displayRender={this.displayRender}
        onChange={this.onChange}
        style={{width:"13em" , marginLeft:"7%" , marginRight:"5%" , marginBottom:"0.5%"}}
        /></p>
      }
    }

    showInput2 = () =>{
      if(this.state.SwitchOpen){
        return <Input placeholder="Input Equations" style={{width:"13em" , marginLeft:"7%" , marginRight:"5%" , marginBottom:"0.5%"}} onChange={e=>this.setState({EqDiff:e.target.value})}/>
      }
      else{
        return <p><Cascader
        options={this.state.diffs}
        expandTrigger="hover"
        displayRender={this.displayRender2}
        onChange={this.onChange2}
        style={{width:"13em" , marginLeft:"7%" , marginRight:"5%" , marginBottom:"0.5%"}}
        /></p>
      }
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
              <Breadcrumb.Item><Title><Text type="danger">Newton Raphson</Text></Title></Breadcrumb.Item>

              </Breadcrumb>
              
              <div className="site-layout-background" style={{ padding: 24, minHeight: 500 }}>
              <div className="box" style={{ padding: 24, minHeight: 500 }}>
              {this.showInput()}
              
              {this.showInput2()}
              

              <br /><br />
              <Input placeholder="x" style={{width:"20em" , marginLeft:"1%" , marginRight:"5%" , marginBottom:"0.5%"}} onChange={e=>this.setState({Xinitial:e.target.value})} />
                <br /><br />
             
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
      

