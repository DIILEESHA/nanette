import React, { useState } from "react";
import { motion } from "framer-motion";
import { Modal } from "antd";
import "./TeamMembers.css";

const teamMembers = [
  {
    id: 1,
    name: "Mike McKeyz and Friends",
    role: "Live Band",
    image: "https://i.imgur.com/4l9oDLt.jpeg",
    bio: "Mike McKeyz and Friends is more than a band—it's a movement rooted in authenticity, soul, and the power of music to uplift and inspire. Led by musical director, bandleader, and powerhouse vocalist Mike McKeyz, the group brings an electrifying blend of R&B, hip-hop, soul, and jazz—covering legends from Frank Sinatra to Usher—with a style that’s both classic and refreshingly current. The band has performed for the legendary Nikki Giovanni, traveled overseas to bring music to U.S. military bases, and consistently sells out venues across Eastern Connecticut, spreading a message of joy, love, and authentic happiness through every show. Mentored by gospel icon Pastor Hubert Powell and Grammy-nominated producer Chris “Big Dog” Davis, Mike McKeyz has cultivated a sound and leadership style that attracts top-tier musicians from all over the country. Their performances aren’t just shows—they’re experiences that leave audiences moved, energized, and reminded of the power of real music.Whether on international stages or local tours, Mike McKeyz and Friends are committed to one mission: reviving the soul of music and bringing people together, one unforgettable performance at a time.",
  },
  {
    id: 2,
    name: "DJ GQ",
    role: "DJ",

    image: "https://i.imgur.com/fXCxFAl.jpeg",
    bio: "From town to town and city to city, DJ GQ brings the energy and the heat—spinning the best in music wherever the party takes him. Known for rocking sold-out nights at The Break Room in Manchester, Connecticut, DJ GQ has earned his stripes alongside industry heavyweights like Ron G, Ted Smooth, Mister Cee, DJ SNS, Dany Dee, and DJ Buck.Armed with an unmatched collection of the hottest blends, crisp visuals, and versatile music selection, DJ GQ delivers an unforgettable vibe every time. Whether it’s house, hip hop, R&B, reggae, Latin, Afrobeats, rap, or Top 40, he curates soundscapes that move crowds and make memories.As a proud member of the Worldwide Fleet DJs, DJ GQ is more than just a party starter—he’s a global music ambassador ready to elevate any event to legendary status. ",
  },
  {
    id: 3,
    name: "K'Rina Fort",
    role: "MC",
    image: "https://i.imgur.com/oUmNeu0.jpeg",
    bio: "A dynamic entertainer, K’Rina Fort has brought joy through decades of comedy, music, and performance. She’s performed alongside legends like Paul Mooney and Nikki Carr, promoted for artists like Jay-Z and Mary J. Blige, and made waves on radio with Hot 93.7 WZMX and 94.3 WYBC. Known for her signature event Chuckle for Charity, she’s raised over $4,000 in donations for Connecticut Children’s Medical Center. Her acclaimed one-woman show The Original Laughter Therapist remains a comedic triumph.",
  },
  {
    id: 4,
    name: "Chef Bigalow",
    role: "Caterer",
    image: "https://i.imgur.com/AayXr0b.jpeg",
    bio: "When it comes to unforgettable events, the food sets the tone—and Chef Bigalow is the maestro behind the masterpiece. As the driving force of The Bigalow’s Catering Company in Central Connecticut, he’s not just a chef—he’s a culinary architect, known for turning ordinary events into five-star dining experiences.With a reputation built on creativity, flavor, and flawless presentation, Chef Bigalow doesn't do cookie-cutter menus. He crafts bold, customized dishes that reflect your vibe, your story, and your taste. Whether you crave upscale elegance or next-level comfort food, Chef Bigalow delivers with precision, passion, and serious flavor.From red carpet galas to intimate celebrations, this offsite catering legend brings the heat—and a whole lot of heart. Expect a menu that’s as original as you are, service that’s top-tier, and an experience your guests will be talking about long after the last bite.Get ready. Bigalow’s in the building",
  },
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

const TeamMembers = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);

  const showModal = (member) => {
    setSelectedMember(member);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <motion.div
      className="team-container"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="team-content">
        <motion.h2 className="team-title" variants={fadeInUp} custom={1}>
          The
        </motion.h2>

        <motion.p className="other" variants={fadeInUp} custom={2}>
          Dream Team
        </motion.p>

        <motion.div
          className="team-slider-container"
          variants={fadeInUp}
          custom={3}
        >
          <div className="team-slider">
            {teamMembers.map((member) => (
              <motion.div
                key={member.id}
                className="team-slide"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <div className="team-slide-inner">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="team-member-image"
                  />
                  <div className="team-member-overlay">
                    <h3 className="team-member-name">{member.name}</h3>
                    <p className="team-member-role">{member.role}</p>
                    <button
                      className="team-view-btn"
                      onClick={() => showModal(member)}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <Modal
        title={selectedMember?.name}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        centered
        className="team-modal"
      >
        {selectedMember && (
          <div className="modal-content">
            <img
              src={selectedMember.image}
              alt={selectedMember.name}
              className="modal-image"
            />
            <div className="modal-text">
              <h3 className="modal-role">{selectedMember.role}</h3>
              <p className="modal-bio">{selectedMember.bio}</p>
            </div>
          </div>
        )}
      </Modal>

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
          <button className="drt">
            <a
              style={{ color: "#fff", textDecoration: "none" }}
              href="http://rsvp.nanette60thcelebration.com/"
            >
              rsvp
            </a>
          </button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default TeamMembers;
