// Product management functionality

document.addEventListener('DOMContentLoaded', function() {
    // Filter table based on search input
    const searchInput = document.querySelector('.bottom input[type="search"]');
    const table = document.querySelector('.bottom table');
    searchInput.addEventListener('input', function() {
        const value = searchInput.value.toLowerCase();
        const rows = table.querySelectorAll('tbody tr');
        rows.forEach(row => {
            const text = row.textContent.toLowerCase();
            row.style.display = text.includes(value) ? '' : 'none';
        });
    });

    // Add product (add a new row to the table without checkbox)
    document.querySelectorAll('.buttons')[0].addEventListener('click', function() {
        const id = prompt('Enter product ID:');
        const name = prompt('Enter product name:');
        const desc = prompt('Enter product description:');
        const price = prompt('Enter product price:');
        const stock = prompt('Enter product stock:');
        const totalPrice = price*stock; // You can adjust this logic if needed
        if (id && name && desc && price && stock) {
            const tbody = table.querySelector('tbody');
            const tr = document.createElement('tr');
            tr.innerHTML = `<td>${id}</td><td>${name}</td><td>${desc}</td><td>$${price}</td><td>$${totalPrice}</td><td>${stock}</td>`;
            tr.addEventListener('click', function() {
                const cells = tr.querySelectorAll('td');
                const id = prompt('Edit product ID:', cells[0].textContent);
                const name = prompt('Edit product name:', cells[1].textContent);
                const desc = prompt('Edit product description:', cells[2].textContent);
                const price = prompt('Edit product price:', cells[3].textContent.replace('$',''));
                const stock = prompt('Edit product stock:', cells[5].textContent);
                const totalPrice = price*stock;
                if (id && name && desc && price && stock) {
                    cells[0].textContent = id;
                    cells[1].textContent = name;
                    cells[2].textContent = desc;
                    cells[3].textContent = `$${price}`;
                    cells[4].textContent = `$${totalPrice}`;
                    cells[5].textContent = stock;
                } else {
                    alert('All fields are required to update a product.');
                }
            });
            tbody.appendChild(tr);
        } else {
            alert('All fields are required to add a product.');
        }
    });

    // Make all rows editable on click
    function attachRowClickEvents() {
        const rows = table.querySelectorAll('tbody tr');
        rows.forEach(row => {
            row.addEventListener('click', function() {
                const cells = row.querySelectorAll('td');
                const id = prompt('Edit product ID:', cells[0].textContent);
                const name = prompt('Edit product name:', cells[1].textContent);
                const desc = prompt('Edit product description:', cells[2].textContent);
                const price = prompt('Edit product price:', cells[3].textContent.replace('$',''));
                const stock = prompt('Edit product stock:', cells[5].textContent);
                const totalPrice = price*stock;
                if (id && name && desc && price && stock) {
                    cells[0].textContent = id;
                    cells[1].textContent = name;
                    cells[2].textContent = desc;
                    cells[3].textContent = `$${price}`;
                    cells[4].textContent = `$${totalPrice}`;
                    cells[5].textContent = stock;
                } else {
                    alert('All fields are required to update a product.');
                }
            });
        });
    }
    attachRowClickEvents();
});
