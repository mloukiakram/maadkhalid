// API endpoint to get latest water data
// Can be called by the frontend to fetch cached data

export const handler = async (event, context) => {
    // In production, this would fetch from your data store
    // For now, we return sample data

    const data = {
        lastUpdate: new Date().toISOString(),
        national: {
            fillRate: 33.6,
            totalVolume: 5637,
            totalCapacity: 16788,
            damCount: 19,
        },
        dams: {
            'al-wahda': { fillRate: 38.2, volume: 1452, capacity: 3800 },
            'bine-el-ouidane': { fillRate: 5.8, volume: 87, capacity: 1500 },
            'sidi-mohammed-ben-abdellah': { fillRate: 80.0, volume: 779, capacity: 974 },
            'lalla-takerkoust': { fillRate: 25.0, volume: 20, capacity: 80 },
            'mansour-eddahbi': { fillRate: 40.0, volume: 224, capacity: 560 },
            'al-massira': { fillRate: 18.5, volume: 511, capacity: 2760 },
            'idriss-1er': { fillRate: 52.3, volume: 620, capacity: 1186 },
            'oued-el-makhazine': { fillRate: 45.8, volume: 354, capacity: 773 },
            'mohammed-v': { fillRate: 35.2, volume: 257, capacity: 730 },
            'ahmed-el-hansali': { fillRate: 28.7, volume: 212, capacity: 740 },
            'hassan-addakhil': { fillRate: 22.4, volume: 78, capacity: 347 },
            'youssef-ben-tachfine': { fillRate: 31.5, volume: 97, capacity: 308 },
            'abdelmoumen': { fillRate: 42.1, volume: 90, capacity: 214 },
            'moulay-youssef': { fillRate: 55.2, volume: 105, capacity: 190 },
            'ibn-battouta': { fillRate: 68.4, volume: 30, capacity: 43.6 },
            'allal-el-fassi': { fillRate: 48.9, volume: 40, capacity: 81.5 },
            'hassan-ii-moulouya': { fillRate: 29.3, volume: 117, capacity: 400 },
            'sidi-said-maachou': { fillRate: 61.2, volume: 129, capacity: 210 },
            'moulay-abdellah': { fillRate: 44.5, volume: 49, capacity: 110 },
        },
    };

    return {
        statusCode: 200,
        headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'public, max-age=3600', // Cache for 1 hour
            'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify(data),
    };
};
