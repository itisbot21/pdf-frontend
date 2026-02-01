import "./globals.css";

export const metadata = {
  
  metadataBase: new URL("https://pdf.olivez.in"),

  title: {
    default: "PDF to Image & Image to PDF Converter - Free Online PDF Tools",
    template: "%s | Pdf Lover",
  },

  description:  "Pdf Lover is a fast, free online PDF toolkit. Convert PDF to images and images to PDF online for free. Fast, secure PDF tools with no signup and no watermark.",

  keywords: [
    "pdf to image",
    "image to pdf",
    "pdf tools online",
    "free pdf converter",
    "pdf to png",
    "online pdf tools",
    "Pdf lover",
    "pdf to jpeg",
  ],

    authors: [{ name: "Olivez" }],

  creator: "Olivez",

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },

  openGraph: {
    title: "Pdf Lover - Free Online PDF Tools",
    description:
      "Convert PDFs to images and use powerful PDF tools online for free. Fast, secure, and simple.",
    url: "https://pdf.olivez.in",
    siteName: "Pdf Lover",
    images: [
      {
        url: "/og-image.png", // put this in /public
        width: 1200,
        height: 630,
        alt: "Pdf Lover Free PDF Tools",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Pdf Lover - Free Online PDF Tools",
    description:
      "Free online PDF tools to convert PDFs to images quickly and securely.",
    images: ["/og-image.png"],
  },

  icons: {
    icon: "/favicon.svg",
  },

};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
