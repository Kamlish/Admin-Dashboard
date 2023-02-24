import React from 'react'
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import { CircularProgressbar} from 'react-circular-progressbar';
import "react-circular-progressbar/dist/styles.css"
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';

import "./featured.scss"

const Featured = () => {
  return (
    <div className='featured'>
      <div className="top">
        <h1 className='title'>Total Revenue</h1>
        <MoreVertOutlinedIcon fontSize='small'/>
      </div>

      <div className="bottom">
        <div className="featuredChart">
          <CircularProgressbar  value={60} text={"60%"} strokeWidth={5} />
        </div>
      <p className='title'>Total sales made today</p>
      <p className='amount'>$920</p>
      <p className='desc'>Previous transactions processing Last payments may not be included</p>

      <div className="summary">
        <div className="item">
          <div className="itemTitle">Target</div>
          <div className="itemResult">
            <KeyboardArrowUpOutlinedIcon fontSize='small'/>
            <div className="resultAmount positive">$11.2K</div>
          </div>
        </div>

        <div className="item">
          <div className="itemTitle">Last Week</div>
          <div className="itemResult">
            <KeyboardArrowDownOutlinedIcon fontSize='small'/>
            <div className="resultAmount negative">$11.2K</div>
          </div>
        </div>

        <div className="item">
          <div className="itemTitle">Last Month</div>
          <div className="itemResult">
            <KeyboardArrowUpOutlinedIcon fontSize='small'/>
            <div className="resultAmount positive">$11.2K</div>
          </div>
        </div>

      </div>
      </div>
    </div>
  )
}

export default Featured