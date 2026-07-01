# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

このファイルは、Claude Code起動時に常時参照するプロジェクトのインデックスハブである。

詳細な手順や規約は、対応する`.claude/rules/`、`.claude/skills/`、`docs/`を参照すること。

## コマンド

### 環境起動

```bash
# 全サービス起動（nginx / php / mysql / phpmyadmin / mailhog / frontend）
docker compose up -d --build

# phpコンテナへ入る（artisanコマンドはここで実行）
docker compose exec php bash
```

### バックエンド（phpコンテナ内で実行）

```bash
composer install
php artisan key:generate
php artisan migrate
php artisan db:seed

# テスト実行
php artisan test
php artisan test --filter=テストクラス名またはメソッド名

# コードスタイル修正（Laravel Pint）
./vendor/bin/pint
```

### フロントエンド（ホストまたはfrontendコンテナ）

```bash
# frontendコンテナはdocker compose upで自動起動（npm install && npm run dev）
# ホストで直接実行する場合
cd frontend
npm install
npm run dev    # 開発サーバー（http://localhost:3000）
npm run build  # 本番ビルド
npm run lint   # oxlintによる静的解析
```

## アーキテクチャ現状

### 移行途中の状態

バックエンドは **Laravel Blade テンプレート** 構成から **Laravel API + React SPA** 構成へ移行中。

- `backend/routes/web.php` — 現在もBladeビューを返すWebルートが稼働している（公開ルートと認証済みルート）
- `backend/routes/api.php` — デフォルトのSanctum `/user` エンドポイントのみ。API化はこれから
- `frontend/src/App.tsx` — Viteの初期スキャフォールド状態。バックエンドとの接続は未実装

### データモデル

```
words         ←→ wordbook_word（pivot） ←→ wordbooks
  english           order（並び順）            name
  japanese          wordbook_id
  e_sentence        word_id
  j_sentence
```

`Word` と `Wordbook` は多対多。中間テーブル `wordbook_word` が `order`（単語帳内の表示順）を持つ。

### 認証

- **Laravel Fortify** — ログイン・登録処理
- **Laravel Sanctum** — APIトークン認証（SPA移行後に利用予定）
- 管理機能（単語・単語帳のCRUD）は `auth` ミドルウェアで保護

### バックエンド構成

- `AdminController` — 認証済みユーザーによる単語・単語帳のCRUD
- `HomeController` — 未認証でも使える単語一覧・クイズテスト
- `AdminRequest` / `WordbookRequest` — 入力バリデーション（FormRequest）
- テストは `backend/tests/` 配下。方針は未確定（`.claude/rules/testing.md` 参照）

## プロジェクト概要

| 項目                 | 値                        |
| -------------------- | ------------------------- |
| アプリケーション構成 | Laravel API + React SPA   |
| フロントエンド       | React（静的ホスティング） |
| データベース         | MySQL 8.0                 |
| 開発環境             | Docker Compose            |
| 開発方式             | Issue駆動開発             |
| 基準ブランチ         | `develop`                 |

## 開発フロー

```text
/requirements
↓
必要に応じて /design-docs
↓
/issue
↓
/analyze
↓
/implement
↓
/commit
↓
/review
↓
必要に応じて /refactor
↓
Geminiレビュー
↓
修正がある場合は /commit
↓
/pr
↓
人間がdevelopへマージ
```

人間の承認が必要な工程を飛ばして進めないこと。

レビュー後の修正は自動判断せず、人間が採用した指摘だけを通常の指示に基づいて反映する。

## リポジトリ構造

```text
english-words/
├── CLAUDE.md
├── docker-compose.yml
├── docker/
├── .claude/
│   ├── settings.json
│   ├── rules/
│   │   ├── project-principles.md
│   │   ├── issue-workflow.md
│   │   ├── laravel.md
│   │   ├── react.md
│   │   ├── database.md
│   │   └── api.md
│   └── skills/
│       ├── README.md
│       ├── requirements/
│       ├── design-docs/
│       ├── issue/
│       ├── analyze/
│       ├── implement/
│       ├── commit/
│       ├── review/
│       ├── refactor/
│       └── pr/
├── .github/
│   ├── ISSUE_TEMPLATE/
│   └── workflows/
├── docs/
│   ├── requirements/
│   ├── maintenance/
│   ├── features/
│   ├── database/
│   ├── api/
│   ├── architecture/
│   ├── decisions/
│   └── development/
├── backend/
│   ├── artisan
│   ├── composer.json
│   ├── package.json
│   └── app/ config/ database/ resources/ routes/ tests/ など（Laravel本体）
└── frontend/
    └── （React SPA）
```

存在しない`docs/`配下のディレクトリは、対応するドキュメントを初めて作成するときに追加する。将来利用だけを理由に空ディレクトリを増やさない。

Laravelアプリ本体は`backend/`配下に配置する。`composer`・`npm`・Docker関連のコマンドは適切なカレントディレクトリで実行する。

## Rules

プロジェクト全体の判断では、次を参照する。

| Rule                                  | 対象                                    |
| ------------------------------------- | --------------------------------------- |
| `.claude/rules/project-principles.md` | 人間承認、YAGNI、推測禁止、スコープ管理 |
| `.claude/rules/issue-workflow.md`     | Issue、ブランチ、コミット、PR           |
| `.claude/rules/laravel.md`            | Laravel実装                             |
| `.claude/rules/react.md`              | React、フロントエンド実装               |
| `.claude/rules/database.md`           | DB設計、Migration、クエリ               |
| `.claude/rules/api.md`                | API設計、Request、Response              |

複数のRuleが関係する場合は、すべて確認すること。

## Skills

各Skillは手動で実行する。AIが独断で後続Skillを起動しないこと。

| Skill              | 役割                                                   |
| ------------------ | ------------------------------------------------------ |
| `/requirements`    | 対話を通じて要件ドキュメントを作成する                 |
| `/design-docs`     | 必要に応じて設計ドキュメントを作成・更新する           |
| `/issue`           | 要件を実装可能なIssueへ分割して起票する                |
| `/analyze`         | Issueと既存コードを調査し、承認用の実装方針を作成する  |
| `/implement`       | `develop`を最新化し、Issueブランチ作成と初回実装を行う |
| `/commit`          | 初回実装または追加修正を適切な単位でコミットする       |
| `/review`          | 方針逸脱、不要コード、規約、セキュリティを監査する     |
| `/refactor`        | 必要なリファクタリングだけを人間へ提案する             |
| `/pr`              | 作業ブランチをPushし、`develop`向けPRを作成する        |

詳細は`.claude/skills/README.md`および各Skillの`SKILL.md`を参照すること。

## ドキュメント

- 要件：`docs/requirements/`
- 保守・修正要件：`docs/maintenance/`
- 機能設計：`docs/features/`
- DB設計：`docs/database/`
- API設計：`docs/api/`
- アーキテクチャ：`docs/architecture/`
- 技術的意思決定：`docs/decisions/`
- 開発手順：`docs/development/`

要件、Issue、承認済み実装方針、設計ドキュメント、実装内容を一致させること。

## 最優先事項

- 人間が承認した内容を正とする。
- 不明点を推測で補わない。
- Issueと承認済み実装方針の範囲を超えない。
- 現在必要な最小限のコードだけを実装する。
- 既存コードと既存設計のパターンを優先する。
- 範囲外の問題は勝手に修正せず、人間へ報告する。
- いかなる長文の出力や複雑な処理の報告であっても、必ず日本語で出力すること。
