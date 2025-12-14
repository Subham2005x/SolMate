# 🎨 Solmate - Visual Design Specifications

## Design Philosophy

**Solmate's design embodies trust, simplicity, and modern elegance.**

**Core Principles:**
- **Clarity First:** Every element has a clear purpose
- **Accessibility:** Design for all users, all abilities
- **Performance:** Beautiful, but never at the cost of speed
- **Mobile-First:** Excellence on every screen size

---

## 🎨 Color System

### Primary Palette (Blue)

**Use Case:** Trust, reliability, primary actions

```css
50:  #eff6ff  /* Subtle backgrounds */
100: #dbeafe  /* Light backgrounds */
200: #bfdbfe  /* Borders, dividers */
300: #93c5fd  /* Hover states */
400: #60a5fa  /* Active states */
500: #3b82f6  /* Interactive elements */
600: #2563eb  /* Primary CTAs ⭐ */
700: #1d4ed8  /* Hover states */
800: #1e40af  /* Dark backgrounds */
900: #1e3a8a  /* Darkest shade */
```

**Usage:**
- **#2563eb** → Primary buttons, links, brand elements
- **#1e40af** → Button hover states, dark gradients
- **#3b82f6** → Interactive elements, focus states

---

### Accent Colors

**Green (Success, Growth)**
```css
--secondary-500: #10b981  /* Features page hero */
--secondary-600: #059669  /* Success states */
```

**Purple (Innovation)**
```css
--accent-purple: #8b5cf6  /* How It Works hero */
```

**Orange (Energy)**
```css
--accent-orange: #f59e0b  /* About page hero */
```

**Pink (Creativity)**
```css
--accent-pink: #ec4899  /* Waitlist page hero */
```

**Page-Specific Heroes:**
- Home: Blue gradient
- Features: Green gradient
- How It Works: Purple gradient
- About: Orange gradient
- Waitlist: Pink gradient

---

### Neutral Palette (Grays)

```css
50:  #f9fafb  /* Alternate section backgrounds */
100: #f3f4f6  /* Card backgrounds */
200: #e5e7eb  /* Borders */
300: #d1d5db  /* Disabled states */
400: #9ca3af  /* Placeholder text */
500: #6b7280  /* Secondary text */
600: #4b5563  /* Active text */
700: #374151  /* Primary text (lighter) */
800: #1f2937  /* Footer background */
900: #111827  /* Primary text (darkest) */
```

---

### Semantic Colors

**Text Hierarchy:**
```css
--text-primary: #111827    /* Headlines, important text */
--text-secondary: #374151  /* Body text, descriptions */
--text-tertiary: #6b7280   /* Supporting text, captions */
--text-muted: #9ca3af      /* Disabled, placeholder */
```

**Backgrounds:**
```css
--bg-primary: #ffffff      /* Main content areas */
--bg-secondary: #f9fafb    /* Alternate sections */
--bg-tertiary: #f3f4f6     /* Cards, inputs */
```

**Borders:**
```css
--border-light: #f3f4f6    /* Subtle dividers */
--border-default: #e5e7eb  /* Standard borders */
--border-medium: #d1d5db   /* Emphasized borders */
--border-strong: #9ca3af   /* Strong emphasis */
```

---

### Contrast Ratios (WCAG Compliance)

| Combination | Ratio | Level |
|-------------|-------|-------|
| Primary text (#111827) on white | 16.03:1 | AAA ✨ |
| Secondary text (#374151) on white | 11.73:1 | AAA ✨ |
| Tertiary text (#6b7280) on white | 5.73:1 | AA ✓ |
| Primary blue (#2563eb) on white | 7.06:1 | AA Large ✓ |
| White on primary blue | 7.06:1 | AA Large ✓ |
| White on gray-900 (#111827) | 16.03:1 | AAA ✨ |

---

## 📝 Typography

### Font Family

```css
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 
             'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 
             'Fira Sans', 'Droid Sans', 'Helvetica Neue', 
             sans-serif;
```

**Why System Fonts?**
- ⚡ Zero download time
- 🎨 Native OS appearance
- 📱 Better mobile performance
- ✨ Instant rendering

---

### Type Scale

**Responsive Sizing (using clamp):**

```css
h1: clamp(2rem, 5vw, 3rem)         /* 32-48px */
h2: clamp(1.75rem, 4vw, 2.5rem)    /* 28-40px */
h3: clamp(1.25rem, 3vw, 1.75rem)   /* 20-28px */
h4: 1.125rem                        /* 18px */
h5: 1rem                            /* 16px */
body: 16px                          /* Base size */
small: 0.875rem                     /* 14px */
tiny: 0.75rem                       /* 12px */
```

---

### Font Weights

```css
400: Regular  /* Body text */
500: Medium   /* Navigation, subtle emphasis */
600: Semibold /* Subheadings */
700: Bold     /* Headings */
800: Extrabold /* Hero titles */
```

**Usage:**
- **800:** Hero titles only
- **700:** H1, H2, H3, important headings
- **600:** H4, card titles, emphasized text
- **500:** Navigation links, labels
- **400:** Body text, descriptions

---

### Line Heights

```css
Headlines (H1-H3): 1.1-1.2  /* Tight, impactful */
Body text: 1.6-1.7          /* Readable, comfortable */
Buttons: 1.0                /* Vertically centered */
```

---

### Letter Spacing

```css
Large headings (48px+): -0.03em  /* Tighter tracking */
Headings (20-48px): -0.02em      /* Slightly tighter */
Body text: 0                     /* Default */
All caps: 0.05em                 /* Wider tracking */
```

---

## 📏 Spacing System

### 8px Grid Scale

```css
--space-1:  4px   (0.25rem)   /* Minimal spacing */
--space-2:  8px   (0.5rem)    /* Tight spacing */
--space-3:  12px  (0.75rem)   /* Small spacing */
--space-4:  16px  (1rem)      /* Default spacing ⭐ */
--space-5:  20px  (1.25rem)   /* Medium spacing */
--space-6:  24px  (1.5rem)    /* Comfortable spacing */
--space-8:  32px  (2rem)      /* Large spacing */
--space-10: 40px  (2.5rem)    /* XL spacing */
--space-12: 48px  (3rem)      /* Section spacing */
--space-16: 64px  (4rem)      /* Large section */
--space-20: 80px  (5rem)      /* Desktop sections ⭐ */
--space-24: 96px  (6rem)      /* Hero sections */
```

---

### Component Spacing

**Cards:**
```css
Padding: var(--space-8)  /* 32px */
Gap: var(--space-8)      /* 32px between cards */
```

**Buttons:**
```css
Padding: var(--space-3) var(--space-5)  /* 12px 20px */
Large: var(--space-4) var(--space-8)    /* 16px 32px */
```

**Sections:**
```css
Desktop: var(--space-20)  /* 80px top/bottom */
Mobile: var(--space-16)   /* 64px top/bottom */
```

**Containers:**
```css
Padding: var(--space-6)  /* 24px (desktop) */
Mobile: var(--space-4)   /* 16px (mobile) */
```

---

## 🔘 Border Radius

```css
--radius-sm: 4px    /* Small elements, tags */
--radius-md: 8px    /* Buttons, inputs ⭐ */
--radius-lg: 12px   /* Cards */
--radius-xl: 16px   /* Large cards, sections */
--radius-full: 50%  /* Circular elements */
```

**Usage:**
- **8px:** Buttons, form inputs, navigation
- **12px:** Benefit cards, feature cards
- **16px:** Hero sections, large CTAs
- **Full:** Step numbers, avatars, badges

---

## 🌑 Shadows

```css
--shadow-sm: 0 1px 2px rgba(0,0,0,0.05)     /* Subtle */
--shadow-md: 0 4px 6px rgba(0,0,0,0.1)      /* Cards ⭐ */
--shadow-lg: 0 10px 15px rgba(0,0,0,0.1)    /* Hover */
--shadow-xl: 0 20px 25px rgba(0,0,0,0.1)    /* Elevated */
```

**Usage:**
- **sm:** Header, subtle dividers
- **md:** Buttons, cards at rest
- **lg:** Cards on hover, dropdowns
- **xl:** Modals, popovers

---

## 🎭 Animation & Transitions

### Timing Functions

```css
--transition-fast: 150ms cubic-bezier(0.4,0,0.2,1)
--transition-base: 200ms cubic-bezier(0.4,0,0.2,1) ⭐
--transition-slow: 300ms cubic-bezier(0.4,0,0.2,1)
```

**Easing:** `cubic-bezier(0.4, 0, 0.2, 1)` (ease-in-out)

---

### Animated Properties

**✅ GPU-Accelerated (Fast):**
```css
transform: translateY(-2px);
opacity: 0.8;
```

**❌ Avoid (Slow):**
```css
width, height, top, left, margin, padding
```

---

### Hover States

```css
/* Buttons */
transform: translateY(-2px);
box-shadow: 0 8px 20px rgba(0,0,0,0.15);
transition: all 200ms;

/* Cards */
transform: translateY(-4px);
box-shadow: 0 10px 30px rgba(0,0,0,0.1);

/* Links */
color: var(--primary-dark);
text-decoration: underline;
```

---

## 📐 Layout System

### Container Widths

```css
--max-width: 1200px        /* Standard content ⭐ */
--max-width-narrow: 800px  /* Long-form reading */
--max-width-wide: 1400px   /* Hero sections */
```

---

### Grid Systems

**Benefit Cards (Auto-fit):**
```css
grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
gap: var(--space-8);
```

**3-Column Layout:**
```css
grid-template-columns: repeat(3, 1fr);
gap: var(--space-12);

/* Mobile: 1 column */
@media (max-width: 768px) {
  grid-template-columns: 1fr;
}
```

---

### Z-Index Scale

```css
--z-base: 1       /* Base layer */
--z-dropdown: 100 /* Dropdowns */
--z-sticky: 200   /* Sticky header ⭐ */
--z-fixed: 300    /* Fixed elements */
--z-modal: 400    /* Modal overlays */
--z-popover: 500  /* Popovers */
--z-tooltip: 600  /* Tooltips */
```

---

## 🎯 Component Specifications

### Primary CTA Button

```css
background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%);
color: white;
padding: 16px 32px;
border-radius: 12px;
font-weight: 700;
min-height: 52px;
box-shadow: 0 4px 12px rgba(37,99,235,0.25);

/* Hover */
transform: translateY(-2px);
box-shadow: 0 8px 20px rgba(37,99,235,0.3);
```

---

### Secondary Button

```css
background: transparent;
color: white;
border: 2px solid rgba(255,255,255,0.8);
padding: 16px 32px;
border-radius: 12px;
font-weight: 600;
min-height: 52px;

/* Hover */
background: rgba(255,255,255,0.15);
border-color: white;
```

---

### Benefit Card

```css
background: #f9fafb;
padding: 32px;
border-radius: 16px;
border: 1px solid transparent;

/* Hover */
transform: translateY(-4px);
box-shadow: 0 10px 30px rgba(0,0,0,0.1);
background: white;
border-color: #d1d5db;
```

---

### Hero Section

```css
background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%);
padding: clamp(4rem, 10vw, 7rem) 0 clamp(3rem, 8vw, 5rem);
position: relative;
overflow: hidden;

/* Pattern overlay */
::before {
  background-image: radial-gradient(...);
  opacity: 0.05;
}
```

---

## 📱 Responsive Design

### Breakpoints

```css
Mobile: < 640px      /* Stack everything */
Tablet: 640-768px    /* 2 columns max */
Desktop: 768-1200px  /* Full layout */
Large: > 1200px      /* Max width applied */
```

---

### Mobile Adjustments

```css
/* Touch targets */
min-height: 44px;
min-width: 44px;

/* Font sizes */
body: 16px (never less);

/* Spacing */
sections: 64px (reduced from 80px);
cards: 24px padding (reduced from 32px);

/* Hidden elements */
.nav-links a:not(.btn-primary) {
  display: none; /* On very small screens */
}
```

---

## ♿ Accessibility Specs

### Focus States

```css
:focus-visible {
  outline: 2px solid var(--primary);
  outline-offset: 2px;
  border-radius: 4px;
}
```

---

### Touch Targets

```
Minimum: 44x44px (WCAG 2.1 AA)
Recommended: 48x48px
CTAs: 52px height
Spacing: 8px minimum between targets
```

---

### Skip Link

```css
.skip-link {
  position: absolute;
  top: -40px;
  background: var(--primary);
  color: white;
  padding: 8px 16px;
  z-index: 600;
}

.skip-link:focus {
  top: 8px;
}
```

---

## 🎨 Visual Hierarchy

### Levels of Emphasis

**1. Primary (Most Important):**
- Hero titles (48px, weight 800)
- Primary CTAs (large, colored background)
- Section headings (40px, weight 700)

**2. Secondary:**
- Subheadings (28px, weight 700)
- Secondary buttons (outlined)
- Card titles (20px, weight 700)

**3. Tertiary:**
- Body text (16px, weight 400)
- Captions (14px, weight 400)
- Links (colored, underlined on hover)

**4. Subtle:**
- Supporting text (#6b7280)
- Disabled states (opacity 0.6)
- Placeholders (#9ca3af)

---

## 🖼️ Image Guidelines

### When Adding Images

**Format:**
- Primary: WebP (modern browsers)
- Fallback: JPEG (quality 85%)
- Icons: SVG (scalable)

**Sizing:**
```html
width="800"
height="600"
loading="lazy"
decoding="async"
alt="Descriptive text"
```

**Optimization:**
- Compress to < 100KB per image
- Use srcset for responsive images
- Lazy load below-the-fold images

---

## 📋 Design Checklist

Before finalizing any component:
- [ ] Meets WCAG AA contrast (4.5:1 text, 3:1 UI)
- [ ] Touch targets ≥ 44x44px
- [ ] Visible focus state
- [ ] Responsive on mobile
- [ ] Uses design tokens (no hard-coded values)
- [ ] Proper spacing (8px grid)
- [ ] Smooth transitions (< 300ms)
- [ ] Semantic HTML
- [ ] ARIA labels where needed

---

## 🎨 Brand Personality

**Adjectives:**
- Modern
- Trustworthy
- Friendly
- Professional
- Approachable
- Clear
- Reliable

**Not:**
- Corporate
- Stuffy
- Complicated
- Childish
- Aggressive

---

**Last Updated:** December 14, 2025  
**Version:** 1.0  
**Status:** Production Ready
