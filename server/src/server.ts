import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

import { typeDefs, resolvers } from './schemas/index.js';
import db from './config/connection.js';

// Load environment variables
dotenv.config();

// Get __dirname in ES module context
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 3001;
const app = express();

// Create Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const startApolloServer = async () => {
  // Start Apollo server
  await server.start();

  // Express middleware for parsing request bodies
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  // Apply Apollo middleware to the /graphql endpoint
  app.use('/graphql', expressMiddleware(server));

  // Serve static assets if in production
  if (process.env.NODE_ENV === 'production') {
    // Serve client build files
    const clientDistPath = path.resolve(__dirname, '../../client/dist');
    app.use(express.static(clientDistPath));
    
    app.get('*', (_req, res) => {
      res.sendFile(path.join(clientDistPath, 'index.html'));
    });
    
  }

  // Handle MongoDB connection errors
  db.on('error', console.error.bind(console, 'MongoDB connection error:'));

  // Start the Express server
  app.listen(PORT, () => {
    console.log(`🚀 API server running on port ${PORT}`);
    console.log(`🔗 GraphQL available at http://localhost:${PORT}/graphql`);
  });
};

// Run the server
startApolloServer();
