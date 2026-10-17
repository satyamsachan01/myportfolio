SATYAM SACHAN | PORTFOLIO
=========================

SIRF DEKHNA HAI?
  website/index.html par double-click karein. Chrome mein poori site chalegi.

VS CODE MEIN CHALANA (Node.js 20+ chahiye, nodejs.org se LTS)
  1. VS Code > File > Open Folder > yahi folder (satyam-sachan-portfolio)
  2. Terminal kholein:  Ctrl + `
  3. Ye chalayein:
        npm install
        npm run dev
  4. Terminal mein http://localhost:5173 aayega, Ctrl + click karke kholein.
     (Ya "npm start" chalayein, browser apne aap khul jayega.)

  Windows par "running scripts is disabled" error aaye to ek baar chalayein:
        Set-ExecutionPolicy -Scope CurrentUser RemoteSigned
  ya terminal dropdown se "Command Prompt" chun lein.

PURANA FOLDER REPLACE KARNA
  - Purane folder ka naam badal dein (jaise portfolio-old), backup ke liye.
  - Ye naya folder uski jagah rakh dein.
  - Purane folder mein Git (.git) hai to: purane folder se .git ke alawa sab
    delete karein, phir is folder ki saari files wahan paste karein.

KYA KAHAN BADLEIN
  src/data/profile.ts    naam, bio, email, WhatsApp, photo, LinkedIn/GitHub
  src/data/projects.ts   saare projects
  src/data/story.ts      har chapter ki story lines
  src/data/services.ts   services ka text
  public/projects/       project screenshots (.webp)
  Photo: public/ mein daalein (jaise satyam.webp), phir profile.ts mein
         photo: '/satyam.webp'

UPLOAD (Hostinger / cPanel)
  npm run build:site   -> "website" folder dobara banta hai
  "website" folder ke ANDAR ki files public_html mein upload karein.

  Clean URLs chahiye (yoursite.com/projects/kursilo)?
  npm run build -> "dist" folder ki files upload karein (.htaccess included).

DOMAIN & CONTACT FORM
  .env.example ko copy karke naam .env rakhein, phir:
    VITE_SITE_URL=https://aapka-domain.com
    VITE_CONTACT_ENDPOINT=https://formspree.io/f/xxxx   (optional)

Is folder mein koi .exe, installer ya chhupi script nahi hai.
Sirf HTML, CSS, JavaScript/TypeScript, images aur config files.
