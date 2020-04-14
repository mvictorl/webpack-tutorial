import * as $ from 'jquery'
import Post from './Post';
// Добавление файла css-стилей
import './styles/styles.css';

// Добавление различных файлов
import json from './assets/data.json';
import xml from './assets/data.xml';
import csv from './assets/data.csv';
import webpackLogo from './assets/webpack-logo.jpg';



const post = new Post('Webpack Post title', webpackLogo);

// Использование JQuery:
$('pre').html(post.toString());

console.log('Post to String', post.toString());

console.log('XML:', xml);
console.log('JSON:', json);
console.log('CSV:', csv);
