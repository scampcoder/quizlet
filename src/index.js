import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css';
import App from './App';
import Quiz from './routes/Quiz'

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}/>
      <Route path="/quiz" element={<Quiz />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);


