import React, { FC,useEffect, useState } from 'react'
import { axiosInstance } from 'remotes'
import styles from "./index.module.less"
export interface IHomeIndexProps{

}
export const HomeIndex:FC<any> = (props: IHomeIndexProps) => {
    return(
        <div className={styles.homeWrap}>
            主页
        </div>
    )
}
export default HomeIndex