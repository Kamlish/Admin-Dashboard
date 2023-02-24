import React, {useEffect, useState} from 'react'

import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import "./widget.scss"

import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

const Widget = ({type}) => {

    const [amount, setAmount] = useState(null);
    const [diff, setDiff] = useState(null);

    let data;

    //temp

        switch (type) {
                case "user": 
                    data = {
                        title: "USERS",
                        isMoney: false,
                        link: "See all users",
                        query: "users",
                        icon: <PersonOutlineOutlinedIcon className='icon' 
                        style={{color:"crimson", backgroundColor: "rgba(255, 0, 0, 0.3)"}}/>
                    };

                break;

                case "order": 
                data = {
                    title: "ORDERS",
                    isMoney: false,
                    link: "View all orders",
                    icon: <ShoppingCartOutlinedIcon className='icon'
                    style={{color:"goldenrod", backgroundColor: "rgba(218, 165, 32, 0.3)"}}
                    />
                };

                break;

                case "earning": 
                data = {
                    title: "EARNINGS",
                    isMoney: true,
                    link: "View new earnings",
                    icon: <MonetizationOnOutlinedIcon className='icon'
                    style={{color:"green", backgroundColor: "rgba(0, 128, 0, 0.3)"}}
                    />
                };

                break;

                case "product": 
                data = {
                    title: "PRODUCTS",
                    query: "products",
                    link: "See details",
                    icon: <AccountBalanceWalletOutlinedIcon className='icon'
                    style={{color:"purple", backgroundColor: "rgba(128, 0, 128, 0.3)"}}
                    />
                };
                break;

                default:
                    break;
        }

        useEffect(() => {
            const fetchData = async () => {
                const today = new Date();
                const lastMonth = new Date(new Date().setMonth(today.getMonth() - 1));
                const prevMonth = new Date(new Date().setMonth(today.getMonth() - 2));
            
                const lastMonthQuery = query(collection(db, data.query),
                    where("timeStamp", "<=", today),
                    where("timeStamp", ">", lastMonth)
                );
                const prevMonthQuery = query(collection(db, data.query),
                    where("timeStamp", "<=", lastMonth),
                    where("timeStamp", ">", prevMonth)
                );
            
                const lastMonthData = await getDocs(lastMonthQuery);
                const prevMonthData = await getDocs(prevMonthQuery);
            
                setAmount(lastMonthData.docs.length);
                setDiff(
                ((lastMonthData.docs.length - prevMonthData.docs.length) / prevMonthData.docs.length) *100
                );
            };
            fetchData();
        }, []);




    return (
        <div className="widget">
            <div className="left">
                <span className="title">{data.title}</span>
                <span className="counter">{data.isMoney && "$"} {amount}</span>
                <span className="link">{data.link}</span>
            </div>
            <div className="right">
            <div className={`percentage ${diff < 0 ? "negative" : "positive"}`}>
            {diff < 0 ? <KeyboardArrowDownOutlinedIcon /> : <KeyboardArrowUpOutlinedIcon /> }
            {diff} %
        </div>
                {data.icon}
            </div>
        </div>
    )
}

export default Widget