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
        <label for="wordbook_id">単語帳を選択：</label>
        <select name="wordbook_id" id="wordbook_id">
          @foreach ($wordbooks as $wordbookOption)
            <option value="{{ $wordbookOption->id }}" {{ old('wordbook_id') == $wordbookOption->id ? 'selected' : '' }}>{{ $wordbookOption->name }}</option>
          @endforeach
        </select>
        <label for="count">出題数</label>
        <input type="number" name="count" id="count" value="{{ old('count', 20) }}" min="1" required>
        <button type="submit">テスト開始！</button>
      </div>
    </form>

    @isset($words)
      <div class="info__inner">
        <p>単語帳: {{ $wordbook->name }}</p>
      </div>
      <div id="quiz">
        @foreach ($words as $index => $word)
          <div class="word-container" id="word-{{ $index }}" style="{{ $index !== 0 ? 'display:none;' : '' }}">
            <div class="word word__text" data-word="{{ $word->english }}">{{ $word->english }}</div>
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
