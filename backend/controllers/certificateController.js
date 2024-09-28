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

exports.generateAndEmailCertificate = async (req, res) => {
  const { studentName, quizName, percentage, email } = req.body;

  if (!studentName || !quizName || !email) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const pdfBuffer = await generateCertificatePDF(studentName, quizName, percentage);
    await emailCertificate(email, studentName, quizName, pdfBuffer);
    res.status(200).json({ message: "Certificate generated and emailed successfully" });
  } catch (error) {
    console.error("Error generating or emailing certificate:", error);
    res.status(500).json({
      error: "Error generating or emailing certificate",
      details: error.message,
    });
  }
};

async function generateCertificatePDF(studentName, quizName, percentage) {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ layout: "landscape", size: "A4" });
    const buffers = [];

    // Event listeners to handle PDF generation
    doc.on("data", buffers.push.bind(buffers));
    doc.on("end", () => resolve(Buffer.concat(buffers)));
    doc.on("error", reject); // Add error handler for robustness

    // Certificate template path
    const templatePath = path.join(__dirname, "../assets/certificate_template.png");
    doc.image(templatePath, 0, 0, { width: 842 });

    // Set the font and add dynamic content
    doc.font("Helvetica")
      .fontSize(28)
      .text(studentName, { align: "center", y: 300 })
      .fontSize(18)
      .text(`has participated in the ${quizName}`, { align: "center", y: 340 })
      .fontSize(24)
      .text(`and secured ${percentage}%`, { align: "center", y: 380 });

    // Add the current date
    doc.fontSize(12)
      .text(new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }), 700, 400);

    doc.end(); // End the PDF document
  });
}

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

  await transporter.sendMail(mailOptions);
}
