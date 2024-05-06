function enkripsi() {
    const pesan = document.getElementById("pesan").value;
    const kunci = document.getElementById("kunci").value;
    const hasil = RC4.encrypt(pesan, kunci);
    displayResult(hasil);
}

function dekripsi() {
    const pesan = document.getElementById("pesan").value;
    const kunci = document.getElementById("kunci").value;
    const hasil = RC4.decrypt(pesan, kunci);
    displayResult(hasil);
}

function hapus() {
    document.getElementById("pesan").value = "";
    document.getElementById("kunci").value = "";
    document.getElementById("hasil").textContent = "";
}

function displayResult(result) {
    document.getElementById("hasil").textContent = result;
}
