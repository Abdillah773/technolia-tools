<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = htmlspecialchars($_POST["name"]);
    $email = htmlspecialchars($_POST["email"]);
    $phone = htmlspecialchars($_POST["phone"]);

    // FUNGUA faili na hifadhi taarifa
    $data = "$name, $email, $phone\n";
    file_put_contents("customers.txt", $data, FILE_APPEND);

    echo "✅ Mteja amesajiliwa kikamilifu!";
}
?>
