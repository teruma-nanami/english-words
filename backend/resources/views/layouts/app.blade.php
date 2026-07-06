<!DOCTYPE html>
<html lang="ja">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <link rel="stylesheet" href="{{ asset('css/variables.css') }}" />
  <link rel="stylesheet" href="{{ asset('css/common.css') }}" />
  @yield('css')
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css">

  <title>英単語テスト</title>
</head>

<body>
  <div id="root">
    <header class="header">

      <div class="header__inner">
        <h1>
          <a href="{{ config('services.frontend.url') }}/" class="header__logo">英単語テスト</a>
        </h1>
        <div class="header__nav" id="navMenu">
          <ul>
            <li><a href="{{ config('services.frontend.url') }}/">単語一覧</a></li>
            <li><a href="{{ config('services.frontend.url') }}/test">単語テスト</a></li>
            @if (auth()->check())
              <li><a href="{{ config('services.frontend.url') }}/admin/words" class="header__nav-cta">単語追加</a></li>
              <li>
                <form action="/logout" method="POST">
                  @csrf
                  <button type="submit" class="logout__button"> <i class="bi bi-box-arrow-right"></i> ログアウト</button>
                </form>
              </li>
            @else
              <li><a href="{{ route('login') }}" class="header__nav-cta">ログイン</a></li>
            @endif
          </ul>
        </div>
      </div>
    </header>
    <main>
      @if (session('success'))
        <div class="alert alert-success">
          {{ session('success') }}
        </div>
      @endif
      @if (session('error'))
        <div class="alert alert-danger">
          {{ session('error') }}
        </div>
      @endif
      {{-- @if ($errors->any())
        <div class="alert alert-danger">
          <ul>
            @foreach ($errors->all() as $error)
              <li>{{ $error }}</li>
            @endforeach
          </ul>
        </div>
      @endif --}}
      @yield('content')
    </main>
  </div>
  <script src="{{ asset('js/test.js') }}"></script>
</body>

</html>
