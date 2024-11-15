<!-- resources/views/words/create.blade.php -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Add New Word</title>
</head>
<body>
    <h1>Add New Word</h1>
    <form action="{{ route('store') }}" method="POST">
        @csrf
        <label for="english">English:</label>
        <input type="text" name="english" id="english" required>
        <br>
        <label for="japanese">Japanese:</label>
        <input type="text" name="japanese" id="japanese" required>
        <br>
        <button type="submit">Add</button>
    </form>
</body>
</html>
