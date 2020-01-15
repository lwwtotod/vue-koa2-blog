import React, { useState, useEffect } from 'react'
import { Avatar, Divider, Tooltip, Tag } from 'antd'
import '../static/style/components/author.css'
import servicePath from '../config/apiUrl'
import axios from 'axios'
import CountUp from 'react-countup'

const Author = () => {



    const [all_part_count, setAll_part_count] = useState(0)
    const [all_view_count, setAll_view_count] = useState(0)

    useEffect(() => {

        fetchData()

    }, [])


    const fetchData = async () => {
        const result = await axios(servicePath.getAllPartCount).then(
            (res) => { return res.data.data }
        )
        setAll_part_count(result[0].all_part_count)
        setAll_view_count(result[0].all_view_count)
    }

    return (
        <div className="author-div comm-box">
            <div> <Avatar size={100} src="https://avatars2.githubusercontent.com/u/20726419?s=460&v=4" /></div>
            <div className="author-introduction">
                <div className="author-name">洵</div>
                <div>testtesttesttest</div>
                <div className="author-tag">
                    <Tag color="magenta">testtesttest</Tag>
                    <Tag color="green">testtest</Tag>
                    <Tag color="geekblue">test</Tag>
                </div>

                <Divider>社交账号</Divider>
                <Tooltip title="B站 : https://space.bilibili.com/165659472">
                    <a href="https://space.bilibili.com/165659472" target="_blank">
                        <Avatar size={28} src="http://newimg.jspang.com/bilibiliIcon1.png" className="account" />
                    </a>
                </Tooltip>
                <Tooltip title="https://github.com/shenghy">
                    <a href="https://github.com/shenghy" target="_blank">
                        <Avatar size={28} icon="github" className="account" />
                    </a>
                </Tooltip>
                <Tooltip title="QQ:8745662">
                    <Avatar size={28} icon="qq" className="account" />
                </Tooltip>
                <Tooltip title="wechat:php100">
                    <Avatar size={28} icon="wechat" className="account" />
                </Tooltip>

            </div>
        </div>
    )

}



export default Author