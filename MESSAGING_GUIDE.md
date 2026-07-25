# Contact Form / Messaging System Guide

> How the messaging form works in École Format, and how to reuse it in another website.

---

## Overview

This website has **two versions** of the same contact form:

| Version | File | Tech |
|---|---|---|
| Static HTML | `contact.html` + `js/main.js` | Vanilla JS + Bootstrap |
| Next.js (React) | `src/app/contact/page.tsx` | React + TailwindCSS |

Both work the same way: **frontend-only, no real backend**. The form simulates sending with a fake delay, then shows a success message.

> [!CAUTION]
> Neither version actually sends data anywhere. To make it functional, you'll need to integrate a backend or third-party service (see [Making It Real](#making-it-real-sending-options) below).

---

## How It Works (Step by Step)

```
User fills form → Clicks "Send" → preventDefault() stops page reload
→ Button shows "Sending..." spinner → 1.2s fake delay
→ Success message appears → Form resets
```

### State Machine

```
idle → submitting → success → idle (after 3s)
```

---

## Static HTML Version

### Files Involved

- **`contact.html`** — The form markup (lines 99–126)
- **`js/main.js`** — The submit handler (lines 48–67)

### HTML Form Structure

```html
<div class="contact-form-card">
  <h3>Send us a message</h3>
  <p>Fill out the form and we'll get back to you within 24 hours.</p>

  <form id="contact-form">
    <div class="row g-3 mb-3">
      <div class="col-sm-6">
        <input type="text" class="form-control" placeholder="Your name" required>
      </div>
      <div class="col-sm-6">
        <input type="tel" class="form-control" placeholder="Your phone" required>
      </div>
    </div>
    <div class="mb-3">
      <input type="email" class="form-control" placeholder="Your email">
    </div>
    <div class="mb-3">
      <select class="form-select">
        <option value="">Select a course</option>
        <option value="trial">Trial Lesson (Free)</option>
        <option value="group">Group Course</option>
        <option value="individual">Individual Lessons</option>
        <option value="celi">CELI Exam Prep</option>
      </select>
    </div>
    <div class="mb-4">
      <textarea class="form-control" rows="4" placeholder="Your message (optional)"></textarea>
    </div>
    <button type="submit" class="btn-submit">
      <i class="bi bi-send me-2"></i>Send Message
    </button>
  </form>
</div>
```

### JavaScript Handler

```javascript
const contactForm = document.getElementById('contact-form');

if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault(); // Stop the default form submission (page reload)

    // 1. Show loading state
    var btn = contactForm.querySelector('.btn-submit');
    var originalText = btn.innerHTML;
    btn.innerHTML = '<i class="bi bi-hourglass-split me-2"></i>Sending...';
    btn.disabled = true;

    // 2. Simulate a 1.2 second delay, then show success
    setTimeout(function () {
      var formCard = contactForm.closest('.contact-form-card');
      formCard.innerHTML =
        '<div class="text-center py-5">' +
          '<i class="bi bi-check-circle-fill text-success" style="font-size:3.5rem"></i>' +
          '<p class="text-white fw-semibold fs-5 mt-3">Thank you!</p>' +
          '<p class="text-white-50 small">We\'ll contact you soon.</p>' +
        '</div>';
    }, 1200);
  });
}
```

### Key Points (HTML Version)

- Uses `e.preventDefault()` to stop the browser from submitting the form normally
- Replaces the entire `.contact-form-card` inner HTML with a success message
- **One-way**: once submitted, the form is gone (user must reload the page)
- No data collection — the form values are never read or sent

---

## Next.js (React) Version

### File Involved

- **`src/app/contact/page.tsx`** — Full component with form + logic

### React Component (Simplified)

```tsx
"use client";

import { useState, type FormEvent } from "react";

export default function ContactPage() {
  // Form data state
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    course: "",
    message: "",
  });

  // Status: "idle" | "submitting" | "success"
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Validate required fields
    if (!formData.fullName.trim() || !formData.phone.trim()) return;

    // Show loading spinner
    setStatus("submitting");

    // Simulate 1.2s network delay
    await new Promise((resolve) => setTimeout(resolve, 1200));

    // Show success state
    setStatus("success");

    // Reset form data
    setFormData({ fullName: "", phone: "", email: "", course: "", message: "" });

    // Return to idle (form) after 3 seconds
    setTimeout(() => setStatus("idle"), 3000);
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Controlled inputs with value={formData.xxx} and onChange handlers */}
      <input
        value={formData.fullName}
        onChange={(e) => setFormData((p) => ({ ...p, fullName: e.target.value }))}
      />
      {/* ... other fields ... */}

      <button type="submit" disabled={status === "submitting"}>
        {status === "submitting" ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}
```

### Key Points (React Version)

- Uses **controlled components** — each input's value is tied to React state
- The `status` state drives the UI: `idle` → form, `submitting` → spinner, `success` → checkmark
- **Reversible**: returns to form after 3 seconds (unlike the HTML version)
- Still no real data sending — the `await` just waits for a fake timeout

---

## Making It Real: Sending Options

### Option 1: EmailJS (No Backend Needed) ⭐ Easiest

```javascript
// 1. Sign up at https://www.emailjs.com (free tier: 200 emails/month)
// 2. Create an email template
// 3. Add the SDK:
// <script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js"></script>

emailjs.init("YOUR_PUBLIC_KEY");

contactForm.addEventListener('submit', function (e) {
  e.preventDefault();

  emailjs.sendForm("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", contactForm)
    .then(function () {
      // Show success message
    })
    .catch(function (error) {
      // Show error message
      console.error("Failed:", error);
    });
});
```

### Option 2: Formspree (Form-as-a-Service)

```html
<!-- Just change the form action — no JavaScript needed! -->
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
  <input type="text" name="name" placeholder="Your name" required>
  <input type="email" name="email" placeholder="Your email" required>
  <textarea name="message" placeholder="Your message"></textarea>
  <button type="submit">Send</button>
</form>
```

### Option 3: WhatsApp Link (Simplest)

```javascript
function sendToWhatsApp(formData) {
  const phone = "21673123456"; // Your WhatsApp number (no + or spaces)
  const text = `New inquiry from ${formData.name}%0APhone: ${formData.phone}%0AMessage: ${formData.message}`;
  window.open(`https://wa.me/${phone}?text=${text}`, "_blank");
}
```

### Option 4: Next.js API Route (Full Backend)

```typescript
// src/app/api/contact/route.ts
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  const body = await request.json();

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS, // Use an App Password, not your real password
    },
  });

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: "info@ecoleformat.tn",
    subject: `New Contact: ${body.fullName}`,
    html: `
      <p><strong>Name:</strong> ${body.fullName}</p>
      <p><strong>Phone:</strong> ${body.phone}</p>
      <p><strong>Email:</strong> ${body.email}</p>
      <p><strong>Course:</strong> ${body.course}</p>
      <p><strong>Message:</strong> ${body.message}</p>
    `,
  });

  return NextResponse.json({ success: true });
}
```

Then update the React form handler:

```typescript
const handleSubmit = async (e: FormEvent) => {
  e.preventDefault();
  setStatus("submitting");

  const res = await fetch("/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });

  if (res.ok) {
    setStatus("success");
    setFormData({ fullName: "", phone: "", email: "", course: "", message: "" });
  } else {
    setStatus("idle");
    alert("Something went wrong. Please try again.");
  }
};
```

---

## Quick Comparison

| Feature | EmailJS | Formspree | WhatsApp | API Route |
|---|---|---|---|---|
| Backend needed | ❌ | ❌ | ❌ | ✅ |
| Free tier | 200/month | 50/month | Unlimited | Unlimited |
| Setup time | 10 min | 5 min | 2 min | 30 min |
| Customizable | Medium | Low | Low | Full |
| Receives via | Email | Email | WhatsApp | Email/DB |

---

## Reusable Snippet for Another Website

Here's a **minimal, copy-paste-ready** vanilla HTML + JS contact form:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Contact</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: system-ui, sans-serif; background: #f5f5f5; padding: 2rem; }
    .form-card {
      max-width: 500px; margin: auto; background: #1a1a2e;
      padding: 2rem; border-radius: 1rem; color: white;
    }
    input, textarea, select {
      width: 100%; padding: 0.75rem 1rem; margin-bottom: 1rem;
      background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.15);
      border-radius: 0.5rem; color: white; font-size: 0.9rem;
    }
    input::placeholder, textarea::placeholder { color: rgba(255,255,255,0.4); }
    select { color: rgba(255,255,255,0.7); }
    select option { color: #1a1a2e; }
    button {
      width: 100%; padding: 0.85rem; background: #3b82f6;
      color: white; border: none; border-radius: 0.5rem;
      font-weight: 600; cursor: pointer; font-size: 1rem;
    }
    button:hover { background: #2563eb; }
    button:disabled { opacity: 0.6; cursor: not-allowed; }
    .success { text-align: center; padding: 3rem 1rem; }
    .success .icon { font-size: 3rem; }
  </style>
</head>
<body>
  <div class="form-card" id="form-card">
    <h2 style="margin-bottom:0.25rem">Send us a message</h2>
    <p style="color:rgba(255,255,255,0.5);font-size:0.85rem;margin-bottom:1.5rem">
      We'll get back to you within 24 hours.
    </p>
    <form id="contact-form">
      <input type="text" name="name" placeholder="Your name" required>
      <input type="tel" name="phone" placeholder="Your phone" required>
      <input type="email" name="email" placeholder="Your email">
      <textarea name="message" rows="4" placeholder="Your message"></textarea>
      <button type="submit" id="submit-btn">Send Message</button>
    </form>
  </div>

  <script>
    document.getElementById('contact-form').addEventListener('submit', function(e) {
      e.preventDefault();
      var btn = document.getElementById('submit-btn');
      btn.textContent = 'Sending...';
      btn.disabled = true;

      // ====================================================
      // REPLACE THIS SECTION with real sending logic
      // (EmailJS, fetch to API, Formspree, etc.)
      // ====================================================
      setTimeout(function() {
        document.getElementById('form-card').innerHTML =
          '<div class="success">' +
            '<div class="icon">✅</div>' +
            '<p style="font-size:1.2rem;font-weight:600;margin-top:1rem">Thank you!</p>' +
            '<p style="color:rgba(255,255,255,0.5);margin-top:0.5rem">We\'ll be in touch soon.</p>' +
          '</div>';
      }, 1200);
    });
  </script>
</body>
</html>
```

---

*Generated from the École Format website codebase.*
