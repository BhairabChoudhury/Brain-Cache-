# 🧠 Brain-Cache AI 

An AI-powered personal knowledge management system (PKMS) that serves as your digital "Second Brain." It allows users to store, organize, search, and dynamically chat with their notes, links, PDFs, and images using semantic search, vector embeddings, and LLM text generation.

---

## 📸 Screenshots

### 1. Dashboard & Content Organization
A centralized dashboard showing all saved contents (notes, links, documents) with tags and filters.
![Dashboard & Content](./Screenshot%202026-06-08%20114028.png)

### 2. Multi-Format Upload & OCR Processing
The smart ingestion center where users can upload PDFs (extracting text) and Images (performing OCR using Tesseract.js).
![OCR & Upload](./Screenshot%202026-06-08%20114119.png)

### 3. AI Chat & RAG Q&A
Chat session powered by Gemini AI and ChromaDB semantic search. It queries your stored information to answer questions in context.
![AI Chat & RAG](./Screenshot%202026-06-08%20114138.png)

---

## ✨ Features

- **📝 Notes Management**: Create, edit, and organize rich text notes.
- **🔗 Smart Link Saver**: Store URLs and manage reference links.
- **📄 PDF Text Extraction**: Automatic PDF uploading and text parsing using `pdf-parse`.
- **🖼️ Image OCR processing**: Extract text from images using local `Tesseract.js` integration.
- **🔍 Semantic Vector Search**: High-performance semantic query matching powered by ChromaDB.
- **🤖 Retrieval-Augmented Generation (RAG)**: Chat with your second brain! Query the AI, and it will fetch context from your saved documents to give accurate, personalized answers.
- **🔐 JWT Authentication**: Secure, session-based user authentication.
- **👤 Multi-User Isolation**: Complete data separation between different user accounts.

---

## 🛠️ Technology Stack

| Component | Technology | Description |
| :--- | :--- | :--- |
| **Frontend** | React (v19), Vite, TypeScript, TailwindCSS (v4), React Icons, React Router | Modern, fast, responsive SPA interface. |
| **Backend** | Node.js, Express, TypeScript, Langchain, ChromaDB  | RESTful API backend handling routing and processing. |
| **Primary Database** | MongoDB (Mongoose) | For storing user data, metadata, session history, and structured content. |
| **Vector Database** | ChromaDB (Docker) | Vector database for storing text embeddings and running semantic queries. |
| **AI / LLM** | Google Gemini API (`@google/generative-ai`) | Content-aware context generation and chat responses. |
| **Text Processing** | `pdf-parse`, `tesseract.js` | Parsing PDFs and extracting text from images locally. |

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18+ recommended)
- [Docker](https://www.docker.com/) (for ChromaDB)
- Google Gemini API Key

---

### Step 1: Clone the Repository
```bash
git clone <repository-url>
cd SecondBrainProject
```

---

### Step 2: Set Up & Run ChromaDB (Vector Database)
ChromaDB runs in a Docker container. To avoid conflicts with other applications running on port `8000`, run it on host port `8001` with data persistence:

```bash
docker run -d \
  --name second_brain_chroma \
  -p 8001:8000 \
  -v "$(pwd)/Backend/chroma-db:/data" \
  --restart unless-stopped \
  chromadb/chroma
```

---

### Step 3: Configure and Start the Backend
1. Navigate to the `Backend` directory:
   ```bash
   cd Backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `Backend` directory:
   ```env
   MONGO_URL="YOUR_MONGODB_CONNECTION_STRING"
   PORT=5000
   JWT_TOKEN="YOUR_JWT_SECRET_KEY"
   GOOGLE_API_KEY="YOUR_GEMINI_API_KEY"
   CHROMA_HOST="localhost"
   CHROMA_PORT=8001
   ```
4. Verify the Vector Database connection:
   ```bash
   npx ts-node src/testChroma.ts
   ```
5. Start the backend in development mode:
   ```bash
   npm run dev
   ```

---

### Step 4: Configure and Start the Frontend
1. Open a new terminal and navigate to the `Frontend` directory:
   ```bash
   cd Frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
4. Open your browser and navigate to `http://localhost:5173`.
