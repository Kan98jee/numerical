import React,{Component} from "react";
import { Layout, Menu, Breadcrumb } from 'antd';
import "../App.css";
import {Link} from "react-router-dom"
import { InputNumber} from 'antd';
import { Typography } from 'antd';
import axios from 'axios';
import { parse } from 'mathjs';
import { Button } from 'antd';
import { Select,Table} from 'antd';

const { Title } = Typography;
const { Text } = Typography;
const {Footer, Sider } = Layout;
const { SubMenu } = Menu;



const { Option } = Select;

function onBlur() {
  console.log('blur');
}

function onFocus() {
  console.log('focus');
}

function onSearch(val) {
  console.log('search:', val);
}


class One_Point extends Component {
  state = {
    collapsed: false,  
  };
  // handleSizeChange = e => {
  //   this.setState({ size: e.target.value });
  // };

  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  constructor(props)
    {
        super(props);
        this.state={
          onepoint:[],
          equation:"",
          check:null,
          xold:"",
           
          datatable:[]
        };
      }

      componentDidMount()
      {
          axios.get('http://localhost:8080/One_Point.php')
          .then(res=>{
              // console.log(res.data);
              let item =[];
              res.data.map(dataMap=>{
                if(dataMap._type === "One_Point"){
                  item = item.concat(dataMap._name);
                }
                // console.log(item); 
              });
              this.setState({
                  onepoint:item
              });
          });
          
      }
  Solve(Eq,xi) {
    const nEq = parse(Eq); 
    const Equation = nEq.compile();

    let scope = {
        x:xi
    }
    return Equation.eval(scope);
       
  }
  
  err(xold, xnew) {
    var er = ((Math.abs((xnew - xold) / xnew))*100)/100;
    return er;
  }
  
  onepoint=()=>{
    // console.log(this.state);
    var eq = this.state.equation;

    var xold = parseFloat(this.state.xold);
    let tabledata = [];
   
    var i=0;
    var xnew;
    var fixerror = 0.00001;
    var error=1;
    while(error >= fixerror)
        {
            xnew = this.Solve(eq,xold);
            // console.log(xnew);
            error= this.err(xold,xnew);
            let table = {};
            table.index = i;
            table.xold = xold;
            table.xnew = xnew;
            table.error = error;
            
            tabledata.push(table);
            xold=xnew;
            i++;
         }

        this.setState({check:xnew,datatable:tabledata})
  }

  handleChangeeq = (value) => {
    console.log('Selected',value);
    this.setState({
        equation:value
    });
  }
  
  handleChangexold = (value) => {
    console.log('x',value);
    this.setState({
        xold:value
    });
  }

 

showgraph = () =>{
        const columns = [
            {
                title: 'Iteration',
                dataIndex: 'index',
                key: 'index',
              },
              {
                title: 'X(i)',
                dataIndex: 'xold',
                key: 'xold',
              },
              {
                title: 'X(i+1)',
                dataIndex: 'xnew',
                key: 'xnew',
              },
              {
                title: 'Error',
                dataIndex: 'error',
                key: 'error'
              },
          ];
          
          if(this.state.check != null){
            return <Table dataSource={this.state.datatable} columns={columns} />;
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
  
  render(){
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
          <Breadcrumb.Item><Title><Text type="danger">One Point</Text></Title></Breadcrumb.Item>

          </Breadcrumb>
            <div className="site-layout-background" style={{ padding: 24, minHeight: 500 }}>
            <div className="box" style={{ padding: 24, minHeight: 500 }}>
            <br/><br/>
            
              <div>
                <Select showSearch style={{ width: 200 }} placeholder="Please Select" 
                onChange={this.handleChangeeq} onFocus={onFocus} onBlur={onBlur} onSearch={onSearch} >
                {this.state.onepoint.map(e=>{
                  
                  return <Option value={e}>{e}</Option>
                })}
                </Select>
              </div>
              <br/>
              <div>
              <InputNumber placeholder="x" style={{width:200}} value={this.state.xold} onChange={this.handleChangexold}/>
              </div>
              <br/>
        
              <div>
                <Button type="submit" onClick={this.onepoint}>Submit</Button>
              </div>
              <br />
                {this.showgraph()}
                      
            </div>
            </div>
          
          <Footer style={{ textAlign: 'right' }}><Link to="/Home"><Button>home</Button></Link></Footer>
        </Layout>
      </Layout>
    );
  }
}

export default One_Point;
