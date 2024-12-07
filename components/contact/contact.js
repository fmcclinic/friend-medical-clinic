// components/contact/contact.js
class ContactManager {
    constructor() {
        this.initElements();
        this.bindEvents();
        this.setupIntersectionObserver();
    }

    initElements() {
        this.form = document.getElementById('contactForm');
        this.inputs = this.form.querySelectorAll('input, select, textarea');
        this.submitButton = this.form.querySelector('button[type="submit"]');
    }

    bindEvents() {
        // Form submission
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));

        // Input validation
        this.inputs.forEach(input => {
            input.addEventListener('blur', (e) => this.validateInput(e.target));
            input.addEventListener('input', (e) => this.validateInput(e.target));
        });

        // Date input restrictions
        const dateInput = this.form.querySelector('input[type="date"]');
        if (dateInput) {
            this.setupDateRestrictions(dateInput);
        }
    }

    setupDateRestrictions(dateInput) {
        const today = new Date();
        const maxDate = new Date();
        maxDate.setMonth(maxDate.getMonth() + 1); // Max 1 month ahead

        dateInput.min = today.toISOString().split('T')[0];
        dateInput.max = maxDate.toISOString().split('T')[0];
    }

    validateInput(input) {
        const value = input.value.trim();
        const name = input.name;

        // Remove existing error messages
        const existingError = input.parentElement.querySelector('.error-message');
        if (existingError) existingError.remove();

        let isValid = true;
        let errorMessage = '';

        switch (name) {
            case 'name':
                if (value.length < 2) {
                    isValid = false;
                    errorMessage = 'Vui lòng nhập họ tên đầy đủ';
                }
                break;

            case 'phone':
                const phoneRegex = /(84|0[3|5|7|8|9])+([0-9]{8})\b/;
                if (!phoneRegex.test(value)) {
                    isValid = false;
                    errorMessage = 'Số điện thoại không hợp lệ';
                }
                break;

            case 'email':
                if (value) {
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(value)) {
                        isValid = false;
                        errorMessage = 'Email không hợp lệ';
                    }
                }
                break;

            case 'department':
                if (!value) {
                    isValid = false;
                    errorMessage = 'Vui lòng chọn chuyên khoa';
                }
                break;

            case 'date':
                if (!value) {
                    isValid = false;
                    errorMessage = 'Vui lòng chọn ngày khám';
                }
                break;
        }

        if (!isValid) {
            this.showError(input, errorMessage);
            return false;
        }

        return true;
    }

    showError(input, message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message text-red-500 text-sm mt-1';
        errorDiv.textContent = message;
        input.parentElement.appendChild(errorDiv);
        input.classList.add('border-red-500');
    }

    async handleSubmit(e) {
        e.preventDefault();

        // Validate all inputs
        let isValid = true;
        this.inputs.forEach(input => {
            if (!this.validateInput(input)) {
                isValid = false;
            }
        });

        if (!isValid) return;

        // Show loading state
        this.form.classList.add('form-loading');
        this.submitButton.disabled = true;

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Show success message
            this.showSuccessMessage();
            this.form.reset();
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('Có lỗi xảy ra. Vui lòng thử lại sau.');
        } finally {
            this.form.classList.remove('form-loading');
            this.submitButton.disabled = false;
        }
    }

    showSuccessMessage() {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'success-message fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg';
        messageDiv.textContent = 'Đặt lịch thành công! Chúng tôi sẽ liên hệ sớm.';
        document.body.appendChild(messageDiv);

        setTimeout(() => {
            messageDiv.remove();
        }, 3000);
    }

    setupIntersectionObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });

        document.querySelectorAll('.info-card').forEach(card => {
            observer.observe(card);
        });
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ContactManager();
});