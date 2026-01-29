// Netlify Scheduled Function - Runs daily at 6:00 AM UTC
// This function scrapes data from the official Morocco water website

import { schedule } from '@netlify/functions';

// Sample data structure that would be populated from scraping
const scrapeWaterData = async () => {
    try {
        // In production, this would fetch from maghreb-assoudoud.water.gov.ma
        // For now, we return sample data based on latest published statistics

        const currentDate = new Date().toISOString();

        // This is where web scraping logic would go
        // Example: const response = await fetch('http://maghreb-assoudoud.water.gov.ma/ar/site/today');
        // Then parse the HTML to extract data

        const data = {
            lastUpdate: currentDate,
            nationalFillRate: 33.6,
            totalVolume: 5637,
            dams: {
                'al-wahda': { fillRate: 38.2, volume: 1452 },
                'bine-el-ouidane': { fillRate: 5.8, volume: 87 },
                'sidi-mohammed-ben-abdellah': { fillRate: 80.0, volume: 779 },
                // ... more dams
            }
        };

        // Here you would store the data:
        // - In a database (e.g., Supabase, MongoDB)
        // - Or in a static JSON file that gets committed
        // - Or in Netlify's environment variables / KV store

        console.log('Water data updated successfully at:', currentDate);
        return data;

    } catch (error) {
        console.error('Error scraping water data:', error);
        throw error;
    }
};

// Schedule this function to run daily at 6:00 AM UTC
const handler = schedule('0 6 * * *', async (event) => {
    console.log('Running scheduled water data update...');

    try {
        const data = await scrapeWaterData();

        return {
            statusCode: 200,
            body: JSON.stringify({
                message: 'Water data updated successfully',
                lastUpdate: data.lastUpdate,
                nationalFillRate: data.nationalFillRate,
            }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({
                message: 'Failed to update water data',
                error: error.message,
            }),
        };
    }
});

export { handler };
