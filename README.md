# AI-Assisted Journal System

## Overview
The AI-Assisted Journal System allows users to write journal entries and analyze their emotional state using a Large Language Model (LLM). The system stores entries, extracts emotions, keywords, and summaries, and generates insights over time.

## Features
- Write and store journal entries
- AI emotion analysis using LLM
- Keyword extraction and summary generation
- Insights dashboard showing:
  - Total entries
  - Top emotion
  - Most used ambience
  - Recent keywords

## Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB
- Groq LLM API

### Frontend
- React.js
- Axios

## API Endpoints

### Create Journal Entry
POST `/api/journal`

### Get Journal Entries
GET `/api/journal/:userId`

### Analyze Journal Entry
POST `/api/journal/analyze`

### Get Insights
GET `/api/journal/insights/:userId`

## How to Run

### Backend