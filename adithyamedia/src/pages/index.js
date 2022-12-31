import React from 'react';
import Enquiryform from '../components/EnquiryForm/Enquiryform';
import {createUseStyles} from 'react-jss';
import Updatedform from '../components/EnquiryForm/Updated-form';
//import App from "./App";
//import "./App.css";

const Home = () => {
  const classes = styles()
  return (
    <div className={classes.navbar}>
      <Updatedform />
      <Enquiryform />
    </div>
  );
};


/*const root = ReactDOM.creatRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
*/

export default Home;
//export default root;

const styles = createUseStyles({
  navbar: {
    position: "absolute", 
    marginTop: "70px", 
    fontSize: "20px",
    display: "flex",
    flexWrap: "wrap",
    alignItems: "end"
  }
})