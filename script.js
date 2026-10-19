```javascript
document.addEventListener("DOMContentLoaded", function () {

    // ===================================
    // 1. MENAMPILKAN KOLEKSI CALLE
    // ===================================

    const tombolCalle = document.querySelector(".lihat-koleksi");
    const koleksiCalle = document.getElementById("koleksi-calle");

    if (tombolCalle && koleksiCalle) {
        tombolCalle.addEventListener("click", function () {
            koleksiCalle.style.display = "block";

            koleksiCalle.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        });
    } else {
        console.warn("Tombol Calle atau bagian koleksi tidak ditemukan.");
    }


    // ===================================
    // 2. MENGAMBIL ELEMEN FORM
    // ===================================

    const tombolPilih = document.querySelectorAll(".pilih-baju");

    const formPilihan = document.getElementById("form-pilihan");
    const formBaju = document.getElementById("form-baju");

    const inputNama = document.getElementById("nama");
    const inputProduk = document.getElementById("produk-dipilih");
    const inputUkuran = document.getElementById("ukuran");
    const inputWarna = document.getElementById("warna");
    const inputJumlah = document.getElementById("jumlah");

    const hargaElement = document.getElementById("harga");
    const totalElement = document.getElementById("total");
    const hasilPesanan = document.getElementById("hasil-pesanan");

    let hargaBaju = 0;


    // ===================================
    // 3. FORMAT HARGA RUPIAH
    // ===================================

    function formatRupiah(angka) {
        return "Rp" + angka.toLocaleString("id-ID");
    }


    // ===================================
    // 4. MEMILIH PRODUK BAJU
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
                console.error("Elemen form belum lengkap. Periksa ID di index.html.");
                return;
            }

            // Mengambil nama dan harga produk
            inputProduk.value = tombol.dataset.nama;
            hargaBaju = Number(tombol.dataset.harga);

            if (!Number.isFinite(hargaBaju) || hargaBaju <= 0) {
                alert("Harga baju tidak ditemukan. Periksa data-harga pada tombol!");
                return;
            }

            // Menampilkan form
            formPilihan.style.display = "block";

            // Menghapus hasil pesanan sebelumnya
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

        // Harga satu baju
        hargaElement.textContent = formatRupiah(hargaBaju);

        // Total seluruh baju
        totalElement.textContent = formatRupiah(
            hargaBaju * jumlahValid
        );

    }


    // Menghitung ulang ketika jumlah berubah
    if (inputJumlah) {
        inputJumlah.addEventListener("input", hitungTotal);
    }


    // ===================================
    // 6. MENAMPILKAN RINGKASAN PESANAN
    // ===================================

    if (formBaju) {

        formBaju.addEventListener("submit", function (event) {

            event.preventDefault();

            // Memastikan produk sudah dipilih
            if (hargaBaju <= 0) {
                alert("Pilih baju terlebih dahulu!");
                return;
            }

            // Memastikan elemen form tersedia
            if (
                !inputNama ||
                !inputProduk ||
                !inputUkuran ||
                !inputWarna ||
                !inputJumlah ||
                !hasilPesanan
            ) {
                console.error("Elemen form belum lengkap. Periksa index.html.");
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

            kotak.style.background = "#fff0f2";
            kotak.style.padding = "15px";
            kotak.style.borderRadius = "12px";

            // Judul
            const judul = document.createElement("h3");

            judul.textContent = "♡ Ringkasan Pesanan";

            kotak.appendChild(judul);

            // Data pesanan
            const detail = [
                "Nama pembeli: " + nama,
                "Baju pilihan: " + inputProduk.value,
                "Ukuran: " + ukuran,
                "Warna: " + warna,
                "Jumlah: " + jumlah + " pcs",
                "Total harga: " + formatRupiah(total)
            ];

            // Menampilkan setiap detail
            detail.forEach(function (teks) {

                const paragraf = document.createElement("p");

                paragraf.textContent = teks;

                kotak.appendChild(paragraf);

            });

            // Catatan
            const catatan = document.createElement("small");

            catatan.textContent =
                "Ini simulasi pesanan, belum merupakan transaksi nyata.";

            kotak.appendChild(catatan);

            // Menampilkan hasil
            hasilPesanan.appendChild(kotak);

            // Mengarahkan ke ringkasan pesanan
            hasilPesanan.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        });

    } else {
        console.warn("Form dengan ID form-baju tidak ditemukan.");
    }

});
```
