# Dermaphi Aesthetics React website

Open `index.html` in a browser to review the site. Keep the folder structure intact so that navigation, styling, and images load correctly. The consultation links open Dermaphi's existing online booking page.

## Source

- `app.js` contains the React components, page content, and treatment data.
- `style.css` contains the responsive layouts and motion styles.
- `assets/` contains the images, vendored React 18 runtime, and license.
- `build.cjs` renders the React pages to HTML, including page-specific search titles and descriptions.

Run `node build.cjs` from this folder after changing page content or React markup. Node.js is needed to rebuild. There is no npm install step. The generated HTML is included and can be opened locally or served on static hosting. React adds the mobile menu, gallery controls, and scroll reveals in the browser.

## Content references

- Studio, artist and services: https://www.dermaphiaesthetics.com/
- Studio email and phone: https://www.dermaphiaesthetics.com/about-us
- Appointment form: https://www.dermaphiaesthetics.com/book-your-appointment
- Editorial hero portrait: https://images.unsplash.com/photo-1524504388940-b1c1722653e1
`npm run dev` rebuilds and serves the site at http://127.0.0.1:3000. Restart it after editing React markup.

The five-page site includes a WhatsApp enquiry form and a Google Maps business-name search. Confirm the exact Maps listing and supply approved client testimonials before publication.
