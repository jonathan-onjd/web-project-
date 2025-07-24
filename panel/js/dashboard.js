// ==================== Script principal du Dashboard ====================
// Ce fichier gère l'affichage dynamique des indicateurs, graphiques et statistiques du tableau de bord

// Attendre que le DOM soit chargé avant d'exécuter le script

// ==================== Initialisation et affichage des graphiques ====================
document.addEventListener('DOMContentLoaded', function() {
    // === Courbe des ventes mensuelles (Chart.js) ===
    const ctx = document.getElementById('salesChart');
    if (ctx) {
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
                datasets: [{
                    label: 'Sales',
                    data: [1200, 1900, 3000, 2500, 3200, 2800, 3500],
                    borderColor: '#12002b',
                    backgroundColor: 'rgba(18,0,43,0.18)',
                    pointBackgroundColor: '#12002b',
                    pointBorderColor: '#fff',
                    pointRadius: 6,
                    pointHoverRadius: 8,
                    borderWidth: 4,
                    tension: 0.3,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { display: false },
                    title: { display: false }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: { color: 'rgba(18,0,43,0.18)' },
                        ticks: { color: '#12002b', font: { weight: 'bold' } }
                    },
                    x: {
                        grid: { color: 'rgba(18,0,43,0.18)' },
                        ticks: { color: '#12002b', font: { weight: 'bold' } }
                    }
                }
            }
        });
    }

    // === Diagramme en camembert de la répartition des ventes par produit ===
    const pieCtx = document.getElementById('stockPieChart');
    if (pieCtx) {
        // Données fictives pour la répartition des ventes
        let products = {
            'Smartphone': 1,
            'Laptop': 2,
            'Tablet': 1,
            'Headphones': 3
        };
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

    // ==================== Calculs et affichage des indicateurs ====================

    // --- Données de commandes (exemple fictif, à synchroniser avec Orders si besoin) ---
    const orders = [
        { product: 'Smartphone', price: 699, number: 1 },
        { product: 'Laptop', price: 999, number: 2 },
        { product: 'Tablet', price: 499, number: 1 },
        { product: 'Headphones', price: 199, number: 3 }
    ];

    // --- Calcul et affichage du total des ventes ---
    let totalSales = 0;
    orders.forEach(order => {
        totalSales += order.price * order.number;
    });
    const totalSalesBox = document.querySelector('.big-top .big-box h2');
    if (totalSalesBox) {
        totalSalesBox.innerHTML = `Total Sales<br><span style="font-size:2.2rem;color:#21154c;">$${totalSales.toLocaleString()}</span>`;
    }

    // --- Affichage du nombre de commandes par mois ---
    const ordersBox = document.querySelectorAll('.big-top .big-box h2')[1];
    if (ordersBox) {
        ordersBox.innerHTML = `Orders<br><span style="font-size:2.2rem;color:#21154c;">4/month</span>`;
    }

    // --- Calcul et affichage du stock restant ---
    const productsList = [
        { name: 'Smartphone', stock: 50 },
        { name: 'Laptop', stock: 30 },
        { name: 'Tablet', stock: 20 },
        { name: 'Headphones', stock: 75 }
    ];
    let totalStockDispo = 0;
    productsList.forEach(p => { totalStockDispo += p.stock; });
    let totalStockVendu = 0;
    orders.forEach(order => { totalStockVendu += order.number; });
    const stockRestant = totalStockDispo - totalStockVendu;
    const stockBox = document.querySelectorAll('.big-top .big-box')[2];
    if (stockBox) {
        stockBox.innerHTML = `<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;"><h2 style="margin-bottom:8px;">Stock</h2><div style="font-size:2.2rem;color:#21154c;">${stockRestant}</div></div>`;
    }

    // --- Affichage du nombre de visiteurs par jour (fictif) ---
    const visitorsBox = document.querySelectorAll('.big-top .big-box')[3];
    if (visitorsBox) {
        visitorsBox.innerHTML = `<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;"><h2 style="margin-bottom:8px;">Visitors</h2><div style="font-size:2.2rem;color:#21154c;">468/days</div></div>`;
    }
});
