# UseCase・Repositoryレイヤーの導入

## 決定事項

- Controllerの肥大化を防ぐため、`app/UseCases/`・`app/Repositories/`・`app/Interfaces/`（Interface）を新設する。
- **UseCase**：Controllerから呼び出される1機能単位のアプリケーション処理を担う。
- **Repository**：Eloquent／Query BuilderによるDB操作（SQL操作系のメソッド）を担う。
- **RepositoryInterface**：UseCaseはRepositoryの実装クラスに直接依存せず、Interface経由で利用する。実装クラスは`AppServiceProvider`でバインドする。
- ControllerはHTTPリクエストの受付・UseCase呼び出し・Responseの返却に専念する。

## 背景・理由

- 現状のController（`AdminController`・`HomeController`）は小規模だが、Eloquentクエリを直接保持しており、これから着手するAPI化Issue（#10, #11）で機能が増えると肥大化しやすい。
- アプリ自体は小規模だが、大規模アプリと同様の構成を維持したいというプロジェクト方針（人間承認済み）。
- `laravel.md`は「独自クラスを追加する場合は、現在存在する具体的な責務または重複を解消できることを確認する」「新しい抽象化は、人間が承認した実装方針に含まれる場合だけ導入する」としており、本決定はこれに基づく明示的な人間承認として位置づける。

## 対象範囲

- 既存Blade Controller：`AdminController`・`HomeController`
- 今後実装するAPI Controller（Issue #10・#11で新設予定）

## ディレクトリ構成（案）

```text
app/
├── UseCases/
│   ├── Admin/
│   │   ├── UpdateWordUseCase.php
│   │   ├── CreateWordUseCase.php
│   │   └── CreateWordbookUseCase.php
│   └── Word/
│       └── ListWordsUseCase.php
├── Repositories/
│   ├── WordRepository.php
│   └── WordbookRepository.php
├── Interfaces/
│   ├── WordRepositoryInterface.php
│   └── WordbookRepositoryInterface.php
```

実際のクラス名・分割単位は各Issueの`/analyze`実装方針で確定する。

## 命名・配置規則

- UseCaseクラス名：`<動詞+対象>UseCase`（例：`UpdateWordUseCase`）
- Repositoryクラス名：`<単数形Model名>Repository`、Interface名：`<単数形Model名>RepositoryInterface`
- Interfaceの配置先：`app/Interfaces/`
- Repositoryのpublicメソッドは、QueryBuilderを直接返さずModelまたはCollectionを返す
- UseCaseは単一責務のpublicメソッド（`execute()`など）を持つ
- RepositoryInterfaceと実装クラスのバインドは`AppServiceProvider::register()`で行う

## 対象外

- Service層・DTOの追加（現時点で必要性がないため見送る）
- 既存テストの追加・変更（別Issueで扱う）
- パフォーマンスチューニング

## 影響

- 既存2つのController（`AdminController`・`HomeController`）のロジックをUseCase・Repositoryへ移動する
- Issue #10・#11（API化）の実装方針にこの構成を組み込む

## 未決事項

- なし
