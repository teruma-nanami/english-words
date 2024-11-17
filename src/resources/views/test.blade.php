@extends('layouts.app')

@section('css')
  <link rel="stylesheet" href="{{ asset('css/index.css') }}" />
@endsection

@section('content')
  <div class="container">
    <h2>英単語テスト</h2>
    <form action="{{ route('test.start') }}" method="POST">
      @csrf
      <div class="test__inner">
        <label for="start_id">No.</label>
        <input type="number" name="start_id" id="start_id" required>
        →
        <label for="end_id">No.</label>
        <input type="number" name="end_id" id="end_id" required>
        <button type="submit">テスト開始！</button>
      </div>
    </form>

    @isset($words)
      <div class="info__inner">
        <p>単語の始まりのID: {{ $startId }}</p>
        <p>→</p>
        <p>単語の終わりのID: {{ $endId }}</p>
      </div>
      <div id="quiz">
        @foreach ($words as $index => $word)
          <div class="word-container" id="word-{{ $index }}" style="{{ $index !== 0 ? 'display:none;' : '' }}">
            <div class="word word__text">{{ $word->english }}</div>
            <button class="showAnswer answer__button">A</button>
            <div class="answer hidden word__text">{{ $word->japanese }}</div>
            <button class="understand__button understood hidden">理解した</button>
            <button class="understand__button didNotUnderstand hidden">理解していない</button>
          </div>
        @endforeach
      </div>
      <div id="results" class="result__inner hidden">
        <h2>理解度結果</h2>
        <table>
          <tr>
            <th>理解した単語数</th>
            <td><span id="understoodCount"></span></td>
          </tr>
          <tr>
            <th>理解していない単語数</th>
            <td><span id="didNotUnderstandCount"></span></td>
          </tr>
        </table>
      </div>
    @endisset
  </div>
@endsection
