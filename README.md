# 🚀 Anurag Vaidhya - Professional Portfolio Website

<div align="center">

[![Portfolio Website](https://img.shields.io/badge/Portfolio-Live-brightgreen?style=for-the-badge&logo=vercel)](https://anuragvaidhya.com)
[![React](https://img.shields.io/badge/React-18.2.0-blue?style=for-the-badge&logo=react)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-16.20.2-green?style=for-the-badge&logo=node.js)](https://nodejs.org/)
[![License](https://img.shields.io/badge/License-LGPL--3.0-yellow?style=for-the-badge)](https://www.gnu.org/licenses/lgpl-3.0.en.html)

**A modern, responsive portfolio website showcasing 14+ years of engineering leadership and technical expertise**

[🌐 Live Demo](https://anuragvaidhya.com) • [📧 Contact](mailto:anuragvaidhya786@gmail.com) • [💼 LinkedIn](https://linkedin.com/in/anuragvaidhya)

</div>

---

## 📸 Preview

[![Site Preview](/public/social-image.png)](https://anuragvaidhya.com)

---

## ✨ Features

### 🎨 **Modern Design & UX**
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Clean UI/UX**: Professional, minimalist design with excellent typography
- **Smooth Animations**: Intersection Observer API for scroll-triggered animations
- **Glassmorphism Effects**: Modern visual elements with backdrop blur
- **Accessibility**: WCAG compliant with proper ARIA labels and keyboard navigation

### 🏗️ **Architecture & Performance**
- **React 18**: Latest React features with concurrent rendering
- **Lazy Loading**: Code splitting for optimal performance
- **Error Boundaries**: Graceful error handling and recovery
- **PWA Ready**: Service worker and manifest for app-like experience
- **SEO Optimized**: Meta tags, Open Graph, and structured data

### 📱 **Sections & Content**
- **Hero/Landing**: Dynamic introduction with professional branding
- **About Me**: Personal story, professional profile, and key highlights
- **Experience**: Interactive timeline with company details and achievements
- **Skills**: Comprehensive technical skills with proficiency levels
- **Leadership**: Management philosophy and team development approach
- **Projects**: Featured work and technical achievements
- **Responsibilities**: Core duties and professional accomplishments
- **Interests**: Personal interests and values

### 🛠️ **Technical Features**
- **Modern React Patterns**: Hooks, Context API, and functional components
- **State Management**: Global state with Context + useReducer
- **Theme System**: Light/dark mode with system preference detection
- **Performance Monitoring**: Custom hooks for analytics and performance tracking
- **Form Handling**: Advanced form validation and submission
- **API Integration**: GitHub API for dynamic project data

---

## 🛠️ Technology Stack

### **Frontend Framework**
- **React 18.2.0** - Modern React with concurrent features
- **React Router v6** - Client-side routing with lazy loading
- **React Bootstrap** - Responsive UI components

### **Styling & Design**
- **CSS3** - Modern CSS with Grid, Flexbox, and animations
- **Bootstrap 5** - Responsive grid system and utilities
- **Font Awesome 6** - Professional icon library
- **Google Fonts** - Typography optimization

### **Development Tools**
- **Create React App** - Build toolchain and development server
- **ESLint** - Code quality and consistency
- **Prettier** - Code formatting
- **Webpack** - Module bundling and optimization

### **Performance & SEO**
- **React.lazy()** - Code splitting and lazy loading
- **Intersection Observer** - Efficient scroll animations
- **Web Vitals** - Performance monitoring
- **Meta Tags** - SEO and social media optimization

### **Deployment & Hosting**
- **GitHub Pages** - Static site hosting
- **Custom Domain** - Professional domain configuration
- **CI/CD** - Automated deployment pipeline

---

## 🚀 Quick Start

### **Prerequisites**
- **Node.js** 16.20.2 or higher
- **npm** or **yarn** package manager
- **Git** for version control

### **Installation**

1. **Clone the repository**
   ```bash
   git clone https://github.com/anuu1989/portfolio.git
   cd portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm start
   ```

4. **Open in browser**
   ```
   http://localhost:3000
   ```

### **Build for Production**
```bash
npm run build
```

### **Deploy to GitHub Pages**
```bash
npm run deploy
```

---

## ⚙️ Configuration

### **Personal Information**
Edit `src/editable-stuff/configurations.json`:

```json
{
  "aboutHeading": "Your Name",
  "aboutDescription": "Your professional summary",
  "showInstaProfilePic": false,
  "instaLink": "https://www.instagram.com/",
  "instaUsername": "yourusername",
  "showNavigationbar": true,
  "showBlog": false,
  "icons": [
    {
      "id": 0,
      "url": "https://github.com/yourusername",
      "image": "fab fa-github"
    }
  ]
}
```

### **Resume**
Replace `src/editable-stuff/asset/Resume/resume.pdf` with your resume.

### **Profile Image**
Replace `src/editable-stuff/asset/images/profile.jpg` with your photo.

### **Company Logos**
Add company logos to `src/editable-stuff/asset/images/`:
- `cognizant.jpg`
- `wipro.jpg`
- `accenture.jpg`
- `thoughtworks.png`

---

## 📁 Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── home/            # Page-specific components
│   │   ├── AboutMe.jsx
│   │   ├── Experience.jsx
│   │   ├── Skills.jsx
│   │   ├── Leadership.jsx
│   │   ├── Footer.jsx
│   │   └── ...
│   ├── Navbar.jsx       # Navigation component
│   ├── LoadingSpinner.jsx
│   └── ErrorBoundary.jsx
├── pages/               # Page components
│   ├── HomePage.jsx
│   ├── AboutPage.jsx
│   ├── ExperiencePage.jsx
│   └── ...
├── context/             # React Context providers
│   ├── AppContext.jsx
│   └── ThemeContext.jsx
├── hooks/               # Custom React hooks
│   ├── useAnalytics.js
│   ├── usePerformance.js
│   └── useForm.js
├── services/            # API services
│   └── api.js
├── utils/               # Utility functions
│   ├── helpers.js
│   ├── constants.js
│   └── validation.js
├── styles/              # CSS modules
│   ├── animations.css
│   ├── components.css
│   ├── sections.css
│   ├── navbar.css
│   └── light-theme.css
├── editable-stuff/      # Configurable content
│   ├── configurations.json
│   └── asset/
│       ├── Resume/
│       └── images/
└── App.js              # Main application component
```

---

## 🎨 Customization Guide

### **Colors & Branding**
The website uses a consistent color palette defined in CSS variables:

```css
:root {
  --primary-color: #667eea;
  --secondary-color: #764ba2;
  --accent-color: #f093fb;
  --text-primary: #2d3748;
  --text-secondary: #718096;
}
```

### **Adding New Sections**
1. Create component in `src/components/home/`
2. Add page in `src/pages/`
3. Update routing in `src/App.js`
4. Add navigation link in `src/components/Navbar.jsx`

### **Modifying Skills**
Edit the skills data in `src/components/home/Skills.jsx`:

```javascript
const skillCategories = [
  {
    id: 'programming',
    title: "Programming & Development",
    skills: [
      { 
        name: "JavaScript", 
        level: 90, 
        color: "#f7df1e",
        experience: "10+ years",
        projects: 30
      }
    ]
  }
];
```

### **Updating Experience**
Modify experience data in `src/components/home/Experience.jsx`:

```javascript
const experiences = [
  {
    id: 1,
    company: "Company Name",
    logo: CompanyLogo,
    position: "Your Position",
    duration: "Start - End",
    description: "Role description",
    technologies: ["Tech1", "Tech2"]
  }
];
```

---

## 🔧 Advanced Configuration

### **Environment Variables**
Create `.env` file for environment-specific settings:

```env
REACT_APP_GITHUB_USERNAME=yourusername
REACT_APP_ANALYTICS_ID=your-analytics-id
REACT_APP_CONTACT_EMAIL=your@email.com
```

### **Performance Optimization**
- **Image Optimization**: Use WebP format for better compression
- **Code Splitting**: Implement route-based code splitting
- **Caching**: Configure service worker for offline support
- **Bundle Analysis**: Use `npm run analyze` to check bundle size

### **SEO Enhancement**
- Update meta tags in `public/index.html`
- Add structured data for better search visibility
- Optimize images with alt tags and proper sizing
- Implement sitemap.xml and robots.txt

---

## 📱 Responsive Design

The website is fully responsive with breakpoints:

- **Desktop**: 1200px and above
- **Laptop**: 992px - 1199px
- **Tablet**: 768px - 991px
- **Mobile**: Below 768px

### **Mobile-First Approach**
- Touch-friendly navigation
- Optimized font sizes and spacing
- Compressed images for faster loading
- Simplified layouts for small screens

---

## 🚀 Deployment Options

### **GitHub Pages (Recommended)**
```bash
npm run deploy
```

### **Netlify**
1. Connect GitHub repository
2. Set build command: `npm run build`
3. Set publish directory: `build`

### **Vercel**
```bash
npm install -g vercel
vercel --prod
```

### **Custom Server**
```bash
npm run build
# Upload build/ folder to your server
```

---

## 🔍 SEO & Analytics

### **Meta Tags**
The website includes comprehensive meta tags:
- Open Graph for social media sharing
- Twitter Cards for Twitter integration
- Structured data for search engines

### **Performance Monitoring**
- Google Analytics integration
- Web Vitals tracking
- Error monitoring and reporting

### **Accessibility**
- WCAG 2.1 AA compliance
- Screen reader compatibility
- Keyboard navigation support
- High contrast color ratios

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. **Fork the repository**
2. **Create feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit changes**: `git commit -m 'Add amazing feature'`
4. **Push to branch**: `git push origin feature/amazing-feature`
5. **Open Pull Request**

### **Development Guidelines**
- Follow React best practices
- Write clean, documented code
- Test on multiple devices and browsers
- Maintain responsive design principles

---

## 📄 License

This project is licensed under the **LGPL-3.0 License** - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Original Template**: Based on work by [@hashirshoaeb](https://github.com/hashirshoaeb/home)
- **React Team**: For the amazing React framework
- **Bootstrap Team**: For the responsive CSS framework
- **Font Awesome**: For the comprehensive icon library
- **Kiro AI**: For development assistance and modernization

---

## 📞 Contact & Support

<div align="center">

**Anurag Vaidhya**  
Senior Engineering Leader & Infrasmith

[![Email](https://img.shields.io/badge/Email-anuragvaidhya786%40gmail.com-red?style=for-the-badge&logo=gmail)](mailto:anuragvaidhya786@gmail.com)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-anuragvaidhya-blue?style=for-the-badge&logo=linkedin)](https://linkedin.com/in/anuragvaidhya)
[![GitHub](https://img.shields.io/badge/GitHub-anuu1989-black?style=for-the-badge&logo=github)](https://github.com/anuu1989)
[![Website](https://img.shields.io/badge/Website-anuragvaidhya.com-green?style=for-the-badge&logo=vercel)](https://anuragvaidhya.com)

**Location**: Melbourne, Australia  
**Experience**: 14+ Years in Technology Leadership

</div>

---

<div align="center">

**⭐ Star this repository if you found it helpful!**

Made with ❤️ by [Anurag Vaidhya](https://anuragvaidhya.com)

</div>