import * as es6Promise from 'es6-promise'

es6Promise.polyfill()
import * as React from "react"
import * as ReactDOM from "react-dom"

import App  from "App"
import "styles/style.less"

let rootDom = document.getElementById('root')
console.log(rootDom)
if(rootDom){
    ReactDOM.render(
        <App />,
        rootDom
    );
}