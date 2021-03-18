/**
 * 路由入口
 */
import React from 'react';
import { Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import router from './handle/router';
const routes = [...router]; // 路由合并
const RouteComponent = (): any => <Switch>{renderRoutes(routes)}</Switch>;
const RootRuter = (): any => (
  <BrowserRouter>
    <RouteComponent />
  </BrowserRouter>
);
export default RootRuter;
