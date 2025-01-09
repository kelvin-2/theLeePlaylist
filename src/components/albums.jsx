import React from "react";

async function getAblums(){
    const response = (await fetch('https://jsonplaceholder.typicode.com/albums')).json;
}