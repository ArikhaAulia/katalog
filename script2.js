```javascript
document.addEventListener("DOMContentLoaded", function () {

    // ===================================
    // 1. MENAMPILKAN KOLEKSI GUCCI
    // ===================================

    const tombolGucci = document.querySelector(".lihat-koleksi-gucci");
    const koleksiGucci = document.getElementById("koleksi-gucci");

    if (tombolGucci && koleksiGucci) {
        tombolGucci.addEventListener("click", function () {
            koleksiGucci.style.display = "block";

            koleksiGucci.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        });
    }


    // ===================================
    // 2. MENGAMBIL ELEMEN FORM
    // ===================================

    const tombolPilih = document.querySelectorAll(".pilih-baju-gucci");

    const formPilihan = document.getElementById("form-pilihan-gucci");
    const formBaju = document.getElementById("form-baju-gucci");

    const inputNama = document.getElementById("nama-gucci");
    const inputProduk = document.getElementById("produk-dipilih-gucci");
    const inputUkuran = document.getElementById("ukuran-gucci");
    const inputWarna = document.getElementById("warna-gucci");
    const inputJumlah = document.getElementById("jumlah-gucci");

    const hargaElement = document.getElementById("harga-gucci");
    const totalElement = document.getElementById("total-gucci");
    const hasilPesanan = document.getElementById("hasil-pesanan-gucci");

    let hargaBaju = 0;


    // ===================================
    // 3. FORMAT HARGA RUPIAH
    // ===================================

    function formatRupiah(angka) {
        return "Rp" + angka.toLocaleString("id-ID");
    }


    // ===================================
    // 4. MEMILIH PRODUK GUCCI
    // ===================================

    tombolPilih.forEach(function (tombol) {

        tombol.addEventListener("click", function () {

            if (
                !formPilihan ||
                !inputProduk ||
                !hasilPesanan ||
                !inputJumlah ||
                !hargaElement ||
                !totalElement
            ) {
                alert("Periksa kembali elemen form Gucci di HTML!");
                return;
            }

            // Mengambil nama dan harga produk
            inputProduk.value = tombol.dataset.nama;
            hargaBaju = Number(tombol.dataset.harga);

            if (!Number.isFinite(hargaBaju) || hargaBaju <= 0) {
                alert("Harga produk Gucci tidak ditemukan!");
                return;
            }

            // Menampilkan form pilihan
            formPilihan.style.display = "block";

            // Menghapus ringkasan sebelumnya
            hasilPesanan.replaceChildren();

            // Memperbarui harga
            hitungTotal();

            // Mengarahkan ke form
            formPilihan.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        });

    });


    // ===================================
    // 5. MENGHITUNG TOTAL HARGA
    // ===================================

    function hitungTotal() {

        if (!inputJumlah || !hargaElement || !totalElement) {
            return;
        }

        const jumlah = Number(inputJumlah.value);

        const jumlahValid =
            Number.isInteger(jumlah) &&
            jumlah >= 1 &&
            jumlah <= 20
                ? jumlah
                : 1;

        hargaElement.textContent = formatRupiah(hargaBaju);

        totalElement.textContent = formatRupiah(
            hargaBaju * jumlahValid
        );

    }


    // Menghitung ulang saat jumlah berubah
    if (inputJumlah) {
        inputJumlah.addEventListener("input", hitungTotal);
    }


    // ===================================
    // 6. RINGKASAN PESANAN GUCCI
    // ===================================

    if (formBaju) {

        formBaju.addEventListener("submit", function (event) {

            event.preventDefault();

            if (hargaBaju <= 0) {
                alert("Pilih produk Gucci terlebih dahulu!");
                return;
            }

            if (
                !inputNama ||
                !inputProduk ||
                !inputUkuran ||
                !inputWarna ||
                !inputJumlah ||
                !hasilPesanan
            ) {
                alert("Periksa kembali elemen form Gucci di HTML!");
                return;
            }

            const nama = inputNama.value.trim();
            const jumlah = Number(inputJumlah.value);

            // Validasi nama
            if (!nama) {
                alert("Nama pembeli harus diisi!");
                inputNama.focus();
                return;
            }

            // Validasi jumlah
            if (
                !Number.isInteger(jumlah) ||
                jumlah < 1 ||
                jumlah > 20
            ) {
                alert("Jumlah baju harus antara 1 sampai 20!");
                inputJumlah.focus();
                return;
            }

            const ukuran = inputUkuran.value;
            const warna = inputWarna.value;
            const total = hargaBaju * jumlah;

            // Menghapus ringkasan sebelumnya
            hasilPesanan.replaceChildren();

            // Membuat kotak ringkasan
            const kotak = document.createElement("div");

            kotak.style.background = "#f5f1e8";
            kotak.style.color = "#252525";
            kotak.style.padding = "20px";
            kotak.style.borderRadius = "8px";
            kotak.style.border = "1px solid #b59b5b";

            // Judul
            const judul = document.createElement("h3");

            judul.textContent = "GUCCI — Order Summary";

            kotak.appendChild(judul);

            // Detail pesanan
            const detail = [
                "Nama pembeli: " + nama,
                "Produk: " + inputProduk.value,
                "Ukuran: " + ukuran,
                "Warna: " + warna,
                "Jumlah: " + jumlah + " pcs",
                "Total harga: " + formatRupiah(total)
            ];

            detail.forEach(function (teks) {

                const paragraf = document.createElement("p");

                paragraf.textContent = teks;

                kotak.appendChild(paragraf);

            });

            // Catatan
            const catatan = document.createElement("small");

            catatan.textContent =
                "Simulasi pemesanan produk Gucci, bukan transaksi nyata.";

            kotak.appendChild(catatan);

            // Menampilkan ringkasan
            hasilPesanan.appendChild(kotak);

            // Mengarahkan ke ringkasan
            hasilPesanan.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        });

    }

});
```
