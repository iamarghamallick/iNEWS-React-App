import './App.css';
import Navbar from './components/Navbar';

import React, { Component } from 'react'
import News from './components/News';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

export default class App extends Component {
  pageSize = 20;
  render() {
    return (
      <div>
        <Router>
          <Navbar />
          <Routes>
            <Route exact path="/" element={<News key="general" pagesize={this.pageSize} category="general" />} />
            <Route exact path="/general" element={<News key="general" pagesize={this.pageSize} category="general" />} />
            <Route exact path="/business" element={<News key="business" pagesize={this.pageSize} category="business" />} />
            <Route exact path="/entertainment" element={<News key="entertainment" pagesize={this.pageSize} category="entertainment" />} />
            <Route exact path="/health" element={<News key="health" pagesize={this.pageSize} category="health" />} />
            <Route exact path="/science" element={<News key="science" pagesize={this.pageSize} category="science" />} />
            <Route exact path="/sports" element={<News key="sports" pagesize={this.pageSize} category="sports" />} />
            <Route exact path="/technology" element={<News key="technology" pagesize={this.pageSize} category="technology" />} />
          </Routes>
        </Router>
      </div>
    )
  }
}
