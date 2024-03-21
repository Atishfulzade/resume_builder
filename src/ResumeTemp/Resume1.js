import { jsPDF } from "jspdf";
export const generatePDF = (resumeData, data) => {
  const doc = new jsPDF();
  doc.setFontSize(22);
  doc.text(
    resumeData.personalInfo?.firstname +
      " " +
      resumeData.personalInfo?.lastname,
    20,
    20
  );

  doc.setFontSize(15);
  doc.setTextColor("#286090");
  doc.text(resumeData.personalInfo?.subtitle, 20, 27);

  // Details
  doc.setTextColor("black");
  doc.setFontSize(12);
  doc.text(resumeData.personalInfo?.contactnumber, 20, 35);
  doc.text(resumeData.personalInfo?.email, 20, 40);
  doc.text(
    resumeData.personalInfo?.address + " " + resumeData.personalInfo?.city,
    20,
    45
  );
  doc.text(resumeData.personalInfo?.postalcode, 20, 50);

  // Rectangle
  doc.setDrawColor(0);
  doc.setFillColor(31, 44, 57);
  doc.rect(135, 0, 80, 600, "F");

  // Add objective
  doc.setFontSize(12);
  doc.text("OBJECTIVE", 20, 65);
  doc.line(20, 66, 130, 66);

  const objectiveLines = doc.splitTextToSize(
    resumeData.personalInfo?.objective,
    110
  );
  doc.text(objectiveLines, 20, 70); // Automatically split objective text into multiple lines

  doc.setFontSize(12);
  doc.text("EXPERIENCE", 20, 105);
  doc.line(20, 106, 130, 106);
  if (resumeData && resumeData.workInfo && Array.isArray(resumeData.workInfo)) {
    // Loop through each work experience and add it to the PDF
    resumeData.workInfo[0].forEach((work, index) => {
      // Check if company property exists in work object
      if (work && work.company) {
        doc.setFontSize(12);
        doc.text(`${work?.jobtitle}`, 20, 112 + index * 20); // Adjust Y position based on index
        doc.setTextColor("#286090");
        doc.setFontSize(14);
        doc.text(`${work?.company}`, 20, 118 + index * 20);
        doc.setFontSize(12);
        doc.setTextColor("black");
        doc.text(`${work?.startyear}-${work?.endYear}`, 20, 124 + index * 20);
      }
    });
  }

  // Add education
  doc.setFontSize(12);
  doc.text("EDUCATION", 20, 180);
  doc.line(20, 181, 130, 181);
  resumeData.educationInfo?.map((edu) =>
    edu.education?.map((item, index) => {
      doc.setFontSize(12);
      doc.text(`${item.institution}`, 20, 186 + index * 20); // Adjust Y position based on index
      doc.setTextColor("#286090");
      doc.setFontSize(14);
      doc.text(`${item.degree}`, 20, 192 + index * 20);
      doc.setFontSize(12);
      doc.setTextColor("black");
      doc.text(`${item.startYear}-${item.endYear}`, 20, 198 + index * 20);
    })
  );

  // Profile photo
  doc.addImage(`${resumeData.profileInfo?.profilePic}`, "JPEG", 155, 9, 35, 31);

  // Black square with rounded corners
  doc.setDrawColor(31, 44, 57);
  doc.setLineWidth(13);
  doc.ellipse(172, 26, 20, 20);

  // Add skills
  doc.setTextColor("white");
  doc.setFontSize(12);
  doc.text("SKILLS", 145, 80);
  doc.setFontSize(12);
  resumeData.skillInfo[0]?.skills.map((item, index) => {
    doc.text(`• ${item.skill}`, 145, 86 + index * 6);
  });
  if (resumeData.save && resumeData.save.save) {
    doc.save(`${resumeData.save?.save}.pdf`);
  }
  return doc.output("datauristring");
};
