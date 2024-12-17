# MeetURLMaker

## これはなに

スプシから情報を取得して、指定した内容の Meet URL を作成する GAS コード。

## できること

* スプシから情報を取得して、指定の日時に指定のタイトルの Meet URL を作成し、スプシに反映する
    * Slack への転送は [AutoReminder](https://github.com/KaijuAtUT/AutoReminder) をご覧ください

## 使い方

1. スプレッドシートを作成する
    1. ここでは、A 列から 面接対象者（ Meet のタイトル）、面接日時、Meet URL を想定しています
2. エディタのサービスから、Google カレンダーの API を追加する
3. トリガーを設定する

## デフォルトの設定

* スプシの列は A 列から 面接対象者、面接日時、Meet URL を想定しています
* カレンダーはメインのものが使われるようになっています
* 面接時間は 1 時間で設定しています
