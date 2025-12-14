# Solmate Website - Quick Reference Guide

## 🎨 Design Tokens Quick Reference

### Colors
```css
/* Primary Blues */
--primary-600: #2563eb    /* Main CTAs */
--primary-700: #1d4ed8    /* Hover states */

/* Text */
--text-primary: #111827   /* Headlines */
--text-secondary: #374151 /* Body text */
--text-tertiary: #6b7280  /* Muted text */

/* Backgrounds */
--bg-primary: #ffffff
--bg-secondary: #f9fafb
```

### Spacing (8px grid)
```css
--space-2: 0.5rem    /* 8px */
--space-4: 1rem      /* 16px - Default */
--space-6: 1.5rem    /* 24px */
--space-8: 2rem      /* 32px */
--space-12: 3rem     /* 48px */
--space-16: 4rem     /* 64px */
```

### Border Radius
```css
--radius-md: 0.5rem   /* 8px - Buttons */
--radius-lg: 0.75rem  /* 12px - Cards */
--radius-xl: 1rem     /* 16px - Sections */
```

---

## 📏 Layout Guidelines

### Container Widths
```css
Standard: 1200px
Narrow: 800px (long-form content)
Wide: 1400px (hero sections)
```

### Section Padding
```css
Desktop: 80px (--space-20)
Mobile: 64px (--space-16)
```

### Touch Targets
```css
Minimum: 44x44px (WCAG standard)
CTAs: 52px height minimum
```

---

## 🎯 Component Patterns

### Button Styles
```jsx
// Primary CTA
<Link to="/waitlist" className="btn-cta">
  Join Waitlist
</Link>

// Secondary
<Link to="/page" className="btn-secondary">
  Learn More
</Link>

// Link style
<Link to="/page" className="btn-link">
  Read more →
</Link>
```

### Section Structure
```jsx
<section className="section">
  <div className="container">
    <h2 className="section-title">Title</h2>
    <p className="section-subtitle">Subtitle</p>
    {/* Content */}
  </div>
</section>
```

---

## ♿ Accessibility Checklist

### Every Interactive Element Needs:
- [ ] Minimum 44x44px touch target
- [ ] Visible focus state
- [ ] ARIA label (if icon-only)
- [ ] Keyboard accessible

### Every Page Needs:
- [ ] One H1 only
- [ ] Logical heading hierarchy
- [ ] Unique page title
- [ ] Meta description
- [ ] Skip to main content link

### Forms Need:
- [ ] Associated labels
- [ ] Error messages
- [ ] Required field indicators
- [ ] Submit feedback

---

## 🚀 Performance Rules

### CSS Best Practices
```css
/* ✅ Use GPU-accelerated properties */
transition: transform 200ms;
transform: translateY(-2px);

/* ❌ Avoid expensive properties */
transition: height 200ms; /* Bad */
transition: width 200ms;  /* Bad */
```

### Image Guidelines (when adding)
```html
<!-- Always include -->
<img 
  src="image.jpg"
  alt="Descriptive text"
  width="800"
  height="600"
  loading="lazy"
  decoding="async"
/>
```

### Component Size Limits
- Component JS: < 20KB
- Component CSS: < 5KB
- Total page bundle: < 100KB

---

## 📱 Responsive Breakpoints

```css
/* Mobile first (default) */
.element { }

/* Tablet (640px+) */
@media (min-width: 640px) { }

/* Desktop (768px+) */
@media (min-width: 768px) { }

/* Large desktop (1200px+) */
@media (min-width: 1200px) { }
```

---

## 🔍 SEO Essentials

### Page Template
```jsx
<SEO 
  title="Page Name - Solmate | Brief Description"
  description="150-160 character description with primary keyword"
  keywords="keyword1, keyword2, keyword3"
  path="/page-url"
/>
```

### Heading Structure
```html
<h1>One per page - main topic</h1>
  <h2>Major section</h2>
    <h3>Subsection</h3>
    <h3>Another subsection</h3>
  <h2>Another major section</h2>
```

### Internal Links
- Homepage → All pages
- Every page → Waitlist
- Footer → All pages

---

## 🧪 Testing Commands

```bash
# Install dependencies
npm install

# Development server
npm run dev

# Production build
npm run build

# Preview production
npm run preview

# Lighthouse audit
lighthouse http://localhost:5173 --view
```

---

## ⚠️ Common Pitfalls to Avoid

### ❌ Don't Do This
```css
/* Absolute pixel values */
padding: 32px; /* Use var(--space-8) */

/* Hard-coded colors */
color: #2563eb; /* Use var(--primary) */

/* Layout-shifting properties */
transition: width 200ms; /* Use transform */
```

### ✅ Do This Instead
```css
/* CSS variables */
padding: var(--space-8);
color: var(--primary);
transition: transform var(--transition-base);
```

---

## 📊 Quick Audit Checklist

Before committing code:
- [ ] Mobile responsive?
- [ ] Keyboard navigable?
- [ ] Focus states visible?
- [ ] No console errors?
- [ ] Page loads < 3s?
- [ ] No layout shifts?
- [ ] Semantic HTML?
- [ ] ARIA labels where needed?

---

## 🆘 Troubleshooting

### Build Issues
```bash
# Clear cache and reinstall
rm -rf node_modules
rm package-lock.json
npm install
```

### Development Server Issues
```bash
# Kill process on port 5173
# Windows:
netstat -ano | findstr :5173
taskkill /PID [PID] /F

# Then restart
npm run dev
```

### Lighthouse Low Scores
1. Check bundle size (< 100KB total)
2. Verify system fonts loading
3. Check for layout shifts
4. Test on slow 3G
5. Remove unused dependencies

---

## 📞 Support

- **Documentation:** README.md
- **Performance Guide:** PERFORMANCE_OPTIMIZATION.md
- **SEO Strategy:** SEO_STRATEGY.md
- **GitHub Issues:** [Create issue]
- **Contact:** team@solmate.app

---

**Quick Start:**
```bash
cd "c:\Users\SUBHAM NABIK\Desktop\SolMate"
npm install
npm run dev
# Open http://localhost:5173
```

**Deploy:**
```bash
npm run build
# Deploy dist/ folder to hosting
```
