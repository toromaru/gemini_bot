let coins = 100;

function scrollToTerminal() {
  document.getElementById('demo').scrollIntoView({ behavior: 'smooth' });
}

function runCommand(type) {
  const terminal = document.getElementById('terminal-body');
  
  // Clear any overflow to keep simulation clean
  if (terminal.children.length > 8) {
    terminal.innerHTML = '<div class="terminal-line"><span class="system-prefix">> Terminal logs cleaned. ready.</span></div>';
  }

  let userText = "";
  let botReply = "";

  switch (type) {
    case 'chat':
      userText = "ユーザー: こんにちは！";
      botReply = "🤖 **gemini_bot**: こんにちは！私はGemini AIを搭載したアシスタントです。何かお手伝いできることはありますか？";
      break;
    case 'deep':
      userText = "ユーザー: /deep";
      botReply = "🤖 **gemini_bot**:\nDeepモードを有効化しました。（1時間後に自動でオフになります）";
      break;
    case 'translation':
      userText = "ユーザー: /translation text:Chat to:日本語";
      botReply = "🤖 **gemini_bot**:\n**翻訳結果:**\nChat";
      break;
    case 'image':
      userText = "ユーザー: ?mode=image a futuristic city";
      botReply = "🤖 **gemini_bot**:\n🎨 「a futuristic city」の画像を生成したよ！\n[🖼️ 画像ファイル添付: generated.jpg]";
      break;
    case 'role':
      const bet = 10;
      if (coins <= 0) {
        coins = 100;
        userText = "ユーザー: /role";
        botReply = "⚠️ コインが0枚になっていたため、破産救済として **100コイン** をプレゼントしました！💰\nもう一度コマンドを実行してください！";
      } else {
        userText = `ユーザー: /role bet:${bet}`;
        const isWin = Math.random() > 0.5;
        if (isWin) {
          coins += bet;
          botReply = `🤖 **gemini_bot**:\n🎯 **コイントス結果:** 🪙 **表 (Heads)**\n\n🎉 **おめでとうございます！勝ちました！**\n獲得コイン: \`+${bet}\` 枚\n現在の所持コイン: **${coins}** 枚`;
        } else {
          coins -= bet;
          botReply = `🤖 **gemini_bot**:\n🎯 **コイントス結果:** 🪙 **裏 (Tails)**\n\n😭 **残念！負けてしまいました…**\n失ったコイン: \`-${bet}\` 枚\n現在の所持コイン: **${coins}** 枚`;
          if (coins === 0) {
            botReply += "\n\n(コインがなくなってしまいました！次回実行時に自動で100枚にチャージされます。)";
          }
        }
      }
      break;
  }

  // ユーザーの入力行
  const userLine = document.createElement('div');
  userLine.className = 'terminal-line';
  userLine.innerHTML = `<span style="color: #60a5fa;">${userText}</span>`;
  terminal.appendChild(userLine);

  // タイピングアニメーションのふりをして遅延を挟む
  const typingIndicator = document.createElement('div');
  typingIndicator.className = 'terminal-line';
  typingIndicator.innerHTML = `<span class="system-prefix">Bot is typing...</span>`;
  terminal.appendChild(typingIndicator);
  
  terminal.scrollTop = terminal.scrollHeight;

  setTimeout(() => {
    typingIndicator.remove();
    const responseLine = document.createElement('div');
    responseLine.className = 'terminal-line';
    responseLine.innerHTML = `<div class="bot-response">${botReply}</div>`;
    terminal.appendChild(responseLine);
    terminal.scrollTop = terminal.scrollHeight;
  }, 800);
}
