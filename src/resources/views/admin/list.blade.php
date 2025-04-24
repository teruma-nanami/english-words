@extends('layouts.app')

@section('css')
  <link rel="stylesheet" href="{{ asset('css/index.css') }}" />
@endsection

@section('content')
  <div class="container">
    <h2>単語一覧ページ</h2>
    <!-- 単語帳選択と検索フォーム -->
    <form action="{{ route('list') }}" method="GET">
      <div class="inner__text">
        <label for="wordbook">単語帳を選択：</label>
        <select name="wordbook_id" id="wordbook" onchange="this.form.submit()">
          @foreach ($wordbooks as $wordbook)
            <option value="{{ $wordbook->id }}" {{ request('wordbook_id') == $wordbook->id ? 'selected' : '' }}>
              {{ $wordbook->name }}</option>
          @endforeach
        </select>
      </div>
      <div class="inner__text">
        <input type="text" name="search" id="search" value="{{ request('search') }}">
        <button type="submit"><i class="bi bi-search"></i></button>
      </div>
    </form> <!-- 単語一覧表示 -->
    <table>
      <tr>
        <th>ID</th>
        <th>英単語</th>
        <th>日本語</th>
        <th>編集</th>
      </tr>
      @foreach ($words as $word)
        <tr>
          <td>{{ $word->id }}</td>
          <td><a href="{{ route('edit', $word->id) }}">{{ $word->english }}</a></td>
          <td><a href="{{ route('edit', $word->id) }}">{{ $word->japanese }}</a></td>
          <td><a href="{{ route('edit', $word->id) }}">編集</a></td>
        </tr>
      @endforeach
    </table>
    <!-- ページネーション --> {{ $words->links() }}
  </div>
@endsection
