<?php
// Kuweka connection na database
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "technolia_tools"; // Badilisha kama database yako ina jina tofauti

$conn = new mysqli($servername, $username, $password, $dbname);

// Angalia kama imefanikiwa
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

// Pokea data kutoka kwa fomu
$name = $_POST['name'];
$phone = $_POST['phone'];
$password = password_hash($_POST['password'], PASSWORD_DEFAULT); // hash ya neno la siri

// Ingiza kwenye database
$sql = "INSERT INTO customers (name, phone, password) VALUES (?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("sss", $name, $phone, $password);

if ($stmt->execute()) {
  echo "Mteja amesajiliwa kikamilifu!";
} else {
  echo "Hitilafu: " . $stmt->error;
}

$stmt->close();
$conn->close();
?>
