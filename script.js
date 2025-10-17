class VendingMachine {
    constructor() {
        this.balance = 0;
        this.selectedProduct = null;
        this.init();
        this.setupBillAcceptor(); // Crea la ranura de billetes en la máquina
    }

    init() {
        // Event listeners para productos
        document.querySelectorAll('.product-slot').forEach(slot => {
            slot.addEventListener('click', () => this.selectProduct(slot));
        });

        // Event listeners para insertar dinero
        document.querySelectorAll('.money-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const amount = parseFloat(btn.dataset.amount);
                this.insertMoney(amount);
            });
        });

        // Event listeners para acciones
        document.getElementById('buy-btn').addEventListener('click', () => this.purchase());
        document.getElementById('return-btn').addEventListener('click', () => this.returnMoney());
    }

    selectProduct(slot) {
        // Remover selección anterior
        document.querySelectorAll('.product-slot').forEach(s => {
            s.classList.remove('selected');
        });

        // Seleccionar nuevo producto
        slot.classList.add('selected');
        this.selectedProduct = {
            id: slot.dataset.id,
            name: slot.dataset.name,
            price: parseFloat(slot.dataset.price)
        };

        // Actualizar display
        this.updateDisplay(`Seleccionado: ${this.selectedProduct.name}`, this.selectedProduct.price);
        this.animateSelection(slot);
    }

    animateSelection(slot) {
        const product = slot.querySelector('.product-image');
        product.style.animation = 'none';
        setTimeout(() => {
            product.style.animation = 'productFloat 3s ease-in-out infinite';
        }, 10);
    }

    insertMoney(amount) {
        this.balance += amount;
        document.getElementById('balance').textContent = this.balance.toFixed(2);
        this.showMessage(`Se insertaron Q${amount.toFixed(2)}`, 'success');
        
        // Animación de inserción de dinero
        this.animateMoneyInsert();
        this.animateBillInsert(amount); // Animación visual del billete
    }

    animateMoneyInsert() {
        const balanceElement = document.querySelector('.balance');
        balanceElement.style.animation = 'none';
        setTimeout(() => {
            balanceElement.style.animation = 'pulse 0.5s ease';
        }, 10);
    }

    setupBillAcceptor() {
        const machine = document.querySelector('.vending-machine');
        if (!machine || document.querySelector('.bill-acceptor')) return;
        const acceptor = document.createElement('div');
        acceptor.className = 'bill-acceptor';
        acceptor.innerHTML = '<div class="bill-slot" aria-hidden="true"></div>';
        machine.appendChild(acceptor);
        this.billAcceptorEl = acceptor;
    }

    animateBillInsert(amount) {
        const acceptor = this.billAcceptorEl || document.querySelector('.bill-acceptor');
        if (!acceptor) return;
        const bill = document.createElement('div');
        bill.className = 'bill';
        bill.textContent = `Q${Number.isInteger(amount) ? amount : amount.toFixed(0)}`;
        acceptor.appendChild(bill);

        acceptor.classList.add('active');
        bill.addEventListener('animationend', () => {
            bill.remove();
        });
        setTimeout(() => acceptor.classList.remove('active'), 700);
    }

    updateDisplay(text, price) {
        document.getElementById('display-text').textContent = text;
        document.getElementById('display-price').textContent = `Q${price.toFixed(2)}`;
    }

    async purchase() {
        if (!this.selectedProduct) {
            this.showMessage('⚠️ Por favor, selecciona un producto', 'error');
            return;
        }

        if (this.balance < this.selectedProduct.price) {
            this.showMessage(`❌ Saldo insuficiente. Faltan Q${(this.selectedProduct.price - this.balance).toFixed(2)}`, 'error');
            return;
        }

        // Procesar compra
        this.balance -= this.selectedProduct.price;
        document.getElementById('balance').textContent = this.balance.toFixed(2);

        // Animación de dispensado
        await this.dispenseProduct();

        // Calcular cambio
        const change = this.balance;
        if (change > 0) {
            this.showMessage(`✅ Producto dispensado. Cambio: Q${change.toFixed(2)}`, 'success');
            this.balance = 0;
            document.getElementById('balance').textContent = '0.00';
        } else {
            this.showMessage('✅ Producto dispensado. ¡Gracias por tu compra!', 'success');
        }

        // Resetear selección
        this.resetSelection();
    }

    async dispenseProduct() {
        const dispenserDoor = document.querySelector('.dispenser-door');
        const dispenserWindow = document.querySelector('.dispenser-window');

        // Obtener emoji del producto seleccionado
        const selectedSlot = document.querySelector('.product-slot.selected');
        const productEmoji = selectedSlot.querySelector('.product-image').textContent;

        // Crear elemento del producto dispensado
        const dispensedProduct = document.createElement('div');
        dispensedProduct.className = 'dispensed-product';
        dispensedProduct.textContent = productEmoji;
        dispenserWindow.appendChild(dispensedProduct);

        // Abrir puerta y dispensar
        await this.sleep(500);
        dispenserDoor.classList.add('open');
        
        await this.sleep(1500);
        dispenserDoor.classList.remove('open');
        
        await this.sleep(500);
        dispensedProduct.remove();
    }

    returnMoney() {
        if (this.balance === 0) {
            this.showMessage('ℹ️ No hay dinero para devolver', 'info');
            return;
        }

        const returnedAmount = this.balance;
        this.balance = 0;
        document.getElementById('balance').textContent = '0.00';
        this.showMessage(`💰 Se devolvieron Q${returnedAmount.toFixed(2)}`, 'info');
        this.resetSelection();
    }

    resetSelection() {
        document.querySelectorAll('.product-slot').forEach(slot => {
            slot.classList.remove('selected');
        });
        this.selectedProduct = null;
        this.updateDisplay('Selecciona un producto', 0);
    }

    showMessage(text, type) {
        const messageElement = document.getElementById('message');
        messageElement.textContent = text;
        messageElement.className = `message ${type} show`;

        setTimeout(() => {
            messageElement.classList.remove('show');
        }, 3000);
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// Inicializar la máquina expendedora
const vendingMachine = new VendingMachine();

// Agregar animación de pulso al CSS dinámicamente
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.1); }
    }
`;
document.head.appendChild(style);
