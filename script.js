async function createPDF() {
    const { jsPDF } = window.jspdf;

    // Get the form values
    const name = document.getElementById('name').value;
    const mobile = document.getElementById('mobile').value;
    const email = document.getElementById('email').value;
    const address = document.getElementById('address').value;
    const qualifications = document.getElementById('qualification').value.split(',').map(q => q.trim());
    const experiences = document.getElementById('experience').value.split(',').map(e => e.trim());
    const objective = document.getElementById('objective').value; // New objective input
    const skills = document.getElementById('skills').value.split(',').map(s => s.trim()); // New skills input

    // Validation check: Alert if any field is empty
    if (!name || !mobile || !email || !address || !qualifications[0] || !experiences[0] || !objective || !skills[0]) {
        alert("Please fill in all the fields before creating the PDF.");
        return;
    }

    const pdf = new jsPDF();
    const margin = 10;
    let yPosition = margin;

    // Add watermark
    const watermarkImg = new Image();
    watermarkImg.src = 'watermark.png';
    watermarkImg.onload = () => {
        pdf.addImage(watermarkImg, 'PNG', 0, 0, pdf.internal.pageSize.getWidth(), pdf.internal.pageSize.getHeight(), undefined, 'FAST');

        // Set PDF border
        pdf.setLineWidth(1);
        pdf.rect(margin, margin, pdf.internal.pageSize.getWidth() - margin * 2, pdf.internal.pageSize.getHeight() - margin * 2);
        
        // Add logo behind the text, 2px left
        const logoImg = new Image();
        logoImg.src = 'unn.png';
        logoImg.onload = () => {
            pdf.addImage(logoImg, 'PNG', pdf.internal.pageSize.getWidth() - margin - 40 - 5, yPosition + 5, 40, 40, undefined, 'FAST');

            // Add content
            pdf.setFontSize(22);
            pdf.setFont('bold'); // Set font to bold for the name
            pdf.text(name, margin + 10, yPosition + 20);
            yPosition += 10;
            pdf.setFontSize(12);
            pdf.setFont('normal');
            pdf.text(`${mobile} | ${email}`, margin + 10, yPosition + 15);
            yPosition += 10;
            pdf.text(`${address}`, margin + 10, yPosition + 10);
            yPosition += 25; 

            // Objective section
            pdf.setFontSize(18);
            pdf.setFont('bold');
            pdf.text("Objective", margin + 10, yPosition);
            pdf.setLineWidth(1);
            pdf.line(margin + 10, yPosition + 5, pdf.internal.pageSize.getWidth() - margin - 10, yPosition + 5);
            yPosition += 12; 
            pdf.setFontSize(12);
            pdf.setFont('normal');
            pdf.text(objective, margin + 10, yPosition, { maxWidth: pdf.internal.pageSize.getWidth() - margin -20 });
            yPosition += 35; 

            // Education section
            pdf.setFontSize(14);
            pdf.setFont('bold');
            pdf.text("Education", margin + 10, yPosition);
            pdf.setLineWidth(1);
            pdf.line(margin + 10, yPosition + 5, pdf.internal.pageSize.getWidth() - margin - 10, yPosition + 5);
            yPosition += 12; 
            pdf.setFontSize(12);
            pdf.setFont('normal');
            qualifications.forEach((qual, index) => {
                pdf.text(`• ${qual}`, margin + 10, yPosition + index * 8);
            });
            yPosition += (qualifications.length + 1) * 8; 

            // Skills section
            pdf.setFontSize(14);
            pdf.setFont('bold');
            pdf.text("Skills", margin + 10, yPosition);
            pdf.setLineWidth(1);
            pdf.line(margin + 10, yPosition + 5, pdf.internal.pageSize.getWidth() - margin - 10, yPosition + 5);
            yPosition += 12; 
            pdf.setFontSize(12);
            pdf.setFont('normal');
            skills.forEach((skill, index) => {
                pdf.text(`• ${skill}`, margin + 10, yPosition + index * 8);
            });
            yPosition += (skills.length + 1) * 8; 

            // Experience section
            pdf.setFontSize(14);
            pdf.setFont('bold');
            pdf.text("Experience", margin + 10, yPosition);
            pdf.setLineWidth(1);
            pdf.line(margin + 10, yPosition + 5, pdf.internal.pageSize.getWidth() - margin - 10, yPosition + 5);
            yPosition += 12; 
            pdf.setFontSize(12);
            pdf.setFont('normal');
            experiences.forEach((exp, index) => {
                pdf.text(`• ${exp}`, margin + 10, yPosition + index * 8);
            });

            // Save PDF
            pdf.save(`${name}_${mobile}.pdf`);
            alert("Resume is created successfully!");
        };
    };
}
