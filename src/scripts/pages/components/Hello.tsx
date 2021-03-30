import React, { FC,useEffect, useState } from 'react'
import styles from './Hello.module.less'
// console.log(styles,"styles1",styles1)
// import * as styles1 from "./Hello.modules.less"
export interface HelloProps { 
    compiler: string; 
    framework: string; 
}

// export default const Hello = (props: HelloProps) => <h1>Hello from {props.compiler} and {props.framework}!</h1>
export const Hello:FC<any> = (props: any) => {
    console.log('render hello')
    return(
        <div className={styles.helloWrap}>
            <h1>Hello from {props.compiler} and {props.framework}!</h1>
            <div className={styles.name}>
                颜色
            </div>
        </div>
    )
}
export default Hello