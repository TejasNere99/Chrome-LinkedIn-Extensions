<h1 align="center">⚡ LinkedIn Automation Suite</h1>

<p align="center">
  <strong>A complete workflow featuring a custom Chrome Extension, automated LinkedIn interactions, and full backend integration.</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Chrome%20Extension-Manifest%20V3-blue?style=flat-square">
  <img src="https://img.shields.io/badge/Node.js-Express-green?style=flat-square">
  <img src="https://img.shields.io/badge/Automation-DOM%20Scripting-orange?style=flat-square">
  <img src="https://img.shields.io/badge/Database-SQLite/MySQL-red?style=flat-square">
</p>

---

# 📌 Overview

This repository contains a complete LinkedIn automation ecosystem built using:

- **Chrome Extension (Manifest V3)**  
- **Automated browser interaction**  
- **Custom backend API**  
- **Database integration**  

The system is capable of:

✔️ Opening LinkedIn profiles automatically  
✔️ Extracting profile data using DOM parsing  
✔️ Sending data to a backend via REST API  
✔️ Automating reactions and comments on feed posts  
✔️ Rendering UI with validation inside extension popup  
✔️ Fully configurable automation settings  

---

# 🚀 Features

### 🔹 **1. Chrome Extension**
- Custom popup UI  
- Manifest V3 compliant  
- Background scripts  
- Content scripts  
- Cross-page automation  
- Input validation  
- Inter-script messaging  

### 🔹 **2. LinkedIn Profile Analyzer**
- Automatically opens multiple profile links  
- Extracts:

  - Name  
  - About  
  - Bio  
  - Location  
  - Followers  
  - Connections  
  - Profile URL  

- Sends structured JSON to backend  
- Handles dynamic DOM layouts  

### 🔹 **3. Feed Interaction Automation**
- Opens LinkedIn Feed  
- Scrolls intelligently to load multiple posts  
- Detects real post containers (not ads)  
- Randomized selection of posts  
- Auto-likes primary posts (not comment likes)  
- Auto-comments using editable input field  
- Highlights interacted posts with custom borders  
- Smooth scrolling with timed delays  

### 🔹 **4. Backend API**
- Node.js + Express  
- Sequelize ORM  
- SQLite / MySQL database  
- API for storing and retrieving profile records  
- Validation layer  
- Structured responses  
- Easy to deploy  

---

# 📁 Project Structure

```
📦 Project Root
│
├── 📁 linkedin-auto-reaction
│   ├── content.js
│   ├── manifest.json
│   ├── popup.html
│   └── popup.js
│
└── 📁 LinkedIn-Data-Extractor
    │
    ├── 📁 linkedin-backend
    │   ├── 📁 models
    │   │   ├── index.js
    │   │   └── profile.js
    │   │
    │   ├── db.sqlite
    │   ├── package.json
    │   ├── package-lock.json
    │   └── server.js
    │
    └── 📁 linkedin-extension
        ├── background.js
        ├── contentScript.js
        ├── manifest.json
        ├── popup.html
        ├── popup.js
        └── style.css
```


---

# 🛠️ Tech Stack

### **Frontend / Browser Side**
- JavaScript (ES6+)
- Chrome Extensions (Manifest v3)
- DOM automation
- Async operations with Promises
- Messaging API (runtime + tabs)
- CSS-based visual cues

### **Backend**
- Node.js  
- Express.js  
- Sequelize ORM  
- SQLite / MySQL  
- CORS  
- Body-parser  

---

# 🌐 API Documentation

## 📥 **Create Profile**

### Body:
```json
{
  "name": "John Doe",
  "url": "https://linkedin.com/in/johndoe",
  "about": "Tech leader",
  "bio": "Building scalable systems",
  "location": "USA",
  "followers": 20000,
  "connections": 500
}
```

---

# 🧠 Extension Workflow

##  🔍 **Profile Extraction Flow**

<ul>
  <li>The user clicks the extension popup button
  <li>The extension opens multiple LinkedIn profile URLs automatically
  <li>Each page loads → content script injects
  <li>The script extracts profile data from the DOM
  <li>Data is structured and sent to backend API
  <li>The tab is closed, and the next profile opens
  <li>All events are logged clearly in the console
</ul>

##  ⚡ Feed Interaction Automation Flow

<ol>
  <li>User enters:
    <ul> 
      <li>Reaction count</li>
      <li>Comment count</li>
    </ul>
  <li>Button becomes enabled
  <li>Extension automatically navigates to LinkedIn Feed
  <li>Intelligent scrolling loads a batch of posts
  <li>Posts are filtered to ensure:
    <ul> 
      <li>Not sponsored</li>
      <li>Have like + comment buttons</li>
    </ul>
  <li>Random posts are selected
  <li>Script performs:
    <ul> 
      <li>👍 Auto-Like on real posts</li>
      <li>💬 Auto-Comment (“CFBR”)</li>
    </ul>
    <li>Final success alert is shown
    <li>Full logs visible in DevTools
</ol>

---

# 🧑‍💻 Author

## Tejas Nere










