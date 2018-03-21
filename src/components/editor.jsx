/* eslint new-cap:0 no-unused-vars:0 */
import React, { Component } from "react";
import PropTypes from "prop-types";
import Codemirror from "react-codemirror2";

if (typeof window !== "undefined") {
  require("codemirror/mode/jsx/jsx");
}

class Editor extends Component {

  static propTypes = {
    className: PropTypes.string,
    external: PropTypes.bool,
    codeText: PropTypes.string,
    theme: PropTypes.string,
    lineNumbers: PropTypes.bool,
    smartIndent: PropTypes.bool,
    lineWrapping: PropTypes.bool,
    tabSize: PropTypes.number,
    readOnly: PropTypes.bool,
    onChange: PropTypes.func,
    selectedLines: PropTypes.array,
    style: PropTypes.object
  };

  componentDidMount = () => {
    const editor = this.editor.editor;
    this.highlightSelectedLines(editor, this.props.selectedLines);
  };

  highlightSelectedLines = (editor, selectedLines) => {
    if (Array.isArray(selectedLines)) {
      selectedLines.forEach((lineNumber) =>
        editor.addLineClass(lineNumber, "wrap", "CodeMirror-activeline-background"));
    }
  };

  updateCode = (editor, meta, code) => {
    if (!this.props.readOnly && this.props.onChange) {
      this.props.onChange(code);
    }
  };

  render() {
    const {
      className,
      external,
      codeText,
      theme,
      lineNumbers,
      smartIndent,
      lineWrapping,
      onChange,
      tabSize,
      readOnly,
      selectedLines,
      style,
    } = this.props;

    const options = {
      mode: "jsx",
      matchBrackets: true,
      lineWrapping,
      smartIndent,
      lineNumbers,
      tabSize,
      theme,
      readOnly
    };

    return (
      <Codemirror
        ref={(c) => { this.editor = c; }}
        className={className}
        external={external}
        options={options}
        style={style}
        value={codeText}
        onChange={this.updateCode}
      />
    );
  }

}

export default Editor;
