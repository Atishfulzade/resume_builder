import { jsPDF } from "jspdf";
export const generatePDF4 = (resumeData) => {
  const doc = new jsPDF();
  doc.setFontSize(25);
  doc.setFont("helvetica", "bold");
  doc.text(
    resumeData.personalInfo?.firstname +
      " " +
      resumeData.personalInfo?.lastname,
    80,
    21
  );

  // Details
  doc.setTextColor("black");
  doc.setFontSize(12);
  doc.text(`| ${resumeData.personalInfo?.contactnumber}`, 95, 30);
  doc.text(`| ${resumeData.personalInfo?.email}`, 130, 30);
  doc.text(
    resumeData.personalInfo?.address +
      " " +
      resumeData.personalInfo?.city +
      " " +
      resumeData.personalInfo?.postalcode,
    20,
    30
  );
  doc.setDrawColor(0);
  doc.setFillColor(241, 241, 241);
  doc.rect(0, 46, 220, 6, "F");

  // Add objective
  doc.setFontSize(12);
  doc.setFont("times", "bold");
  doc.text("OBJECTIVE", 20, 50);
  doc.setLineWidth(0.5);
  doc.setFont("times", "normal");
  const objectiveLines = doc.splitTextToSize(
    resumeData.personalInfo?.objective,
    170
  );
  doc.text(objectiveLines, 20, 58); // Automatically split objective text into multiple lines
  doc.setFont("times", "bold");
  doc.setDrawColor(0);
  doc.setFillColor(241, 241, 241);
  doc.rect(0, 85, 220, 7, "F");
  doc.setFontSize(12);
  doc.text("EXPERIENCE", 20, 90);

  doc.setFont("times", "normal");
  if (resumeData && resumeData.workInfo && Array.isArray(resumeData.workInfo)) {
    // Loop through each work experience and add it to the PDF
    resumeData.workInfo[0].forEach((work, index) => {
      // Check if company property exists in work object
      if (work && work.company) {
        doc.setFontSize(12);
        doc.text(`${work?.jobtitle}`, 20, 97 + index * 15); // Adjust Y position based on index
        doc.setTextColor("#286090");
        doc.setFontSize(14);
        doc.text(`${work?.company}`, 20, 103 + index * 15);
        doc.setFontSize(12);
        doc.setTextColor("black");
        doc.text(`${work?.startyear}-${work?.endYear}`, 170, 97 + index * 15);
      }
    });
  }

  // Add education
  doc.setFontSize(12);
  doc.setDrawColor(0);
  doc.setFillColor(241, 241, 241);
  doc.setFontSize(12);
  doc.setFontSize(12);
  doc.setDrawColor(0);
  doc.setFillColor(241, 241, 241);
  doc.rect(0, 160, 220, 7, "F");
  doc.setFont("times", "bold");
  doc.text("EDUCATION", 20, 165);
  doc.setFont("times", "normal");
  resumeData.educationInfo?.map((edu) =>
    edu.education?.map((item, index) => {
      doc.setFontSize(12);
      doc.text(`${item.institution}`, 20, 171 + index * 15); // Adjust Y position based on index
      doc.setTextColor("#286090");
      doc.setFontSize(14);
      doc.text(`${item.degree}`, 20, 177 + index * 15);
      doc.setFontSize(12);
      doc.setTextColor("black");
      doc.text(`${item.startYear}-${item.endYear}`, 170, 177 + index * 15);
    })
  );

  // Add skills
  doc.setFont("times", "bold");
  doc.setFontSize(12);
  doc.setDrawColor(0);
  doc.setFillColor(241, 241, 241);
  doc.rect(0, 225, 220, 7, "F");
  doc.text("SKILLS", 20, 230);
  doc.setFont("times", "normal");
  doc.setFontSize(12);
  resumeData.skillInfo[0]?.skills.map((item, index) => {
    doc.text(`• ${item.skill}`, 20, 236 + index * 6);
  });
  if (resumeData.save && resumeData.save.save) {
    doc.save(`${resumeData.save?.save}.pdf`);
  }
  return doc.output("datauristring");
};
