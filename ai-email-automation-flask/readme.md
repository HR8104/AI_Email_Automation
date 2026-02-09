# AI-Powered Email Automation System

## Project Overview

This project is an AI-powered email automation system designed to classify incoming messages into categories such as Lead, Support, or Spam using Google's Gemini AI model. It generates automated responses based on the classification and provides a web-based dashboard for monitoring and manual testing. Originally prototyped with n8n for workflow automation, the system was refactored into a modular Flask-based web application with a reusable AI service layer, making it suitable for production use and easy integration.

The system emphasizes modularity, allowing for straightforward migration from temporary JSON storage to a full database. It serves as a demonstration of integrating AI into business processes, handling email automation efficiently while maintaining a clean, maintainable codebase.

## Features

- **AI Intent Classification**: Automatically categorizes emails as Lead, Support, or Spam using Google Gemini API.
- **Automated Reply Generation**: Generates contextually appropriate responses based on email classification.
- **REST API**: Provides endpoints for external integrations, enabling seamless connection with other systems.
- **Web UI**: Offers a user-friendly interface for manual testing and interaction with the system.
- **Logs Dashboard**: Monitors AI behavior, classifications, and responses for auditing and improvement.
- **Modular Architecture**: Separates AI logic, storage, and presentation layers for scalability.
- **Database-Ready Storage**: Uses JSON for temporary storage, easily replaceable with a database like PostgreSQL or MongoDB.

## System Architecture

```
+-------------------+     +-------------------+     +-------------------+
|   Web UI (HTML)   |     |   Flask Routes    |     |   REST API        |
|   - Forms         |     |   - /             |     |   - /api/classify  |
|   - Dashboard     |     |   - /logs         |     |   - /api/generate  |
+-------------------+     +-------------------+     +-------------------+
          |                       |                       |
          +-----------------------+-----------------------+
                          |
                          v
                +-------------------+
                |   Gemini Service  |
                |   - Classification|
                |   - Response Gen  |
                +-------------------+
                          |
                          v
                +-------------------+
                |   Storage Layer   |
                |   - JSON Storage  |
                |   - Logs & Data   |
                +-------------------+
```

## Folder Structure

```
ai-email-automation-flask/
├── app.py                          # Main Flask application with routes
├── services/
│   └── gemini_service.py           # AI logic for classification and response generation
├── storage.py                      # JSON-based storage operations
├── templates/
│   ├── index.html                  # Main web UI
│   └── logs.html                   # Logs dashboard
├── static/
│   └── style.css                   # CSS styles for the web UI
├── data.json                       # Temporary JSON storage for data and logs
├── requirements.txt                # Python dependencies
├── TODO.md                         # Project tasks and notes
└── readme.md                       # This file
```

## How the System Works

1. **Email Reception**: Incoming emails are received via the web UI or API endpoints.
2. **AI Classification**: The Gemini service analyzes the email content to classify it as Lead, Support, or Spam.
3. **Response Generation**: Based on the classification, an appropriate automated response is generated.
4. **Storage and Logging**: All interactions, classifications, and responses are stored in JSON for persistence and logged for monitoring.
5. **Dashboard Monitoring**: Users can view logs and system behavior through the web dashboard.
6. **API Integration**: External systems can integrate via REST endpoints for automated processing.

## Local Setup Instructions

1. **Prerequisites**:
   - Python 3.8 or higher
   - Google Gemini API key (obtain from Google AI Studio)

2. **Clone the Repository**:
   ```
   git clone <repository-url>
   cd ai-email-automation-flask
   ```

3. **Install Dependencies**:
   ```
   pip install -r requirements.txt
   ```

4. **Configure API Key**:
   - Set your Google Gemini API key as an environment variable:
     ```
     export GEMINI_API_KEY='your-api-key-here'
     ```
   - On Windows, use `set GEMINI_API_KEY=your-api-key-here`

5. **Run the Application**:
   ```
   python app.py
   ```
   - Access the web UI at `http://localhost:5000`
   - View logs at `http://localhost:5000/logs`

## API Usage Example

### Classify an Email
```bash
curl -X POST http://localhost:5000/api/classify \
  -H "Content-Type: application/json" \
  -d '{"email": "Hello, I am interested in your services."}'
```

Response:
```json
{
  "classification": "Lead",
  "response": "Thank you for your interest! How can we assist you further?"
}
```

### Generate a Response
```bash
curl -X POST http://localhost:5000/api/generate \
  -H "Content-Type: application/json" \
  -d '{"classification": "Support", "email": "My account is not working."}'
```

Response:
```json
{
  "response": "We're sorry to hear about the issue. Please provide more details so we can help resolve it."
}
```

## Future Improvements

- Migrate to a relational database (e.g., PostgreSQL) for better scalability and data integrity.
- Implement user authentication and role-based access for the dashboard.
- Add support for multiple AI models and A/B testing for response optimization.
- Integrate with email providers (e.g., Gmail API) for real-time email processing.
- Enhance logging with metrics and analytics for performance monitoring.
- Add unit and integration tests for robust reliability.

## Resume and Interview Relevance

This project demonstrates proficiency in full-stack development, AI integration, and software engineering best practices. Key skills showcased include:

- **Backend Development**: Flask routing, API design, and modular architecture.
- **AI Integration**: Working with external APIs (Google Gemini) for natural language processing.
- **Frontend Basics**: HTML templating and CSS styling for user interfaces.
- **Data Management**: Implementing a storage layer with JSON, extensible to databases.
- **Problem-Solving**: Building an end-to-end automation system from prototype to production-ready code.
- **Best Practices**: Clean code, documentation, and version control.

It highlights the ability to prototype with tools like n8n, refactor for scalability, and create maintainable, interview-ready code suitable for internships or junior developer roles in AI-driven applications.

## Author

Hitendra Rathod
