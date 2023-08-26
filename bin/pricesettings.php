<?php
$file = '/data/prestations.json';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    header('Content-Type: application/json');
    $data = file_get_contents('php://input');
    if (file_put_contents($file, $data)) {
        echo json_encode(['success' => true]);
        exit;
    } else {
        echo json_encode(['success' => false, 'message' => 'Failed to write to file.']);
        exit;
    }
}
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        .group {
            margin-bottom: 20px;
            border: 1px solid #ccc;
            padding: 10px;
        }
        .subsection {
            margin-left: 20px;
        }
    </style>
</head>

<body>

<h2>Edit Price</h2>
<form id="jsonForm">
    <!-- Dynamically populated form will appear here -->
</form>

<button type="button" onclick="sendDataToServer()">Save Changes</button>

<script>
    let jsonData = {};

    function loadJsonData() {
        fetch('/data/prestations.json')
            .then(response => response.json())
            .then(data => {
                jsonData = data;
                populateForm();
            })
            .catch(error => console.error('Error loading JSON:', error));
    }

    function generateFormFields(data, parentKey = '') {
        let formHtml = '';
        for (let key in data) {
            const value = data[key];
            const fullKey = parentKey + key;

            if (typeof value === 'object' && !Array.isArray(value)) {
                formHtml += `<div class="group"><h3>${key}</h3>${generateFormFields(value, fullKey + '_')}</div>`;
            } else {
                formHtml += `${key}: <input type="text" name="${fullKey}" value="${value}"><br>`;
            }
        }
        return formHtml;
    }

    function populateForm() {
        const form = document.getElementById('jsonForm');
        form.innerHTML = generateFormFields(jsonData);
    }

    function sendDataToServer() {
        const formData = new FormData(document.getElementById('jsonForm'));

        function populateData(data, parentKey = '') {
            const updatedData = {};

            for (let key in data) {
                const value = data[key];
                const fullKey = parentKey + key;

                if (typeof value === 'object' && !Array.isArray(value)) {
                    updatedData[key] = populateData(value, fullKey + '_');
                } else {
                    updatedData[key] = formData.get(fullKey);
                }
            }

            return updatedData;
        }

        jsonData = populateData(jsonData);

        fetch('pricesettings.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(jsonData)
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Prix changés avec succès!');
            } else {
                alert('Erreur dans la sauvegarde !');
            }
        });
    }

    loadJsonData();
</script>

</body>
</html>