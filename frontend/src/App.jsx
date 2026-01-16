import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import TaskListDetails from './pages/TaskListDetails';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/task-lists/:id" element={<TaskListDetails />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;