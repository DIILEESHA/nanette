import React, { useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import "./g.css";

const images = [
  "https://i.imgur.com/0lFLKZi.jpeg",
  "https://i.imgur.com/z1GhZig.jpeg",
  "https://i.imgur.com/MVQxXWW.jpeg",
  "https://i.imgur.com/hlHOPQQ.jpeg",
  "https://i.imgur.com/NCcUKX6.png",
  "https://i.imgur.com/lBPMZdZ.jpeg",
  "https://i.imgur.com/AUYCvvl.jpeg",
];

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.8,
      ease: "easeOut",
    },
  }),
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      when: "beforeChildren",
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "backOut",
    },
  },
};

const Gallery = () => {
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.02]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);

  useEffect(() => {
    const slider = document.querySelector(".slider");
    if (!slider) return;

    let interval;
    let startX = 0;
    let isDragging = false;
    let currentX = 0;
    const slideWidth = 300; // Adjust based on your slide width
    const totalSlides = images.length;
    const maxScroll = -(slideWidth * (totalSlides - 3)); // Adjust based on visible slides

    const autoSlide = () => {
      currentX -= slideWidth;
      if (currentX < maxScroll) {
        currentX = 0;
      }
      slider.style.transform = `translateX(${currentX}px)`;
    };

    const startAutoSlide = () => {
      interval = setInterval(autoSlide, 3000);
    };

    const stopAutoSlide = () => {
      clearInterval(interval);
    };

    const handleDragStart = (e) => {
      isDragging = true;
      startX = e.type.includes("mouse") ? e.clientX : e.touches[0].clientX;
      stopAutoSlide();
    };

    const handleDragMove = (e) => {
      if (!isDragging) return;
      const x = e.type.includes("mouse") ? e.clientX : e.touches[0].clientX;
      const diff = x - startX;
      slider.style.transform = `translateX(${currentX + diff}px)`;
    };

    const handleDragEnd = (e) => {
      if (!isDragging) return;
      isDragging = false;
      const x = e.type.includes("mouse")
        ? e.clientX
        : e.changedTouches[0].clientX;
      const diff = x - startX;

      // Snap to nearest slide
      const direction = diff > 0 ? 1 : -1;
      currentX = Math.round((currentX + diff * 0.5) / slideWidth) * slideWidth;

      // Boundary checks
      if (currentX > 0) currentX = 0;
      if (currentX < maxScroll) currentX = maxScroll;

      slider.style.transform = `translateX(${currentX}px)`;
      startAutoSlide();
    };

    slider.addEventListener("mousedown", handleDragStart);
    slider.addEventListener("mousemove", handleDragMove);
    slider.addEventListener("mouseup", handleDragEnd);
    slider.addEventListener("mouseleave", handleDragEnd);
    slider.addEventListener("touchstart", handleDragStart);
    slider.addEventListener("touchmove", handleDragMove);
    slider.addEventListener("touchend", handleDragEnd);

    startAutoSlide();

    return () => {
      stopAutoSlide();
      slider.removeEventListener("mousedown", handleDragStart);
      slider.removeEventListener("mousemove", handleDragMove);
      slider.removeEventListener("mouseup", handleDragEnd);
      slider.removeEventListener("mouseleave", handleDragEnd);
      slider.removeEventListener("touchstart", handleDragStart);
      slider.removeEventListener("touchmove", handleDragMove);
      slider.removeEventListener("touchend", handleDragEnd);
    };
  }, []);

  return (
    <motion.div
      className="gallery"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div className="malka" style={{ y }}>
        <motion.div className="content-wrapper" style={{ scale, opacity }}>
          <motion.h2
            className="gallery_title"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            custom={1}
          >
            Grace & Light
          </motion.h2>

          <motion.p
            className="other"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            custom={2}
          >
            Nanette's Journey
          </motion.p>

          <motion.p
            className="gallery_p"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            custom={3}
          >
            Nanette McGill is more than just the guest of honor—she's the
            heartbeat of her family and a radiant light in her community. A
            devoted mother, proud grandmother, loving sister, and loyal friend,
            Nanette has spent a lifetime uplifting others with her warmth,
            wisdom, and unwavering grace. As she celebrates her 60th year, we
            gather to honor her remarkable journey and the love she continues to
            pour into everyone she meets.
          </motion.p>
        </motion.div>

        <motion.div
          className="slider-container"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          custom={4}
        >
          <div className="slider-wrapper">
            <div className="slider">
              {images.map((image, index) => (
                <motion.div
                  className="slide"
                  key={index}
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={index * 0.2 + 1}
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <motion.img
                    src={image}
                    alt={`Gallery image ${index + 1}`}
                    className="slide-image"
                    initial={{ opacity: 1}}
                    whileHover={{ opacity: 1 }}
                  />
                  <div className="slide-overlay"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          className="scroll-indicator"
          animate={{
            opacity: [0, 1, 0],
            y: [0, 10, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          Scroll to explore
        </motion.div>
      </motion.div>

      <motion.div
        className="bottomer"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1 }}
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.h2
            className="gallery_title"
            variants={itemVariants}
            custom={1}
          >
            the
          </motion.h2>

          <motion.p className="other" variants={itemVariants} custom={2}>
            Details
          </motion.p>

          <motion.div
            className="party_grid"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div
              className="party_sub"
              variants={itemVariants}
              custom={1}
            >
              <motion.div
                className="party_card"
                whileHover={{ y: -10 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="party_sub1">
                  <motion.img
                    src="https://images.unsplash.com/photo-1631857455684-a54a2f03665f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YmlydGhkYXklMjBwYXJ0eXxlbnwwfHwwfHx8MA%3D%3D"
                    alt=""
                    className="prty_img"
                    initial={{ scale: 1 }}
                    whileHover={{ scale: 1.05 }}
                  />
                </div>
                <div className="party_sub2 f">
                  <motion.h2
                    className="prty_title"
                    initial={{ x: -20 }}
                    whileInView={{ x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    party
                  </motion.h2>
                  <motion.p
                    className="prty_location"
                    initial={{ x: -20 }}
                    whileInView={{ x: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    13 Beaver Street, New Britain, CT 06051
                  </motion.p>
                  <motion.h2
                    className="prty_location"
                    initial={{ x: -20 }}
                    whileInView={{ x: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    Saturday, August 23rd, 2025
                  </motion.h2>
                  <motion.h2
                    className="prty_location sha"
                    initial={{ x: -20 }}
                    whileInView={{ x: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    Doors Open at 5:00 PM Celebration Until 1:00 AM
                  </motion.h2>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              className="party_sub"
              variants={itemVariants}
              custom={2}
            >
              <motion.div
                className="party_card"
                whileHover={{ y: -10 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="party_sub1">
                  <motion.img
                    src="https://images.unsplash.com/photo-1674383979883-f167be8e07cc?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjJ8fG1hcm9vbiUyMGRyZXNzfGVufDB8fDB8fHww"
                    alt=""
                    className="prty_img"
                    initial={{ scale: 1 }}
                    whileHover={{ scale: 1.05 }}
                  />
                </div>
                <div className="party_sub2 f">
                  <motion.h2
                    className="prty_title"
                    initial={{ x: -20 }}
                    whileInView={{ x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    Dress Code
                  </motion.h2>
                  <motion.p
                    className="prty_location"
                    initial={{ x: -20 }}
                    whileInView={{ x: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    Elegant & Chic Attire
                  </motion.p>
                  <motion.h2
                    className="prty_location"
                    initial={{ x: -20 }}
                    whileInView={{ x: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    Theme Colors: Maroon, Silver & White
                  </motion.h2>

                  <motion.div
                    className="color_ball"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <motion.div
                      className="colord1"
                      whileHover={{ scale: 1.2 }}
                    />
                    <motion.div
                      className="colord2"
                      whileHover={{ scale: 1.2 }}
                    />
                    <motion.div
                      className="colord3"
                      whileHover={{ scale: 1.2 }}
                    />
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              className="party_sub"
              variants={itemVariants}
              custom={3}
            >
              <motion.div
                className="party_card"
                whileHover={{ y: -10 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="party_sub1">
                  <motion.img
                    src="https://images.unsplash.com/photo-1691067987422-befcaaaf3e45?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTZ8fEV2ZW5pbmclMjBwYXJ0eXxlbnwwfHwwfHx8MA%3D%3D"
                    alt=""
                    className="prty_img nasa"
                    initial={{ scale: 1 }}
                    whileHover={{ scale: 1.05 }}
                  />
                </div>
                <div className="party_sub2 f">
                  <motion.h2
                    className="prty_title"
                    initial={{ x: -20 }}
                    whileInView={{ x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    Evening Highlights
                  </motion.h2>
                  <motion.p
                    className="prty_location"
                    initial={{ x: -20 }}
                    whileInView={{ x: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <strong>Open Bar:</strong> 5:00 PM – 7:00 PM
                  </motion.p>
                  <motion.h2
                    className="prty_location"
                    initial={{ x: -20 }}
                    whileInView={{ x: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <strong>Live Music:</strong> Mike McKeyz & Friends
                  </motion.h2>
                  <motion.h2
                    className="prty_location"
                    initial={{ x: -20 }}
                    whileInView={{ x: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <strong>Host:</strong> The Amazing Ka'rina Fort
                  </motion.h2>
                  <motion.h2
                    className="prty_location"
                    initial={{ x: -20 }}
                    whileInView={{ x: 0 }}
                    transition={{ delay: 0.6 }}
                  >
                    <strong>Beats by:</strong> DJ Gerald Skyers
                  </motion.h2>
                  <motion.h2
                    className="prty_location"
                    initial={{ x: -20 }}
                    whileInView={{ x: 0 }}
                    transition={{ delay: 0.7 }}
                  >
                    <strong>Special Tribute:</strong> To our Queen, Nanette
                    McGill
                  </motion.h2>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.div
        className="bottomer"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1 }}
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <button className="drt">rsvp</button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Gallery;
