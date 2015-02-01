#!/usr/bin/env node
var express = require('express');
var mongodb = require('mongodb');
var app = express();
var MongoClient = require('mongodb').MongoClient
var db;
// Initialize connection
MongoClient.connect("mongodb://localhost:27017/goods_jd", function(err, database) {
    if(err) throw err;

    db = database;

    // Start the application after the database connection is ready
    app.listen(3000);
    console.log("Listening on port 3000");
});