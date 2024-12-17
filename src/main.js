function createMeetLinks() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const data = sheet.getDataRange().getValues();

  // A列: タイトル、B列: 日時、C列: Meetリンク
  const TITLE_COL = 0;
  const DATE_COL = 1;
  const MEET_LINK_COL = 2;

  // カレンダーID（デフォルトカレンダーを使用）
  const calendarId = "primary"; // メインカレンダーを使用

  // 2行目以降のデータを処理
  for (let i = 1; i < data.length; i++) {
    const title = data[i][TITLE_COL];
    const dateStr = data[i][DATE_COL];
    const meetLink = data[i][MEET_LINK_COL];

    // 既にリンクがある場合はスキップ
    if (meetLink) continue;

    // 日時の文字列をDate型に変換
    const eventDate = new Date(dateStr);
    if (isNaN(eventDate)) {
      Logger.log(`無効な日付形式: ${dateStr}`);
      continue;
    }

    // Google Calendar APIを使用してイベントを作成
    const event = {
      summary: title,
      start: {
        dateTime: eventDate.toISOString(),
        timeZone: "Asia/Tokyo",
      },
      end: {
        dateTime: new Date(eventDate.getTime() + 60 * 60 * 1000).toISOString(), // デフォルトの面接時間は1時間
        timeZone: "Asia/Tokyo",
      },
      conferenceData: {
        createRequest: {
          requestId: "meet-" + new Date().getTime() + "-" + i,
        },
      },
    };

    // Google Calendar APIを呼び出してイベントを作成
    const createdEvent = Calendar.Events.insert(event, calendarId, {
      conferenceDataVersion: 1,
    });

    // Meetリンクを取得
    const meetUrl = createdEvent.conferenceData.entryPoints[0].uri;

    // スプレッドシートにMeetリンクを書き込み
    sheet.getRange(i + 1, MEET_LINK_COL + 1).setValue(meetUrl);
    Logger.log(`イベント作成: ${title}, Meetリンク: ${meetUrl}`);
  }
}
