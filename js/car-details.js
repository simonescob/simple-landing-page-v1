// Car Details Page JavaScript
class CarDetailsManager {
    constructor() {
        this.currentImageIndex = 0;
        this.currentCar = null;
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadCarDetails();
    }

    setupEventListeners() {
        // Mobile menu toggle
        document.getElementById('mobile-menu-button').addEventListener('click', this.toggleMobileMenu);
        
        // Contact form submission
        document.getElementById('contact-form').addEventListener('submit', this.handleContactForm.bind(this));
        
        // Financing calculator inputs
        const calcInputs = ['calc-vehicle-price', 'calc-down-payment', 'calc-interest-rate', 'calc-loan-term'];
        calcInputs.forEach(inputId => {
            document.getElementById(inputId).addEventListener('change', this.prefillFinancing.bind(this));
        });
    }

    toggleMobileMenu() {
        const mobileMenu = document.getElementById('mobile-menu');
        mobileMenu.classList.toggle('hidden');
    }

    loadCarDetails() {
        // Get car ID from URL parameters or localStorage
        const urlParams = new URLSearchParams(window.location.search);
        let carId = urlParams.get('id');
        
        if (!carId) {
            carId = localStorage.getItem('selectedCarId');
        }
        
        if (!carId) {
            this.showError('Car ID not found');
            return;
        }
        
        // Find the car
        const car = CarDataUtils.getCarById(carId);
        
        if (!car) {
            this.showError('Car not found');
            return;
        }
        
        this.currentCar = car;
        this.renderCarDetails();
        this.renderImageGallery();
        this.renderSpecifications();
        this.renderFeatures();
        this.renderSimilarCars();
        this.prefillFinancing();
        this.hideLoadingState();
    }

    renderCarDetails() {
        const car = this.currentCar;
        
        // Update page title and breadcrumb
        document.title = `${car.year} ${car.make} ${car.model} - AutoElite Motors`;
        document.getElementById('page-title').textContent = `${car.year} ${car.make} ${car.model} - AutoElite Motors`;
        document.getElementById('breadcrumb-car').textContent = `${car.year} ${car.make} ${car.model}`;
        
        // Update main details
        document.getElementById('car-title').textContent = `${car.year} ${car.make} ${car.model}`;
        document.getElementById('car-description').textContent = car.description;
        document.getElementById('car-availability').textContent = car.availability;
        document.getElementById('car-availability').className = `badge badge-${car.availability.toLowerCase().replace(' ', '-')}`;
        
        // Condition badge
        const conditionElement = document.getElementById('car-condition');
        conditionElement.textContent = car.condition;
        if (car.condition === 'Certified Pre-Owned') {
            conditionElement.className = 'badge badge-certified';
        } else {
            conditionElement.className = 'badge';
        }
        
        // Safety rating
        this.renderSafetyRating();
        
        // Price and payment
        document.getElementById('car-price').textContent = this.formatCurrency(car.price);
        document.getElementById('monthly-payment').textContent = this.formatCurrency(car.monthlyPayment);
    }

    renderSafetyRating() {
        const car = this.currentCar;
        const rating = car.safetyRating;
        const starsContainer = document.getElementById('safety-rating-stars');
        const ratingText = document.getElementById('safety-rating-text');
        
        // Generate star rating
        let starsHtml = '';
        for (let i = 1; i <= 5; i++) {
            if (i <= rating) {
                starsHtml += '<i class="fas fa-star"></i>';
            } else {
                starsHtml += '<i class="far fa-star"></i>';
            }
        }
        starsContainer.innerHTML = starsHtml;
        
        ratingText.textContent = `${rating}/5 Safety Rating`;
    }

    renderImageGallery() {
        const car = this.currentCar;
        const mainImage = document.getElementById('main-image');
        const thumbnailsGrid = document.querySelector('.thumbnails-grid');
        
        // Set main image
        mainImage.src = car.images[0];
        mainImage.alt = `${car.year} ${car.make} ${car.model} - Image 1`;
        
        // Generate thumbnails
        thumbnailsGrid.innerHTML = '';
        car.images.forEach((image, index) => {
            const thumbnail = document.createElement('div');
            thumbnail.className = `thumbnail w-full h-20 rounded-lg overflow-hidden cursor-pointer ${index === 0 ? 'active' : ''}`;
            thumbnail.innerHTML = `<img src="${image}" alt="${car.year} ${car.make} ${car.model} - Thumbnail ${index + 1}" class="w-full h-full object-cover">`;
            
            thumbnail.addEventListener('click', () => this.changeMainImage(index));
            thumbnailsGrid.appendChild(thumbnail);
        });
    }

    changeMainImage(index) {
        const car = this.currentCar;
        const mainImage = document.getElementById('main-image');
        
        // Update main image
        mainImage.src = car.images[index];
        mainImage.alt = `${car.year} ${car.make} ${car.model} - Image ${index + 1}`;
        
        // Update thumbnail active state
        document.querySelectorAll('.thumbnail').forEach((thumb, i) => {
            thumb.classList.toggle('active', i === index);
        });
        
        this.currentImageIndex = index;
    }

    renderSpecifications() {
        const car = this.currentCar;
        
        // Engine & Performance
        document.getElementById('engine-spec').textContent = car.engine;
        document.getElementById('horsepower-spec').textContent = `${car.horsepower} HP`;
        document.getElementById('torque-spec').textContent = `${car.torque} lb-ft`;
        document.getElementById('transmission-spec').textContent = car.transmission;
        document.getElementById('drivetrain-spec').textContent = car.drivetrain;
        
        // Fuel Economy & Capacity
        document.getElementById('fuel-type-spec').textContent = car.fuelType;
        document.getElementById('mpg-spec').textContent = car.fuelType === 'Electric' ? 'Electric Vehicle' : car.mpg;
        document.getElementById('range-spec').textContent = car.range ? `${car.range} miles` : 'N/A';
        
        // Vehicle Details
        document.getElementById('body-type-spec').textContent = car.bodyType;
        document.getElementById('category-spec').textContent = car.category;
        document.getElementById('color-spec').textContent = car.color;
        document.getElementById('interior-spec').textContent = car.interior;
        
        // Condition & History
        document.getElementById('year-spec').textContent = car.year;
        document.getElementById('mileage-spec').textContent = this.formatMileage(car.mileage);
        document.getElementById('condition-spec').textContent = car.condition;
        document.getElementById('vin-spec').textContent = car.vin;
    }

    renderFeatures() {
        const car = this.currentCar;
        const featuresGrid = document.getElementById('features-grid');
        
        featuresGrid.innerHTML = '';
        
        car.features.forEach(feature => {
            const featureItem = document.createElement('div');
            featureItem.className = 'feature-item';
            featureItem.innerHTML = `
                <div class="flex items-center">
                    <i class="fas fa-check-circle text-green-500 mr-3"></i>
                    <span class="text-gray-900 font-medium">${feature}</span>
                </div>
            `;
            featuresGrid.appendChild(featureItem);
        });
    }

    renderSimilarCars() {
        const car = this.currentCar;
        const similarCars = CarDataUtils.getSimilarCars(car, 4);
        const similarCarsGrid = document.getElementById('similar-cars-grid');
        
        similarCarsGrid.innerHTML = '';
        
        similarCars.forEach(similarCar => {
            const carCard = this.createSimilarCarCard(similarCar);
            similarCarsGrid.appendChild(carCard);
        });
    }

    createSimilarCarCard(car) {
        const card = document.createElement('div');
        card.className = 'similar-car-card bg-white rounded-xl shadow-lg overflow-hidden';
        
        card.innerHTML = `
            <div class="relative">
                <img src="${car.image}" alt="${car.year} ${car.make} ${car.model}" 
                     class="w-full h-48 object-cover">
                <div class="absolute top-4 left-4">
                    <span class="badge badge-${car.availability.toLowerCase().replace(' ', '-')}">${car.availability}</span>
                </div>
            </div>
            <div class="p-4">
                <h3 class="text-lg font-bold text-gray-900 mb-2">${car.year} ${car.make} ${car.model}</h3>
                <div class="flex justify-between items-center mb-3">
                    <div class="text-xl font-bold text-blue-600">${this.formatCurrency(car.price)}</div>
                    <div class="text-sm text-gray-500">${this.formatMileage(car.mileage)}</div>
                </div>
                <div class="flex space-x-2">
                    <button onclick="viewSimilarCar(${car.id})" 
                            class="flex-1 bg-blue-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                        View Details
                    </button>
                    <button onclick="calculateFinancing(${car.price})" 
                            class="px-3 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
                        <i class="fas fa-calculator text-sm"></i>
                    </button>
                </div>
            </div>
        `;
        
        return card;
    }

    prefillFinancing() {
        if (!this.currentCar) return;
        
        const car = this.currentCar;
        document.getElementById('calc-vehicle-price').value = car.price;
        document.getElementById('calc-down-payment').value = Math.round(car.price * 0.1); // 10% down payment
        document.getElementById('calc-interest-rate').value = 4.5;
    }

    handleContactForm(e) {
        e.preventDefault();
        
        const submitButton = e.target.querySelector('button[type="submit"]');
        const originalText = submitButton.innerHTML;
        
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Sending...';
        submitButton.disabled = true;
        
        setTimeout(() => {
            submitButton.innerHTML = '<i class="fas fa-check mr-2"></i>Message Sent!';
            submitButton.classList.remove('btn-primary');
            submitButton.classList.add('bg-green-600', 'hover:bg-green-700');
            
            setTimeout(() => {
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
                submitButton.classList.add('btn-primary');
                submitButton.classList.remove('bg-green-600', 'hover:bg-green-700');
                e.target.reset();
            }, 3000);
        }, 2000);
    }

    showLoadingState() {
        document.getElementById('loading-state').classList.remove('hidden');
        document.getElementById('car-details-content').classList.add('hidden');
    }

    hideLoadingState() {
        document.getElementById('loading-state').classList.add('hidden');
        document.getElementById('car-details-content').classList.remove('hidden');
    }

    showError(message) {
        document.getElementById('loading-state').innerHTML = `
            <div class="text-center py-12">
                <i class="fas fa-exclamation-triangle text-6xl text-red-300 mb-4"></i>
                <h3 class="text-xl font-semibold text-gray-900 mb-2">Error</h3>
                <p class="text-gray-600 mb-6">${message}</p>
                <a href="inventory.html" class="btn-primary text-white px-6 py-3 rounded-lg font-semibold inline-block">
                    Back to Inventory
                </a>
            </div>
        `;
    }

    formatCurrency(amount) {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(amount);
    }

    formatMileage(mileage) {
        return new Intl.NumberFormat('en-US').format(mileage) + ' miles';
    }
}

// Global functions for HTML onclick handlers
function scheduleTestDrive() {
    // This would typically open a modal or redirect to a scheduling system
    alert('Test drive scheduling feature would be implemented here. This would typically integrate with a calendar system.');
}

function contactDealer() {
    // Scroll to contact form
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.scrollIntoView({ behavior: 'smooth' });
        contactForm.querySelector('input').focus();
    }
}

function calculateTradeIn() {
    // This would typically open a trade-in value calculator
    alert('Trade-in value calculator would be implemented here. This would typically integrate with vehicle valuation APIs.');
}

function addToFavorites() {
    if (!carDetailsManager.currentCar) return;
    
    // Get current favorites from localStorage
    let favorites = JSON.parse(localStorage.getItem('carFavorites') || '[]');
    const carId = carDetailsManager.currentCar.id;
    
    if (favorites.includes(carId)) {
        // Remove from favorites
        favorites = favorites.filter(id => id !== carId);
        alert('Vehicle removed from favorites!');
    } else {
        // Add to favorites
        favorites.push(carId);
        alert('Vehicle added to favorites!');
    }
    
    // Save back to localStorage
    localStorage.setItem('carFavorites', JSON.stringify(favorites));
    
    // Update button text
    const button = event.target;
    button.innerHTML = favorites.includes(carId) 
        ? '<i class="fas fa-heart mr-2"></i>Remove from Favorites'
        : '<i class="far fa-heart mr-2"></i>Add to Favorites';
}

function calculateFinancing(price) {
    // Pre-fill financing calculator with the specified price
    if (typeof price === 'number') {
        document.getElementById('calc-vehicle-price').value = price;
        document.getElementById('calc-down-payment').value = Math.round(price * 0.1);
    }
    
    // Scroll to financing calculator
    const calculator = document.querySelector('.financing-calculator');
    if (calculator) {
        calculator.scrollIntoView({ behavior: 'smooth' });
    }
    
    // Auto-calculate if possible
    setTimeout(() => {
        if (document.getElementById('financing-result').classList.contains('hidden')) {
            performFinancingCalculation();
        }
    }, 500);
}

function performFinancingCalculation() {
    const vehiclePrice = parseFloat(document.getElementById('calc-vehicle-price').value) || 0;
    const downPayment = parseFloat(document.getElementById('calc-down-payment').value) || 0;
    const interestRate = parseFloat(document.getElementById('calc-interest-rate').value) || 0;
    const loanTerm = parseInt(document.getElementById('calc-loan-term').value) || 60;
    
    // Calculate loan amount
    const loanAmount = vehiclePrice - downPayment;
    
    // Calculate monthly payment using PMT formula
    const monthlyRate = (interestRate / 100) / 12;
    const numberOfPayments = loanTerm;
    
    let monthlyPayment = 0;
    if (monthlyRate > 0) {
        monthlyPayment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / 
                       (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
    } else {
        monthlyPayment = loanAmount / numberOfPayments;
    }
    
    // Display result
    document.getElementById('calc-monthly-payment').textContent = carDetailsManager.formatCurrency(monthlyPayment);
    document.getElementById('financing-result').classList.remove('hidden');
}

function viewSimilarCar(carId) {
    // Store car ID and redirect to details page
    localStorage.setItem('selectedCarId', carId);
    window.location.href = `car-details.html?id=${carId}`;
}

// Initialize the car details manager
let carDetailsManager;
document.addEventListener('DOMContentLoaded', function() {
    carDetailsManager = new CarDetailsManager();
    
    // Add event listeners for financing calculator inputs
    const calcInputs = ['calc-vehicle-price', 'calc-down-payment', 'calc-interest-rate', 'calc-loan-term'];
    calcInputs.forEach(inputId => {
        document.getElementById(inputId).addEventListener('input', function() {
            // Clear result when inputs change
            document.getElementById('financing-result').classList.add('hidden');
        });
    });
});