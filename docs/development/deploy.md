# 本番環境（ロリポップ）への初回デプロイ手順

対象: Issue #57

前提: ロリポップのSSH接続・Composerの実行が可能なプランを契約済みであること。ファイル配置はSSH経由の`git pull`で行う。

フロントエンド（React）とバックエンド（Laravel API）は、完全に同一オリジンで運用する。Laravelが`backend/public/`配下でAPIレスポンスとReactの静的ビルド成果物の両方を配信する。

## 1. サーバー側の前提確認

- [ ] 契約ドメインのドキュメントルートを`backend/public`配下に設定できること
- [ ] 本番用MySQLデータベース（ホスト・DB名・ユーザー・パスワード）をロリポップの管理画面で作成済みであること
- [ ] SSH接続情報を確認済みであること

## 2. リポジトリの取得

```bash
ssh <ロリポップのSSHユーザー>@<ホスト>
cd <ドキュメントルートの配置先>
git clone <リポジトリURL> .
git switch main
```

## 3. バックエンドのセットアップ

```bash
cd backend
composer install --no-dev --optimize-autoloader
cp .env.example .env
php artisan key:generate
```

`.env`に本番用の値を設定する。

```dotenv
APP_NAME=英単語帳アプリ
APP_ENV=production
APP_DEBUG=false
APP_URL=https://<本番ドメイン>
FRONTEND_URL=https://<本番ドメイン>

DB_CONNECTION=mysql
DB_HOST=<ロリポップのDBホスト>
DB_PORT=3306
DB_DATABASE=<ロリポップで作成したDB名>
DB_USERNAME=<DBユーザー名>
DB_PASSWORD=<DBパスワード>

ADMIN_EMAIL=<本番用の管理者email>
ADMIN_PASSWORD=<本番用の管理者password>

SESSION_SECURE_COOKIE=true
SANCTUM_STATEFUL_DOMAINS=<本番ドメイン（ポートなし）>
```

`FRONTEND_URL`と`APP_URL`は同一オリジン構成のため同じドメインを指定する。

秘密情報を含む本番用`.env`はコミットしない。

## 4. マイグレーション・初期データ投入

```bash
php artisan migrate --force
php artisan db:seed --force
```

`db:seed`は初回のみ実行する。`ADMIN_EMAIL`・`ADMIN_PASSWORD`が`.env`に設定されていない場合はエラーで停止する。

## 5. フロントエンドのビルド

```bash
cd ../frontend
npm install
cp .env.example .env
```

`.env`の`VITE_API_BASE_URL`を同一オリジンの相対パスに設定する。

```dotenv
VITE_API_BASE_URL=/api
```

```bash
npm run build
```

`vite.config.ts`の設定により、ビルド成果物は`backend/public/spa/`へ直接出力される。

## 6. 動作確認

- [ ] `https://<本番ドメイン>/`でReactの単語一覧が表示される
- [ ] `https://<本番ドメイン>/test`でクイズ機能が動作する
- [ ] `/admin/words`などを直接URL入力・リロードしても404にならない
- [ ] `/login`でBladeログイン画面が表示され、ログイン後`/admin/words`へ遷移しCRUD操作ができる
- [ ] 存在しないAPIパス（例：`/api/does-not-exist`）がJSON形式の404を返す
- [ ] 未認証で管理ページにアクセスすると`/login`にリダイレクトされる
- [ ] `.env`・ビルド成果物に秘密情報が含まれず、リポジトリへコミットされていない

## 今後の更新デプロイ

初回リリース後にコードを更新する場合は、サーバー上で以下を実行する。

```bash
git pull origin main
cd backend && composer install --no-dev --optimize-autoloader
php artisan migrate --force
cd ../frontend && npm install && npm run build
```

CI/CDによる自動デプロイは対象外（Issue #57の対象外事項）。
