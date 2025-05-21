import React from "react";
import { motion } from "framer-motion";
import "./h.css";
import Gallery from "../gallery/Gallery";

const Invitation = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  const headerVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 10 },
    },
  };

  const lineVariants = {
    hidden: { scaleX: 0 },
    visible: {
      scaleX: 1,
      transition: { duration: 0.8, ease: "circOut" },
    },
  };

  return (
    <motion.div
      className="invitation_container"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="bal">
        <motion.div className="ballon" variants={itemVariants}></motion.div>
      </div>
      <div className="imger">
        <motion.img
          src="https://i.imgur.com/nXK6lqi.png"
          className="IMG"
          alt="Birthday Banner"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        />
      </div>

      <motion.div className="invitation_content">
        <div className="dilla">
          <motion.h2 className="invitation_preheader" variants={itemVariants}>
            YOU'RE INVITED TO A
          </motion.h2>

          <motion.h1 className="invitation_header" variants={headerVariants}>
            Birthday
          </motion.h1>

          <motion.h1 className="invitation_subheader" variants={headerVariants}>
            PARTY
          </motion.h1>

          <motion.p className="invitation_text" variants={itemVariants}>
            JOIN US FOR AN EVENING OF MUSIC, STYLE & CELEBRATION AS WE HONOR
          </motion.p>

          <motion.div
            className="liner"
            variants={lineVariants}
            initial="hidden"
            animate="visible"
          />

          <motion.div className="das" variants={itemVariants}>
            <h2 className="honoree">Celebrates</h2>
            <h2 className="birthday_type">60TH BIRTHDAY</h2>
          </motion.div>

          <motion.div
            className="liner"
            variants={lineVariants}
            initial="hidden"
            animate="visible"
          />

          <motion.p
            className="invitation_details"
            style={{
              display: "flex",
              alignItems: "center",
              marginRight: "30px",
            }}
            variants={itemVariants}
          >
            SATURDAY |{" "}
            <span style={{ color: "#d7aa6c", margin: "0px 5px" }}>
              AUGUST 23
            </span>
            | 2025
          </motion.p>
        </div>
        {/* <Gallery /> */}
      </motion.div>

      <motion.div
        className="bottom_gradient"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1.5 }}
      />
    </motion.div>
  );
};

export default Invitation;
