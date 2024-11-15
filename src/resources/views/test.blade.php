<!-- resources/views/words/test.blade.php -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Test Words</title>
</head>
<body>
    <h1>Test Words</h1>
    <form action="{{ route('test') }}" method="GET">
        <label for="start_id">Start ID:</label>
        <input type="number" name="start_id" id="start_id" required>
        <br>
        <label for="end_id">End ID:</label>
        <input type="number" name="end_id" id="end_id" required>
        <br>
        <button type="submit">Generate Test</button>
    </form>
    @if (isset($randomWords))
        <ul>
            @foreach ($randomWords as $word)
                <li>{{ $word->english }} - {{ $word->japanese }}</li>
            @endforeach
        @else
        <p>No words found.</p>
    @endif
</body>
</html>
