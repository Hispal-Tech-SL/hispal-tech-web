import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        'sans': ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        'inter': ['Inter', 'sans-serif'],
        'display': ['Sora', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        /* Hispal Tech Brand Colors */
        'hispaltech-navy': "hsl(var(--hispaltech-navy))",
        'hispaltech-blue': "hsl(var(--hispaltech-blue))",
        'hispaltech-light-blue': "hsl(var(--hispaltech-light-blue))",
        'hispaltech-dark-navy': "hsl(var(--hispaltech-dark-navy))",
        
        /* Hispal GYM landing (values only defined inside .hispalgym) */
        ink: { DEFAULT: "hsl(var(--gym-ink))", foreground: "hsl(var(--gym-ink-foreground))" },
        device: "hsl(var(--gym-device))",
        screen: { DEFAULT: "hsl(var(--gym-screen))", foreground: "hsl(var(--gym-screen-foreground))" },
        'theme-lime': "hsl(var(--gym-theme-lime))",
        'theme-sky': "hsl(var(--gym-theme-sky))",

        /* Core Design System */
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        success: {
          DEFAULT: "hsl(var(--success))",
          foreground: "hsl(var(--success-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        'hispaltech': 'var(--shadow-hispaltech)',
        'blue': 'var(--shadow-blue)',
        'soft': '0 1px 2px hsl(26 20% 8% / 0.06), 0 12px 32px -12px hsl(26 20% 8% / 0.18)',
        'device': '0 40px 80px -30px hsl(26 20% 6% / 0.55), 0 0 0 1px hsl(26 10% 20% / 0.3)',
        'glow': '0 10px 40px -10px hsl(26 100% 50% / 0.55)',
      },
      backgroundImage: {
        'brand-glow': 'radial-gradient(60% 50% at 80% 20%, hsl(210 100% 45% / 0.14), transparent 70%), radial-gradient(40% 40% at 10% 90%, hsl(210 100% 45% / 0.08), transparent 70%)',
        'hero-glow': 'radial-gradient(60% 50% at 80% 20%, hsl(26 100% 50% / 0.22), transparent 70%), radial-gradient(40% 40% at 10% 90%, hsl(26 100% 50% / 0.10), transparent 70%)',
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "glow": {
          "0%": { boxShadow: "0 0 20px hsl(var(--hispaltech-blue) / 0.3)" },
          "100%": { boxShadow: "0 0 40px hsl(var(--hispaltech-blue) / 0.6)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "float": "float 3s ease-in-out infinite",
        "glow": "glow 2s ease-in-out infinite alternate",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
