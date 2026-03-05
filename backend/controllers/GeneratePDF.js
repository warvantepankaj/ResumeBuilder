// import puppeteer from "puppeteer";

// export const generatePDF = async (htmlContent) => {
//   const browser = await puppeteer.launch({
//     headless: "new",
//     args: ["--no-sandbox", "--disable-setuid-sandbox"],
//   });

//   const page = await browser.newPage();

//   // 1. Wrap content in HTML with Tailwind
//   const fullHtml = `
//     <!DOCTYPE html>
//     <html>
//       <head>
//         <meta charset="UTF-8" />
//         <meta name="viewport" content="width=device-width, initial-scale=1.0" />
//         <script src="https://cdn.tailwindcss.com"></script>
//         <style>
//           /* Force exact colors */
//           body { 
//             -webkit-print-color-adjust: exact !important; 
//             print-color-adjust: exact !important;
//             font-family: sans-serif; 
//           }
//           /* Force Links to look and act like links */
//           a {
//             color: #2563eb !important; /* Tailwind blue-600 */
//             text-decoration: underline !important;
//             cursor: pointer !important;
//           }
//         </style>
//       </head>
//       <body class="p-8">
//         ${htmlContent}
//       </body>
//     </html>
//   `;

//   await page.setContent(fullHtml, {
//     waitUntil: "networkidle0",
//     timeout: 60000,
//   });

//   // 2. CRITICAL FIX: Emulate "Screen" instead of "Print"
//   // This ensures links remain clickable and styles aren't stripped
//   await page.emulateMediaType("screen");

//   const pdfBuffer = await page.pdf({
//     format: "A4",
//     printBackground: true,
//     margin: { top: "10mm", bottom: "10mm", left: "10mm", right: "10mm" },
//   });

//   await browser.close();
//   return pdfBuffer;
// };


import puppeteer from "puppeteer";

export const generatePDF = async (htmlContent) => {
  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();

  // 1. Construct HTML
  const fullHtml = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <script src="https://cdn.tailwindcss.com"></script>
        <style>
            :root {
                --background: 0 0% 100%;
                --foreground: 222.2 84% 4.9%;
                --primary: 262.1 83.3% 57.8%;
                --primary-foreground: 210 40% 98%;
                --border: 214.3 31.8% 91.4%;
            }
            body { 
                margin: 0; 
                padding: 0;
                background-color: white;
                -webkit-print-color-adjust: exact !important; 
                print-color-adjust: exact !important;
                font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
            }
            a {
                color: #60a5fa !important;
                text-decoration: none !important;
                cursor: pointer !important;
            }
            ul, p, h1, h2, h3, li, div { 
                page-break-inside: avoid; 
            }
            #printable-resume-content {
                width: 100% !important;
            }
        </style>
      </head>
      
      <body class="bg-white text-black">
        ${htmlContent}
      </body>
    </html>
  `;

  await page.setContent(fullHtml, {
    waitUntil: "networkidle0",
    timeout: 60000,
  });

  await page.emulateMediaType("screen");

  // 2. ADD MARGINS HERE (This affects PDF ONLY)
  const pdfBuffer = await page.pdf({
    format: "A4",
    printBackground: true,
    // This adds ~0.6 inch white border around the entire PDF
    margin: { 
        top: "15mm", 
        bottom: "15mm", 
        left: "15mm", 
        right: "15mm" 
    }, 
  });

  await browser.close();
  return pdfBuffer;
};