import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./client/index.html", "./client/src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },
        popover: {
          DEFAULT: "var(--popover)",
          foreground: "var(--popover-foreground)",
        },
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
        },
        destructive: {
          DEFAULT: "var(--destructive)",
          foreground: "var(--destructive-foreground)",
        },
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
        chart: {
          "1": "var(--chart-1)",
          "2": "var(--chart-2)",
          "3": "var(--chart-3)",
          "4": "var(--chart-4)",
          "5": "var(--chart-5)",
        },
        sidebar: {
          DEFAULT: "var(--sidebar-background)",
          foreground: "var(--sidebar-foreground)",
          primary: "var(--sidebar-primary)",
          "primary-foreground": "var(--sidebar-primary-foreground)",
          accent: "var(--sidebar-accent)",
          "accent-foreground": "var(--sidebar-accent-foreground)",
          border: "var(--sidebar-border)",
          ring: "var(--sidebar-ring)",
        },
      },
      // === NOVAS ADIÇÕES PARA O TAILWIND.CONFIG.TS AQUI ===
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        // Animações da Welcome Screen e efeitos 3D
        logoRotateY: {
          '0%, 100%': { transform: 'rotateY(-5deg)' },
          '50%': { transform: 'rotateY(5deg)' },
        },
        logoPulseScale: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.02)' },
        },
        reflectionFloatY: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(10px)' },
        },
        reflectionSkewX: {
          '0%, 100%': { transform: 'skewX(-2deg)' },
          '50%': { transform: 'skewX(2deg)' },
        },
        reflectionHueRotate: {
          '0%': { filter: 'hue-rotate(0deg)' },
          '100%': { filter: 'hue-rotate(360deg)' },
        },
        reflectionOpacityPulse: {
          '0%, 100%': { opacity: '0.5' },
          '50%': { opacity: '0.2' },
        },
        neonPulse: {
          '0%': { 'text-shadow': '0 0 10px rgba(139, 92, 246, 0.8), 0 0 20px rgba(139, 92, 246, 0.6), 0 0 30px rgba(139, 92, 246, 0.4)' },
          '50%': { 'text-shadow': '0 0 15px rgba(139, 92, 246, 0.9), 0 0 30px rgba(139, 92, 246, 0.7), 0 0 45px rgba(139, 92, 246, 0.5)' },
          '100%': { 'text-shadow': '0 0 10px rgba(139, 92, 246, 0.8), 0 0 20px rgba(139, 92, 246, 0.6), 0 0 30px rgba(139, 92, 246, 0.4)' },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        // Novas animações
        "logo-rotate": "logoRotateY 4s ease-in-out infinite alternate",
        "logo-pulse": "logoPulseScale 1.5s ease-in-out infinite alternate",
        "reflection-float": "reflectionFloatY 2.5s ease-in-out infinite alternate",
        "reflection-skew": "reflectionSkewX 3s ease-in-out infinite alternate",
        "reflection-hue": "reflectionHueRotate 5s linear infinite",
        "reflection-opacity": "reflectionOpacityPulse 2s ease-in-out infinite alternate",
        "neon-pulse": "neonPulse 2s ease-in-out infinite alternate",
      },
      boxShadow: {
        '3d-deep': '0 10px 20px rgba(0, 0, 0, 0.2), 0 20px 40px rgba(0, 0, 0, 0.15), 0 40px 80px rgba(0, 0, 0, 0.1)',
        '3d-hover': '0 15px 30px rgba(59, 130, 246, 0.3), 0 30px 60px rgba(59, 130, 246, 0.25), 0 60px 120px rgba(59, 130, 246, 0.2)',
      },
      dropShadow: {
        '3d': '0 2px 4px rgba(0, 0, 0, 0.1), 0 4px 8px rgba(0, 0, 0, 0.08), 0 8px 16px rgba(0, 0, 0, 0.05)',
        '3d-hover': '0 3px 6px rgba(59, 130, 246, 0.2), 0 6px 12px rgba(59, 130, 246, 0.15), 0 12px 24px rgba(59, 130, 246, 0.1)',
      },
      // === FIM DAS NOVAS ADIÇÕES ===
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
} satisfies Config;