<?php 
    $servername = "localhost";
    $username = "root";
    $password = "";
    $database = "ppw1";

    // Koneksi ke database
    $conn = mysqli_connect($servername, $username, $password, $database);
    if (!$conn) {
        die("Connection failed: " . mysqli_connect_error());
    } 

    // Query ambil data dari tabel makanan
    $sql = "SELECT * FROM makanan";
    $result = mysqli_query($conn, $sql);
?>

<h2>List Data Makanan</h2>
<table border="1" style="border-collapse: collapse;">
    <tr>
        <th style='background-color:blue'>No</th>
        <th style='background-color:blue'>Nama</th>
        <th style='background-color:blue'>Harga</th>
    </tr>
    <?php
    if (mysqli_num_rows($result) > 0) {
        $no = 1;
        while($row = mysqli_fetch_assoc($result)) {
            echo "<tr>";
            echo "<td style='background-color:red'>" . $no . "</td>";
            echo "<td style='background-color:red'>" . $row['nama_makanan'] . "</td>";
            echo "<td style='background-color:red'>" . $row['harga_makanan'] . "</td>";
            echo "</tr>";
            $no++;
        }
    } else {
        echo "<tr><td colspan='3'>Tidak ada data</td></tr>";
    }

    // Tutup koneksi
    mysqli_close($conn);
    ?>
</table>
