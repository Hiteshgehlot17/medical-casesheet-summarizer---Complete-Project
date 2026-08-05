import jsPDF from "jspdf";

export function downloadPdf(summary) {
  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text("AI Medical Case Sheet Summary", 20, 20);

  doc.setFontSize(11);

  const lines = doc.splitTextToSize(
    JSON.stringify(summary, null, 2),
    170
  );

  doc.text(lines, 20, 35);

  doc.save("medical_summary.pdf");
}