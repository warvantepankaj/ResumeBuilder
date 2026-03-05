export const generateWord = async (data) => {
  try {
    if (!data) throw new Error("No data received in generateWord()");
    console.log("Generating Word doc for:", data.name);

    const skillsArray = Array.isArray(data.skills) ? data.skills : [];

    const doc = new Document({
      sections: [
        {
          children: [
            new Paragraph({
              children: [
                new TextRun({
                  text: `Name: ${data.name || ""}`,
                  bold: true,
                }),
              ],
            }),

            new Paragraph(`Email: ${data.email || ""}`),
            new Paragraph(`Phone: ${data.phone || ""}`),

            new Paragraph(""),

            new Paragraph({
              children: [
                new TextRun({ text: "Skills:", bold: true }),
              ],
            }),

            ...skillsArray.map(skill => new Paragraph("• " + skill)),
          ],
        },
      ],
    });

    const buffer = await Packer.toBuffer(doc);

    const out = "./generated/resume.docx";
    fs.writeFileSync(out, buffer);

    return out;

  } catch (err) {
    console.error("Word generation error:", err);
    throw err;
  }
};
