@extends('layouts.app')

@section('css')
  <link rel="stylesheet" href="{{ asset('css/index.css') }}" />
@endsection

@section('content')
  <div class="container">
    <h2>英単語テスト</h2>
    <form action="{{ route('test') }}" method="GET">
      <div class="test__inner">
        <label for="start_id">No.</label>
        <input type="number" name="start_id" id="start_id" required>
				→
        <label for="end_id">No.</label>
        <input type="number" name="end_id" id="end_id" required>
				<button type="submit">テスト開始！</button>
      </div>
    </form>
    @if (isset($randomWords))
      <ul>
        @foreach ($randomWords as $word)
          <li>{{ $word->english }} - {{ $word->japanese }}</li>
        @endforeach
      @else
        <p>No words found.</p>
    @endif
  </div>
@endsection
