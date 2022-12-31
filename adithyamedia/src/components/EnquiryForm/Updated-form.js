import React from "react";
import { motion } from "framer-motion";
import { useRef, useEffect, useState } from "react";


const image1 ="../slide-images/images/1.jpg";
const image2 = "../slide-images/images/2.jpg";
const image3 = "../slide-images/images/3.jpg";
const image4 = "../slide-images/images/4.jpg";
const image5 = "../slide-images/images/5.jpg";

//import images from "../../slide-images/images";



const Updatedform =() => {
    const images= [image1, image2, image3, image4, image5];
    

    const [width, setwidth]  = useState(0);
    const carousel = useRef();
    

    useEffect(() => {
        setwidth(carousel.current.scrolwidth - carousel.current.offsetwidth);
    }, []);

    return (
        <div className="updatedform">
           <motion.div ref={carousel} className="carousel">
                <motion.div drag="x" dragConstraints={{right: 0, left:-width }} className="inner-carousel">
                    {images.map(image =>{
                        return(
                            <motion.div className="item" key={ image }>
                                <img src= {image} alt="" />
                            </motion.div>
                        )
                    })}
                </motion.div>

           </motion.div>
        </div>
    )
}

export default Updatedform