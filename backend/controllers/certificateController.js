const PDFDocument = require("pdfkit");
const nodemailer = require("nodemailer");
const path = require("path");
const { admin_email, admin_password } = require("../config/config");

// Create a transporter using SMTP
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: admin_email,
    pass: admin_password,
  },
});

// Generate and send certificate asynchronously
exports.generateAndEmailCertificate = async (req, res) => {
  const { studentName, quizName, percentage, email } = req.body;

  // Validate required fields
  if (!studentName || !quizName || !email) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  // Acknowledge request immediately
  res.status(202).json({ message: "Certificate generation initiated" });

  try {
    // Generate PDF and send email in background
    const pdfBuffer = await generateCertificatePDF(
      studentName,
      quizName,
      percentage,
    );
    await emailCertificate(email, studentName, quizName, pdfBuffer);
    console.log("Certificate generated and emailed successfully");
  } catch (error) {
    console.error("Error generating or emailing certificate:", error);
  }
};

// Function to generate certificate PDF as a buffer
async function generateCertificatePDF(studentName, quizName, percentage) {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ layout: "landscape", size: "A4" });
    const buffers = [];

    // Event listeners to handle PDF generation
    doc.on("data", buffers.push.bind(buffers));
    doc.on("end", () => resolve(Buffer.concat(buffers)));
    doc.on("error", reject);

    // Certificate template path
    const templatePath = path.join(
      __dirname,
      "../assets/certificate_template.png",
    );
    doc.image(templatePath, 0, 0, { width: 842 });

    // Set the font and add dynamic content
    doc
      .font("Helvetica-Bold")
      .fontSize(36)
      .text(studentName, 0, 280, { align: "center" }); // Centered, adjusted y-coordinate

    doc
      .font("Helvetica")
      .fontSize(20)
      .text(`has participated in the ${quizName}`, 0, 330, { align: "center" });

    doc
      .font("Helvetica")
      .fontSize(24)
      .text(`and secured ${percentage}%`, 0, 370, { align: "center" });

    // Add the current date
    doc.fontSize(14).text(
      new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      640,
      480,
    );

    doc.end(); // End the PDF document
  });
}
// Function to send email with the generated certificate
async function emailCertificate(email, studentName, quizName, pdfBuffer) {
  const mailOptions = {
    from: admin_email,
    to: email,
    subject: `Your Certificate for ${quizName}`,
    text: `Dear ${studentName},\n\nCongratulations on completing the ${quizName}! Please find your certificate attached.\n\nBest regards,\nYour Quiz Team`,
    attachments: [
      {
        filename: `${quizName}_${studentName}.pdf`,
        content: pdfBuffer,
      },
    ],
  };

  // Send the email asynchronously
  return transporter.sendMail(mailOptions);
}
