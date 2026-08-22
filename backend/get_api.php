<?php

$apiKey = '35c1d5d110f7f8753fcda624065e7631';
$url = "https://api.themoviedb.org/3/movie/popular?api_key=$apiKey&language=es-ES";

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    "Accept: application/json",
]);

$response = curl_exec($ch);

if (curl_errno($ch)) {
    echo "Error en cURL: " . curl_error($ch) . PHP_EOL;
    exit;
}

curl_close($ch);

$data = json_decode($response, true);

echo "===============Data=================" . PHP_EOL;
print_r($data);

// O si prefieres verlo bonito y ordenado:
// echo json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);