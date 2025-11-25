# RioFolio - Modern Creative Portfolio

![RioFolio Banner](https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop)

A high-performance, dark-themed personal portfolio website built with modern web technologies. Designed to showcase creative engineering work with fluid animations, glassmorphism UI, and technical aesthetics.

## 🚀 Features

-   **Advanced Animations**: Powered by Framer Motion for scroll reveals, text scrambling, and smooth page transitions.
-   **System Boot Splash Screen**: A unique, hacker-style terminal boot sequence.
-   **Interactive UI**: Custom magnetic cursor, hover effects, and parallax backgrounds.
-   **Responsive Design**: Fully responsive layout optimized for mobile, tablet, and desktop.
-   **Dark Mode**: A sleek, professional dark theme using Zinc colors with Emerald and Violet accents.
-   **Dynamic Filtering**: Project section with category filtering.
-   **Bento Grid Layout**: Modern grid layouts for skills and expertise.

## 🛠️ Tech Stack

-   **Framework**: React 18 + TypeScript
-   **Styling**: Tailwind CSS
-   **Animations**: Framer Motion
-   **Icons**: Lucide React
-   **Build Tool**: Vite (recommended for local dev)

## 📂 Project Structure

```
src/
├── components/       # UI Components
│   ├── Hero.tsx      # Landing section with scramble text
│   ├── About.tsx     # Bio section with sticky image
│   ├── Skills.tsx    # Technical expertise bento grid
│   ├── Projects.tsx  # Featured works with filtering
│   ├── Navbar.tsx    # Floating navigation
│   └── ...
├── types.ts          # TypeScript interfaces
├── App.tsx           # Main application entry
└── main.tsx          # DOM rendering
```

## ⚡ Getting Started

1.  **Clone the repository**
    ```bash
    git clone https://github.com/yourusername/riofolio.git
    cd riofolio
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Run development server**
    ```bash
    npm run dev
    ```

4.  **Build for production**
    ```bash
    npm run build
    ```

## 🎨 Customization

-   **Colors**: Edit `tailwind.config` inside `index.html` (or `tailwind.config.js`) to change `accent` and `secondary` colors.
-   **Data**: Update `components/Projects.tsx`, `components/Skills.tsx`, and `components/Education.tsx` with your own data.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
