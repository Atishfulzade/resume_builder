import jsPDF from "jspdf";

export const generatePDF = () => {
  /* global jsPDF */
  var doc = new jsPDF();
  var doc = new jsPDF();
  doc.setFontSize(22);
  doc.text("James Moore", 20, 20);

  doc.setFontSize(15);
  doc.setTextColor("#286090");
  doc.text("Experienced Project Manager", 20, 27);

  //Details
  doc.setTextColor("black");
  doc.setFontSize(12);
  doc.text("+1 000 000 0000", 20, 35);
  doc.text("jamesmoore@gmail.com", 20, 40);
  doc.text("https://www.linkedin.com/james-moore", 20, 45);
  doc.text("New York City, NY", 20, 50);

  //Rectangle
  doc.setDrawColor(0);
  doc.setFillColor(31, 44, 57);
  doc.rect(135, 0, 80, 600, "F");

  // Add summary
  doc.setFontSize(12);
  doc.text("SUMMARY", 20, 60);

  doc.line(20, 61, 130, 61);
  doc.setFontSize(12);
  doc.text(
    "Result-oriented project team leader with 6 years of \nexperience covering project and product management \nincluding developing implementing  and supporting complex \ninfrastructures for high-growth startups. As quick learner; \nI am detail oriented; adapt to changing requirements easily; \nadept to modern business goals.Comfortable with ambiguity; \nable to thrive in fast-paced environments.",
    20,
    65
  );

  // Add experience
  doc.setFontSize(12);
  doc.text("EXPERIENCE", 20, 105);
  doc.line(20, 106, 130, 106);
  doc.setFontSize(12);
  doc.text("Senior IT Product Manager", 20, 111);

  doc.setTextColor("#286090");
  doc.setFontSize(14);
  doc.text("Rover Games", 20, 116);
  doc.setFontSize(12);
  doc.setTextColor("black");
  doc.text("San Francisco, CA", 20, 121);
  doc.text("02/2019 - Ongoing", 20, 126);
  doc.text(
    "Rover Games is a multi-style mobile game app development \nfirm that has successful titles such as Dark Something, Two \nTriangle, Angry Flight.",
    20,
    131
  );
  doc.text(
    "• Accomplished double-digit yearly % growth by leading \nimplementation,customer acquisition pattern training; \nmanaging functional updates;gathering requirements for \nestablishing iOS & Android app store release plan;",
    20,
    146
  );
  doc.text(
    "• Established & configured strategic partnerships with % \nout of top apps; Led recruitment effort of core %",
    20,
    166
  );

  // Add education
  doc.setFontSize(12);
  doc.text("EDUCATION", 20, 180);
  doc.line(20, 181, 130, 181);

  doc.setFontSize(12);
  doc.text("Industrial Engineering", 20, 186);
  doc.text("University of California, Berkeley", 20, 191);
  doc.text("Industrial Engineering", 20, 197);
  doc.text("University of California, Berkeley", 20, 202);

  //profile phooto
  doc.addImage("examples/images/Octonyan.jpg", "JPEG", 155, 9, 35, 35);

  // Black square with rounded corners
  doc.setDrawColor(31, 44, 57);
  doc.setLineWidth(13);
  doc.ellipse(172, 26, 20, 20);

  // Add strengths
  doc.setTextColor("white");

  doc.setFontSize(12);
  doc.text("STRENGTHS", 145, 60);
  doc.setFontSize(10);
  doc.text("Strategic Planning", 145, 65);
  doc.text("Flexibility", 145, 70);
  doc.text("Coordination Ability", 145, 75);

  // Add achievements
  doc.setTextColor("white");
  doc.setFontSize(12);
  doc.text("ACHIEVEMENTS", 145, 85);
  doc.setFontSize(10);
  doc.text(
    "Cost-saving of $100M, Exceeding \nthroughput target by 60%",
    145,
    90
  );

  // Add skills
  doc.setFontSize(12);
  doc.text("SKILLS", 145, 105);
  doc.setFontSize(10);
  doc.text("Product Development", 145, 110);
  doc.text("Stakeholder Management", 145, 115);

  // Add languages
  doc.setFontSize(12);
  doc.text("LANGUAGES", 145, 125);
  doc.setFontSize(10);
  doc.text("English (Native)", 145, 130);
  doc.text("Spanish (Advanced),", 145, 135);
  doc.text("German (Intermediate)", 145, 140);

  // Add passions
  doc.setFontSize(12);
  doc.text("PASSIONS", 145, 150);
  doc.setFontSize(10);
  doc.text("Family", 145, 155);
  doc.text("Adrenaline Sports", 145, 160);
  doc.text("Composing Music", 145, 165);
  doc.save();
};
