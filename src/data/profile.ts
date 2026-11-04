// Single source of truth for the portfolio and printable CV.
// Source: user-supplied LinkedIn Profile.pdf, received 2026-11-04.
// Dates and roles are preserved. Summaries condense the supplied text;
// no achievements or metrics have been invented.
export const profile = {
  name: "KAIMAU CHANG",
  firstName: "Kaimau",
  initials: "KC",
  role: "Technology Scouting & R&D Partnerships",
  position: "Director · XUNWEI Technologies",
  location: "Taipei, Taiwan",
  email: "kelvin820@gmail.com",
  linkedin: "https://www.linkedin.com/in/changkaimau/",
  github: "https://github.com/kelvin820",
  website: "https://kelvin820.github.io",
  headline: "Connecting technology. Creating possibilities.",
  introduction: "Exploring emerging technologies and connecting the people, ideas, and R&D partnerships that move communication solutions forward.",
  summary: "Technology scouting and R&D partnerships professional with a background in electrical and RF engineering. Experienced in Wi-Fi, Bluetooth, mobile communications, and VR system design, including HMD and HMI. Collaborates with internal and external R&D teams to explore emerging technologies and develop communication solutions.",
  about: "My work sits at the intersection of technology exploration and engineering collaboration. I gather emerging technologies and solutions, connect internal and external R&D teams, and build partnerships that create value for businesses and customers. My engineering background spans mobile RF design, wireless products, virtual reality, and autonomous vehicle technology exploration.",
  skills: ["Technology scouting", "R&D partnerships", "WLAN / Wi-Fi", "RF engineering", "Embedded systems", "Bluetooth", "Mobile communications", "VR / HMD / HMI"],
  focus: [
    { number: "01", title: "Technology & partnerships", text: "Emerging technology exploration, technology sourcing and planning, and collaboration across internal and external R&D teams.", detail: "SCOUT · CONNECT · DEVELOP" },
    { number: "02", title: "Wireless & RF", text: "Hands-on engineering experience across mobile platforms, WLAN and Bluetooth modules, 60 GHz WiHD, and LTE products.", detail: "WI-FI · BLUETOOTH · MOBILE" },
    { number: "03", title: "Immersive & emerging systems", text: "VR ecosystem exploration spanning HMD design, optics and tracking, alongside autonomous vehicle sensors and simulation.", detail: "VR · SENSING · SIMULATION" },
  ],
  experience: [
    { company: "XUNWEI Technologies Co. Ltd.", short: "XUNWEI", title: "Director | Technology Scouting and R&D Partnerships", start: "Jan 2020", end: "Present", location: "Taipei, Taiwan", bullets: [] as string[] },
    { company: "Huawei Technologies", short: "Huawei", title: "Technology Sourcing and Planning", start: "Jan 2018", end: "Jan 2020", location: "Taipei, Taiwan", bullets: [] as string[] },
    { company: "MediaTek", short: "MediaTek", title: "Technical Manager", start: "Sep 2014", end: "Jan 2018", location: "Taipei, Taiwan", bullets: ["Explored the VR ecosystem: HMD mechanical, ergonomic and industrial design; optics; ultrasound and ToF hand tracking; eye tracking; and electromagnetic position tracking.", "Explored autonomous vehicle technology: three-pillar and end-to-end approaches, LiDAR/radar/camera/sonar sensing, drive-by-wire, datasets, simulation, and data visualization."] },
    { company: "Foxconn", short: "Foxconn", title: "Senior EE/RF Engineer", start: "Apr 2009", end: "Sep 2014", location: "New Taipei City, Taiwan", bullets: ["Worked on wireless product projects including notebooks for Sony, HP and Dell; Sony netbooks and tablets; smartbooks; WLAN and Bluetooth modules; 60 GHz WiHD modules; and an NVIDIA LTE M.2 card."] },
    { company: "Compal", short: "Compal", title: "Senior RF Engineer", start: "Aug 2006", end: "Apr 2009", location: "Taipei, Taiwan", bullets: ["Mobile phone projects: GSM on the TI platform and WCDMA on EMP and Qualcomm platforms."] },
    { company: "Compal", short: "Compal", title: "RF Design Engineer", start: "Aug 2004", end: "Aug 2006", location: "Taipei, Taiwan", bullets: ["Mobile phone projects: WCDMA on the EMP platform."] },
  ],
  education: { school: "National Chung Cheng University", degree: "Master’s degree · Electrical Engineering", start: "2003", end: "2004" },
  updated: "November 2026",
};
