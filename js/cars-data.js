// Comprehensive Car Dealership Database
const carData = [
    {
        id: 1,
        make: "BMW",
        model: "X5",
        year: 2024,
        price: 67900,
        monthlyPayment: 899,
        category: "SUV",
        bodyType: "SUV",
        fuelType: "Gasoline",
        transmission: "Automatic",
        drivetrain: "AWD",
        engine: "3.0L Twin Turbo I6",
        horsepower: 335,
        torque: 330,
        mpg: "23/29",
        mileage: 15420,
        color: "Alpine White",
        interior: "Black Leather",
        vin: "WBAJA7C5XJG123456",
        condition: "Certified Pre-Owned",
        features: [
            "Navigation System",
            "Leather Seats",
            "Heated Seats",
            "Backup Camera",
            "Sunroof",
            "Bluetooth",
            "Apple CarPlay",
            "Android Auto",
            "Premium Audio",
            "Adaptive Cruise Control",
            "Lane Departure Warning",
            "Blind Spot Monitoring"
        ],
        safetyRating: 5,
        image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=500&h=300&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&h=600&fit=crop"
        ],
        description: "Luxury SUV with advanced technology and premium comfort. This BMW X5 offers exceptional performance with its twin-turbo engine and comes fully equipped with premium features.",
        location: "Main Showroom",
        availability: "Available",
        certification: "BMW Certified",
        warranty: "1 year or 12,000 miles",
        created: "2024-01-15"
    },
    {
        id: 2,
        make: "Tesla",
        model: "Model S",
        year: 2023,
        price: 89900,
        monthlyPayment: 1299,
        category: "Sedan",
        bodyType: "Sedan",
        fuelType: "Electric",
        transmission: "Single Speed",
        drivetrain: "AWD",
        engine: "Dual Motor Electric",
        horsepower: 670,
        torque: 713,
        mpg: "Electric",
        range: 405,
        mileage: 8250,
        color: "Midnight Silver",
        interior: "Black Premium Interior",
        vin: "5YJSA1E20NF123456",
        condition: "Certified Pre-Owned",
        features: [
            "Autopilot",
            "Premium Connectivity",
            "Supercharging Network Access",
            "Glass Roof",
            "Premium Audio",
            "Air Suspension",
            "HEPA Air Filtration",
            "Over-the-Air Updates",
            "Mobile Connector",
            "Wall Connector"
        ],
        safetyRating: 5,
        image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=500&h=300&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&h=600&fit=crop"
        ],
        description: "All-electric luxury sedan with autopilot and long-range capabilities. Experience the future of driving with Tesla's advanced technology and industry-leading range.",
        location: "Electric Vehicle Center",
        availability: "Available",
        certification: "Tesla Certified",
        warranty: "4 years or 50,000 miles",
        created: "2024-01-20"
    },
    {
        id: 3,
        make: "Mercedes-Benz",
        model: "C-Class",
        year: 2024,
        price: 52400,
        monthlyPayment: 699,
        category: "Sedan",
        bodyType: "Sedan",
        fuelType: "Gasoline",
        transmission: "Automatic",
        drivetrain: "RWD",
        engine: "2.0L Turbo I4",
        horsepower: 255,
        torque: 273,
        mpg: "31/42",
        mileage: 12680,
        color: "Obsidian Black",
        interior: "Black MB-Tex",
        vin: "W1K8F4HB0NG123456",
        condition: "Certified Pre-Owned",
        features: [
            "MBUX Infotainment",
            "AMG Line",
            "Sunroof",
            "Leather Seats",
            "Heated Seats",
            "Backup Camera",
            "Apple CarPlay",
            "Android Auto",
            "Premium Audio",
            "Wireless Charging"
        ],
        safetyRating: 5,
        image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=500&h=300&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&h=600&fit=crop"
        ],
        description: "Premium sedan with MBUX infotainment and advanced safety features. The Mercedes-Benz C-Class combines luxury, technology, and performance in an elegant package.",
        location: "Luxury Showroom",
        availability: "Available",
        certification: "Mercedes-Benz Certified",
        warranty: "1 year or unlimited miles",
        created: "2024-01-18"
    },
    {
        id: 4,
        make: "Audi",
        model: "A4",
        year: 2023,
        price: 48500,
        monthlyPayment: 649,
        category: "Sedan",
        bodyType: "Sedan",
        fuelType: "Gasoline",
        transmission: "Automatic",
        drivetrain: "AWD",
        engine: "2.0L Turbo I4",
        horsepower: 201,
        torque: 236,
        mpg: "26/35",
        mileage: 18340,
        color: "Mythos Black",
        interior: "Black Leather",
        vin: "WAUANAF48PN123456",
        condition: "Certified Pre-Owned",
        features: [
            "Virtual Cockpit",
            "MMI Navigation Plus",
            "Panoramic Sunroof",
            "Leather Seats",
            "Heated Seats",
            "Backup Camera",
            "Apple CarPlay",
            "Android Auto",
            "Premium Audio",
            "Adaptive Suspension"
        ],
        safetyRating: 5,
        image: "https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=500&h=300&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&h=600&fit=crop"
        ],
        description: "Sophisticated sedan with Audi's renowned quattro all-wheel drive system and premium interior appointments.",
        location: "Main Showroom",
        availability: "Available",
        certification: "Audi Certified",
        warranty: "1 year or 20,000 miles",
        created: "2024-01-22"
    },
    {
        id: 5,
        make: "Lexus",
        model: "RX 350",
        year: 2024,
        price: 58900,
        monthlyPayment: 779,
        category: "SUV",
        bodyType: "SUV",
        fuelType: "Gasoline",
        transmission: "Automatic",
        drivetrain: "AWD",
        engine: "3.5L V6",
        horsepower: 295,
        torque: 263,
        mpg: "22/29",
        mileage: 9870,
        color: "Eminent White",
        interior: "Black NuLuxe",
        vin: "2T2HZMDA8NC123456",
        condition: "Certified Pre-Owned",
        features: [
            "Lexus Safety System+ 2.0",
            "Navigation System",
            "Leather Seats",
            "Heated/Ventilated Seats",
            "Backup Camera",
            "Panoramic View Monitor",
            "Apple CarPlay",
            "Android Auto",
            "Mark Levinson Audio",
            "Power Liftgate"
        ],
        safetyRating: 5,
        image: "https://images.unsplash.com/photo-1549924231-f129b911e442?w=500&h=300&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1549924231-f129b911e442?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&h=600&fit=crop"
        ],
        description: "Premium luxury SUV with Lexus's renowned reliability and refined ride quality. Perfect for families seeking comfort and technology.",
        location: "Luxury Showroom",
        availability: "Available",
        certification: "Lexus Certified",
        warranty: "2 years or unlimited miles",
        created: "2024-01-25"
    },
    {
        id: 6,
        make: "Toyota",
        model: "Camry",
        year: 2024,
        price: 32900,
        monthlyPayment: 439,
        category: "Sedan",
        bodyType: "Sedan",
        fuelType: "Hybrid",
        transmission: "CVT",
        drivetrain: "FWD",
        engine: "2.5L Hybrid I4",
        horsepower: 208,
        torque: 163,
        mpg: "44/47",
        mileage: 8420,
        color: "Super White",
        interior: "Black Fabric",
        vin: "4T1G11AK5NU123456",
        condition: "Certified Pre-Owned",
        features: [
            "Toyota Safety Sense 2.0",
            "Entune 3.0",
            "Backup Camera",
            "Apple CarPlay",
            "Android Auto",
            "Wireless Charging",
            "Automatic Climate Control",
            "LED Headlights"
        ],
        safetyRating: 5,
        image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=500&h=300&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1549924231-f129b911e442?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=800&h=600&fit=crop"
        ],
        description: "Reliable hybrid sedan with excellent fuel economy and Toyota's legendary reliability. Perfect for everyday commuting.",
        location: "Economy Showroom",
        availability: "Available",
        certification: "Toyota Certified",
        warranty: "7 years or 100,000 miles",
        created: "2024-01-28"
    },
    {
        id: 7,
        make: "Honda",
        model: "CR-V",
        year: 2023,
        price: 38900,
        monthlyPayment: 519,
        category: "SUV",
        bodyType: "SUV",
        fuelType: "Gasoline",
        transmission: "Automatic",
        drivetrain: "AWD",
        engine: "1.5L Turbo I4",
        horsepower: 190,
        torque: 179,
        mpg: "28/34",
        mileage: 15670,
        color: "Platinum White",
        interior: "Gray Cloth",
        vin: "2HKRW2H84NH123456",
        condition: "Certified Pre-Owned",
        features: [
            "Honda Sensing",
            "HondaLink",
            "Backup Camera",
            "Apple CarPlay",
            "Android Auto",
            "Remote Engine Start",
            "Dual-Zone Climate Control",
            "LED Headlights"
        ],
        safetyRating: 5,
        image: "https://images.unsplash.com/photo-1549924231-f129b911e442?w=500&h=300&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1549924231-f129b911e442?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&h=600&fit=crop"
        ],
        description: "Popular compact SUV with excellent reliability and fuel economy. Great for families and outdoor adventures.",
        location: "Main Showroom",
        availability: "Available",
        certification: "Honda Certified",
        warranty: "7 years or 100,000 miles",
        created: "2024-02-01"
    },
    {
        id: 8,
        make: "Ford",
        model: "Mustang",
        year: 2024,
        price: 45900,
        monthlyPayment: 609,
        category: "Coupe",
        bodyType: "Coupe",
        fuelType: "Gasoline",
        transmission: "Manual",
        drivetrain: "RWD",
        engine: "5.0L V8",
        horsepower: 450,
        torque: 410,
        mpg: "15/25",
        mileage: 5240,
        color: "Race Red",
        interior: "Black Leather",
        vin: "1FA6P8CF4N5123456",
        condition: "Certified Pre-Owned",
        features: [
            "SYNC 3",
            "Shaker Audio System",
            "Leather Seats",
            "Backup Camera",
            "Apple CarPlay",
            "Android Auto",
            "Sport Suspension",
            "Track Apps"
        ],
        safetyRating: 4,
        image: "https://images.unsplash.com/photo-1544829728-e5cb761c44d5?w=500&h=300&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1544829728-e5cb761c44d5?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=800&h=600&fit=crop"
        ],
        description: "Iconic American muscle car with a powerful V8 engine and classic Mustang styling. Perfect for driving enthusiasts.",
        location: "Sports Car Center",
        availability: "Available",
        certification: "Ford Certified",
        warranty: "1 year or unlimited miles",
        created: "2024-02-03"
    },
    {
        id: 9,
        make: "Chevrolet",
        model: "Corvette",
        year: 2023,
        price: 89900,
        monthlyPayment: 1199,
        category: "Sports Car",
        bodyType: "Coupe",
        fuelType: "Gasoline",
        transmission: "Automatic",
        drivetrain: "RWD",
        engine: "6.2L V8",
        horsepower: 490,
        torque: 465,
        mpg: "16/24",
        mileage: 3890,
        color: "Torch Red",
        interior: "Jet Black Leather",
        vin: "1G1Y72D45N5123456",
        condition: "Certified Pre-Owned",
        features: [
            "Performance Data Recorder",
            "Magnetic Ride Control",
            "Brembo Brakes",
            "Z51 Performance Package",
            "Heated/Ventilated Seats",
            "Navigation",
            "Premium Audio",
            "Performance Traction Management"
        ],
        safetyRating: 4,
        image: "https://images.unsplash.com/photo-1544636331-e26879cd4d37?w=500&h=300&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1544636331-e26879cd4d37?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1544829728-e5cb761c44d5?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&h=600&fit=crop"
        ],
        description: "World-class sports car with breathtaking performance and handling. The Corvette delivers supercar capabilities at a fraction of the price.",
        location: "Sports Car Center",
        availability: "Available",
        certification: "Chevrolet Certified",
        warranty: "3 years or 36,000 miles",
        created: "2024-02-05"
    },
    {
        id: 10,
        make: "Porsche",
        model: "911 Carrera",
        year: 2024,
        price: 115900,
        monthlyPayment: 1539,
        category: "Sports Car",
        bodyType: "Coupe",
        fuelType: "Gasoline",
        transmission: "PDK Automatic",
        drivetrain: "RWD",
        engine: "3.0L Twin-Turbo Flat-6",
        horsepower: 379,
        torque: 331,
        mpg: "18/25",
        mileage: 2150,
        color: "Guards Red",
        interior: "Black Leather",
        vin: "WP0AA2A94NS123456",
        condition: "Certified Pre-Owned",
        features: [
            "Porsche Communication Management",
            "Sport Chrono Package",
            "PASM (Porsche Active Suspension Management)",
            "Sport Seats Plus",
            "Premium Package Plus",
            "Bose Surround Sound",
            "Navigation",
            "Apple CarPlay"
        ],
        safetyRating: 4,
        image: "https://images.unsplash.com/photo-1553440569-bcc63803a83d?w=500&h=300&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1553440569-bcc63803a83d?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1544636331-e26879cd4d37?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1544829728-e5cb761c44d5?w=800&h=600&fit=crop"
        ],
        description: "Legendary sports car with unmatched handling and performance. The Porsche 911 represents the pinnacle of automotive engineering.",
        location: "Luxury Sports Center",
        availability: "Available",
        certification: "Porsche Certified",
        warranty: "4 years or 50,000 miles",
        created: "2024-02-07"
    },
    {
        id: 11,
        make: "Jeep",
        model: "Wrangler",
        year: 2023,
        price: 48500,
        monthlyPayment: 649,
        category: "SUV",
        bodyType: "SUV",
        fuelType: "Gasoline",
        transmission: "Automatic",
        drivetrain: "4WD",
        engine: "3.6L V6",
        horsepower: 285,
        torque: 260,
        mpg: "22/24",
        mileage: 12450,
        color: "Granite Crystal",
        interior: "Black Cloth",
        vin: "1C4HJXDG2PW123456",
        condition: "Certified Pre-Owned",
        features: [
            "Uconnect 4C NAV",
            "Alpine Premium Audio",
            "Removable Top and Doors",
            "Off-Road Capability",
            "4WD System",
            "Roll Bar",
            "Trail Rated Badge"
        ],
        safetyRating: 3,
        image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=500&h=300&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1549924231-f129b911e442?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&h=600&fit=crop"
        ],
        description: "Iconic off-road SUV with unmatched capability and removable top. Perfect for outdoor adventures and weekend warriors.",
        location: "SUV Center",
        availability: "Available",
        certification: "Jeep Certified",
        warranty: "3 years or 36,000 miles",
        created: "2024-02-09"
    },
    {
        id: 12,
        make: "Subaru",
        model: "Outback",
        year: 2024,
        price: 39900,
        monthlyPayment: 539,
        category: "SUV",
        bodyType: "Wagon",
        fuelType: "Gasoline",
        transmission: "CVT",
        drivetrain: "AWD",
        engine: "2.5L Boxer I4",
        horsepower: 182,
        torque: 176,
        mpg: "26/32",
        mileage: 7820,
        color: "Crystal White",
        interior: "Black Cloth",
        vin: "4S4BTACC9R3123456",
        condition: "Certified Pre-Owned",
        features: [
            "EyeSight Driver Assist Technology",
            "STARLINK Safety and Security",
            "X-Mode with Hill Descent Control",
            "Roof Rails",
            "All-Weather Package",
            "Backup Camera",
            "Apple CarPlay",
            "Android Auto"
        ],
        safetyRating: 5,
        image: "https://images.unsplash.com/photo-1549924231-f129b911e442?w=500&h=300&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1549924231-f129b911e442?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&h=600&fit=crop"
        ],
        description: "Versatile wagon with standard all-wheel drive and excellent safety ratings. Perfect for families who love outdoor activities.",
        location: "Economy Showroom",
        availability: "Available",
        certification: "Subaru Certified",
        warranty: "7 years or 100,000 miles",
        created: "2024-02-11"
    }
];

// Additional utility functions for car data
const CarDataUtils = {
    // Get all unique makes
    getMakes() {
        return [...new Set(carData.map(car => car.make))].sort();
    },

    // Get all unique models for a make
    getModels(make) {
        return [...new Set(carData.filter(car => car.make === make).map(car => car.model))].sort();
    },

    // Get all unique body types
    getBodyTypes() {
        return [...new Set(carData.map(car => car.bodyType))].sort();
    },

    // Get all unique fuel types
    getFuelTypes() {
        return [...new Set(carData.map(car => car.fuelType))].sort();
    },

    // Get price range
    getPriceRange() {
        const prices = carData.map(car => car.price);
        return {
            min: Math.min(...prices),
            max: Math.max(...prices)
        };
    },

    // Get year range
    getYearRange() {
        const years = carData.map(car => car.year);
        return {
            min: Math.min(...years),
            max: Math.max(...years)
        };
    },

    // Get mileage range
    getMileageRange() {
        const mileages = carData.map(car => car.mileage);
        return {
            min: Math.min(...mileages),
            max: Math.max(...mileages)
        };
    },

    // Filter cars based on criteria
    filterCars(filters) {
        let filtered = [...carData];

        if (filters.make && filters.make !== '') {
            filtered = filtered.filter(car => car.make === filters.make);
        }

        if (filters.model && filters.model !== '') {
            filtered = filtered.filter(car => car.model === filters.model);
        }

        if (filters.bodyType && filters.bodyType !== '') {
            filtered = filtered.filter(car => car.bodyType === filters.bodyType);
        }

        if (filters.fuelType && filters.fuelType !== '') {
            filtered = filtered.filter(car => car.fuelType === filters.fuelType);
        }

        if (filters.transmission && filters.transmission !== '') {
            filtered = filtered.filter(car => car.transmission === filters.transmission);
        }

        if (filters.drivetrain && filters.drivetrain !== '') {
            filtered = filtered.filter(car => car.drivetrain === filters.drivetrain);
        }

        if (filters.minPrice) {
            filtered = filtered.filter(car => car.price >= filters.minPrice);
        }

        if (filters.maxPrice) {
            filtered = filtered.filter(car => car.price <= filters.maxPrice);
        }

        if (filters.minYear) {
            filtered = filtered.filter(car => car.year >= filters.minYear);
        }

        if (filters.maxYear) {
            filtered = filtered.filter(car => car.year <= filters.maxYear);
        }

        if (filters.maxMileage) {
            filtered = filtered.filter(car => car.mileage <= filters.maxMileage);
        }

        if (filters.search) {
            const searchTerm = filters.search.toLowerCase();
            filtered = filtered.filter(car => 
                car.make.toLowerCase().includes(searchTerm) ||
                car.model.toLowerCase().includes(searchTerm) ||
                car.year.toString().includes(searchTerm) ||
                car.color.toLowerCase().includes(searchTerm)
            );
        }

        return filtered;
    },

    // Sort cars
    sortCars(cars, sortBy) {
        const sorted = [...cars];
        
        switch (sortBy) {
            case 'price-low':
                return sorted.sort((a, b) => a.price - b.price);
            case 'price-high':
                return sorted.sort((a, b) => b.price - a.price);
            case 'year-new':
                return sorted.sort((a, b) => b.year - a.year);
            case 'year-old':
                return sorted.sort((a, b) => a.year - b.year);
            case 'mileage-low':
                return sorted.sort((a, b) => a.mileage - b.mileage);
            case 'mileage-high':
                return sorted.sort((a, b) => b.mileage - a.mileage);
            case 'make':
                return sorted.sort((a, b) => a.make.localeCompare(b.make));
            case 'model':
                return sorted.sort((a, b) => a.model.localeCompare(b.model));
            default:
                return sorted;
        }
    },

    // Get a single car by ID
    getCarById(id) {
        return carData.find(car => car.id === parseInt(id));
    },

    // Get similar cars
    getSimilarCars(car, limit = 3) {
        return carData
            .filter(c => c.id !== car.id && (c.make === car.make || c.category === car.category))
            .slice(0, limit);
    }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { carData, CarDataUtils };
}