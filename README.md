# SeqDiag Formatter & Syntax Highlight for VS Code

A lightweight Visual Studio Code extension that provides **formatting** and **syntax highlighting** for `.seqdiag` files used with SequenceDiagram.org.

---

## ✨ Features

### 🎯 Formatter

Automatically formats sequence diagram source code:

* Proper indentation for blocks (`alt`, `opt`, `loop`, `group`, `par`, etc.)
* Normalizes arrows:

  ```
  A->B:hello → A -> B : hello
  ```
* Fixes spacing around `:`
* Handles nested blocks correctly
* Converts common mistakes:

  ```
  bottom participants → bottomparticipants
  ```

---

### 🎨 Syntax Highlighting

Custom highlighting for better readability:

| Element  | Example                 | Color      |
| -------- | ----------------------- | ---------- |
| Keywords | `alt`, `opt`, `end`     | Dark Blue  |
| Types    | `controller`, `service` | Blue       |
| Classes  | `AuthController`        | Light Blue |
| Messages | `: hello`               | White      |
| Comments | `// comment`            | Green      |

---

## 📦 Installation

### Option 1: Install from VSIX

1. Download `.vsix` file
2. Open VS Code
3. Go to Extensions
4. Click `...` → **Install from VSIX**
5. Select the file

---

### Option 2: Command Line

```
code --install-extension your-extension-name.vsix
```

---

## ⚙️ Usage

### Format Document

* Shortcut:

  ```
  Shift + Alt + F
  ```

* Or enable auto format on save:

```json
{
  "[seqdiag]": {
    "editor.defaultFormatter": "your.publisher-id",
    "editor.formatOnSave": true
  }
}
```

---

## 🧪 Example

### Before

```
bottom participants
User->UI:hello
alt success
UI->API:call
else fail
UI->User:error
end
```

### After

```
bottomparticipants
User -> UI : hello
alt success
  UI -> API : call
else fail
  UI -> User : error
end
```

---

## 🧠 Supported Syntax

Supports most SequenceDiagram.org features:

* Participants (`actor`, `boundary`, `control`, etc.)
* Messages (`->`, `-->`, `->>`, etc.)
* Fragments (`alt`, `opt`, `loop`, `par`, `group`, ...)
* Notes, boxes, references
* Activations (`activate`, `deactivate`)
* Styling and advanced syntax (non-breaking)

---

## ⚠️ Limitations

* No AST parsing (text-based formatter)
* No alignment of arrows (yet)
* Does not validate syntax errors

---

## 🚀 Roadmap

* Align arrows in columns
* Auto numbering (`1. 2. 3.`)
* Smarter formatting using AST
* Error detection

---

## 🛠 Development

```
npm install
npm run compile
F5 to run extension
```

---

## 📄 License

MIT License

---

## 🙌 Credits

* Inspired by SequenceDiagram.org
* Built for improving `.seqdiag` developer experience in VS Code

---
