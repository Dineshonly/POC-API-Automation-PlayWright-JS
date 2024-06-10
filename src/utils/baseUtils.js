// Import required modules
import dotenv from 'dotenv';
import fs from 'fs';

// Load environment variables from .env file
dotenv.config();

/**
 * Retrieves the configuration data based on the environment.
 * @returns {object} The configuration data.
 */
function getConfig() {
    // Define the list of valid environments
    const validEnvironments = ['qa', 'uat', 'prod'];

    // Get the current environment, defaulting to 'qa' if not found or not valid
    const environment = validEnvironments.includes(process.env.NODE_ENV) ? process.env.NODE_ENV : 'qa';

    // Construct the path to the configuration file based on the environment
    const configPath = `./config.${environment}.json`;

    // Attempt to read the configuration file
    let configData;
    try {
        configData = fs.readFileSync(configPath, { encoding: 'utf8' }).replace(/^\uFEFF/, '');
    } catch (error) {
        // If there's an error (e.g., file doesn't exist), handle it accordingly
        console.error(`Failed to read the config file at path: ${configPath}`, error);
        throw error; // Rethrow the error to handle it further up in the application
    }

    // Parse the JSON data to extract configuration
    let config;
    try {
        config = JSON.parse(configData);
    } catch (error) {
        // If the JSON is invalid, handle the error
        console.error(`Failed to parse config data from the file: ${configPath}`, error);
        throw error; // Rethrow the error to handle it further up in the application
    }

    // Destructure the needed properties from the configuration
    const {
        API_URL
    } = config;

    // Return the configuration data
    return {API_URL};
}

// Export the getConfig function
export {getConfig};
export default class baseUrl {
}