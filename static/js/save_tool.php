<?php
// Sanitize data function
function clean_input($data) {
    return htmlspecialchars(strip_tags(trim($data)));
}

// Pokea data kutoka kwa frontend
$data = json_decode(file_get_contents("php://input"), true);

// Hakiki kama data zipo
if (!$data) {
    echo json_encode(["success" => false, "message" => "Hakuna data iliyopokelewa"]);
    exit;
}

// Chukua data
$title = clean_input($data['title']);
$description = clean_input($data['description']);
$price = clean_input($data['price']);
$image = clean_input($data['image']);
$category = clean_input($data['category']);
$download = clean_input($data['download']);

// Hakikisha data zote muhimu zipo
if (!$title || !$description || !$price || !$image || !$category || !$download) {
    echo json_encode(["success" => false, "message" => "Tafadhali jaza taarifa zote"]);
    exit;
}

// Unganisha na database
$conn = new mysqli("localhost", "root", "", "technolia_db");

// Angalia connection
if ($conn->connect_error) {
    echo json_encode(["success" => false, "message" => "Shindwa kuungana na database: " . $conn->connect_error]);
    exit;
}

// Andaa statement
$stmt = $conn->prepare("INSERT INTO tools (title, description, price, image, category, download_link) VALUES (?, ?, ?, ?, ?, ?)");
$stmt->bind_param("ssdsss", $title, $description, $price, $image, $category, $download);

if ($stmt->execute()) {
    echo json_encode(["success" => true, "message" => "Tool imehifadhiwa kikamilifu!"]);
} else {
    echo json_encode(["success" => false, "message" => "Hitilafu: " . $stmt->error]);
}

// Funga
$stmt->close();
$conn->close();
?>
