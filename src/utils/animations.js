// Animation variants for Framer Motion
export const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: [0, 0, 0.2, 1] }
  }
}

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.6 }
  }
}

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.5, ease: [0, 0, 0.2, 1] }
  }
}

export const slideInLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.6, ease: [0, 0, 0.2, 1] }
  }
}

export const slideInRight = {
  hidden: { opacity: 0, x: 50 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.6, ease: [0, 0, 0.2, 1] }
  }
}

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
}

export const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5 }
  }
}

// Viewport settings for scroll animations
export const viewportOptions = {
  once: true,
  margin: "-50px",
  amount: 0.3
}

// Hover animation variants
export const buttonHover = {
  scale: 1.02,
  boxShadow: "0 20px 50px rgba(59, 130, 246, 0.3)",
  transition: { duration: 0.2 }
}

export const buttonTap = {
  scale: 0.98
}

export const cardHover = {
  y: -8,
  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
  transition: { duration: 0.3, ease: [0, 0, 0.2, 1] }
}
