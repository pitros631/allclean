<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $servername = "localhost";
    $username = "root"; // Default XAMPP username
    $password = ""; // Default XAMPP password
    $dbname = "all_clean_db";

    // Create connection
    $conn = new mysqli($servername, $username, $password, $dbname);

    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    // Escape user inputs for security
    $name = $conn->real_escape_string($_POST['name']);
    $email = $conn->real_escape_string($_POST['email']);
    $date = $conn->real_escape_string($_POST['date']);
    $time = $conn->real_escape_string($_POST['time']);

    // Attempt insert query execution
    $sql = "INSERT INTO appointments (name, email, date, time) VALUES ('$name', '$email', '$date', '$time')";

    if ($conn->query($sql) === TRUE) {
        header("Location: index.php?message=Appointment saved successfully");
        exit();
    } else {
        header("Location: index.php?message=Error: " . $sql . "<br>" . $conn->error);
        exit();
    }

    // Close connection
    $conn->close();
}
?>
