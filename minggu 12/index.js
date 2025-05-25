let history = [];

function calculate(operation) {
    const angka1 = parseFloat(document.getElementById('angka1').value);
    const angka2 = parseFloat(document.getElementById('angka2').value);
    
    // Validasi input
    if (isNaN(angka1) || isNaN(angka2)) {
        showAlert('Mohon masukkan angka yang valid di kedua kolom!', 'warning');
        return;
    }
    
    let hasil;
    let operationSymbol;
    
    switch(operation) {
        case '+':
            hasil = angka1 + angka2;
            operationSymbol = '+';
            break;
        case '-':
            hasil = angka1 - angka2;
            operationSymbol = '-';
            break;
        case '×':
            hasil = angka1 * angka2;
            operationSymbol = '×';
            break;
        case '÷':
            if (angka2 === 0) {
                showAlert('Tidak dapat membagi dengan nol!', 'danger');
                return;
            }
            hasil = angka1 / angka2;
            operationSymbol = '÷';
            break;
    }
    
    // Format hasil untuk menghindari desimal panjang
    hasil = Math.round(hasil * 100000000) / 100000000;
    
    // Tampilkan hasil dengan animasi
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `
        <i class="fas fa-equals text-success me-2"></i>
        ${angka1} ${operationSymbol} ${angka2} = <span class="text-success">${hasil}</span>
    `;
    resultDiv.style.display = 'block';
    
    // Tambah animasi fade in
    resultDiv.style.opacity = '0';
    setTimeout(() => {
        resultDiv.style.opacity = '1';
        resultDiv.style.transition = 'opacity 0.5s ease';
    }, 100);
    
    // Tambah ke riwayat
    history.push({
        angka1: angka1,
        angka2: angka2,
        hasil: hasil,
        operasi: operationSymbol
    });
    
    // Update tabel
    updateHistoryTable();
}

function updateHistoryTable() {
    const historySection = document.getElementById('historySection');
    const historyBody = document.getElementById('historyBody');
    
    // Kosongkan tabel
    historyBody.innerHTML = '';
    
    // Tambah setiap entri riwayat
    history.forEach((entry, index) => {
        const row = historyBody.insertRow();
        row.innerHTML = `
            <td class="fw-bold text-primary">${index + 1}</td>
            <td>${entry.angka1}</td>
            <td>${entry.angka2}</td>
            <td class="fw-bold text-success">${entry.hasil}</td>
        `;
    });
    
    // Tampilkan section riwayat dengan animasi
    if (historySection.style.display === 'none') {
        historySection.style.display = 'block';
        historySection.style.opacity = '0';
        setTimeout(() => {
            historySection.style.opacity = '1';
            historySection.style.transition = 'opacity 0.5s ease';
        }, 100);
    }
}

function clearHistory() {
    if (history.length === 0) return;
    
    if (confirm('Apakah Anda yakin ingin menghapus semua riwayat perhitungan?')) {
        history = [];
        document.getElementById('historySection').style.display = 'none';
        document.getElementById('result').style.display = 'none';
        showAlert('Riwayat perhitungan berhasil dihapus!', 'success');
    }
}

function showAlert(message, type) {
    // Hapus alert yang ada
    const existingAlert = document.querySelector('.alert');
    if (existingAlert) {
        existingAlert.remove();
    }
    
    // Buat alert baru
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} alert-dismissible fade show mt-3`;
    alertDiv.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'warning' ? 'exclamation-triangle' : 'times-circle'} me-2"></i>
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    document.querySelector('.p-4').insertBefore(alertDiv, document.querySelector('.row'));
    
    // Auto hide after 3 seconds
    setTimeout(() => {
        if (alertDiv) {
            alertDiv.remove();
        }
    }, 3000);
}

// Event listener untuk Enter key
document.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        const angka1 = document.getElementById('angka1');
        const angka2 = document.getElementById('angka2');
        
        if (angka1.value && angka2.value) {
            calculate('+'); // Default ke penjumlahan saat Enter
        }
    }
});

// Auto focus ke input kedua setelah mengisi input pertama
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('angka1').addEventListener('input', function() {
        if (this.value) {
            document.getElementById('angka2').focus();
        }
    });
});