// Morocco Dams Data - Based on official Ministry of Equipment and Water statistics
// Source reference: maghreb-assoudoud.water.gov.ma

export const basins = [
    { id: 'loukkos', name: 'Loukkos', nameAr: 'اللوكوس' },
    { id: 'moulouya', name: 'Moulouya', nameAr: 'ملوية' },
    { id: 'sebou', name: 'Sebou', nameAr: 'سبو' },
    { id: 'bouregreg', name: 'Bouregreg-Chaouia', nameAr: 'أبي رقراق-الشاوية' },
    { id: 'oum-er-rbia', name: 'Oum Er Rbia', nameAr: 'أم الربيع' },
    { id: 'tensift', name: 'Tensift', nameAr: 'تانسيفت' },
    { id: 'souss-massa', name: 'Souss-Massa', nameAr: 'سوس-ماسة' },
    { id: 'draa-oued-noun', name: 'Draa-Oued Noun', nameAr: 'درعة-وادي نون' },
    { id: 'guir-ziz', name: 'Guir-Ziz-Rhéris', nameAr: 'غير-زيز-غريس' },
];

export const dams = [
    // Loukkos Basin
    {
        id: 'oued-el-makhazine',
        name: 'Oued El Makhazine',
        nameAr: 'واد المخازن',
        basin: 'loukkos',
        capacity: 773,
        yearBuilt: 1979,
        location: { lat: 35.05, lng: -5.58 },
    },
    {
        id: 'ibn-battouta',
        name: 'Ibn Battouta',
        nameAr: 'ابن بطوطة',
        basin: 'loukkos',
        capacity: 43.6,
        yearBuilt: 1977,
        location: { lat: 35.72, lng: -5.67 },
    },
    // Moulouya Basin
    {
        id: 'mohammed-v',
        name: 'Mohammed V',
        nameAr: 'محمد الخامس',
        basin: 'moulouya',
        capacity: 730,
        yearBuilt: 1967,
        location: { lat: 34.08, lng: -2.98 },
    },
    {
        id: 'hassan-ii-moulouya',
        name: 'Hassan II (Moulouya)',
        nameAr: 'الحسن الثاني (ملوية)',
        basin: 'moulouya',
        capacity: 400,
        yearBuilt: 1999,
        location: { lat: 34.23, lng: -3.15 },
    },
    // Sebou Basin
    {
        id: 'al-wahda',
        name: 'Al Wahda',
        nameAr: 'الوحدة',
        basin: 'sebou',
        capacity: 3800,
        yearBuilt: 1996,
        location: { lat: 34.60, lng: -5.47 },
        isLargest: true,
    },
    {
        id: 'idriss-1er',
        name: 'Idriss 1er',
        nameAr: 'إدريس الأول',
        basin: 'sebou',
        capacity: 1186,
        yearBuilt: 1973,
        location: { lat: 34.07, lng: -4.58 },
    },
    {
        id: 'allal-el-fassi',
        name: 'Allal El Fassi',
        nameAr: 'علال الفاسي',
        basin: 'sebou',
        capacity: 81.5,
        yearBuilt: 1990,
        location: { lat: 34.03, lng: -4.92 },
    },
    // Bouregreg-Chaouia Basin
    {
        id: 'sidi-mohammed-ben-abdellah',
        name: 'Sidi Mohammed Ben Abdellah',
        nameAr: 'سيدي محمد بن عبد الله',
        basin: 'bouregreg',
        capacity: 974,
        yearBuilt: 1974,
        location: { lat: 33.93, lng: -6.55 },
    },
    {
        id: 'sidi-said-maachou',
        name: 'Sidi Said Maachou',
        nameAr: 'سيدي سعيد معاشو',
        basin: 'bouregreg',
        capacity: 210,
        yearBuilt: 2013,
        location: { lat: 33.25, lng: -7.82 },
    },
    // Oum Er Rbia Basin
    {
        id: 'bine-el-ouidane',
        name: 'Bine El Ouidane',
        nameAr: 'بين الويدان',
        basin: 'oum-er-rbia',
        capacity: 1500,
        yearBuilt: 1953,
        location: { lat: 32.10, lng: -6.47 },
    },
    {
        id: 'ahmed-el-hansali',
        name: 'Ahmed El Hansali',
        nameAr: 'أحمد الحنصالي',
        basin: 'oum-er-rbia',
        capacity: 740,
        yearBuilt: 2001,
        location: { lat: 32.43, lng: -5.86 },
    },
    {
        id: 'al-massira',
        name: 'Al Massira',
        nameAr: 'المسيرة',
        basin: 'oum-er-rbia',
        capacity: 2760,
        yearBuilt: 1979,
        location: { lat: 32.52, lng: -7.48 },
    },
    // Tensift Basin
    {
        id: 'lalla-takerkoust',
        name: 'Lalla Takerkoust',
        nameAr: 'للا تاكركوست',
        basin: 'tensift',
        capacity: 80,
        yearBuilt: 1935,
        location: { lat: 31.37, lng: -8.13 },
    },
    {
        id: 'moulay-youssef',
        name: 'Moulay Youssef',
        nameAr: 'مولاي يوسف',
        basin: 'tensift',
        capacity: 190,
        yearBuilt: 1970,
        location: { lat: 31.28, lng: -7.13 },
    },
    // Souss-Massa Basin
    {
        id: 'abdelmoumen',
        name: 'Abdelmoumen',
        nameAr: 'عبدالمؤمن',
        basin: 'souss-massa',
        capacity: 214,
        yearBuilt: 1981,
        location: { lat: 30.43, lng: -9.20 },
    },
    {
        id: 'youssef-ben-tachfine',
        name: 'Youssef Ben Tachfine',
        nameAr: 'يوسف بن تاشفين',
        basin: 'souss-massa',
        capacity: 308,
        yearBuilt: 1972,
        location: { lat: 29.45, lng: -9.47 },
    },
    {
        id: 'moulay-abdellah',
        name: 'Moulay Abdellah',
        nameAr: 'مولاي عبد الله',
        basin: 'souss-massa',
        capacity: 110,
        yearBuilt: 1985,
        location: { lat: 30.60, lng: -9.28 },
    },
    // Draa-Oued Noun Basin
    {
        id: 'mansour-eddahbi',
        name: 'Mansour Eddahbi',
        nameAr: 'المنصور الذهبي',
        basin: 'draa-oued-noun',
        capacity: 560,
        yearBuilt: 1972,
        location: { lat: 31.05, lng: -6.73 },
    },
    // Guir-Ziz-Rhéris Basin
    {
        id: 'hassan-addakhil',
        name: 'Hassan Addakhil',
        nameAr: 'الحسن الداخل',
        basin: 'guir-ziz',
        capacity: 347,
        yearBuilt: 1971,
        location: { lat: 31.93, lng: -4.40 },
    },
];

// Helper to get basin info
export const getBasinById = (id) => basins.find(b => b.id === id);

// Helper to get dams by basin
export const getDamsByBasin = (basinId) => dams.filter(d => d.basin === basinId);

// Calculate total national capacity
export const totalNationalCapacity = dams.reduce((sum, dam) => sum + dam.capacity, 0);
