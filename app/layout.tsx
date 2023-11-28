'use client';
import StyledComponentsRegistry from '../lib/AntdRegistry';

import {PropsWithChildren} from "react";

import { Breadcrumb, Layout, theme } from 'antd';

import AnimatedTextEffect13 from "@/components/animation/animatedTextEffect13";
import AnimatedTextEffect05 from "@/components/animation/animatedTextEffect05";

import {Provider} from "react-redux";
import store from "@/redux/store";

import "./globals.css";
import Item from "antd/es/list/Item";

const { Header, Content, Footer } = Layout;


const RootLayout = ({children}: PropsWithChildren) => {
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    return (
        <Provider store={store}>
        <html lang="en" style={{height: "100%"}}>
        <body style={{height: "100%", margin: 0}}>

        <Layout className="layout"  style={{height: "100%"}}>
            <Header style={{ display: 'flex', alignItems: 'center', justifyItems: 'center', height: 100, justifyContent:'center' }}>
                <AnimatedTextEffect05 title1={"People"} title2={"Management"} showButton={false}/>
            </Header>
            <Content className={'wrapper'} style={{ padding: '0 50px' }}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>Index</Breadcrumb.Item>
                    <Breadcrumb.Item>People</Breadcrumb.Item>
                </Breadcrumb>
                <div className="site-layout-content overflow-y-scroll" style={{ background: colorBgContainer }}>
                    <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
                </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>
                <AnimatedTextEffect13 title={"Made by g14wx"} showButton={false}/>
            </Footer>
        </Layout>

        </body>
        </html>
        </Provider>
    )
};

export default RootLayout;
