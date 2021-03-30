import React, { FC,useEffect, useState } from 'react'
import { Layout, Button } from 'antd'
const { Header, Footer, Sider, Content } = Layout
import HomeIndexPage from 'scripts/pages/HomeIndex'
import Hello from 'scripts/pages/components/Hello'

import { HashRouter as Router, Route, Switch, Redirect, Link } from "react-router-dom";
// import logo from 'images/logo.svg';
// import worldpng from 'images/world.jpg';
import { GetBoleAwardAmountList, axiosInstance } from 'remotes'
import styles from "./App.module.less"
export interface IAppProps { 

}

export const App:FC<any> = (props: IAppProps) => {

    useEffect(()=>{
        axiosInstance.interceptors.response.use(
            (response: any) => {
                // // 对响应数据做点什么
                // const { status, data, success } = response
                // console.log('interceptors',response)
                // // 错误处理
                // if (status === 200 && !success){
                //     console.log('fail unify',data)
                //     return
                // }
                // // 异常处理
                // if (status === 403){
                //     console.log('error',data)
                //     return
                // }
                return response.data
            },
            error => {
                // 对响应错误做点什么
            }
        )
    },[])
    return(
        <div className={styles.content}>
               <Layout>
                <Header>
                    <div className={styles.header}>
                        <div className={styles.logo}><img src="" alt="Logo"/></div>
                        <div className={styles.action}>
                            <Button type="primary">动作一</Button>
                            <Button href="/register">动作二</Button>
                        </div>
                    </div>
                </Header>
                <Content>
                    {/* HashRouter情况下 */}
                    <Router>
                        <Switch>
                            <Route exact path="/"  component={HomeIndexPage} />
                            <Route path='/home' component={HomeIndexPage} />
                            <Route path='/hello' component={Hello} />
                            <Redirect to="/"/>
                        </Switch>
                    </Router>
                </Content>
                <Footer className={styles.footer}><div>CopyRight@12332424324324</div></Footer>
                </Layout> 
        </div>
    )
}
export default App