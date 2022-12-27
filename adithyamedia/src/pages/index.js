import React from 'react';
import Enquiryform from '../components/EnquiryForm/Enquiryform';
import {createUseStyles} from 'react-jss'

const Home = () => {
  const classes = styles()
  return (
    <div className={classes.navbar}>
      <h2>For production email details and time at reachus@adithyamedia.com to schedule a meeting</h2>
      <Enquiryform />
    </div>
  );
};

export default Home;

const styles = createUseStyles({
  navbar: {
    position: "absolute", 
    marginTop: "70px", 
    fontSize: "20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "end"
  }
})