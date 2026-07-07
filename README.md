# Developer Portfolio - M Abdullah

A sleek, modern, and professional dark-themed portfolio website tailored for showcasing software engineering skillsets, core competencies, experience, projects, and academics.

## 🚀 Live Demo
You can view the active live demo of the featured final year project here:
- **CollabCode FYP**: [https://collabcode-beige.vercel.app/](https://collabcode-beige.vercel.app/)

---

## 🎨 Tech Stack & Design Features

- **Core Structure**: Semantic HTML5.
- **Styling**: Vanilla CSS3 + Tailwind CSS (via Play CDN).
- **Animations**: Custom `IntersectionObserver` scroll reveals, floating background auroras, moving text gradients, scale transitions, and active-nav indicators.
- **Interactivity**: Fully functional responsive mobile drawer menu, form validation with customized successful submission toast notifications.
- **Design Pattern**: Glassmorphism (using backdrop blur filters, white transparent borders, and localized indigo/violet/emerald shadow glow gradients).

---

## 📂 Project Structure

```bash
Portfolio/
│
├── index.html     # Main page structure (Header, Hero, About, Skills, Timeline, Projects, Education, Contact)
├── style.css      # Custom animations, keyframes, scrollbar, layout extensions
├── app.js         # Scroll animations observer, mobile menu, toast notification framework, form validations
└── README.md      # Project details & guidelines
```

---

## 💻 Running the Project Locally

Since this codebase is built with modular Vanilla HTML, CSS, and JS (utilizing modern CDNs), you do not need any package installation or bundler compilation overhead:

### Method 1: Double Click
1. Clone or download this repository.
2. Navigate to the folder.
3. Double-click `index.html` to open it in your browser.

### Method 2: Live Server (Recommended)
If you're using VS Code:
1. Open the folder in VS Code.
2. Install the **Live Server** extension.
3. Click **Go Live** at the bottom-right corner.

Alternatively, run:
```bash
npx live-server
```

---

## 🌐 Deployment Instructions

### GitHub Pages
1. Push this code to a public GitHub repository.
2. Go to **Settings** > **Pages** inside your repository.
3. Select `Branch: main`, folder `/ (root)`, and click **Save**.
4. Your site will be live in a couple of minutes!

### Vercel / Netlify
1. Import your repository into Vercel or Netlify.
2. Since there is no build step required, leave the build settings default (blank/empty).
3. Click **Deploy**.
