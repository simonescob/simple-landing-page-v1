// Inventory Page JavaScript
class InventoryManager {
    constructor() {
        this.currentPage = 1;
        this.itemsPerPage = 12;
        this.currentView = 'grid'; // 'grid' or 'list'
        this.currentFilters = {};
        this.currentSort = 'price-low';
        this.filteredCars = [];
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.initializeFilters();
        this.loadInitialData();
        this.renderCars();
        this.updateStats();
    }

    setupEventListeners() {
        // Mobile menu toggle
        document.getElementById('mobile-menu-button').addEventListener('click', this.toggleMobileMenu);
        
        // Filter sidebar toggle (mobile)
        document.getElementById('toggle-filters').addEventListener('click', this.toggleFilterSidebar);
        
        // Search input
        document.getElementById('search-input').addEventListener('input', this.debounce(this.handleSearch.bind(this), 300));
        
        // Make and Model selection
        document.getElementById('make-select').addEventListener('change', this.handleMakeChange.bind(this));
        document.getElementById('model-select').addEventListener('change', this.handleModelChange.bind(this));
        
        // Filter checkboxes
        document.querySelectorAll('#body-type-filters input[type="checkbox"]').forEach(checkbox => {
            checkbox.addEventListener('change', this.handleFilterChange.bind(this));
        });
        
        document.querySelectorAll('#fuel-type-filters input[type="checkbox"]').forEach(checkbox => {
            checkbox.addEventListener('change', this.handleFilterChange.bind(this));
        });
        
        // Price range sliders
        const minPriceSlider = document.getElementById('min-price-slider');
        const maxPriceSlider = document.getElementById('max-price-slider');
        
        minPriceSlider.addEventListener('input', this.handlePriceRangeChange.bind(this));
        maxPriceSlider.addEventListener('input', this.handlePriceRangeChange.bind(this));
        
        // Other filters
        document.getElementById('min-year').addEventListener('change', this.handleFilterChange.bind(this));
        document.getElementById('max-year').addEventListener('change', this.handleFilterChange.bind(this));
        document.getElementById('max-mileage').addEventListener('change', this.handleFilterChange.bind(this));
        document.getElementById('transmission-select').addEventListener('change', this.handleFilterChange.bind(this));
        
        // Apply filters button
        document.getElementById('apply-filters').addEventListener('click', this.applyFilters.bind(this));
        
        // Clear filters buttons
        document.getElementById('clear-filters').addEventListener('click', this.clearAllFilters.bind(this));
        document.getElementById('clear-all-filters').addEventListener('click', this.clearAllFilters.bind(this));
        
        // Sort selection
        document.getElementById('sort-select').addEventListener('change', this.handleSortChange.bind(this));
        
        // View toggle
        document.getElementById('grid-view').addEventListener('click', () => this.changeView('grid'));
        document.getElementById('list-view').addEventListener('click', () => this.changeView('list'));
    }

    toggleMobileMenu() {
        const mobileMenu = document.getElementById('mobile-menu');
        mobileMenu.classList.toggle('hidden');
    }

    toggleFilterSidebar() {
        const sidebar = document.getElementById('filter-sidebar');
        sidebar.classList.toggle('collapsed');
    }

    initializeFilters() {
        // Populate make dropdown
        const makes = CarDataUtils.getMakes();
        const makeSelect = document.getElementById('make-select');
        makes.forEach(make => {
            const option = document.createElement('option');
            option.value = make;
            option.textContent = make;
            makeSelect.appendChild(option);
        });

        // Populate year dropdowns
        const yearRange = CarDataUtils.getYearRange();
        const minYearSelect = document.getElementById('min-year');
        const maxYearSelect = document.getElementById('max-year');
        
        for (let year = yearRange.max; year >= yearRange.min; year--) {
            const minOption = document.createElement('option');
            minOption.value = year;
            minOption.textContent = year;
            minYearSelect.appendChild(minOption);
            
            const maxOption = document.createElement('option');
            maxOption.value = year;
            maxOption.textContent = year;
            maxYearSelect.appendChild(maxOption);
        }

        // Set initial price range
        const priceRange = CarDataUtils.getPriceRange();
        const minPriceSlider = document.getElementById('min-price-slider');
        const maxPriceSlider = document.getElementById('max-price-slider');
        
        minPriceSlider.min = priceRange.min;
        minPriceSlider.max = priceRange.max;
        minPriceSlider.value = priceRange.min;
        
        maxPriceSlider.min = priceRange.min;
        maxPriceSlider.max = priceRange.max;
        maxPriceSlider.value = priceRange.max;

        // Update price display
        this.updatePriceDisplay();
    }

    loadInitialData() {
        this.filteredCars = [...carData];
    }

    handleSearch(e) {
        const searchTerm = e.target.value;
        this.currentFilters.search = searchTerm;
        this.applyFilters();
    }

    handleMakeChange(e) {
        const make = e.target.value;
        this.currentFilters.make = make;
        
        // Update model dropdown
        const modelSelect = document.getElementById('model-select');
        modelSelect.innerHTML = '<option value="">All Models</option>';
        
        if (make) {
            const models = CarDataUtils.getModels(make);
            models.forEach(model => {
                const option = document.createElement('option');
                option.value = model;
                option.textContent = model;
                modelSelect.appendChild(option);
            });
            modelSelect.disabled = false;
        } else {
            modelSelect.disabled = true;
        }
    }

    handleModelChange(e) {
        this.currentFilters.model = e.target.value;
        this.applyFilters();
    }

    handleFilterChange() {
        this.collectFilters();
        this.applyFilters();
    }

    handlePriceRangeChange() {
        this.updatePriceDisplay();
        this.collectFilters();
    }

    updatePriceDisplay() {
        const minPrice = document.getElementById('min-price-slider').value;
        const maxPrice = document.getElementById('max-price-slider').value;
        
        document.getElementById('min-price').textContent = this.formatCurrency(minPrice);
        document.getElementById('max-price').textContent = this.formatCurrency(maxPrice);
    }

    collectFilters() {
        const filters = {};
        
        // Search
        filters.search = document.getElementById('search-input').value;
        
        // Make & Model
        filters.make = document.getElementById('make-select').value;
        filters.model = document.getElementById('model-select').value;
        
        // Body types (checkboxes)
        filters.bodyTypes = Array.from(document.querySelectorAll('#body-type-filters input:checked')).map(cb => cb.value);
        
        // Fuel types (checkboxes)
        filters.fuelTypes = Array.from(document.querySelectorAll('#fuel-type-filters input:checked')).map(cb => cb.value);
        
        // Price range
        filters.minPrice = parseInt(document.getElementById('min-price-slider').value);
        filters.maxPrice = parseInt(document.getElementById('max-price-slider').value);
        
        // Year range
        filters.minYear = parseInt(document.getElementById('min-year').value) || null;
        filters.maxYear = parseInt(document.getElementById('max-year').value) || null;
        
        // Mileage
        const maxMileage = document.getElementById('max-mileage').value;
        filters.maxMileage = maxMileage ? parseInt(maxMileage) : null;
        
        // Transmission
        filters.transmission = document.getElementById('transmission-select').value;
        
        this.currentFilters = filters;
    }

    applyFilters() {
        // Show loading state
        this.showLoadingState();
        
        // Simulate loading delay for better UX
        setTimeout(() => {
            this.filteredCars = CarDataUtils.filterCars(this.currentFilters);
            this.currentPage = 1;
            this.sortCars();
            this.renderCars();
            this.updateStats();
            this.hideLoadingState();
            this.updateFilterCounts();
        }, 300);
    }

    sortCars() {
        this.filteredCars = CarDataUtils.sortCars(this.filteredCars, this.currentSort);
    }

    handleSortChange(e) {
        this.currentSort = e.target.value;
        this.sortCars();
        this.renderCars();
    }

    changeView(view) {
        this.currentView = view;
        
        // Update view toggle buttons
        document.getElementById('grid-view').className = view === 'grid' 
            ? 'px-3 py-1 bg-white rounded-md text-sm font-medium'
            : 'px-3 py-1 text-gray-600 hover:text-gray-800 rounded-md text-sm font-medium';
        
        document.getElementById('list-view').className = view === 'list'
            ? 'px-3 py-1 bg-white rounded-md text-sm font-medium'
            : 'px-3 py-1 text-gray-600 hover:text-gray-800 rounded-md text-sm font-medium';
        
        this.renderCars();
    }

    renderCars() {
        const carGrid = document.getElementById('car-grid');
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        const endIndex = startIndex + this.itemsPerPage;
        const carsToShow = this.filteredCars.slice(startIndex, endIndex);
        
        carGrid.innerHTML = '';
        
        if (carsToShow.length === 0) {
            this.showNoResults();
            return;
        }
        
        this.hideNoResults();
        
        carsToShow.forEach(car => {
            const carCard = this.createCarCard(car);
            carGrid.appendChild(carCard);
        });
        
        this.renderPagination();
        this.updateResultsCount();
    }

    createCarCard(car) {
        const isListView = this.currentView === 'list';
        
        const card = document.createElement('div');
        card.className = `car-card bg-white rounded-xl shadow-lg overflow-hidden fade-in ${isListView ? 'flex' : ''}`;
        
        card.innerHTML = `
            <div class="${isListView ? 'w-1/3' : ''} relative">
                <img src="${car.image}" alt="${car.year} ${car.make} ${car.model}" 
                     class="${isListView ? 'w-full h-48 object-cover' : 'w-full h-64 object-cover'}"
                     loading="lazy">
                <div class="absolute top-4 left-4 flex space-x-2">
                    <span class="badge badge-available">${car.availability}</span>
                    ${car.condition === 'Certified Pre-Owned' ? '<span class="badge badge-certified">Certified</span>' : ''}
                </div>
                <button class="absolute top-4 right-4 w-8 h-8 bg-white/80 rounded-full flex items-center justify-center hover:bg-white transition-colors favorite-btn" data-car-id="${car.id}">
                    <i class="far fa-heart text-gray-600"></i>
                </button>
            </div>
            <div class="p-6 ${isListView ? 'flex-1' : ''}">
                <div class="flex justify-between items-start mb-2">
                    <h3 class="text-xl font-bold text-gray-900">${car.year} ${car.make} ${car.model}</h3>
                    <div class="text-right">
                        <div class="text-2xl font-bold text-blue-600">${this.formatCurrency(car.price)}</div>
                        <div class="text-sm text-gray-500">from ${this.formatCurrency(car.monthlyPayment)}/mo</div>
                    </div>
                </div>
                
                <p class="text-gray-600 mb-4 line-clamp-2">${car.description}</p>
                
                <div class="grid grid-cols-2 ${isListView ? 'grid-cols-4' : ''} gap-4 mb-4 text-sm">
                    <div class="flex items-center">
                        <i class="fas fa-tachometer-alt text-blue-500 mr-2"></i>
                        <span>${this.formatMileage(car.mileage)}</span>
                    </div>
                    <div class="flex items-center">
                        <i class="fas fa-cog text-blue-500 mr-2"></i>
                        <span>${car.transmission}</span>
                    </div>
                    <div class="flex items-center">
                        <i class="fas fa-gas-pump text-blue-500 mr-2"></i>
                        <span>${car.fuelType === 'Electric' ? `${car.range} mi range` : car.mpg}</span>
                    </div>
                    <div class="flex items-center">
                        <i class="fas fa-palette text-blue-500 mr-2"></i>
                        <span>${car.color}</span>
                    </div>
                </div>
                
                ${!isListView ? `
                <div class="mb-4">
                    <div class="flex flex-wrap gap-1">
                        ${car.features.slice(0, 4).map(feature => `<span class="feature-tag">${feature}</span>`).join('')}
                        ${car.features.length > 4 ? `<span class="text-xs text-gray-500">+${car.features.length - 4} more</span>` : ''}
                    </div>
                </div>
                ` : ''}
                
                <div class="flex space-x-2">
                    <button onclick="viewCarDetails(${car.id})" 
                            class="flex-1 btn-primary text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                        View Details
                    </button>
                    <button onclick="calculateFinancing(${car.price})" 
                            class="px-4 py-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
                        <i class="fas fa-calculator"></i>
                    </button>
                </div>
            </div>
        `;
        
        // Add event listener for favorite button
        const favoriteBtn = card.querySelector('.favorite-btn');
        favoriteBtn.addEventListener('click', this.toggleFavorite.bind(this, car.id));
        
        return card;
    }

    renderPagination() {
        const totalPages = Math.ceil(this.filteredCars.length / this.itemsPerPage);
        const pagination = document.getElementById('pagination').querySelector('nav');
        pagination.innerHTML = '';
        
        if (totalPages <= 1) return;
        
        // Previous button
        const prevBtn = this.createPaginationButton('Previous', this.currentPage > 1, this.currentPage - 1);
        pagination.appendChild(prevBtn);
        
        // Page numbers
        const startPage = Math.max(1, this.currentPage - 2);
        const endPage = Math.min(totalPages, this.currentPage + 2);
        
        for (let i = startPage; i <= endPage; i++) {
            const pageBtn = this.createPaginationButton(i.toString(), true, i, i === this.currentPage);
            pagination.appendChild(pageBtn);
        }
        
        // Next button
        const nextBtn = this.createPaginationButton('Next', this.currentPage < totalPages, this.currentPage + 1);
        pagination.appendChild(nextBtn);
    }

    createPaginationButton(text, enabled, page, isActive = false) {
        const button = document.createElement('button');
        button.textContent = text;
        button.className = `pagination-btn px-4 py-2 rounded-lg font-medium border ${
            isActive ? 'active' : 'border-gray-300 text-gray-700'
        } ${enabled ? '' : 'opacity-50 cursor-not-allowed'}`;
        
        if (enabled) {
            button.addEventListener('click', () => this.goToPage(page));
        }
        
        return button;
    }

    goToPage(page) {
        this.currentPage = page;
        this.renderCars();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    updateResultsCount() {
        const showingCount = document.getElementById('showing-count');
        const totalCount = document.getElementById('total-count');
        
        const startIndex = (this.currentPage - 1) * this.itemsPerPage + 1;
        const endIndex = Math.min(this.currentPage * this.itemsPerPage, this.filteredCars.length);
        
        showingCount.textContent = `${startIndex}-${endIndex}`;
        totalCount.textContent = this.filteredCars.length;
    }

    updateStats() {
        document.getElementById('total-cars').textContent = carData.length;
        document.getElementById('filtered-cars').textContent = this.filteredCars.length;
        
        if (this.filteredCars.length > 0) {
            const avgPrice = Math.round(this.filteredCars.reduce((sum, car) => sum + car.price, 0) / this.filteredCars.length);
            document.getElementById('avg-price').textContent = this.formatCurrency(avgPrice);
        } else {
            document.getElementById('avg-price').textContent = '$0';
        }
        
        const uniqueMakes = [...new Set(this.filteredCars.map(car => car.make))];
        document.getElementById('brands-count').textContent = uniqueMakes.length;
    }

    updateFilterCounts() {
        // Update checkbox counts
        const bodyTypes = ['SUV', 'Sedan', 'Coupe', 'Wagon'];
        bodyTypes.forEach(type => {
            const count = carData.filter(car => car.bodyType === type).length;
            const element = document.getElementById(`${type.toLowerCase()}-count`);
            if (element) element.textContent = count;
        });
        
        const fuelTypes = ['Gasoline', 'Hybrid', 'Electric'];
        fuelTypes.forEach(type => {
            const count = carData.filter(car => car.fuelType === type).length;
            const element = document.getElementById(`${type.toLowerCase()}-count`);
            if (element) element.textContent = count;
        });
    }

    clearAllFilters() {
        // Clear all form elements
        document.getElementById('search-input').value = '';
        document.getElementById('make-select').value = '';
        document.getElementById('model-select').value = '';
        document.getElementById('model-select').disabled = true;
        
        // Clear checkboxes
        document.querySelectorAll('#body-type-filters input[type="checkbox"]').forEach(cb => cb.checked = false);
        document.querySelectorAll('#fuel-type-filters input[type="checkbox"]').forEach(cb => cb.checked = false);
        
        // Reset sliders
        const priceRange = CarDataUtils.getPriceRange();
        document.getElementById('min-price-slider').value = priceRange.min;
        document.getElementById('max-price-slider').value = priceRange.max;
        this.updatePriceDisplay();
        
        // Clear other filters
        document.getElementById('min-year').value = '';
        document.getElementById('max-year').value = '';
        document.getElementById('max-mileage').value = '';
        document.getElementById('transmission-select').value = '';
        
        // Clear current filters
        this.currentFilters = {};
        this.applyFilters();
    }

    showLoadingState() {
        document.getElementById('loading-state').classList.remove('hidden');
        document.getElementById('car-grid').classList.add('hidden');
        document.getElementById('no-results').classList.add('hidden');
    }

    hideLoadingState() {
        document.getElementById('loading-state').classList.add('hidden');
        document.getElementById('car-grid').classList.remove('hidden');
    }

    showNoResults() {
        document.getElementById('car-grid').classList.add('hidden');
        document.getElementById('no-results').classList.remove('hidden');
    }

    hideNoResults() {
        document.getElementById('no-results').classList.add('hidden');
    }

    toggleFavorite(carId) {
        // This would typically interact with a backend API
        // For demo purposes, we'll just toggle the heart icon
        const favoriteBtn = document.querySelector(`[data-car-id="${carId}"]`);
        const icon = favoriteBtn.querySelector('i');
        
        if (icon.classList.contains('far')) {
            icon.classList.remove('far');
            icon.classList.add('fas');
            favoriteBtn.classList.add('text-red-500');
        } else {
            icon.classList.remove('fas');
            icon.classList.add('far');
            favoriteBtn.classList.remove('text-red-500');
        }
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

    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
}

// Global functions for HTML onclick handlers
function viewCarDetails(carId) {
    // Store car ID in localStorage for the details page
    localStorage.setItem('selectedCarId', carId);
    window.location.href = `car-details.html?id=${carId}`;
}

function calculateFinancing(price) {
    // Redirect to main page financing calculator with car price
    window.location.href = `index.html#financing`;
    
    // Note: In a more advanced implementation, you could:
    // 1. Store the car price in localStorage
    // 2. Pass it as a URL parameter
    // 3. Pre-fill the calculator with the car price
    // For now, we're directing users to check their qualification
}

// Initialize the inventory manager when the page loads
document.addEventListener('DOMContentLoaded', function() {
    new InventoryManager();
});