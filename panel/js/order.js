// Script pour la page Order
// Ajoute ici tes fonctionnalités JS spécifiques à la page Order

console.log('Order.js chargé');

// Order management functionality

document.addEventListener('DOMContentLoaded', function() {
    const table = document.querySelector('.orders-table');
    if (!table) return;
    // Make each row editable on click
    function attachRowClickEvents() {
        const rows = table.querySelectorAll('tbody tr');
        rows.forEach(row => {
            row.addEventListener('click', function() {
                row.classList.add('selected-row');
                const cells = row.querySelectorAll('td');
                for (let i = 0; i < cells.length; i++) {
                    let newValue = prompt('Edit value:', cells[i].textContent.trim());
                    if (newValue !== null && newValue !== '') {
                        if (i === 5) {
                            // Status column
                            cells[i].innerHTML = formatStatusCell(newValue);
                        } else {
                            cells[i].textContent = newValue;
                        }
                    }
                }
                setTimeout(() => row.classList.remove('selected-row'), 1000);
            });
        });
    }
    attachRowClickEvents();

    // Add order button functionality
    const addOrderBtn = document.querySelector('.add-order-btn');
    if (addOrderBtn) {
        addOrderBtn.addEventListener('click', function() {
            const orderId = prompt('Enter order ID:');
            const customer = prompt('Enter customer name:');
            const product = prompt('Enter product:');
            const number = prompt('Enter number:');
            const date = prompt('Enter date (YYYY-MM-DD):');
            const status = prompt('Enter status:');
            const total = prompt('Enter total:');
            if (orderId && customer && product && number && date && status && total) {
                const tbody = table.querySelector('tbody');
                const tr = document.createElement('tr');
                tr.innerHTML = `<td>${orderId}</td><td>${customer}</td><td>${product}</td><td>${number}</td><td>${date}</td><td>${formatStatusCell(status)}</td><td>$${total}</td>`;
                tr.addEventListener('click', function() {
                    tr.classList.add('selected-row');
                    const cells = tr.querySelectorAll('td');
                    for (let i = 0; i < cells.length; i++) {
                        let newValue = prompt('Edit value:', cells[i].textContent.trim());
                        if (newValue !== null && newValue !== '') {
                            if (i === 5) {
                                cells[i].innerHTML = formatStatusCell(newValue);
                            } else {
                                cells[i].textContent = newValue;
                            }
                        }
                    }
                    setTimeout(() => tr.classList.remove('selected-row'), 1000);
                });
                tbody.appendChild(tr);
            } else {
                alert('All fields are required to add an order.');
            }
        });
    }

    function formatStatusCell(value) {
        const status = value.trim().toLowerCase();
        let statusClass = '';
        if (status === 'pending') statusClass = 'pending';
        else if (status === 'shipped') statusClass = 'shipped';
        else if (status === 'delivered') statusClass = 'delivered';
        else if (status === 'cancelled') statusClass = 'cancelled';
        return `<span class="status ${statusClass}">${value}</span>`;
    }

    // Diagramme en camembert du nombre de ventes par produit (orders)
    const pieCtx = document.getElementById('stockPieChart');
    if (pieCtx) {
        // Récupère dynamiquement les données du tableau orders
        const table = document.querySelector('.orders-table');
        const rows = table.querySelectorAll('tbody tr');
        const products = {};
        rows.forEach(row => {
            const tds = row.querySelectorAll('td');
            const product = tds[2].textContent.trim();
            const number = parseInt(tds[3].textContent.trim());
            if (!products[product]) products[product] = 0;
            products[product] += number;
        });
        const labels = Object.keys(products);
        const data = Object.values(products);
        new Chart(pieCtx, {
            type: 'pie',
            data: {
                labels: labels,
                datasets: [{
                    data: data,
                    backgroundColor: [
                        '#21154c', '#4e2fa5', '#7c5fe6', '#b3a1f7', '#e0d7ff', '#ffb347', '#ff6961'
                    ],
                    borderColor: '#fff',
                    borderWidth: 2
                }]
            },
            options: {
                plugins: {
                    legend: { position: 'bottom' },
                    title: { display: true, text: 'Répartition des ventes par produit' }
                }
            }
        });
    }
});
