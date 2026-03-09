import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

export function generateReportPDF(report) {
  const doc = new jsPDF();
  const data = report.reportData;
  
  // Header
  doc.setFontSize(20);
  doc.setTextColor(26, 86, 219); // Blue
  doc.text('BizConsult AI', 20, 20);
  
  doc.setFontSize(16);
  doc.setTextColor(0, 0, 0);
  doc.text('Business Analysis Report', 20, 30);
  
  doc.setFontSize(10);
  doc.setTextColor(100, 100, 100);
  doc.text(`Generated: ${new Date(report.createdAt).toLocaleDateString()}`, 20, 37);
  
  // Idea
  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0);
  doc.text('Business Idea:', 20, 47);
  doc.setFontSize(10);
  const ideaLines = doc.splitTextToSize(report.ideaInput, 170);
  doc.text(ideaLines, 20, 54);
  
  let yPos = 54 + (ideaLines.length * 5) + 10;
  
  // Verdict Badge
  const verdictColor = 
    data.verdict.decision === 'go' ? [34, 197, 94] :
    data.verdict.decision === 'nogo' ? [239, 68, 68] :
    [234, 179, 8];
  
  doc.setFillColor(...verdictColor);
  doc.roundedRect(20, yPos, 40, 10, 3, 3, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(12);
  const verdictText = 
    data.verdict.decision === 'go' ? '✓ GO' :
    data.verdict.decision === 'nogo' ? '✗ NO-GO' :
    '↻ PIVOT';
  doc.text(verdictText, 25, yPos + 7);
  
  yPos += 20;
  
  // Executive Summary
  doc.setFontSize(14);
  doc.setTextColor(0, 0, 0);
  doc.text('Executive Summary', 20, yPos);
  yPos += 7;
  doc.setFontSize(10);
  const summaryLines = doc.splitTextToSize(data.executiveSummary, 170);
  doc.text(summaryLines, 20, yPos);
  yPos += summaryLines.length * 5 + 10;
  
  // Check if we need a new page
  if (yPos > 250) {
    doc.addPage();
    yPos = 20;
  }
  
  // Market Demand
  doc.setFontSize(14);
  doc.text('Market Demand', 20, yPos);
  yPos += 7;
  doc.setFontSize(10);
  doc.text(`Level: ${data.marketDemand.level.toUpperCase()}`, 20, yPos);
  yPos += 7;
  const trendsLines = doc.splitTextToSize(data.marketDemand.trends, 170);
  doc.text(trendsLines, 20, yPos);
  yPos += trendsLines.length * 5 + 10;
  
  if (yPos > 250) {
    doc.addPage();
    yPos = 20;
  }
  
  // Pros
  doc.setFontSize(14);
  doc.setTextColor(34, 197, 94);
  doc.text('Pros', 20, yPos);
  yPos += 7;
  doc.setFontSize(10);
  doc.setTextColor(0, 0, 0);
  data.pros.forEach((pro, index) => {
    const proLines = doc.splitTextToSize(`${index + 1}. ${pro}`, 165);
    doc.text(proLines, 20, yPos);
    yPos += proLines.length * 5 + 3;
  });
  yPos += 5;
  
  if (yPos > 250) {
    doc.addPage();
    yPos = 20;
  }
  
  // Cons
  doc.setFontSize(14);
  doc.setTextColor(239, 68, 68);
  doc.text('Cons', 20, yPos);
  yPos += 7;
  doc.setFontSize(10);
  doc.setTextColor(0, 0, 0);
  data.cons.forEach((con, index) => {
    const conLines = doc.splitTextToSize(`${index + 1}. ${con}`, 165);
    doc.text(conLines, 20, yPos);
    yPos += conLines.length * 5 + 3;
  });
  yPos += 5;
  
  if (yPos > 250) {
    doc.addPage();
    yPos = 20;
  }
  
  // Final Verdict
  doc.setFontSize(14);
  doc.setTextColor(0, 0, 0);
  doc.text('Final Verdict', 20, yPos);
  yPos += 7;
  doc.setFontSize(10);
  const reasoningLines = doc.splitTextToSize(data.verdict.reasoning, 170);
  doc.text(reasoningLines, 20, yPos);
  
  // Footer on all pages
  const pageCount = doc.internal.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    doc.text(`Page ${i} of ${pageCount}`, 105, 290, { align: 'center' });
    doc.text('© BizConsult AI', 105, 285, { align: 'center' });
  }
  
  // Save
  const fileName = `BizConsult-Report-${report.id.substring(0, 8)}.pdf`;
  doc.save(fileName);
}