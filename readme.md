# 🎬 deVere Cinema Universe

Welcome to the **deVere Cinema Universe** – a place where you can explore the greatest movies and TV shows ever made. Think of it as your personal digital library of iconic cinema.

You can browse through titles, search for your favourites, add new movies or shows, and view detailed information about each one.

---

## 🔗 Links

- **GitHub Repository:** [https://github.com/MawandeM-98/react-product-explorer](https://github.com/MawandeM-98/react-product-explorer)
- **Live App:** (Add your Vercel URL here once deployed)

---

## 🚀 How to Run This Project (For Testers)

### What you'll need:
- A computer with **Node.js** installed (version 18 or 20 works best)
- A code editor like **VS Code** (optional, but helpful)
- A terminal (Command Prompt, PowerShell, or the one inside VS Code)

### Step-by-step instructions:

1. **Clone the repository**
   Open your terminal and run:
git clone https://github.com/MawandeM-98/react-product-explorer.git

text

2. **Go into the project folder**
cd react-product-explorer

text

3. **Install dependencies**
This downloads all the required packages.
npm install

text

4. **Start the fake database (JSON Server)**
Open a terminal and run:
npm run server

text
You should see a message saying `JSON Server started on PORT :3000`

5. **Start the app (React)**
Open a **second terminal** and run:
npm run dev

text
You should see `Local: http://localhost:5173/`

6. **Open your browser**
Go to `http://localhost:5173`

That's it! You should now see the Cinema Universe homepage with movie cards.

---

## 📱 What the App Does

- **Browse** – See all movies/TV shows in a nice grid layout
- **Search** – Type in the search bar to filter by title or category
- **Add** – Click "Add Movie" to contribute a new title (opens a form)
- **View Details** – Click "View Details" on any card to see full information

The app uses a fake database (`db.json`) so any movies you add will appear immediately, but they won't be saved permanently after you close the app – that's normal for testing.

---

## 🤖 AI Usage Disclosure

I used **Claude (Anthropic)** to help generate the initial code structure, components, and styling. All AI-generated code was reviewed, tested, and adjusted by me to make sure it works properly and matches the design I wanted.

---

## 📝 Notes for Ivan , Antonio and/or any other deVere Testers:

- The images for movies are stored in the `public/images/` folder. If an image doesn't load, check that the file exists in that folder.
- When you add a new movie, the default image is `img7.jpeg`. You can change the image URL to any valid path.
- The app works best on a desktop screen, but it's also responsive on tablets and phones.
- If something looks broken, try refreshing the page or restarting both servers (`Ctrl+C` in each terminal, then `npm run server` and `npm run dev` again).

Enjoy exploring the cinema universe! 🍿