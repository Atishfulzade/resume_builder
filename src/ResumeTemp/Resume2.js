import { jsPDF } from "jspdf";
export const generatePDF2 = (resumeData) => {
  const doc = new jsPDF();
  doc.setFontSize(22);
  doc.setFont("helvetica", "bold");
  doc.text(
    resumeData.personalInfo?.firstname +
      " " +
      resumeData.personalInfo?.lastname,
    20,
    20
  );
  doc.setFont("times", "normal");
  doc.setFontSize(15);
  doc.setTextColor("#286090");
  doc.text(resumeData.personalInfo?.subtitle, 20, 27);

  // Details
  doc.setTextColor("black");
  doc.setFontSize(12);
  doc.text(resumeData.personalInfo?.contactnumber, 20, 35);
  doc.text(resumeData.personalInfo?.email, 138, 35);
  doc.text(
    resumeData.personalInfo?.address + " " + resumeData.personalInfo?.city,
    20,
    40
  );
  doc.text(resumeData.personalInfo?.postalcode, 20, 45);

  // Add objective
  doc.setFontSize(12);
  doc.setFont("times", "bold");
  doc.text("OBJECTIVE", 20, 55);
  doc.setLineWidth(0.5);
  doc.line(20, 56, 190, 56);
  doc.setFont("times", "normal");
  const objectiveLines = doc.splitTextToSize(
    resumeData.personalInfo?.objective,
    170
  );
  doc.text(objectiveLines, 20, 60); // Automatically split objective text into multiple lines
  doc.setFont("times", "bold");
  doc.setFontSize(12);
  doc.text("EXPERIENCE", 20, 85);

  doc.line(20, 86, 190, 86);
  doc.setFont("times", "normal");
  if (resumeData && resumeData.workInfo && Array.isArray(resumeData.workInfo)) {
    // Loop through each work experience and add it to the PDF
    resumeData.workInfo[0].forEach((work, index) => {
      // Check if company property exists in work object
      if (work && work.company) {
        doc.setFontSize(12);
        doc.text(`${work?.jobtitle}`, 20, 90 + index * 20); // Adjust Y position based on index
        doc.setTextColor("#286090");
        doc.setFontSize(14);
        doc.text(`${work?.company}`, 20, 95 + index * 20);
        doc.setFontSize(12);
        doc.setTextColor("black");
        doc.text(`${work?.startyear}-${work?.endYear}`, 20, 100 + index * 20);
      }
    });
  }

  // Add education
  doc.setFontSize(12);
  doc.setFont("times", "bold");
  doc.text("EDUCATION", 20, 150);
  doc.line(20, 151, 190, 151);
  doc.setFont("times", "normal");
  resumeData.educationInfo?.map((edu) =>
    edu.education?.map((item, index) => {
      doc.setFontSize(12);
      doc.text(`${item.institution}`, 20, 156 + index * 20); // Adjust Y position based on index
      doc.setTextColor("#286090");
      doc.setFontSize(14);
      doc.text(`${item.degree}`, 20, 161 + index * 20);
      doc.setFontSize(12);
      doc.setTextColor("black");
      doc.text(`${item.startYear}-${item.endYear}`, 20, 166 + index * 20);
    })
  );

  // Add skills
  doc.setFont("times", "bold");
  doc.setFontSize(12);
  doc.text("SKILLS", 20, 220);
  doc.line(20, 221, 190, 221);
  doc.setFont("times", "normal");
  doc.setFontSize(12);
  resumeData.skillInfo[0]?.skills.map((item, index) => {
    doc.text(`• ${item.skill}`, 20, 226 + index * 6);
  });
  if (resumeData.save && resumeData.save.save) {
    doc.save(`${resumeData.save?.save}.pdf`);
  }
  return doc.output("datauristring");
};
