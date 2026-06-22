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
      botReply = "🤖 Gemini Bot: こんにちは！私はGemini AIを搭載したアシスタントです。何かお手伝いできることはありますか？";
      break;
    case 'deep':
      userText = "ユーザー: ?mode=deep 宇宙の始まりについて教えて";
      botReply = "🤖 Gemini Bot [Deep Mode]: 宇宙は約138億年前の「ビッグバン」と呼ばれる特異点の急激な膨張から始まったと考えられています。インフレーション理論によれば、超高エネルギー密度の宇宙空間が秒未満の極小時間で指数関数的に膨張し、熱いエネルギーのスープが冷却される過程で素粒子が形成されました…";
      break;
    case 'translation':
      userText = "ユーザー: /translation text:Hello to:日本語";
      botReply = "🤖 Gemini Bot [Translation]: **翻訳結果:**\nこんにちは";
      break;
    case 'image':
      userText = "ユーザー: ?mode=image a futuristic city";
      botReply = "🤖 Gemini Bot [Flux Mode]: 🎨 「a futuristic city」の画像を生成しました！\n[🖼️ 画像データ受信完了 (Fluxモデル)]";
      break;
    case 'role':
      const bet = 50;
      if (coins <= 0) {
        coins = 100;
        userText = "ユーザー: /role bet:50";
        botReply = "⚠️ コインが0枚だったため、救済チャージで **100コイン** を獲得しました！もう一度押してください。";
      } else {
        userText = `ユーザー: /role bet:${bet}`;
        const isWin = Math.random() > 0.5;
        if (isWin) {
          coins += bet;
          botReply = `🎯 **コイントス結果:** 🪙 **表 (Heads)**\n\n🎉 **おめでとうございます！勝ちました！**\n獲得コイン: \`+${bet}\` 枚\n現在の所持コイン: **${coins}** 枚`;
        } else {
          coins -= bet;
          botReply = `🎯 **コイントス結果:** 🪙 **裏 (Tails)**\n\n😭 **残念！負けてしまいました…**\n失ったコイン: \`-${bet}\` 枚\n現在の所持コイン: **${coins}** 枚`;
          if (coins === 0) {
            botReply += "\n\n(コインがなくなってしまいました！次回起動時に自動で100枚にチャージされます。)";
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
