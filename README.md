# Creative Developer Portfolio

A modern, responsive portfolio website inspired by [dunks1980.com](https://dunks1980.com/) featuring dark aesthetics, smooth animations, and clean typography.

## 🚀 Features

- **Typing Animation**: Hero section with custom typing effect
- **Smooth Animations**: Framer Motion powered scroll-triggered animations
- **Dark Theme**: Clean dark navy/black design with neon cyan accents
- **Responsive Design**: Optimized for all screen sizes
- **Interactive Modal**: Project details displayed in elegant overlays
- **Modern Typography**: Montserrat font family for clean, professional look
- **Performance Optimized**: Fast loading with lazy loading and optimized animations

## 🛠️ Tech Stack

- **Frontend**: React.js 18
- **Styling**: Tailwind CSS with JIT mode
- **Animations**: Framer Motion
- **Typography**: Google Fonts (Montserrat)
- **Build Tool**: Create React App

## 🎨 Design Elements

### Color Palette
- **Primary Dark**: `#0a0a0a` - Main background
- **Secondary Dark**: `#1a1a1a` - Card backgrounds
- **Accent Cyan**: `#00ffff` - Primary accent color
- **Accent Blue**: `#00d4ff` - Secondary accent color
- **Text Primary**: `#ffffff` - Main text color
- **Text Secondary**: `#a0a0a0` - Secondary text color

### Typography
- **Font Family**: Montserrat (300, 400, 500, 600, 700, 800, 900)
- **Headings**: Bold, large scale typography
- **Body Text**: Light weight for readability

## 📁 Project Structure

```
src/
├── components/
│   ├── Hero.jsx          # Hero section with typing animation
│   ├── Projects.jsx      # Project showcase grid
│   ├── Modal.jsx         # Project detail modal
│   └── Footer.jsx        # Footer with social links
├── App.js                # Main application component
├── index.js              # React entry point
└── index.css             # Global styles and Tailwind imports
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd portfolio-dunks1980-clone
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000` to view the portfolio

### Build for Production

```bash
npm run build
```

This creates a `build` folder with optimized production files.

## ✨ Key Components

### Hero Section
- Custom typing animation effect
- Gradient background with decorative elements
- Smooth scroll indicator
- Call-to-action buttons

### Projects Grid
- Responsive card layout
- Scroll-triggered animations with staggered delays
- Hover effects and interactions
- Technology tags for each project

### Project Modal
- Full-screen overlay with project details
- Animated content reveals
- Project screenshots placeholder
- Action buttons for live demo and source code

### Footer
- Social media links
- Quick navigation
- Back to top functionality
- Animated decorative elements

## 🎯 Customization

### Adding Projects
Edit the `projects` array in `src/components/Projects.jsx`:

```javascript
const projects = [
  {
    id: 1,
    title: "Your Project Title",
    category: "Project Category",
    description: "Brief description...",
    technologies: ["React", "Node.js", "MongoDB"],
    details: "Detailed description..."
  }
  // Add more projects...
];
```

### Updating Personal Information
- Modify the typing text in `src/components/Hero.jsx`
- Update contact information in email links
- Change social media links in `src/components/Footer.jsx`

### Color Customization
Update colors in `tailwind.config.js`:

```javascript
colors: {
  'primary-dark': '#your-color',
  'accent-cyan': '#your-accent-color',
  // ... other colors
}
```

## 📱 Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px  
- **Desktop**: > 1024px

## 🔧 Performance Features

- Font preloading for faster text rendering
- Optimized animations with `once: true` for scroll triggers
- Lazy loading for better initial page load
- Minimal bundle size with tree shaking

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📧 Contact

For questions or suggestions, feel free to reach out:
- Email: contact@example.com
- Portfolio: [Your Portfolio URL]

---

**Built with ❤️ and inspired by the clean aesthetics of dunks1980.com** 