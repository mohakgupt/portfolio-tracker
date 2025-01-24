# Portfolio Tracker

Portfolio Tracker is a full-stack web application designed to help users manage their stock portfolios effectively. The application provides key metrics, portfolio distribution visualization, and integrates with Alpha Vantage for live stock quotes.

## Steps to Run the Project Locally

### Prerequisites

- **Node.js** (v20 or later)
- **Java** (JDK 22 or later)
- **MySQL** (for database persistence)
- **Docker** (optional, for running the backend in a container)
- **Alpha Vantage API Key**
- **Git**

### Clone the Repository

```bash
git clone https://github.com/mohakgupt/portfolio-tracker.git
cd portfolio-tracker
```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd portfolio-tracker-frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open the [application in your browser](http://localhost:5173) at [http://localhost:5173](http://localhost:5173).

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd portfolio-tracker-backend
   ```
2. Configure your Alpha Vantage API key and MySQL database:
   - Open `src/main/resources/application.properties`.
   - Add your API key and database credentials:
     ```properties
     alpha.vantage.api.key=YOUR_API_KEY
     spring.datasource.url=jdbc:mysql://localhost:3306/portfolio_tracker
     spring.datasource.username=YOUR_DB_USERNAME
     spring.datasource.password=YOUR_DB_PASSWORD
     ```
3. Build and run the backend:
   ```bash
   ./mvnw spring-boot:run
   ```
4. Access the backend at [http://localhost:8080](http://localhost:8080).

### Running Backend via Docker (Optional)

1. Build the Docker image:
   ```bash
   docker build -t portfolio-tracker-backend .
   ```
2. Run the Docker container:
   ```bash
   docker run -p 8080:8080 portfolio-tracker-backend
   ```

## Assumptions and Limitations

- **Alpha Vantage Rate Limits**: The application depends on Alpha Vantage's free tier API, which enforces rate limits. Ensure requests stay within the quota.
- **Database Setup**: The backend requires a MySQL database for data persistence. Ensure MySQL is running and the database is properly configured.
- **Stock Name Lookup**: Stock names are fetched from a server-side CSV file, which assumes accurate and current data.
- **Frontend Build**: The `dist` folder for the frontend is excluded from the repository. You must build it locally for manual deployment.

## Deployed Application

- **Frontend**: [https://stellular-macaron-655570.netlify.app/](https://stellular-macaron-655570.netlify.app/)
- **Backend API**: [https://portfolio-tracker-t0ws.onrender.com](https://portfolio-tracker-t0ws.onrender.com)

<!-- ## Live API Documentation

- **Swagger Documentation**: [https://portfolio-tracker-t0ws.onrender.com/swagger-ui.html](https://portfolio-tracker-t0ws.onrender.com/swagger-ui.html) -->

## Contact

For issues or contributions, open a pull request or create an issue in the repository. Thank you for contributing to Portfolio Tracker!

