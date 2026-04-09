import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {

  const provider = vscode.languages.registerDocumentFormattingEditProvider('seqdiag', {
    provideDocumentFormattingEdits(document: vscode.TextDocument): vscode.TextEdit[] {

      const text = document.getText();
      const lines = text.split('\n');

      let indent = 0;
      const INDENT_SIZE = 2;

      const blockStart = /^(alt|opt|loop|par|break|critical|group|seq|strict|neg|ignore|consider|assert|region|expandable-|expandable\+)/i;
      const blockMiddle = /^(else)\b/i;
      const blockEnd = /^(end)\b/i;

      const noIndentKeywords = /^(title|participant|actor|boundary|control|entity|database|rparticipant|note|box|abox|rbox|participantgroup|style|fragmentstyle|messagestyle|notestyle|participantstyle|lifelinestyle|fontfamily|autonumber|linear|parallel|entryspacing|participantspacing|activecolor|frame|boundary|==)/i;

      const result: string[] = [];

      for (let rawLine of lines) {
        let line = rawLine.trim();

        // normalize keywords đặc biệt
        line = line.replace(/\bbottom\s+participants\b/gi, 'bottomparticipants');

        // giữ dòng trống
        if (line === '') {
          result.push('');
          continue;
        }

        // comment giữ nguyên
        if (/^(#|\/\/)/.test(line)) {
          result.push(' '.repeat(indent * INDENT_SIZE) + line);
          continue;
        }

        // giảm indent trước khi render nếu là end
        if (blockEnd.test(line)) {
          indent = Math.max(indent - 1, 0);
        }

        // else: giảm 1 rồi tăng lại
        if (blockMiddle.test(line)) {
          indent = Math.max(indent - 1, 0);
        }

        // ===== NORMALIZE SYNTAX =====

        // arrow (->, -->, ->>, ...)
        line = line.replace(/\s*([<-]*-+>{1,2})\s*/g, ' $1 ');

        // failure arrow (x)
        line = line.replace(/\s*x\s*/g, 'x');

        // normalize :
        line = line.replace(/\s*:\s*/g, ' : ');

        // normalize multiple spaces
        line = line.replace(/\s+/g, ' ').trim();

        // ===== APPLY INDENT =====

        let currentIndent = indent;

        // một số keyword không indent (top-level)
        if (noIndentKeywords.test(line)) {
          currentIndent = 0;
        }

        const formatted = ' '.repeat(currentIndent * INDENT_SIZE) + line;
        result.push(formatted);

        // ===== UPDATE INDENT =====

        if (blockStart.test(line)) {
          indent++;
        }

        if (blockMiddle.test(line)) {
          indent++;
        }
      }

      return [
        vscode.TextEdit.replace(
          new vscode.Range(
            document.positionAt(0),
            document.positionAt(text.length)
          ),
          result.join('\n')
        )
      ];
    }
  });

  context.subscriptions.push(provider);
}