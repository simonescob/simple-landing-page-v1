// Car Loan Approval Calculator
class LoanApprovalCalculator {
    constructor() {
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.calculateLoan(); // Initial calculation
    }

    setupEventListeners() {
        // Real-time calculation on input change
        const inputs = document.querySelectorAll('#loan-calculator-form input, #loan-calculator-form select');
        inputs.forEach(input => {
            input.addEventListener('input', () => this.debounce(this.calculateLoan.bind(this), 500));
            input.addEventListener('change', () => this.calculateLoan.bind(this));
        });
    }

    calculateLoan() {
        // Get form values
        const monthlyIncome = this.parseCurrency(document.getElementById('monthlyIncome')?.value || '0');
        const monthlyDebt = this.parseCurrency(document.getElementById('monthlyDebt')?.value || '0');
        const creditScore = document.getElementById('creditScore')?.value || '';
        const downPayment = this.parseCurrency(document.getElementById('downPayment')?.value || '0');
        const loanTerm = parseInt(document.getElementById('loanTerm')?.value || '60');

        // Validate inputs
        if (monthlyIncome <= 0 || monthlyDebt < 0) {
            this.displayError('Please enter valid income and debt amounts.');
            return;
        }

        // Calculate debt-to-income ratio
        const dtiRatio = this.calculateDTIRatio(monthlyIncome, monthlyDebt);
        
        // Calculate payment capacity
        const paymentCapacity = this.calculatePaymentCapacity(monthlyIncome, monthlyDebt);
        
        // Calculate maximum loan amount
        const maxLoanAmount = this.calculateMaxLoanAmount(paymentCapacity, loanTerm, creditScore);
        
        // Calculate total vehicle price (including down payment)
        const maxVehiclePrice = maxLoanAmount + downPayment;
        
        // Calculate monthly payment for max loan
        const monthlyPayment = this.calculateMonthlyPayment(maxLoanAmount, loanTerm, creditScore);
        
        // Determine approval likelihood
        const approvalLikelihood = this.calculateApprovalLikelihood(dtiRatio, creditScore, monthlyIncome);
        
        // Display results
        this.displayResults({
            maxLoanAmount,
            maxVehiclePrice,
            monthlyPayment,
            dtiRatio,
            paymentCapacity,
            approvalLikelihood,
            totalInterest: (monthlyPayment * loanTerm) - maxLoanAmount
        });
    }

    calculateDTIRatio(monthlyIncome, monthlyDebt) {
        if (monthlyIncome <= 0) return 0;
        return (monthlyDebt / monthlyIncome) * 100;
    }

    calculatePaymentCapacity(monthlyIncome, monthlyDebt) {
        // Standard lending guideline: 28% of gross monthly income for housing/debt payments
        const maxHousingPayment = monthlyIncome * 0.28;
        return Math.max(0, maxHousingPayment - monthlyDebt);
    }

    calculateMaxLoanAmount(paymentCapacity, loanTerm, creditScore) {
        // Base interest rates by credit score range
        const baseRates = {
            'excellent': 0.029,  // 2.9%
            'good': 0.045,       // 4.5%
            'fair': 0.065,       // 6.5%
            'poor': 0.089,       // 8.9%
            'no-credit': 0.12    // 12%
        };

        const rate = baseRates[creditScore] || baseRates['good'];
        const monthlyRate = rate / 12;

        if (monthlyRate <= 0 || paymentCapacity <= 0) {
            return 0;
        }

        // Calculate loan amount using PMT formula in reverse
        const loanAmount = paymentCapacity * 
            (Math.pow(1 + monthlyRate, loanTerm) - 1) / 
            (monthlyRate * Math.pow(1 + monthlyRate, loanTerm));

        return Math.max(0, loanAmount);
    }

    calculateMonthlyPayment(loanAmount, loanTerm, creditScore) {
        const baseRates = {
            'excellent': 0.029,
            'good': 0.045,
            'fair': 0.065,
            'poor': 0.089,
            'no-credit': 0.12
        };

        const rate = baseRates[creditScore] || baseRates['good'];
        const monthlyRate = rate / 12;

        if (monthlyRate <= 0) {
            return loanAmount / loanTerm;
        }

        // PMT formula: P = L[r(1+r)^n]/[(1+r)^n-1]
        const monthlyPayment = loanAmount * 
            (monthlyRate * Math.pow(1 + monthlyRate, loanTerm)) / 
            (Math.pow(1 + monthlyRate, loanTerm) - 1);

        return monthlyPayment;
    }

    calculateApprovalLikelihood(dtiRatio, creditScore, monthlyIncome) {
        let score = 0;
        let factors = [];

        // DTI ratio scoring (40% weight)
        if (dtiRatio <= 28) {
            score += 40;
            factors.push('Excellent debt-to-income ratio');
        } else if (dtiRatio <= 36) {
            score += 30;
            factors.push('Good debt-to-income ratio');
        } else if (dtiRatio <= 43) {
            score += 20;
            factors.push('Acceptable debt-to-income ratio');
        } else {
            score += 5;
            factors.push('High debt-to-income ratio');
        }

        // Credit score scoring (40% weight)
        const creditScores = {
            'excellent': { score: 40, factor: 'Excellent credit score' },
            'good': { score: 30, factor: 'Good credit score' },
            'fair': { score: 20, factor: 'Fair credit score' },
            'poor': { score: 10, factor: 'Poor credit score' },
            'no-credit': { score: 5, factor: 'No credit history' }
        };

        const creditData = creditScores[creditScore] || creditScores['good'];
        score += creditData.score;
        factors.push(creditData.factor);

        // Income stability (20% weight)
        if (monthlyIncome >= 5000) {
            score += 20;
            factors.push('Strong income level');
        } else if (monthlyIncome >= 3000) {
            score += 15;
            factors.push('Good income level');
        } else if (monthlyIncome >= 2000) {
            score += 10;
            factors.push('Adequate income level');
        } else {
            score += 5;
            factors.push('Low income level');
        }

        // Determine approval likelihood
        if (score >= 80) {
            return { level: 'High', percentage: Math.min(95, score), factors };
        } else if (score >= 60) {
            return { level: 'Medium', percentage: Math.min(85, score), factors };
        } else {
            return { level: 'Low', percentage: Math.min(70, score), factors };
        }
    }

    displayResults(results) {
        // Hide error message if shown
        this.hideError();

        // Update results display
        document.getElementById('maxLoanAmount').textContent = this.formatCurrency(results.maxLoanAmount);
        document.getElementById('maxVehiclePrice').textContent = this.formatCurrency(results.maxVehiclePrice);
        document.getElementById('monthlyPayment').textContent = this.formatCurrency(results.monthlyPayment);
        document.getElementById('totalInterest').textContent = this.formatCurrency(results.totalInterest);
        document.getElementById('dtiRatio').textContent = results.dtiRatio.toFixed(1) + '%';
        
        // Update approval likelihood
        const approvalElement = document.getElementById('approvalLikelihood');
        approvalElement.textContent = results.approvalLikelihood.level;
        approvalElement.className = `text-lg font-semibold ${
            results.approvalLikelihood.level === 'High' ? 'text-green-600' :
            results.approvalLikelihood.level === 'Medium' ? 'text-yellow-600' : 'text-red-600'
        }`;

        // Update approval percentage
        document.getElementById('approvalPercentage').textContent = results.approvalLikelihood.percentage + '%';

        // Show results container
        document.getElementById('loanResults').classList.remove('hidden');

        // Update progress bar
        this.updateProgressBar(results.approvalLikelihood.percentage);

        // Update recommendations
        this.updateRecommendations(results);
    }

    updateProgressBar(percentage) {
        const progressBar = document.getElementById('approvalProgress');
        const progressText = document.getElementById('progressText');
        
        progressBar.style.width = percentage + '%';
        progressBar.className = `h-2 rounded-full transition-all duration-500 ${
            percentage >= 80 ? 'bg-green-500' :
            percentage >= 60 ? 'bg-yellow-500' : 'bg-red-500'
        }`;
        
        progressText.textContent = `${percentage}% Approval Likelihood`;
    }

    updateRecommendations(results) {
        const recommendations = document.getElementById('recommendations');
        const recommendationItems = [];

        if (results.dtiRatio > 36) {
            recommendationItems.push('Consider paying down existing debts to improve approval odds');
        }

        if (results.approvalLikelihood.level === 'Low') {
            recommendationItems.push('Consider a larger down payment to improve approval chances');
            recommendationItems.push('Look into shorter loan terms for better rates');
        }

        if (results.maxVehiclePrice < 10000) {
            recommendationItems.push('Consider used vehicles in your price range');
        }

        if (recommendationItems.length === 0) {
            recommendationItems.push('You\'re in a good position for auto financing!');
        }

        recommendations.innerHTML = recommendationItems
            .map(item => `<li class="text-sm text-gray-600 mb-1">• ${item}</li>`)
            .join('');
    }

    displayError(message) {
        const errorElement = document.getElementById('loanError');
        errorElement.textContent = message;
        errorElement.classList.remove('hidden');
        document.getElementById('loanResults').classList.add('hidden');
    }

    hideError() {
        document.getElementById('loanError').classList.add('hidden');
    }

    parseCurrency(value) {
        if (!value) return 0;
        return parseFloat(value.toString().replace(/[,$]/g, '')) || 0;
    }

    formatCurrency(amount) {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(amount);
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

// Auto-format currency inputs
function formatCurrencyInput(input) {
    let value = input.value.replace(/[^\d]/g, '');
    if (value) {
        value = parseInt(value, 10);
        input.value = value.toLocaleString('en-US');
    } else {
        input.value = '';
    }
}

// Export for use in HTML
if (typeof module !== 'undefined' && module.exports) {
    module.exports = LoanApprovalCalculator;
}