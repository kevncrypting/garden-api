const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const flowersRouter = require('./routes/flowers');
const herbsRouter = require('./routes/herbs');
const vegetablesRouter = require('./routes/vegetables');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/flowers', flowersRouter);
app.use('/herbs', herbsRouter);
app.use('/vegetables', vegetablesRouter);

module.exports = app;
