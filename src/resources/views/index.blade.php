<!-- resources/views/words/index.blade.php -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Words List</title>
</head>
<body>
    <h1>Words List</h1>
    <a href="{{ route('create') }}">Add New Word</a>
    <a href="{{ route('test') }}">test Word</a>
    <ul>
        @foreach ($words as $word)
            <li>{{ $word->english }} - {{ $word->japanese }}</li>
        @endforeach
    </ul>
</body>
</html>
