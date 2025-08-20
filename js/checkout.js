document.addEventListener('DOMContentLoaded', function() {
    // Payment Method Toggle
    const paymentMethods = document.querySelectorAll('.payment-method input');
    
    paymentMethods.forEach(method => {
        method.addEventListener('change', function() {
            document.querySelectorAll('.payment-method').forEach(pm => {
                pm.classList.remove('active');
            });
            
            this.closest('.payment-method').classList.add('active');
        });
    });
    
    // Initialize PayPal Button
    if (document.querySelector('#paypal-button-container')) {
        paypal.Buttons({
            style: {
                layout: 'vertical',
                color: 'gold',
                shape: 'rect',
                label: 'paypal'
            },
            
            createOrder: function(data, actions) {
                // Set up the transaction
                return actions.order.create({
                    purchase_units: [{
                        amount: {
                            value: '4625.00', // This should be your dynamic total
                            currency_code: 'USD',
                            breakdown: {
                                item_total: {
                                    value: '4250.00',
                                    currency_code: 'USD'
                                },
                                shipping: {
                                    value: '35.00',
                                    currency_code: 'USD'
                                },
                                tax_total: {
                                    value: '340.00',
                                    currency_code: 'USD'
                                }
                            }
                        },
                        items: [
                            {
                                name: 'Signature Tote',
                                description: 'Chestnut Brown',
                                quantity: '1',
                                unit_amount: {
                                    value: '1850.00',
                                    currency_code: 'USD'
                                }
                            },
                            {
                                name: 'Crystal Clutch',
                                description: 'Gold',
                                quantity: '1',
                                unit_amount: {
                                    value: '2400.00',
                                    currency_code: 'USD'
                                }
                            }
                        ]
                    }]
                });
            },
            
            onApprove: function(data, actions) {
                // Capture the funds from the transaction
                return actions.order.capture().then(function(details) {
                    // Show a success message to your buyer
                    alert('Transaction completed by ' + details.payer.name.given_name + '!');
                    
                    // Redirect to thank you page
                    window.location.href = 'thank-you.html?transaction_id=' + data.orderID;
                });
            },
            
            onError: function(err) {
                // Show an error page here, when an error occurs
                console.error(err);
                alert('There was an error processing your PayPal payment. Please try again or use another payment method.');
            }
        }).render('#paypal-button-container');
    }
    
    // Credit Card Validation
    const placeOrderBtn = document.getElementById('place-order');
    if (placeOrderBtn) {
        placeOrderBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Validate form
            const cardNumber = document.getElementById('card-number').value;
            const cardName = document.getElementById('card-name').value;
            const expiry = document.getElementById('expiry').value;
            const cvv = document.getElementById('cvv').value;
            
            if (!cardNumber || !cardName || !expiry || !cvv) {
                alert('Please fill in all credit card details');
                return;
            }
            
            // Process credit card payment (in a real site, this would be handled by a payment processor like Stripe)
            processCreditCardPayment();
        });
    }
    
    function processCreditCardPayment() {
        // In a real implementation, you would:
        // 1. Collect all form data
        // 2. Send to your payment processor (like Stripe)
        // 3. Handle the response
        
        // For demo purposes, we'll simulate a successful payment
        alert('Credit card payment processed successfully!');
        window.location.href = 'thank-you.html';
    }
    
    // Form Validation
    const formInputs = document.querySelectorAll('.checkout-info input, .checkout-info select');
    formInputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (!this.value) {
                this.classList.add('error');
            } else {
                this.classList.remove('error');
            }
        });
    });
    
    // Shipping Method Selection
    const shippingMethods = document.querySelectorAll('.shipping-method input');
    shippingMethods.forEach(method => {
        method.addEventListener('change', function() {
            document.querySelectorAll('.shipping-method').forEach(sm => {
                sm.classList.remove('active');
            });
            
            this.closest('.shipping-method').classList.add('active');
            
            // Update shipping cost in order summary
            updateShippingCost(this.id);
        });
    });
    
    function updateShippingCost(methodId) {
        // This would update the shipping cost in the order summary
        let shippingCost = 0;
        
        switch(methodId) {
            case 'standard':
                shippingCost = 15.00;
                break;
            case 'express':
                shippingCost = 35.00;
                break;
            case 'overnight':
                shippingCost = 75.00;
                break;
        }
        
        document.querySelector('.order-totals .total-row:nth-child(2) span:last-child').textContent = `$${shippingCost.toFixed(2)}`;
        
        // Recalculate total
        calculateOrderTotal();
    }
    
    function calculateOrderTotal() {
        // Get all values
        const subtotal = 4250.00; // This would normally be calculated from cart items
        const shippingText = document.querySelector('.order-totals .total-row:nth-child(2) span:last-child').textContent;
        const shipping = parseFloat(shippingText.replace('$', ''));
        const tax = 340.00; // This would normally be calculated based on location
        
        // Calculate total
        const total = subtotal + shipping + tax;
        
        // Update display
        document.querySelector('.grand-total span:last-child').textContent = `$${total.toFixed(2)}`;
    }
});