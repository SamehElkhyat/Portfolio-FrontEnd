import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  QrCode,
  Download,
  Share,
  Mail,
  Phone,
  Link,
  User,
  MapPin,
  Palette,
} from "lucide-react";
import QRCode from "react-qr-code"; 

const QRContactCard = () => {
  const [activeTab, setActiveTab] = useState("contact");
  const [qrData, setQrData] = useState("");
  const [qrStyle, setQrStyle] = useState("default");
  const [isGenerating, setIsGenerating] = useState(false);

  const contactInfo = {
    name: "Sameh Saleh El-khayat",
    title: "Frontend Developer",
    email: "sameh@example.com",
    phone: "+20 (10) 123-4567",
    website: "https://sameh-portfolio.com",
    location: "Cairo, Egypt",
    linkedin: "https://linkedin.com/in/sameh",
    github: "https://github.com/sameh",
  };

  const qrTypes = [
    {
      id: "contact",
      name: "vCard Contact",
      icon: User,
      description: "Save to contacts",
      color: "from-blue-500 to-cyan-500",
    },
    {
      id: "portfolio",
      name: "Portfolio Link",
      icon: Link,
      description: "Visit portfolio",
      color: "from-purple-500 to-pink-500",
    },
    {
      id: "email",
      name: "Email Me",
      icon: Mail,
      description: "Send email",
      color: "from-green-500 to-emerald-500",
    },
    {
      id: "phone",
      name: "Call Me",
      icon: Phone,
      description: "Make call",
      color: "from-orange-500 to-red-500",
    },
  ];

  const qrStyles = [
    {
      id: "default",
      name: "Default",
      colors: { fg: "#000000", bg: "#ffffff" },
    },
    { id: "blue", name: "Blue Tech", colors: { fg: "#3b82f6", bg: "#f1f5f9" } },
    { id: "purple", name: "Purple", colors: { fg: "#8b5cf6", bg: "#faf5ff" } },
    { id: "dark", name: "Dark Mode", colors: { fg: "#ffffff", bg: "#1e293b" } },
    {
      id: "gradient",
      name: "Colorful",
      colors: { fg: "#059669", bg: "#ecfdf5" },
    },
  ];

  useEffect(() => {
    generateQRData();
  }, [activeTab]);

  const generateQRData = () => {
    setIsGenerating(true);

    setTimeout(() => {
      let data = "";

      switch (activeTab) {
        case "contact":
          data = `BEGIN:VCARD
VERSION:3.0
FN:${contactInfo.name}
TITLE:${contactInfo.title}
ORG:Frontend Developer
EMAIL:${contactInfo.email}
TEL:${contactInfo.phone}
URL:${contactInfo.website}
ADR:;;${contactInfo.location};;;;
END:VCARD`;
          break;
        case "portfolio":
          data = contactInfo.website;
          break;
        case "email":
          data = `mailto:${contactInfo.email}?subject=Portfolio Inquiry&body=Hi Sameh, I found your portfolio and would like to discuss...`;
          break;
        case "phone":
          data = `tel:${contactInfo.phone}`;
          break;
        default:
          data = contactInfo.website;
      }

      setQrData(data);
      setIsGenerating(false);
    }, 500);
  };

  const downloadQR = () => {
    const svg = document.getElementById("qr-code");
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      const pngFile = canvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");
      downloadLink.download = `sameh-${activeTab}-qr.png`;
      downloadLink.href = pngFile;
      downloadLink.click();
    };

    img.src = "data:image/svg+xml;base64," + btoa(svgData);
  };

  const shareQR = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Sameh's ${qrTypes.find((t) => t.id === activeTab)?.name}`,
          text: "Check out this QR code from Sameh's portfolio!",
          url: window.location.href,
        });
      } catch (error) {
        console.log("Error sharing:", error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert("Portfolio link copied to clipboard!");
    }
  };

  const currentStyle =
    qrStyles.find((s) => s.id === qrStyle)?.colors || qrStyles[0].colors;
  const activeQRType = qrTypes.find((t) => t.id === activeTab);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 hover:border-blue-500/50 transition-all duration-300"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <QrCode className="w-5 h-5 text-white" aria-hidden="true" />
          </div>
          <div>
            <h3 className="text-white font-semibold text-lg">
              QR Contact Generator
            </h3>
            <p className="text-gray-400 text-sm">Instant contact sharing</p>
          </div>
        </div>

        {/* Style Selector */}
        <div className="flex items-center gap-2">
          <Palette className="w-4 h-4 text-gray-400" />
          <select
            value={qrStyle}
            onChange={(e) => setQrStyle(e.target.value)}
            className="bg-slate-800/50 border border-slate-700 rounded-lg px-3 py-1 text-white text-sm focus:border-blue-500 focus:outline-none"
          >
            {qrStyles.map((style) => (
              <option key={style.id} value={style.id}>
                {style.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* QR Type Selection */}
        <div className="space-y-4">
          <h4 className="text-white font-semibold mb-4">Choose QR Type</h4>
          {qrTypes.map((type) => (
            <motion.button
              key={type.id}
              onClick={() => setActiveTab(type.id)}
              className={`w-full p-4 rounded-xl border transition-all duration-300 text-left ${
                activeTab === type.id
                  ? "bg-blue-500/10 border-blue-500/50"
                  : "bg-slate-800/30 border-slate-700/50 hover:border-slate-600/50"
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-lg bg-gradient-to-r ${type.color} flex items-center justify-center`}
                >
                  <type.icon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h5 className="text-white font-medium">{type.name}</h5>
                  <p className="text-gray-400 text-sm">{type.description}</p>
                </div>
              </div>
            </motion.button>
          ))}

          {/* Contact Info Preview */}
          <div className="mt-6 p-4 bg-slate-800/30 rounded-xl border border-slate-700/50">
            <h5 className="text-white font-medium mb-3">Contact Information</h5>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2 text-gray-300">
                <User className="w-4 h-4 text-blue-400" />
                <span>{contactInfo.name}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <Mail className="w-4 h-4 text-green-400" />
                <span>{contactInfo.email}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <Phone className="w-4 h-4 text-orange-400" />
                <span>{contactInfo.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <MapPin className="w-4 h-4 text-purple-400" />
                <span>{contactInfo.location}</span>
              </div>
            </div>
          </div>
        </div>

        {/* QR Code Display */}
        <div className="flex flex-col items-center">
          <div className="mb-4">
            <h4 className="text-white font-semibold text-center mb-2">
              {activeQRType?.name} QR Code
            </h4>
            <p className="text-gray-400 text-sm text-center">
              Scan with your phone camera
            </p>
          </div>

          {/* QR Code Container */}
          <div className="relative">
            <AnimatePresence mode="wait">
              {isGenerating ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="w-64 h-64 bg-slate-800/50 rounded-xl flex items-center justify-center"
                >
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                </motion.div>
              ) : (
                <motion.div
                  key="qr-code"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="p-4 bg-white rounded-xl shadow-lg"
                  style={{ backgroundColor: currentStyle.bg }}
                >
                  <QRCode
                    id="qr-code"
                    value={qrData}
                    size={200}
                    fgColor={currentStyle.fg}
                    bgColor={currentStyle.bg}
                    level="M"
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* QR Code Actions */}
            <div className="flex gap-3 mt-6 justify-center">
              <motion.button
                onClick={downloadQR}
                className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm font-medium transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={isGenerating}
              >
                <Download className="w-4 h-4" />
                Download
              </motion.button>

              <motion.button
                onClick={shareQR}
                className="flex items-center gap-2 px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg text-sm font-medium transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Share className="w-4 h-4" />
                Share
              </motion.button>
            </div>
          </div>

          {/* Usage Instructions */}
          <div className="mt-6 p-3 bg-slate-800/30 rounded-lg border border-slate-700/50 max-w-xs">
            <p className="text-gray-300 text-xs text-center leading-relaxed">
              📱 Open your phone camera and point it at the QR code.
              <br />✨ Tap the notification to {activeQRType?.description}.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default QRContactCard;
