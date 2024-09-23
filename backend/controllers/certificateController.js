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
    const pdfBuffer = await generateCertificatePDF(
      studentName,
      quizName,
      percentage,
    );
    await emailCertificate(email, studentName, quizName, pdfBuffer);
    res
      .status(200)
      .json({ message: "Certificate generated and emailed successfully" });
  } catch (error) {
    console.error("Error in certificate generation or emailing:", error);
    res.status(500).json({
      error: "Error generating or emailing certificate",
      details: error.message,
    });
  }
};

async function generateCertificatePDF(studentName, quizName, percentage) {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({
      layout: "landscape",
      size: "A4",
    });

    const buffers = [];
    doc.on("data", buffers.push.bind(buffers));
    doc.on("end", () => {
      const pdfBuffer = Buffer.concat(buffers);
      resolve(pdfBuffer);
    });

    // Add the template to the document
    const templatePath = path.join(
      __dirname,
      "../assets/certificate_template.png",
    );
    doc.image(templatePath, 0, 0, { width: 842 });

    // Set the font
    doc.font("Helvetica");

    // Add the dynamic text
    doc.fontSize(28).text(studentName, 0, 300, {
      align: "center",
    });

    doc.fontSize(18).text(`has participated in the ${quizName}`, 0, 340, {
      align: "center",
    });

    doc.fontSize(24).text(`and secured ${percentage}%`, 0, 380, {
      align: "center",
    });

    // Add the date
    const date = new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    doc.fontSize(12).text(date, 700, 400);

    doc.end();
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
