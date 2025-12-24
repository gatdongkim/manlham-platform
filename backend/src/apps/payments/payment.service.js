const PDFDocument = require('pdfkit');
const Job = require('../jobs/job.model');

exports.generateInvoice = async (jobId, res) => {
    const job = await Job.findById(jobId).populate('client professional');
    if (!job) throw new Error("Job not found");

    const doc = new PDFDocument({ margin: 50 });

    // Stream the PDF directly to the response
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=Invoice-${jobId}.pdf`);
    doc.pipe(res);

    // --- Header ---
    doc.fillColor('#444444').fontSize(20).text('MANLHAM TECH SUPPORT', 50, 50);
    doc.fontSize(10).text('MSME Freelance Marketplace', 50, 75);
    doc.text('Nairobi, Kenya', 50, 90);
    doc.moveDown();

    // --- Invoice Info ---
    doc.fillColor('#000000').fontSize(15).text('OFFICIAL PAYMENT STATEMENT', { align: 'center' });
    doc.moveDown();
    doc.fontSize(10).text(`Statement Date: ${new Date().toLocaleDateString()}`);
    doc.text(`Project ID: ${job._id}`);
    doc.text(`M-Pesa Ref: ${job.checkoutRequestId || 'N/A'}`);
    doc.moveDown();

    // --- Table Header ---
    doc.rect(50, 190, 500, 20).fill('#eeeeee');
    doc.fillColor('#000000').text('Description', 60, 195);
    doc.text('Professional', 250, 195);
    doc.text('Amount (KES)', 450, 195);

    // --- Table Content ---
    doc.text(job.title, 60, 220);
    doc.text(job.professional ? job.professional.name : 'N/A', 250, 220);
    doc.text(job.budget.toLocaleString(), 450, 220);

    // --- Footer ---
    doc.moveDown(5);
    doc.fontSize(12).text(`Status: ${job.paymentStatus}`, { bold: true });
    doc.fontSize(10).text('Thank you for choosing Manlham Tech Support. This is a computer-generated document.', { align: 'center', color: 'grey' });

    doc.end();
};